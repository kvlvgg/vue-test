<template>
  <form class="add-person-modal" @submit.prevent="submit">
    <span class="title">Добавление пользователя</span>

    <br />
    <br />

    <div class="form-group">Имя <input v-model="form.username" /></div>

    <div class="form-group">
      Телефон <input v-model="form.phone" v-mask="'+#(###) ###-##-##'" />
    </div>

    <div class="form-group">
      Начальник
      <input v-model="form.headid" list="user-list" />
    </div>

    <datalist id="user-list">
      <option
        v-for="user in users"
        :key="user.userid"
        :value="`${user.userid} ${user.username}`"
      ></option>
    </datalist>

    <button type="submit">Сохранить</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        phone: '',
        headid: ''
      },
      users: []
    };
  },

  mounted() {
    this.users = this.$localStorage.getItem('users') || [];
  },

  methods: {
    submit() {
      if (!confirm('Добавить в таблицу нового пользователя?')) return;

      this.$emit('change', {
        username: this.form.username,
        phone: this.form.phone,
        headid: this.form.headid.split(' ')[0]
      });
    }
  }
};
</script>

<style>
.add-person-modal .title {
  font-size: 20px;
  font-weight: 600;
  user-select: none;
}

.add-person-modal .form-group {
  display: flex;
  justify-content: space-between;
}

.add-person-modal .form-group:not(:last-child) {
  margin-bottom: 10px;
}
</style>
