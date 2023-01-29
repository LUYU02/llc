System.register([], function (e, t) {
  "use strict"
  var n = document.createElement("style")
  return (
    (n.textContent = "h1{color:#baf;background-color:#bfa}\n"),
    document.head.appendChild(n),
    {
      execute: function () {
        document.body.insertAdjacentHTML("beforeend", "<h1>我是背景</h1>"),
          (document.body.onclick = function () {
            alert("1111111111")
          })
      },
    }
  )
})
