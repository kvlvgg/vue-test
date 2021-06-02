import Vue from 'vue';
import ModalWrapper from '../base-components/ModalWrapper.vue';

export default class Modal {
  constructor(vnode) {
    return new Promise(resolve => {
      this.createElement(vnode, resolve);
    });
  }

  createElement(vnode, resolve) {
    const container = document.createElement('div');
    container.id = 'modal-container';
    document.body.appendChild(container);

    new Vue({
      el: '#modal-container',
      render(h) {
        return h(
          ModalWrapper,
          {
            on: {
              change: e => resolve(e),
              close: () => resolve(false)
            }
          },
          [h(vnode)]
        );
      }
    });
  }
}
