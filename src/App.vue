<template>
  <div id="app">
    <UsersView />
  </div>
</template>

<script>
import UsersView from './components/UsersView.vue';

export default {
  name: 'App',
  components: {
    UsersView
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 50px 200px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
dialog,
button {
  margin: 0;
  padding: 0;
}

dialog {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
