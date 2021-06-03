function setDocumentBodyUserSelectStyle(value) {
  document.body.style.userSelect = value;
}

export default function(el) {
  el.addEventListener('mousedown', e => {
    const shiftX = e.pageX - parseFloat(getComputedStyle(el).left);
    const shiftY = e.pageY - parseFloat(getComputedStyle(el).top);
    const draggableAreaHeight = 20;

    if (shiftY > draggableAreaHeight) return;

    document.body.style.userSelect = 'none';

    const onMouseMove = e => {
      const width = parseFloat(getComputedStyle(el).width);
      const height = parseFloat(getComputedStyle(el).height);

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const padding = 8;
      let left = e.pageX - shiftX;
      let top = e.pageY - shiftY;

      if (left - padding < 0) left = padding;
      if (left + width + padding > vw) left = vw - width - padding;

      if (top - padding < 0) top = padding;
      if (top + height + padding > vh) top = vh - height - padding;

      el.style.left = left + 'px';
      el.style.top = top + 'px';
    };

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
      document.body.style.userSelect = 'auto';
      document.removeEventListener('mousemove', onMouseMove);
    });
  });
}
