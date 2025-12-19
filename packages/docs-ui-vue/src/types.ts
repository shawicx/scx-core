import type { ComponentMeta } from '@scxfe/doc-schema';

export interface DemoLayoutProps {
  title?: string;
  description?: string;
}

export interface PropsTableProps {
  meta: ComponentMeta;
}

export interface HooksPanelProps {
  hooks?: string[];
}

export interface EventsTableProps {
  events?: ComponentMeta['events'];
}

export interface SlotsTableProps {
  slots?: ComponentMeta['slots'];
}
