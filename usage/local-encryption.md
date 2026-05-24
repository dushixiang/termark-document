---
outline: deep
---

# Local Encryption and Data Recovery

Termark stores hosts, credentials, sync settings, and other data on your device. To avoid writing sensitive information to disk as plaintext, Termark encrypts sensitive fields locally.

Regular installed builds store the local data key required for decryption in the operating system's secure storage. The Windows portable build does not store the local data key in the system keychain. Instead, it stores a passphrase-encrypted key in `portable-key.json` inside the portable data directory.

This means your data can be used normally on your device, but we cannot obtain your local data key and cannot decrypt your data without the key or your sync passphrase.

## How local data is encrypted

On first launch, Termark generates a random 32-byte key as the local data encryption key. This key is not stored in Termark's regular database file.

Regular installed builds save the local data key in the system keychain:

| Installed build platform | Secure storage |
|--------------------------|----------------|
| macOS | Keychain |
| Windows | Credential Manager |
| Linux | Secret Service |

Termark uses `termark.app` as the service name in the system keychain. The local data key entry is named `local-data-key`.

The Windows portable build uses a separate portable key mode. Termark asks you to set a local encryption passphrase, uses a key derived from that passphrase to encrypt the local data key, and saves the encrypted result to `data/backend/portable-key.json` under the program directory. This file does not store your plaintext passphrase or plaintext local data key. It contains KDF parameters, salt, nonce, and the encrypted local data key.

Each time the portable build starts, you must unlock `portable-key.json` with the local encryption passphrase before Termark can recover the local data key and decrypt sensitive fields in the database. If `portable-key.json` is lost or damaged, or if you forget the local encryption passphrase, passwords, private keys, and other sensitive fields in the existing database cannot be decrypted.

When writing to the database, Termark uses this local data key to encrypt sensitive fields with AES-256-GCM. A new random nonce is generated for each encryption operation, so saving the same value twice usually produces different ciphertext.

When reading from the database, Termark first loads the local data key, then decrypts the sensitive fields before passing them to the app interface and connection logic. Regular installed builds load `local-data-key` from the system keychain. The Windows portable build unlocks `portable-key.json` using the local encryption passphrase you enter. If the corresponding key source is unavailable or the local data key cannot be read, Termark refuses to continue writing new data in an unencrypted state.

## What is encrypted

Local field-level encryption currently covers sensitive connection and credential data, including:

- Host manual login passwords
- Host proxy passwords
- Credential passwords
- SSH private keys
- SSH private key passphrases

Regular configuration used for display and management, such as host names, addresses, ports, groups, remarks, and terminal preferences, remains stored in a readable configuration form. This keeps lists, search, sorting, and management features working while encrypting the actual passwords and key material at rest.

## How sync data is encrypted

If you enable data sync, synced data uses a separate encryption flow.

The sync passphrase is set by you. Termark uses PBKDF2-SHA256 to derive a 32-byte key from your sync passphrase and a random salt, then encrypts the data that will be uploaded with AES-256-GCM. The data stored on the sync server or third-party storage is ciphertext.

The sync passphrase is not uploaded to the server. The server only stores and transfers ciphertext, and cannot decrypt your hosts, credentials, private keys, or other synced information.

If you choose to remember the sync passphrase, Termark stores it in the system keychain. It uses the same service name, `termark.app`, but a different entry name: `sync-passphrase`. This is separate from the regular installed build's local data key entry, `local-data-key`; the two entries do not replace each other.

## Why we cannot decrypt your data

Termark's encryption design keeps decryption capability on your device and with you:

- Sensitive fields in the local database require the local data key to decrypt.
- In regular installed builds, `local-data-key` is stored in your device's system keychain and is not uploaded to Termark's server.
- In the Windows portable build, the local data key is stored in `data/backend/portable-key.json`, but it is encrypted with your local encryption passphrase before being written to disk.
- Synced data requires the sync passphrase you set.
- The sync passphrase is not uploaded to the server; if remembered, it is only stored in your device's system keychain.
- AES-GCM includes integrity checks. With the wrong key or wrong sync passphrase, decryption fails instead of producing readable data.

As a result, if you only provide the database file, sync ciphertext, or server-side data, we cannot restore your passwords, private keys, or other sensitive fields from it. Without the corresponding system keychain entry, or the Windows portable build's `portable-key.json` plus local encryption passphrase, or the sync passphrase, the ciphertext is unreadable to us as well.

## What happens if the key or passphrase is lost

The following situations can make existing sensitive data impossible to decrypt:

- The `termark.app / local-data-key` entry is deleted or reset in the system keychain.
- The operating system is reinstalled, or data is migrated without migrating the system keychain.
- A local database file is copied directly to another device without the corresponding local data key.
- When using the Windows portable build, only the database file is copied without also copying `data/backend/portable-key.json`.
- When using the Windows portable build, the local encryption passphrase is forgotten, or `portable-key.json` is deleted or damaged.
- The sync passphrase is forgotten and no accessible device still has it.
- The operating system keychain is damaged, removed by cleanup tools, or inaccessible to the current user.

If the local data key is lost, Termark cannot decrypt sensitive fields in the original database. You may still be able to see some non-sensitive configuration, but encrypted fields such as passwords, private keys, and proxy passwords cannot be recovered.

If the sync passphrase is lost, Termark cannot decrypt cloud sync data. We also cannot reset or recover the sync passphrase from server-side data.

## Backup recommendations

To avoid losing access during cleanup or migration:

- When migrating data from a regular installed build, do not copy only the Termark data directory. Use the operating system's migration tools to migrate the keychain as well.
- When migrating data from the Windows portable build, copy the full `data` directory under the program directory, especially `data/backend/portable-key.json`, and keep the local encryption passphrase safe.
- If you enable sync, store the sync passphrase safely, such as in a password manager you trust.
- Keep the old device available until the new device has signed in and sync has been confirmed.
- For long-term archival, confirm that the local data, the corresponding key source, and the sync passphrase are all available. Regular installed builds require the system keychain; the Windows portable build requires `portable-key.json` and the local encryption passphrase.

Termark does not host your local data key or sync passphrase for you. This has an important consequence: we cannot recover lost sensitive data on your behalf, and the server or staff do not have the ability to decrypt user data.
