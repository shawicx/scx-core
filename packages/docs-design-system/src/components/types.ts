export interface DesignSystemProps {
  theme?: 'light' | 'dark';
}

export interface NavbarProps {
  logo?: string;
  title?: string;
  links?: NavLink[];
  showSearch?: boolean;
  showThemeToggle?: boolean;
  githubUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface SidebarProps {
  sections: NavSection[];
}

export interface NavSection {
  title: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface ThemeToggleProps {
  defaultTheme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

export interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export type Theme = 'light' | 'dark';
