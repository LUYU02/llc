const express = require("express")
const path = require("path")
const fs = require("fs/promises")
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")
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
// 配置cookie的中间件 解析cookie
app.use(cookieParser())
// 使路由生效
// app.use("/student", studentRouter)
app.use("/students", require("./routers/student"))
/* 
      cookie是有有效期
            - 默认情况下cookie的有效期就是一次会话（session）
                会话就是一次从打开到关闭浏览器的过程 
            - maxAge 用来设置cookie有效时间，单位是毫秒
*/
app.get("/set", (req, res) => {
  res.cookie("username", "小江", {
    // expires: new Date(),
    maxAge: 1000 * 60 * 60 * 34 * 30,
  })
  res.send("设置cookie")
})

app.get("/get", (req, res) => {
  console.log(req.cookies)
  res.send("读取cookie")
})

app.get("/delete-cookie", (req, res) => {
  // cookie一旦发送给浏览器我们就不能在修改了
  // 但是我们可以通过发送新 同名 的cookie来替换旧cookie，从而达到修改的目的
  res.cookie("username", "", {
    maxAge: 0,
  })
  res.send("删除cookie")
})
/* 
    登入路由
*/
// 登入路由 访问默认为登入页面
app.get("/", (req, res) => {
  // 把登入页面渲染为主页面
  res.render("login")
})
app.post("/login", (req, res) => {
  /* 
        现在咱们这个登录，简直形同虚设，
            HTTP协议是一个无状态的协议，
                服务器无法区分请求是否发送自同一个客户端
        cookie
            cookie是HTTP协议中用来解决无状态问题的技术
            cookie的本质就是一个头
                服务器以响应头的形式将cookie发送给客户端
                    客户端收到以后会将其存储，并在下次向服务器发送请求时将其传回,这样服务就可以根据cookie来识别出客户端了
    */
  // 获取用户的用户名和密码
  const { username, password } = req.body
  if (username === "小江" && password === "123456") {
    // 登入成功 之后会将数据渲染到页面
    // res.send("登入成功")
    // 登入成功后将用户名放入到cookie中
    res.cookie("username", "小江", "password", "123456")
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
