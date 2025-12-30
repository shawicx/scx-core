import type { App } from 'vue';
import DemoLayout from './DemoLayout.vue';
import PropsTable from './PropsTable.vue';
import EventsTable from './EventsTable.vue';
import SlotsTable from './SlotsTable.vue';
import HooksPanel from './HooksPanel.vue';

export { DemoLayout, PropsTable, EventsTable, SlotsTable, HooksPanel };

export type {
  DemoLayoutProps,
  PropsTableProps,
  EventsTableProps,
  SlotsTableProps,
  HooksPanelProps,
} from './types';

const components = {
  DemoLayout,
  PropsTable,
  EventsTable,
  SlotsTable,
  HooksPanel,
};

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
