export const FileType = {
  Image: 'image',
  PDF: 'pdf',
  Excel: 'excel',
  Doc: 'doc',
  Other: 'other',
} as const;

/**
 * @description 根据文件地址获取文件类型
 * @param url 文件地址
 */
export function getFileTypeByUrl(url: string) {
  // 使用URL的扩展名来判断文件类型
  const extensionMatch = url.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/);
  // 确保匹配到了扩展名
  if (extensionMatch) {
    const extension = extensionMatch[1].toLowerCase();
    // 根据扩展名判断文件类型
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return FileType.Image;
      case 'pdf':
        return FileType.PDF;
      case 'doc':
      case 'docx':
        return FileType.Doc;
      case 'xls':
      case 'xlsx':
        return FileType.Excel;
      default:
        return FileType.Other;
    }
  }
  return FileType.Other;
}
