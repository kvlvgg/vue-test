<template>
  <table class="treetable">
    <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col.field"
          :style="col.thStyle"
          @click="onHeaderClick(col.field)"
        >
          {{ col.header }}

          <span v-if="col.sortable" class="sort-icon">
            {{ getSortIcon(col.field) }}
          </span>
        </th>
      </tr>
    </thead>

    <tbody>
      <TreeTableNode
        v-for="node in d_nodes"
        :key="node[keyField]"
        :keyField="keyField"
        :entry="node"
        :columns="columns"
        :sortField="sortField"
        :sortOrder="sortOrder"
      />
    </tbody>
  </table>
</template>

<script>
import TreeTableNode from './TreeTableNode.vue';

export default {
  components: {
    TreeTableNode
  },

  props: {
    keyField: {
      type: String,
      default: null
    },
    nodes: {
      type: Array,
      default: null
    },
    columns: {
      type: Array,
      default: null
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

  computed: {
    d_nodes() {
      const nodes = [...this.nodes];

      return nodes.sort((a, b) => {
        const aSortValue = a[this.sortField];
        const bSortValue = b[this.sortField];

        return aSortValue.localeCompare(bSortValue) * this.sortOrder;
      });
    }
  },

  methods: {
    onHeaderClick(field) {
      this.$emit('update:sortField', field);
      this.$emit('update:sortOrder', this.sortOrder * -1);
    },

    getSortIcon(field) {
      if (this.sortField !== field) return '⇅';
      return this.sortOrder === 1 ? '▲' : '▼';
    }
  }
};
</script>

<style>
.treetable {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

.treetable th:hover {
  background-color: #ccc;
}

.treetable th:active {
  background-color: #aaa;
}

.treetable th,
.treetable td {
  padding: 0.2rem;
  text-align: left;
  border: 1px solid;
}

.treetable .sort-icon {
  float: right;
}
</style>
