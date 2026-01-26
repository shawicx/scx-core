export type PreviewWidth = 'full' | 'container' | 'narrow';

export type PreviewBackground = 'white' | 'gray' | 'transparent';

export interface PreviewProps {
  title?: string;
  description?: string;
  width?: PreviewWidth;
  background?: PreviewBackground;
  bordered?: boolean;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopy?: boolean;
  title?: string;
}

export interface PreviewContainerProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopy?: boolean;
  codeTitle?: string;
  width?: PreviewWidth;
  background?: PreviewBackground;
  bordered?: boolean;
}
