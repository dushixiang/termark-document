---
outline: deep
---

# Local Encryption and Data Recovery

Termark stores hosts, credentials, sync settings, and other data on your device. To avoid writing sensitive information to disk as plaintext, Termark encrypts sensitive fields locally and stores the key required for decryption in the operating system's secure storage.

This means your data can be used normally on your device, but we cannot obtain your local data key and cannot decrypt your data without the key or your sync passphrase.

## How local data is encrypted

On first launch, Termark generates a random 32-byte key as the local data encryption key. This key is not stored in Termark's regular database file. It is saved in the system keychain:

| Platform | Secure storage |
|----------|----------------|
| macOS | Keychain |
| Windows | Credential Manager |
| Linux | Secret Service |

Termark uses `termark.app` as the service name in the system keychain. The local data key entry is named `local-data-key`.

When writing to the database, Termark uses this local data key to encrypt sensitive fields with AES-256-GCM. A new random nonce is generated for each encryption operation, so saving the same value twice usually produces different ciphertext.

When reading from the database, Termark first loads `local-data-key` from the system keychain, then decrypts the sensitive fields before passing them to the app interface and connection logic. If the system keychain is unavailable or the local data key cannot be read, Termark refuses to continue writing new data in an unencrypted state.

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

If you choose to remember the sync passphrase, Termark stores it in the system keychain. It uses the same service name, `termark.app`, but a different entry name: `sync-passphrase`. This is separate from the local data key entry, `local-data-key`; the two entries do not replace each other.

## Why we cannot decrypt your data

Termark's encryption design keeps decryption capability on your device and with you:

- Sensitive fields in the local database require `local-data-key` to decrypt.
- `local-data-key` is stored in your device's system keychain and is not uploaded to Termark's server.
- Synced data requires the sync passphrase you set.
- The sync passphrase is not uploaded to the server; if remembered, it is only stored in your device's system keychain.
- AES-GCM includes integrity checks. With the wrong key or wrong sync passphrase, decryption fails instead of producing readable data.

As a result, if you only provide the database file, sync ciphertext, or server-side data, we cannot restore your passwords, private keys, or other sensitive fields from it. Without the corresponding system keychain entry or sync passphrase, the ciphertext is unreadable to us as well.

## What happens if the key or passphrase is lost

The following situations can make existing sensitive data impossible to decrypt:

- The `termark.app / local-data-key` entry is deleted or reset in the system keychain.
- The operating system is reinstalled, or data is migrated without migrating the system keychain.
- A local database file is copied directly to another device without the corresponding local data key.
- The sync passphrase is forgotten and no accessible device still has it.
- The operating system keychain is damaged, removed by cleanup tools, or inaccessible to the current user.

If the local data key is lost, Termark cannot decrypt sensitive fields in the original database. You may still be able to see some non-sensitive configuration, but encrypted fields such as passwords, private keys, and proxy passwords cannot be recovered.

If the sync passphrase is lost, Termark cannot decrypt cloud sync data. We also cannot reset or recover the sync passphrase from server-side data.

## Backup recommendations

To avoid losing access during cleanup or migration:

- When migrating to a new computer, do not copy only the Termark data directory. Use the operating system's migration tools to migrate the keychain as well.
- If you enable sync, store the sync passphrase safely, such as in a password manager you trust.
- Keep the old device available until the new device has signed in and sync has been confirmed.
- For long-term archival, confirm that the local data, system keychain, and sync passphrase are all available.

Termark does not host your local data key or sync passphrase for you. This has an important consequence: we cannot recover lost sensitive data on your behalf, and the server or staff do not have the ability to decrypt user data.
