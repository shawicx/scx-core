/**
 * @description 入口导出所有模块
 */
// 浏览器相关工具
export {
  getLocation,
  loadScript,
  loadCSS,
  isBrowserEnvironment,
  isCSSPropertySupported,
  parseDomain,
  getURLParameters,
  toUrlParameters,
} from './browser';

// 数据结构
export {
  DoublyLinkedList,
  type DoublyLinkedNode,
  LinkedList,
  type LinkedNode,
  Queue,
  Stack,
  Tree,
  TreeNode,
  BinaryTree,
  type BinaryTreeNode,
  type TraversalOrder,
  Graph,
  type GraphEdge,
  type TraversalResult,
  type ShortestPathResult,
} from './data-structure';

// 系统工具
export { convertColor } from './system';

// 数据处理
export { BiMapFactory, rangeArray } from './data-processing';

// 通用工具
export { upperFirst, linkerToHump, lowerFirst, humpToLinker, DateFormat } from './common';

// HTTP 模块
export {
  // 基础请求工厂
  createRequestClient,
  // 增强的HTTP客户端
  HttpClient,
  createHttpClient,
} from './http';
export type {
  RequestFactoryOptions,
  HttpRequestConfig,
  UploadConfig,
  DownloadConfig,
  HttpResponse,
  HttpError,
} from './http';

// 文件处理
export {
  // 文件下载功能
  downloadFile,
  saveFile,
  // 文件类型检查
  isFileTypeAccepted,
} from './file/file';
