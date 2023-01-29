import "./style/index.css"

document.body.insertAdjacentHTML("beforeend", "<h1>我是背景</h1>")
// 怎么向后兼容
document.body.onclick = () => {
  alert("1111111111")
}
