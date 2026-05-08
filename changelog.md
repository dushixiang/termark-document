---
title: Changelog
description: Termark release notes and product updates.
---

# Changelog

This page records Termark product updates, bug fixes, and behavior changes.

## v1.0.6

### Added

- Added support for opening the AI assistant in multiple sessions at the same time.
- Added collapsible command snippet groups.
- Added SFTP folder upload support.
- CSV asset import now supports asset group fields.
- Added ZMODEM file transfer support.
- Added SSH keepalive latency display.
- Added customizable terminal copy and paste shortcuts.

### Fixed

- Fixed an issue where Ctrl + Shift + V could paste twice on Windows.
- Fixed long filename overflow in the SFTP delete confirmation dialog.
- Fixed custom terminal theme JSON editor width constraints.
- Fixed terminal scrollbar alignment on the right edge.
- Fixed toast notifications overlapping the tab bar.
- Fixed terminal tab bar scrolling and drag-region behavior.
- Fixed terminal output preservation after reconnecting.

### Changed

- Improved the AI settings UI.
- Improved the terminal font picker.
- Optimized the default sidebar width.
- Tightened AI command confirmation behavior.
- Simplified AI command confirmation handling.
- Switched to the assisted Windows installer.

### Removed

- Removed Linux packaging.

## v1.0.5

### Added

- Added support for syncing custom logos incrementally.
- Added a host remark field.
- Added optional SSH keepalive configuration.
- Added terminal tab close options.
- Added regular expression support for terminal keyword highlights.
- Added SFTP copy path menu actions.
- Added support for pressing Enter in the batch command input to execute commands.
- Asset tree tooltips now show usernames.

### Fixed

- Fixed terminal copy and paste shortcuts.
- Fixed an issue where SFTP download renaming did not take effect.
- Fixed multi-select SFTP drag preview behavior.
- Fixed an issue where terminal panes could be unmounted when splitting.
- Fixed AI settings refresh before each prompt.
- Fixed unsupported locale handling.
- Fixed long-name overflow in the batch asset selection dialog.
- Fixed SFTP asset picker width constraints.
- Fixed dialog overlay clicks closing dialogs unexpectedly.

### Changed

- Moved AI into a resizable terminal sidebar.
- Improved terminal SFTP session isolation.
- Optimized the SFTP toolbar and reused SFTP file controls.
- Simplified API error type matching.
- Unified settings page configuration card styles.
- Improved settings page form alignment.
- Improved keyword highlight switch alignment and label text.

## v1.0.4

### Added

- Added session recording.
- Added a terminal context menu.
- Added cursor style configuration.
- Command snippets now support sorting and configurable automatic execution.

### Fixed

- Fixed an issue where split-screen shortcuts did not work.
- Fixed an issue where serial port resources were not released.

### Changed

- Improved shortcut text.
- Improved split-screen behavior.
- Improved the Windows/Linux exit confirmation UI.

## v1.0.3

### Added

- Added file size display to the update dialog.
- Added support for custom terminal themes.

### Fixed

- Fixed an issue where terminal reconnection could get stuck in mouse mode in special cases.
- Fixed an issue where private key credentials with passphrases could not be used.
- Fixed left-side alignment in fullscreen mode on Mac.

### Changed

- Unified file size formatting.
- Improved the private key credential creation flow.
- Improved AI settings.

## v1.0.2

### Fixed

- Fixed incorrect prompt when canceling a download.
- SFTP delete now succeeds silently when the target file does not exist.

### Changed

- Sidebar width is now stored on the frontend.

### Removed

- Removed trial limitations.

## v1.0.1

### Added

- AI assistant compatibility with DeepSeek V4.
- Custom prompts for the AI assistant.
- Custom User-Agent configuration for the AI assistant.
- Password or key reveal support for hosts, credentials, temporary connections, AI settings, and data sync.

### Changed

- Disabled online updates for the Windows portable edition.

## v1.0.0

- Initial release.
