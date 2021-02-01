var reqwest = require("reqwest");

reqwest({
  url: "test.json",
  method: "get",
  data: [{ name: "foo", value: "bar" }, { name: "baz", value: 100 }],
  success: function(resp) {
    alert(JSON.stringify(resp));
  }
});
