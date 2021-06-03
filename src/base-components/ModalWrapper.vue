<template>
  <dialog open class="modal">
    <div class="modal_icon-close" @click="close">⨯</div>
    <slot></slot>
  </dialog>
</template>

<script>
export default {
  mounted() {
    this.placeSelfCenter();
    this.addDocumentEvents();

    this.$slots.default.forEach(child => {
      child.componentInstance.$on('close', () => this.close());
      child.componentInstance.$on('change', $event => this.change($event));
    });
  },

  destroyed() {
    document.body.removeChild(this.$el);
    this.removeDocumentEvents();
  },

  methods: {
    change(e) {
      this.$emit('change', e);
      this.$destroy();
    },

    close() {
      this.$emit('close');
      this.$destroy();
    },

    addDocumentEvents() {
      setTimeout(() => {
        document.addEventListener('keydown', this.onEscape);
        document.addEventListener('click', this.onClickOutSide);
      });
    },

    removeDocumentEvents() {
      document.removeEventListener('keydown', this.onEscape);
      document.removeEventListener('click', this.onClickOutSide);
    },

    onEscape(e) {
      if (e.code !== 'Escape') return;
      this.close();
    },

    onClickOutSide(e) {
      let el = e.target;
      while (el && el !== this.$el) {
        el = el.parentElement;
      }

      if (el !== this.$el) this.close();
    },

    placeSelfCenter() {
      this.$el.style.top = `calc(50vh - ${this.getHalfHeight()})`;
      this.$el.style.left = `calc(50vw - ${this.getHalfWidth()})`;
    },

    getHalfHeight() {
      const cs = getComputedStyle(this.$el);
      return `${cs.height}/2`;
    },

    getHalfWidth() {
      const cs = getComputedStyle(this.$el);
      return `${cs.width}/2`;
    }
  }
};
</script>

<style>
.modal {
  width: 400px;
  border: 2px solid black;
  padding: 10px;
  border-radius: 4px;
}

.modal_icon-close {
  font-size: 20px;
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 4px;
  border: 1px solid;
  border-radius: 4px;
  user-select: none;
}
</style>
