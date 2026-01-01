<template>
  <div v-if="hasProps" class="props-table">
    <h4>Properties</h4>
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Required</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in meta.props" :key="prop.name">
          <td class="prop-name">
            <code>{{ prop.name }}</code>
          </td>
          <td class="prop-type">
            <code>{{ prop.type.name }}</code>
          </td>
          <td class="prop-required">
            <span v-if="prop.required" class="required">Yes</span>
            <span v-else class="optional">No</span>
          </td>
          <td class="prop-default">
            <code v-if="prop.default">{{ prop.default }}</code>
            <span v-else class="no-default">-</span>
          </td>
          <td class="prop-description">
            {{ prop.description || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropsTableProps } from './types';

const props = defineProps<PropsTableProps>();

const hasProps = computed(() => {
  return props.meta.props && props.meta.props.length > 0;
});
</script>
