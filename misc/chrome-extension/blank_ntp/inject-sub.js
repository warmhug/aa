console.log('this is inject-sub.js, page raw window object');
window.bb = 'bbb';
// 不能覆盖 top 属性
// Object.defineProperty(window, 'top', {
//   get () {
//     return 100;
//   }
// });
console.log('override window?', window.bb, window.top);
