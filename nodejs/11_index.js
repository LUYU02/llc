const express = require("express")
const path = require("path")
const app = express()

app.use(express.static(path.join(__dirname, "./public")))
const arrs = [
  {
    u: "1",
    p: "1",
    l: "第一个人",
  },
  {
    u: "luyu",
    p: "123456",
    l: "小江",
  },
]
// 引入解析请求体的中间件
app.use(express.urlencoded())

/* app.get("/login", (req, res) => {
  console.log(req.query)
  if (req.query.u === "1" && req.query.p === "1") {
    res.send("登入成功")
  } else {
    res.send("登入失败 用户名或者密码错误")
  }
}) */

app.post("/login", (req, res) => {
  // post 请求 需要用req.body来获取值 (请求体中的参数)
  // 默认情况下express不会自动解析请求头
  // if (req.body.u === "1" && req.body.p === "1") {
  //   res.send("登入成功")
  // } else {
  //   res.send("登入失败 用户名或者密码错误")
  // }
  const u = req.body.u
  const p = req.body.p

  const loginUser = arrs.find((itme) => {
    return itme.u === u && itme.p === p
  })
  if (loginUser) {
    res.send(`登入成功${loginUser.l}`)
  } else {
    res.send("登入失败 用户名或者密码错误")
  }
})

app.post("/zc", (req, res) => {
  // 获取用户输入的数据
  // console.log(req.body)
  const { u, p, ps, l } = req.body
  const user = arrs.find((itme) => {
    return itme.u === u || itme.l === l
  })
  if (!user) {
    arrs.push({
      u,
      p,
      l,
    })
    res.send("注册成功")
  } else {
    console.log(u, 111)
    res.send("用户名存在")
  }
})

// get请求发送参数的第二种方式
// /hello/:id 表示当用户访问 /hello/xxx 时就会触发
// 在路径中以冒号命名的部分我们称为param，在get请求它可以被解析为请求参数
// param传参一般不会传递特别复杂的参数
// app.get("/hello/:name/:age/:gender", (req, res) => {
/* app.get("/hello/:name", (req, res) => {
  // 约定由于配置
  // 可以通过req.params属性来获取这些参数
  console.log(req.params)
  res.send("<h1>这是hello路由</h1>")
}) */

app.listen(80, () => {
  console.log("http://127.0.0.1")
})
