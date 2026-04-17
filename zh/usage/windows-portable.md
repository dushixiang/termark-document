---
outline: deep
---

# Windows 便携版制作

如果需要将 Termark 制作为 Windows 便携版，只需要在 `.exe` 二进制文件同级目录创建 `data` 文件夹即可。

## 目录结构

```text
Termark/
|-- Termark.exe
\-- data/
```

## 制作步骤

1. 准备 Termark 的 Windows `.exe` 二进制文件。
2. 在 `.exe` 所在目录创建名为 `data` 的文件夹。
3. 将整个目录直接复制、分发，或再打包为 `.zip` 文件。

## 注意事项

- `data` 文件夹需要和 `.exe` 保持同级目录。
- 文件夹名称应为 `data`，不要改成其他名称。
