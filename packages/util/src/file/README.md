---
group:
  title: 系统方法
toc: content
---

## isFileTypeAccepted - 判断文件类型是否支持

```typescript
function isFileTypeAccepted(file: File, accept: string): boolean
```

## saveFile - 保存文件

```typescript
function saveFile(file: File, filename: string): void
```

## downloadLink - 下载链接

```typescript
function downloadLink(url: string, filename: string): void
```

## downloadFile - 下载文件

```typescript
function downloadFile(fileOrUrl: File | ArrayBuffer | Blob | string, , filename: string): void
```
