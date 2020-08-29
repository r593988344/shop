const baseSize: any = 32;
function setRem() {
  const scale: any = document.documentElement.clientWidth / 750;
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
}
setRem();
window.onresize = function () {
  setRem();
};
export {};
