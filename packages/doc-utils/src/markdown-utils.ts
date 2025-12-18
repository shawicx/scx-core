/**
 * Markdown 工具 - 处理 markdown 相关操作
 */

/**
 * Markdown 解析结果
 */
export interface MarkdownParseResult {
  /**
   * 标题层级结构
   */
  headings: HeadingInfo[];
  /**
   * 代码块
   */
  codeBlocks: CodeBlockInfo[];
  /**
   * 链接
   */
  links: LinkInfo[];
  /**
   * 图片
   */
  images: ImageInfo[];
  /**
   * 表格
   */
  tables: TableInfo[];
  /**
   * 列表
   */
  lists: ListInfo[];
  /**
   * 段落内容
   */
  content: string;
}

/**
 * 标题信息
 */
export interface HeadingInfo {
  level: number;
  text: string;
  anchor: string;
  line: number;
}

/**
 * 代码块信息
 */
export interface CodeBlockInfo {
  language: string;
  code: string;
  line: number;
}

/**
 * 链接信息
 */
export interface LinkInfo {
  text: string;
  url: string;
  title?: string;
  line: number;
}

/**
 * 图片信息
 */
export interface ImageInfo {
  alt: string;
  src: string;
  title?: string;
  line: number;
}

/**
 * 表格信息
 */
export interface TableInfo {
  headers: string[];
  rows: string[][];
  line: number;
}

/**
 * 列表信息
 */
export interface ListInfo {
  type: 'ordered' | 'unordered';
  items: string[];
  line: number;
}

/**
 * Markdown 解析器
 */
export class MarkdownParser {
  /**
   * 解析 markdown 内容
   */
  parse(content: string): MarkdownParseResult {
    const lines = content.split('\n');
    const headings: HeadingInfo[] = [];
    const codeBlocks: CodeBlockInfo[] = [];
    const links: LinkInfo[] = [];
    const images: ImageInfo[] = [];
    const tables: TableInfo[] = [];
    const lists: ListInfo[] = [];

    let inCodeBlock = false;
    let currentCodeLanguage = '';
    let currentCodeLines: string[] = [];
    let currentCodeStartLine = 0;

    lines.forEach((line, index) => {
      // 处理代码块
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          currentCodeLanguage = line.trim().slice(3);
          currentCodeLines = [];
          currentCodeStartLine = index + 1;
        } else {
          inCodeBlock = false;
          codeBlocks.push({
            language: currentCodeLanguage,
            code: currentCodeLines.join('\n'),
            line: currentCodeStartLine,
          });
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeLines.push(line);
        return;
      }

      // 处理标题
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        headings.push({
          level,
          text,
          anchor: this.generateAnchor(text),
          line: index + 1,
        });
        return;
      }

      // 处理链接
      const linkMatches = line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);
      for (const match of linkMatches) {
        links.push({
          text: match[1],
          url: match[2],
          line: index + 1,
        });
      }

      // 处理图片
      const imageMatches = line.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g);
      for (const match of imageMatches) {
        images.push({
          alt: match[1],
          src: match[2],
          line: index + 1,
        });
      }

      // 处理表格
      if (line.includes('|')) {
        const cells = line
          .split('|')
          .map((cell) => cell.trim())
          .filter((cell) => cell);
        if (cells.length > 1) {
          // 简单的表格检测，实际实现需要更复杂的逻辑
          if (line.includes('---')) {
            // 表头分隔符，跳过
          } else if (tables.length === 0 || tables[tables.length - 1].line < index - 1) {
            tables.push({
              headers: cells,
              rows: [],
              line: index + 1,
            });
          } else {
            tables[tables.length - 1].rows.push(cells);
          }
        }
      }

      // 处理列表
      const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
      if (listMatch) {
        const marker = listMatch[2];
        const text = listMatch[3];
        const type = marker.endsWith('.') ? 'ordered' : 'unordered';

        if (lists.length === 0 || lists[lists.length - 1].line < index - 1) {
          lists.push({
            type,
            items: [text],
            line: index + 1,
          });
        } else {
          lists[lists.length - 1].items.push(text);
        }
      }
    });

    return {
      headings,
      codeBlocks,
      links,
      images,
      tables,
      lists,
      content,
    };
  }

  /**
   * 生成锚点链接
   */
  private generateAnchor(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  /**
   * 提取目录
   */
  extractTOC(result: MarkdownParseResult, maxLevel: number = 3): string {
    const headings = result.headings.filter((h) => h.level <= maxLevel);
    if (headings.length === 0) return '';

    const tocLines = headings.map((heading) => {
      const indent = '  '.repeat(heading.level - 1);
      return `${indent}- [${heading.text}](#${heading.anchor})`;
    });

    return `## 目录\n\n${tocLines.join('\n')}\n`;
  }

  /**
   * 提取摘要
   */
  extractSummary(result: MarkdownParseResult, maxLength: number = 200): string {
    // 找到第一个标题之前的内容作为摘要
    const firstHeading = result.headings.find((h) => h.level === 1);
    const lines = result.content.split('\n');

    let summaryLines: string[] = [];
    let endLine = firstHeading ? firstHeading.line - 1 : Math.min(10, lines.length);

    for (let i = 0; i < endLine; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('#') && !line.startsWith('```')) {
        summaryLines.push(line);
      }
    }

    let summary = summaryLines.join(' ').substring(0, maxLength);
    if (summary.length >= maxLength) {
      summary += '...';
    }

    return summary;
  }
}

