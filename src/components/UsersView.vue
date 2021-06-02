<template>
  <div class="users-view">
    <button class="btn-add" @click="onButtonAddClick">
      Добавить
    </button>

    <TreeTable
      keyField="userid"
      :nodes="usersTree"
      :columns="colums"
      :sortField.sync="sortField"
      :sortOrder.sync="sortOrder"
    />
  </div>
</template>

<script>
import AddUserModal from './AddUserModal.vue';
import TreeTable from '../base-components/TreeTable.vue';

export default {
  components: {
    AddUserModal,
    TreeTable
  },

  data() {
    return {
      users: [],
      colums: [
        {
          field: 'username',
          header: 'Имя',
          sortable: true
        },
        {
          field: 'phone',
          header: 'Телефон',
          sortable: true,
          thStyle: 'width: 200px;'
        }
      ],
      sortField: 'username',
      sortOrder: 1
    };
  },

  computed: {
    usersTree() {
      return this.buildTreeNodes(this.users);
    }
  },

  mounted() {
    const users = this.$localStorage.getItem('users') || [];
    users.forEach(x => this.users.push(x));
  },

  methods: {
    async onButtonAddClick() {
      const result = await this.$modal(AddUserModal).open();
      if (!result) return;

      this.users.push({
        userid: `${this.users.length + 1}`,
        username: result.username,
        phone: result.phone,
        headid: result.headid
      });

      this.$localStorage.setItem('users', this.users);
    },

    buildTreeNodes(users, treeNode = null) {
      const childNodes = !treeNode
        ? this.getRootUsersNodesCopies(users)
        : this.getChildUsersNodesCopies(users, treeNode);

      for (const node of childNodes)
        node.children = this.buildTreeNodes(users, node);

      return childNodes;
    },

    getRootUsersNodesCopies(users) {
      const nodes = users.filter(entry => !entry.headid);
      return nodes.map(x => ({ ...x }));
    },

    getChildUsersNodesCopies(users, node) {
      const nodes = users.filter(entry => entry.headid === node.userid);
      return nodes.map(x => ({ ...x }));
    }
  }
};
</script>

<style>
.users-view .btn-add {
  float: right;
  margin-bottom: 10px;
}
</style>
