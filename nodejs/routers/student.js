const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs/promises")

// 导入 学生信息数据
let arrs = require("../students.json")
// 学生信息列表路由
router.get("/list", (req, res) => {
  res.render("students", { arrs })
})
// 添加学生的路由
router.post("/add", (req, res, next) => {
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
  // 调用next交给后面路由继续执行
  next()
})
// 删除学生的路由
router.get("/delete", (req, res, next) => {
  //   获取要删除学生的id
  const id = +req.query.id
  //   根据id删除学生 过滤掉 id 的学生信息
  arrs = arrs.filter((i) => i.id !== id)

  // 将新的数据写入到json文件中
  // 调用next交给后面路由继续执行
  next()
})

// 修改
router.get("/to-update", (req, res) => {
  // 获取要修改的学生信息
  const id = +req.query.id
  //  要修改的学生信息
  const student = arrs.find((i) => i.id === id)
  //   把要修改学生的数据 渲染到update.ejs文件中
  res.render("update", { student })
})
router.post("/update", (req, res, next) => {
  //   获取id
  //   const id = req.query.id
  const { id, name, age, gender, address } = req.body
  // 修改学生信息
  // 根据学生id获取学生对象
  const user = arrs.find((i) => i.id === +id)
  console.log(name)
  user.name = name
  user.age = +age
  user.gender = gender
  user.address = address
  // 将新的数据写入到json文件中
  // 调用next交给后面路由继续执行
  next()
})

// 处理存储文件的中间件
router.use((req, res) => {
  fs.writeFile(path.join(__dirname, "../students.json"), JSON.stringify(arrs))
    .then(() => {
      //   res.redirect() 用来发起重定向
      //   重定向的作用是告诉浏览器你向另外一个地址再发起一次请求
      res.redirect("/students/list")
    })
    .catch(() => {
      // 失败了就...
    })
})
// 向外暴露这个 router路由
module.exports = router
