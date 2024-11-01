tuiEditor();
async function tuiEditor() {
  // 压缩地址 https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js
  // api 地址 https://nhn.github.io/tui.editor/latest/  对原 js 有改动
  const el = document.querySelector('#tuiEditor');
  const tuiEditor = new toastui.Editor({
    el,
    height: '350px',
    previewStyle: 'tab',
    initialEditType: 'wysiwyg', // markdown
    extendedAutolinks: true,
    linkAttributes: { target: '_blank' },
    toolbarItems: [['italic', 'strike', 'hr', 'ul', 'ol'], ['table', 'image', 'link']],
    initialValue: '',
    events: {
      // change keyup 区别
      // change: async (aa) => {
      keyup: async (aa) => {
        // const html = tuiEditor.getHTML();
        let content = tuiEditor.getMarkdown();
        // console.log('content: ', content);
        // 有时候这里会触发 空值 问题，此时不能更改本地存储、不然数据就没了
        if (content.toString().length < 3) {
          // alert('字符长度小于 3 可能是出现bug，操作暂时中断');
          return;
        }
        // await hl_utils.sendNativeMessage('setNote', JSON.stringify(content));
        // 硬盘内容可能失效，在 localestorage 做备份
        await hl_utils.setStorage({ hl_text_note: content }, false);
      }
    }
  });
  let hl_text_note;
  // const response = await hl_utils.sendNativeMessage('getNote');
  // hl_text_note = response.content;
  if (!hl_text_note || hl_text_note.length < 3) {
    hl_text_note = (await hl_utils.getStorage(undefined, false)).hl_text_note;
  }
  tuiEditor.setMarkdown(hl_text_note);
  // 点击打开链接
  el.addEventListener('dblclick', (evt) => {
    // 把 .toastui-editor-contents 元素的 contenteditable 设为 false ，内部的 链接 就能自动跳转
    // console.log('tar', evt.target.tagName, editor.isWysiwygMode());
    if (evt?.target?.tagName === 'A' && evt?.target?.href && tuiEditor.isWysiwygMode()) {
      // 因为 evt?.target?.href 里的 & 号被转义、导致跳转不对，所以用 innerText
      // window.open(evt?.target?.innerText);
      // window.location.href = evt?.target?.innerText;
      chrome.tabs.query({ active: true }, ([curTab]) => {
        chrome.tabs.create({
          url: evt?.target?.innerText,
          index: curTab.index + 1
        });
      });
    }
  });
}
