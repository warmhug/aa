// console.log('bg page', chrome.extension.getBackgroundPage());

// 输入框本地存储
// var textID = $("#textID");
// textID.val(localStorage.getItem('textLocal') || '');
// textID.on('input', function () {
//   localStorage.setItem('textLocal', $(this).val());
// });
$(function () {
  // 压缩地址 https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js
  // api 地址 https://nhn.github.io/tui.editor/latest/  对原 js 有改动
  const el = document.querySelector('#textID');
  const editor = new toastui.Editor({
    el,
    previewStyle: 'tab',
    height: '500px',
    initialEditType: 'wysiwyg',
    extendedAutolinks: true,
    linkAttributes: {
      target: '_blank',
    },
    // toolbarItems: [['a']],
    initialValue: localStorage.getItem('textLocal') || '',
    events: {
      change: (aa) => {
        // console.log('aaa', aa, editor.getMarkdown());
        localStorage.setItem('textLocal', editor.getMarkdown());
      }
    }
  });
  // 点击打开链接
  const handle = (evt, flag) => {
    // 把 .toastui-editor-contents 元素的 contenteditable 设为 false ，内部的 链接 就能自动跳转
    // console.log('tar', evt.target.tagName, editor.isWysiwygMode());
    if (evt?.target?.tagName === 'A' && evt?.target?.href && editor.isWysiwygMode()) {
      // 因为 evt?.target?.href 里的 & 号被转义、导致跳转不对，所以用 innerText
      window.open(evt?.target?.innerText);
    }
  }
  el.addEventListener('click', (evt) => handle(evt, true));
});

function randomItem(arr) {
  var original = arr;
  var remainder;
  return function () {
    // console.log(remainder && remainder.length)
    if (!(remainder && remainder.length)) {
      remainder = original.slice();
    }
    var res = remainder.splice(Math.random() * remainder.length | 0, 1)[0];
    // console.log(res)
    return typeof res === 'string' ? res.trim().replace(/(\r\n|\n|\r)/gm, '<br />') : res;
  };
}

$(function () {
  $('[data-toggle="popover"]').popover({
    content: function () {
      return $('#qrcode').html();
    }
  });

  const dbKey = 'ce_fileContent';
  let ctFromDb;
  const getContents = async () => {
    try {
      // https://web.dev/file-system-access/  get set 方法来自 idb-keyval@5.0.2 操作 IndexedDB
      const fileHandleOrUndefined = await get(dbKey);
      if (fileHandleOrUndefined) {
        return fileHandleOrUndefined;
      }
    } catch (error) { alert(error.name, error.message); }
  }
  const butDir = document.getElementById('butDirectory');
  butDir.addEventListener('click', async () => {
    if (ctFromDb && window.confirm('使用 IndexedDB 里的内容？')) {
      return;
    }
    const filesHandle = await window.showOpenFilePicker({
      types: [{ description: 'Text Files', accept: { 'text/plain': ['.txt'] } }],
      multiple: true
    });
    const fileContents = await Promise.all(filesHandle.map(async (fileHandle) => {
      const file = await fileHandle.getFile();
      const contents = await file.text();
      // console.log('ccc', contents);
      return contents;
    }));
    try {
      await set(dbKey, fileContents.join());
      alert('选择的内容写入 IndexedDB 成功');
      // location.reload();
    } catch (error) { alert(error.name, error.message); }
  });

  var jr;
  var jokeMain = $('#jokeMain');

  getContents().then(res => {
    if (!res) {
      return;
    }
    ctFromDb = res;
    jr = randomItem(res.split('\n\n'));
    jokeMain.html(jr());
  });

  $('#changeJoke').click(function () {
    jokeMain.html(jr());
  });
  jokeMain.hide();
  $('#jokeMain1').click(function () {
    jokeMain.toggle();
    $(this).toggleClass('small');
  })
})
