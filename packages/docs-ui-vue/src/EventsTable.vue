<template>
  <div v-if="hasEvents" class="events-table">
    <h4>Events</h4>
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Payload Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.name">
          <td class="event-name">
            <code>{{ event.name }}</code>
          </td>
          <td class="event-payload">
            <code v-if="event.payload">{{ event.payload.name }}</code>
            <span v-else class="no-payload">void</span>
          </td>
          <td class="event-description">
            {{ event.description || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { EventsTableProps } from './types';

const props = defineProps<EventsTableProps>();

const hasEvents = computed(() => {
  return props.events && props.events.length > 0;
});
</script>
