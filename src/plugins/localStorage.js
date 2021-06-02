export default {
  install(Vue) {
    Vue.prototype.$localStorage = {
      getItem(key) {
        return JSON.parse(localStorage.getItem(key));
      },

      setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    };
  }
};