/**
 * Markdown 渲染器
 */
export class MarkdownRenderer {
  /**
   * 渲染代码块，添加高亮支持
   */
  renderCodeBlocks(content: string): string {
    return content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
      const lang = language || 'text';
      return `<pre><code class="language-${lang}">${this.escapeHtml(code.trim())}</code></pre>`;
    });
  }

  /**
   * 渲染链接，添加外部链接标识
   */
  renderLinks(content: string): string {
    return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const isExternal = url.startsWith('http') && !url.includes(location?.origin || '');
      const externalAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}"${externalAttr}>${text}</a>`;
    });
  }

  /**
   * 渲染标题，添加锚点
   */
  renderHeadings(content: string): string {
    return content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, text) => {
      const level = hashes.length;
      const anchor = text
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
        .replace(/\s+/g, '-');
      return `<h${level} id="${anchor}">${text}</h${level}>`;
    });
  }

  /**
   * 渲染任务列表
   */
  renderTaskLists(content: string): string {
    return content
      .replace(/^- \[ \] (.+)$/gm, '<input type="checkbox" disabled> $1')
      .replace(/^- \[x\] (.+)$/gim, '<input type="checkbox" checked disabled> $1');
  }

  /**
   * HTML 转义
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

/**
 * Markdown 验证器
 */
export class MarkdownValidator {
  /**
   * 验证 markdown 内容
   */
  validate(content: string): ValidationResult {
    const issues: ValidationIssue[] = [];

    // 检查是否有未闭合的代码块
    const codeBlockCount = (content.match(/```/g) || []).length;
    if (codeBlockCount % 2 !== 0) {
      issues.push({
        type: 'error',
        message: '存在未闭合的代码块',
        line: this.findUnclosedCodeBlock(content),
      });
    }

    // 检查链接格式
    const linkMatches = content.matchAll(/\[([^\]]*)\]\(([^)]*)\)/g);
    for (const match of linkMatches) {
      const url = match[2];
      if (!url.trim()) {
        issues.push({
          type: 'warning',
          message: '链接URL为空',
          line: this.getLineNumber(content, match.index!),
        });
      }
    }

    // 检查图片alt属性
    const imageMatches = content.matchAll(/!\[([^\]]*)\]\(([^)]*)\)/g);
    for (const match of imageMatches) {
      const alt = match[1];
      if (!alt.trim()) {
        issues.push({
          type: 'warning',
          message: '图片缺少alt属性',
          line: this.getLineNumber(content, match.index!),
        });
      }
    }

    return {
      valid: issues.filter((i) => i.type === 'error').length === 0,
      issues,
    };
  }

  private findUnclosedCodeBlock(content: string): number {
    const lines = content.split('\n');
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
      }
    }

    if (inCodeBlock) {
      // 找到最后一个代码块开始位置
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim().startsWith('```')) {
          return i + 1;
        }
      }
    }

    return -1;
  }

  private getLineNumber(content: string, index: number): number {
    return content.substring(0, index).split('\n').length;
  }
}

/**
 * 验证结果
 */
export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

/**
 * 验证问题
 */
export interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
  line?: number;
  column?: number;
}
