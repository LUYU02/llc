const express = require("express")

// 引入jwt
/* 运行流程  
    1.客户端给服务器发请求 
    2.服务器生成koten再把token发给客户端 
    3.客户端拿到token再将token保存然后把token发给服务器  
    4.服务器在解析token
    */

const jwt = require("jsonwebtoken")

const app = express()

const STU_ARR = [
  { id: "1", name: "孙悟空", age: 18, gender: "男", address: "花果山" },
  { id: "2", name: "猪八戒", age: 28, gender: "男", address: "高老庄" },
  { id: "3", name: "沙和尚", age: 38, gender: "男", address: "流沙河" },
]

app.use(express.urlencoded({ extended: true }))
// 解析json格式请求体的中间件
app.use(express.json())

app.use((req, res, next) => {
  // 设置响应头
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH")
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization")
  // Access-Control-Allow-Origin 设置指定值时只能设置一个
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
  // Access-Control-Allow-Methods 允许的请求的方式
  // Access-Control-Allow-Headers 允许传递的请求头
  next()
})

// 终止请求的get请求
app.get("/test", (req, res) => {})

// 定义一个登入的路由
app.post("/login", (req, res) => {
  // 获取用户的数据
  const { u, p } = req.body
  if (u === "小江" && p === "123") {
    // 登入成功前 生成token
    const token = jwt.sign({ d: "1", u: "小江", n: "超级管理员" }, "luyu", {
      expiresIn: "1d",
    })

    // 登入成功
    res.send({
      status: "ok",
      data: {
        token,
        n: "超级管理员",
      },
    })
  } else {
    res.status(403).send({
      status: "ok",
      data: "用户名或者密码错误",
    })
  }
})
// 定义学生信息的路由
app.get("/students", (req, res) => {
  // 一般需要做成中间件
  try {
    // 这个路由必须在用户登录后才能访问  需要检查用户是否登录
    // 读取请求头
    const token = req.get("Authorization").split(" ")[1]
    // 对token进行解码
    const decodeToken = jwt.verify(token, "luyu")
    // 解码成功后
    // 返回学生信息
    res.send({
      status: "ok",
      data: STU_ARR,
    })
  } catch (e) {
    // console.log("出错了 无效token !" + e)
    res.status(403).send({
      status: "error",
      data: "token无效",
    })
  }
})

// 查询某个学生的路由
app.get("/students/:id", (req, res) => {
  // 读取req.params 查询字符串的值
  const id = req.params.id
  const stu = STU_ARR.find((i) => i.id === id)
    ? STU_ARR.find((i) => i.id === id)
    : null
  if (stu) {
    res.send({
      status: "ok",
      data: stu,
    })
  } else {
    res.send({
      status: "no",
      data: "没有这个数据 请重新查询!",
    })
  }
})
// 定义一个添加学生的路由
app.post("/students", (req, res) => {
  // 获取学生的信息
  const { name, age, gender, address } = req.body
  // 将学生信息添加到数组
  const stu = {
    id: +STU_ARR.at(-1).id + 1 + "",
    name,
    age: +age,
    gender,
    address,
  }
  STU_ARR.push(stu)
  // 添加成功
  res.send({
    status: "ok",
    data: stu,
  })
})

// 定义一个删除学生的路由 根据id删除学生
// app.delete()
app.delete("/students/:id", (req, res) => {
  const id = req.params.id
  // 遍历数组
  for (let i = 0; i < STU_ARR.length; i++) {
    if (STU_ARR[i].id === id) {
      const delStu = STU_ARR[i]
      STU_ARR.splice(i, 1)
      // 数据删除成功
      res.send({
        status: "ok",
        data: delStu,
      })
      return
    }
  }

  res.status(403).send({
    status: "no",
    data: "这个id不存在",
  })
})

// 定义一个修改学生的路由
// app.put()
app.put("students", (req, res) => {
  console.log("put请求")
  // 获取数据
  const { id, name, age, gender, address } = req.body
  // 根据id查询学生
  const updateStu = STU_ARR.find((i) => i.id === id)
  if (updateStu) {
    updateStu.name = name
    updateStu.age = age
    updateStu.gender = gender
    updateStu.address = address
    // 修改成功之后
    res.send({
      status: "ok",
      data: updateStu,
    })
  } else {
    res.status(403).send({
      status: "no",
      data: "这个id不存在",
    })
  }
})
app.listen(80, () => {
  console.log("http://127.0.0.1" + " 服务器已经启动！")
})
