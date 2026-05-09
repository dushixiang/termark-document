---
outline: deep
---

# Data Storage Path

Termark stores its data (session configurations, logs, etc.) in the following locations by default:

| Platform | Path |
|----------|------|
| Windows | `C:\Users\<user>\AppData\Roaming\Termark\backend` |
| macOS | `~/Library/Application Support/Termark/backend` |
| Windows Portable | `data` directory under the current folder |

Replace `<user>` with your Windows username.

## Portable Edition

The Windows portable edition stores data in the `data` folder next to the application executable. This avoids writing to the system AppData directory and makes it easy to carry on a USB drive or run from a custom location.
