import Modal from '../utils/modal.js';

export default {
  install(Vue) {
    Vue.prototype.$modal = function(vnode) {
      return {
        open() {
          return new Modal(vnode);
        }
      };
    };
  }
};
