import { useState, useEffect, useRef } from 'react';
import type { SearchBoxProps } from '@scxfe/docs-design-system';

/**
 * 搜索框组件
 * 支持键盘快捷键（Ctrl/Cmd + K）聚焦
 * @param placeholder - 输入框占位符
 * @param onSearch - 搜索回调函数
 * @returns React 元素
 */
export function SearchBox({ placeholder = '搜索组件、Hooks...', onSearch }: SearchBoxProps = {}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="search-box">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <span className="search-kbd">⌘K</span>
    </div>
  );
}
