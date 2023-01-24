// 引入jwt
const jwt = require("jsonwebtoken")
// 创建一个对象
const obj = {
  name: "小江",
  age: "20",
  gender: "男",
}

// 使用jwt对json数据进行加密
const token = jwt.sign(obj, "小江", { expiresIn: "1" })
try {
  // 服务器收到客户端的token后
  const decodeData = jwt.verify(token, "小江")
  console.log(decodeData)
} catch (e) {
  // 说明token解码失败,是一个无效的token
  console.log("无效token---->" + e)
}
