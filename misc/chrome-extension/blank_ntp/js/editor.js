
function editorFn(defaultLinks) {
  const curTabIdx = parseInt(localStorage.getItem('tabIndex') ?? 0);
  const links = localStorage.getItem('links') || defaultLinks;
  const parsedLinks = JSON.parse(links);
  let navs = '', contents = '';
  parsedLinks.forEach((item, idx) => {
    navs += `<li role="presentation" data-idx="${idx}">
    <a href="#etab${idx}" data-toggle="tab">${item[1] || '-'}</a>
    </li>`;
    contents += `<div class="tab-pane" id="etab${idx}" role="tabpanel">${
      idx === 0 ? '' : `<iframe data-src="${item[0]}"></iframe>`
    }</div>`;
  });
  $('#eTabContent').html(contents);
  $('#eTabs').html(navs);
  $('#eTabs li').click(e => {
    const ele = $(e.currentTarget);
    ele.find('a').tab('show');
    const idx = ele.data('idx');
    localStorage.setItem('tabIndex', idx);
    $('#eTabContent').children().eq(idx).find('iframe').attr('src', parsedLinks[idx][0]);
    // iframe.off().on('load', () => {
    //   // 不能直接访问跨域页面
    //   console.log('tt', iframe[0].contentWindow.document.title);
    // });
    // 给 iframe 大一点空间
    if (idx === 0) {
      $('.editor').siblings().show();
    } else {
      $('.editor').siblings().hide();
    }
  }).eq(curTabIdx).trigger("click");
  chrome.runtime.onMessage.addListener((request) => {
    // console.log('ssss', request, sender.tab);
    if (request.title && request.href) {
      localStorage.setItem('links', JSON.stringify(parsedLinks.map((item, idx) => {
        if (item[0] === request.href && !item[1]) {
          $('#eTabs li').eq(idx).find('a').html(request.title);
          return [item[0], request.title];
        }
        return item;
      })));
    }
  });
  

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
}
