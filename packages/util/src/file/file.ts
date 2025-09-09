/*
 * @Author: shawicx d35f3153@proton.me
 * @Description:
 */
/**
 * @description 校验文件是否支持上传
 * @param fileType {string} 当前的文件类型
 * @param acceptString {string} 支持的文件类型
 * @returns boolean
 */
export const isFileTypeAccepted = (fileType: string, acceptString: string) => {
  // 将accept属性分割成一个数组，用于检查每种MIME类型
  const acceptedTypes = acceptString
    .split(',')
    .map((type) => type.trim())
    .filter((type) => type !== '');

  // 如果accept属性是空的或者包含"*/*"，则接受任意文件类型
  if (!acceptString || acceptedTypes.includes('*/*')) {
    return true;
  }

  // 如果文件的MIME类型与acceptedTypes中的任何一个匹配，则返回true
  return acceptedTypes.some((acceptedType) => {
    // 处理MIME类型通配符的情况，如"image/*"
    if (acceptedType.endsWith('/*')) {
      const typeGroup = acceptedType.replace('/*', '');
      return fileType.startsWith(typeGroup);
    }

    // 检查文件的MIME类型是否与具体的类型完全匹配
    return fileType === acceptedType;
  });
};

/**
 * @description 下载文件
 * @param file  {File} 文件对象
 * @param fileName {string} 文件名
 * @returns {Promise<void>}
 */
export async function saveFile(file: File, fileName?: string): Promise<void> {
  // 创建一个临时的 URL 指向这个 File 对象
  const url = window.URL.createObjectURL(file);
  // 创建一个隐藏的 <a> 标签，设置其 'href' 属性为这个临时的 URL，并设置下载的文件名
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = fileName || file.name;
  // 将 <a> 标签添加到文档中
  document.body.appendChild(a);
  // 模拟点击这个 <a> 标签以下载文件
  a.click();
  // 清理资源：移除 <a> 标签，并释放创建的临时 URL
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

/**
 * @description 下载文件（链接）
 * @param url {string} 文件 URL
 * @param fileName {string} 文件名
 */
async function downloadLink(url: string, fileName?: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态: ${response.status}`);
    }
    const data = await response.blob();
    const a = document.createElement('a');
    const linkUrl = URL.createObjectURL(data);
    a.href = linkUrl;
    a.download = fileName ?? 'download file';
    a.click();
    // 清理资源：移除 <a> 标签，并释放创建的临时 URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(linkUrl);
    return Promise.resolve();
  } catch (error: unknown) {
    return Promise.reject(error);
  }
}

/**
 * @description 下载文件
 * @param fileOrUrl 文件或者文件 URL
 * @param fileName 文件名
 */
export async function downloadFile(
  fileOrUrl: File | ArrayBuffer | Blob | string,
  fileName?: string,
) {
  if (fileOrUrl instanceof File) {
    saveFile(fileOrUrl, fileName);
  } else if (fileOrUrl instanceof ArrayBuffer) {
    return Promise.reject(new Error('ArrayBuffer 暂不支持下载，请使用 File 对象'));
  } else if (fileOrUrl instanceof Blob) {
    return Promise.reject(new Error('Blob 暂不支持下载，请使用 File 对象'));
  } else {
    return await downloadLink(fileOrUrl as string, fileName);
  }
}
