
$(function () {
  // 压缩地址 https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js
  // api 地址 https://nhn.github.io/tui.editor/latest/  对原 js 有改动
  const el = document.querySelector('#tuiEditor');
  const tuiEditor = new toastui.Editor({
    el,
    height: '450px',
    previewStyle: 'tab',
    initialEditType: 'wysiwyg', // markdown
    extendedAutolinks: true,
    linkAttributes: {
      target: '_blank',
    },
    toolbarItems: [['italic', 'strike', 'hr', 'ol'], ['table', 'image', 'link']],
    initialValue: localStorage.getItem('notesText') || '',
    events: {
      change: (aa) => {
        localStorage.setItem('notesText', tuiEditor.getMarkdown());
      }
    }
  });
  // 点击打开链接
  el.addEventListener('click', (evt) => {
    // 把 .toastui-editor-contents 元素的 contenteditable 设为 false ，内部的 链接 就能自动跳转
    // console.log('tar', evt.target.tagName, editor.isWysiwygMode());
    if (evt?.target?.tagName === 'A' && evt?.target?.href && tuiEditor.isWysiwygMode()) {
      // 因为 evt?.target?.href 里的 & 号被转义、导致跳转不对，所以用 innerText
      window.open(evt?.target?.innerText);
    }
  });
  // 把 tuiEditor 放到 tabs 中
  $('#eTabContent').children()[0].appendChild(el);
});
