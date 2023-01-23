const fs = require("fs")
const path = require("path")

for (let i = 1; i < 7; i++) {
  fs.mkdir(path.join(__dirname, `./0${i}`), { recursive: true }, () => {
    console.log("成功")
  })
}
