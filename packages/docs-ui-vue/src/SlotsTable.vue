<template>
  <div v-if="hasSlots" class="slots-table">
    <h4>Slots</h4>
    <table>
      <thead>
        <tr>
          <th>Slot</th>
          <th>Props</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="slot in slots" :key="slot.name">
          <td class="slot-name">
            <code>{{ slot.name }}</code>
          </td>
          <td class="slot-props">
            <ul v-if="hasSlotProps(slot)" class="slot-props-list">
              <li v-for="(propType, propName) in slot.props" :key="propName">
                <code>{{ propName }}</code
                >: <code>{{ propType.name }}</code>
              </li>
            </ul>
            <span v-else class="no-props">No props</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SlotsTableProps } from './types';

const props = defineProps<SlotsTableProps>();

const hasSlots = computed(() => {
  return props.slots && props.slots.length > 0;
});

const hasSlotProps = (slot: any) => {
  return slot.props && Object.keys(slot.props).length > 0;
};
</script>
