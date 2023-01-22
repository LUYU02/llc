const express = require("express")
const path = require("path")
const app = express()
const cookie = require("cookie-parser")
// 引入session
const session = require("express-session")
// 引入uuid
const uuid = require("uuid").v4
// 引入file-store
const FileStore = require("session-file-store")(session)

// 将ejs设置为默认的模板引擎 配置模板引擎
app.set("view engine", "ejs")
// 配置模板的路径
app.set("views", path.join(__dirname, "views"))

// 配置静态资源
app.use(express.static(path.join(__dirname, "views")))
// 配置请求体解析
app.use(express.urlencoded({ extended: true }))
app.use(cookie())
// 设置session中间件
app.use(
  session({
    store: new FileStore({
      //path 指定sessions 本地文件路径
      path: path.join(__dirname, "./sessions"),
      secret: "加密!",
      // session的有效时间 默认一小时
      // ttl: 10,
      // 默认情况下，fileStore会每间隔一小时，清除一次session对象
      // reapInterval 用来指定清除session的间隔，单位秒，默认 1小时
      // reapInterval: 10,
    }),
    // 加密信息
    secret: "小江",
    // cookie: {
    //   maxAge: 1000 * 3600,
    // },
  })
)

/* 
    session是服务器中的一个对象，这个对象用来存储用户的信息
        每一个session都会有一个唯一的id，session创建后，
            id会以cookie的形式发送给浏览器
        浏览器收到以后，每次访问都会将id发回，服务器中就可以根据id找到对应的session
 
    id（cookie） ----> session对象
     
    session什么时候会失效？
        第一种 浏览器的cookie没了
        第二种 服务器中的session对象没了
     
    express-session默认是将session存储到内存中的，所以服务器一旦重启session会自动重置，
        所以我们使用session通常会对session进行一个持久化的操作（写到文件或数据库）
 
    如果将session存储到本文件中：
        - 需要引入一个中间件session-file-store
        - 使用步骤：
            ① 安装
                yarn add session-file-store
            ② 引入
                const FileStore = require("session-file-store")(session) 
            ③ 设置为中间件       
            app.use(
                session({
                    store: new FileStore({}),
                    secret: "dazhaxie"
                })
            )
*/
app.use("/students", require("./routers/student_session"))

/* 
    登入路由
*/
// 登入路由 访问默认为登入页面
app.get("/", (req, res) => {
  const token = uuid()
  console.log(token)
  // 把登入页面渲染为主页面
  res.render("login")
})
// 登出
app.get("/logout", (req, res) => {
  // 使session失效
  req.session.destroy(() => {
    res.redirect("/")
  })
})
app.post("/login", (req, res) => {
  // 获取用户的用户名和密码\
  const { username, password } = req.body
  if (username === "小江" && password === "123456") {
    // 登入成功 之后会将用户信息放入session
    // 这里仅仅是将loginUser添加到了内存中的session中 而没有将值写入到文件中
    req.session.loginUser = username // 一般都是存储对象
    // 为了使得session可以立刻存储，需要手动调用save
    req.session.save(() => {
      res.redirect("/students/list")
    })
  } else {
    res.send("用户名和密码错误")
  }
})

//错误路由
app.use((req, res) => {
  res.status(404).send("报错")
})
app.listen(80, () => {
  console.log("http://127.0.0.1" + " 服务器重启啦")
})
