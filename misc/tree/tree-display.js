
const div = document.createElement('div');
div.innerHTML = `<div style="display: flex; padding: 10px;">
  <div style="flex: 1; border: 1px solid #ccc; margin-right: 10px">
    <h3>before</h3>
    <pre style="height: 500px; overflow: auto;">${JSON.stringify(checked, null, '  ')}</pre>
  </div>
  <div style="flex: 1; border: 1px solid #ccc">
    <h3>after</h3>
    <pre style="height: 500px; overflow: auto;">${JSON.stringify(gData, null, '  ')}</pre>
  </div>
</div>`

document.body.appendChild(div);
