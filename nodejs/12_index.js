const express = require("express")
const path = require("path")
const fs = require("fs/promises")
const app = express()

let arrs = require("./students.json")
// 将ejs设置为默认的模板引擎 配置模板引擎
app.set("view engine", "ejs")
// 配置模板的路径
app.set("views", path.join(__dirname, "views"))
// 配置静态资源
app.use(express.static(path.join(__dirname, "public")))
// 配置请求体解析
app.use(express.urlencoded({ extended: true }))

app.get("/students", (req, res) => {
  /* 
  html页面属于静态页面，创建的时候什么样子，用户看到的就是什么样子
            不会自动跟随服务器中数据的变化而变化
 
        希望有这么一个东西，他呢长的像是个网页，但是他里边可以嵌入变量，
            这个东西在node中被称为 模板
 
        在node中存在有很多个模板引擎，都各具特色，ejs
 
        ejs是node中的一款模板引擎，使用步骤：
            1.安装ejs
            2.配置express的模板引擎为ejs
                app.set("view engine", "ejs")
            3.配置模板路径
                app.set("views", path.resolve(__dirname, "views"))
 
            注意，模板引擎需要被express渲染后才能使用


    res.render() 用来渲染一个模板引擎，并将其返回给浏览器
    可以将一个对象作为render的第二个参数传递，这样在模板中可以访问到对象中的数据
    res.render("students", { name: "孙悟空", age: 18, gender: "男" })
    <%= %>在ejs中输出内容时，它会自动对字符串中的特殊符号进行转义 <
    这个设计主要是为了避免 xss 攻击
    <%- %> 直接将内容输出
    <% %>  可以在其中直接编写js代码，js代码会在服务器中执行 
  */
  res.render("students", { arrs })
})

/* 
    修改功能
        - 点击修改链接后，显示一个表单，表单中应该有要修改的学生的信息，
            用户对学生信息进行修改，修改以后点击按钮提交表单
        - 流程：
            1. 点击孙悟空的修改链接
            2. 跳转到一个路由
                - 这个路由会返回一个页面，页面中有一个表单，表单中应该显示孙悟空的各种信息
            3. 用户填写表单，点击按钮提交到一个新的路由
                - 获取学生信息，并对信息进行修改
*/
// 点击修改按钮 表单跳转到 update 的页面 进行修改内容
app.get("/to-update", (req, res) => {
  // 获取要修改的学生信息
  const id = +req.query.id
  //  要修改的学生信息
  const student = arrs.find((i) => i.id === id)
  //   把要修改学生的数据 渲染到update.ejs文件中
  res.render("update", { student })
})

app.post("/update-student", (req, res) => {
  //   获取id
  //   const id = req.query.id
  const { id, name, age, gender, address } = req.body
  // 修改学生信息
  // 根据学生id获取学生对象
  const user = arrs.find((i) => i.id === +id)

  user.name === name
  user.age = +age
  user.gender = gender
  user.address = address

  // 将新的数据写入到json文件中
  fs.writeFile(path.join(__dirname, "./students.json"), JSON.stringify(arrs))
    .then(() => {
      //   res.redirect() 用来发起重定向
      //   重定向的作用是告诉浏览器你向另外一个地址再发起一次请求
      res.redirect("/students")
    })
    .catch(() => {
      // 失败了就...
    })
})

/* 
    删除功能
        - 点击删除链接后，删除当前数据
        - 点击 白骨精 删除 --> 删除id为5的学生
        - 流程：
            1. 点击白骨精的删除链接
            2. 向路由发送请求（写一个路由）
            3. 路由怎么写？
                - 获取学生的id n
                - 删除id为n的学生
                - 将新的数组写入文件
                - 重定向到学生列表页面
*/

app.get("/delete", (req, res) => {
  //   获取要删除学生的id
  const id = +req.query.id
  //   根据id删除学生 过滤掉 id 的学生信息
  arrs = arrs.filter((i) => i.id !== id)

  // 将新的数据写入到json文件中
  fs.writeFile(path.join(__dirname, "./students.json"), JSON.stringify(arrs))
    .then(() => {
      //   res.redirect() 用来发起重定向
      //   重定向的作用是告诉浏览器你向另外一个地址再发起一次请求
      res.redirect("/students")
    })
    .catch(() => {
      // 失败了就...
    })
})

/* 
    添加功能
        创建一个添加学生信息的路由
*/

app.post("/add-student", (req, res) => {
  //   生成一个id
  const id = arrs.at(-1) ? arrs.at(-1).id + 1 : 1
  //   1.获取用户的信息
  const newUser = {
    id,
    name: req.body.name,
    age: +req.body.age,
    gender: req.body.gender,
    address: req.body.address,
  }
  //   2.验证用户的信息
  if (
    req.body.name === "" ||
    req.body.age === "" ||
    req.body.gender === "" ||
    req.body.address === ""
  ) {
    return res.send("你输入的内容为空")
  }

  arrs.forEach((i) => {
    if (i.name === req.body.name) {
      return res.send("名字相同 请重新输入")
    }
  })
  //   3.将用户消息添加到学生表
  arrs.push(newUser)
  //   4.再重新渲染数据
  //   直接在添加路由中渲染ejs，会面临表单重复提交的问题
  //   res.render("students", { arrs })

  // 将新的数据写入到json文件中
  fs.writeFile(path.join(__dirname, "./students.json"), JSON.stringify(arrs))
    .then(() => {
      //   res.redirect() 用来发起重定向
      //   重定向的作用是告诉浏览器你向另外一个地址再发起一次请求
      res.redirect("/students.ejs")
    })
    .catch(() => {
      // 失败了就...
    })
})

/* 
    错误的路由
        在所有路由的后面 配置错误的路由
*/

app.use((req, res) => {
  // 只要这个中间件一执行 说明上面都没有匹配
  res.status(404)
  res.send("<h1>访问地址错误</h1>")
})
app.listen(80, () => {
  console.log("http://127.0.0.1")
})
