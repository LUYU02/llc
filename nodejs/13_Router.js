const express = require("express")
const path = require("path")
const fs = require("fs/promises")
const app = express()
// 引入路由
// const studentRouter = require("./routers/student")
// let arrs = require("./students.json")
// 将ejs设置为默认的模板引擎 配置模板引擎
app.set("view engine", "ejs")
// 配置模板的路径
app.set("views", path.join(__dirname, "views"))
// 配置静态资源
app.use(express.static(path.join(__dirname, "views")))
// 配置请求体解析
app.use(express.urlencoded({ extended: true }))
// 使路由生效
// app.use("/student", studentRouter)
app.use("/students", require("./routers/student"))

/* 
    登入路由
*/
// 登入路由 访问默认为登入页面
app.get("/", (req, res) => {
  // 把登入页面渲染为主页面
  res.render("login")
})
app.post("/login", (req, res) => {
  // 获取用户的用户名和密码
  const { username, password } = req.body
  if (username === "小江" && password === "123456") {
    // 登入成功 之后会将数据渲染到页面
    // res.send("登入成功")
    // 重定向 到/students/list
    res.redirect("/students/list")
  } else {
    res.send("用户名和密码错误")
  }
})

//错误路由
app.use((req, res) => {
  res.status(404).send("报错")
})
app.listen(80, () => {
  console.log("http://127.0.0.1")
})
