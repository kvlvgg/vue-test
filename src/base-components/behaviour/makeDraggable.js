export default function(el) {
  el.addEventListener('mousedown', e => {
    const shiftX = e.pageX - parseFloat(getComputedStyle(el).left);
    const shiftY = e.pageY - parseFloat(getComputedStyle(el).top);

    if (shiftY > 20) return;

    const onMouseMove = e => {
      const width = parseFloat(getComputedStyle(el).width);
      const height = parseFloat(getComputedStyle(el).height);

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let padding = 8;
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
      document.removeEventListener('mousemove', onMouseMove);
    });
  });
}
