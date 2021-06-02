<template>
  <div class="content-only">
    <tr>
      <td v-for="(col, index) in columns" :key="col.field">
        <button
          v-if="index === 0"
          v-text="expanderIcon"
          :style="expanderButtonStyle"
          @click="expanded = !expanded"
        />

        {{ entry[col.field] }}
      </td>
    </tr>

    <div v-if="expanded" class="content-only">
      <TreeTableNode
        v-for="child in d_children"
        :key="child[keyField]"
        :keyField="keyField"
        :entry="child"
        :columns="columns"
        :level="level + 1"
        :sortField="sortField"
        :sortOrder="sortOrder"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeTableNode',

  props: {
    keyField: {
      type: String,
      default: null
    },
    columns: {
      type: Array,
      default: null
    },
    entry: {
      type: Object,
      default: null
    },
    level: {
      type: Number,
      default: 0
    },
    sortField: {
      type: String,
      default: null
    },
    sortOrder: {
      type: Number,
      default: null
    }
  },

  data() {
    return {
      expanded: false
    };
  },

  computed: {
    d_children() {
      if (!this.hasChildren()) return [];
      const nodes = [...this.entry.children];

      return nodes.sort((a, b) => {
        const aSortValue = a[this.sortField];
        const bSortValue = b[this.sortField];

        return aSortValue.localeCompare(bSortValue) * this.sortOrder;
      });
    },

    expanderButtonStyle() {
      return {
        visibility: !this.hasChildren() ? 'hidden' : '',
        marginLeft: `${20 * this.level}px`,
        fontSize: '18px'
      };
    },

    expanderIcon() {
      return this.expanded ? '▲' : '▼';
    }
  },

  methods: {
    hasChildren() {
      return this.entry.children && this.entry.children.length > 0;
    }
  }
};
</script>

<style>
.content-only {
  display: contents;
}
</style>
