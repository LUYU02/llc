// 引入插件
const HTMLPlugin = require("html-webpack-plugin")
// webpack 配置文件 给node看的 要用js的模块语法
module.exports = {
  // 设置打包的模式,production表示生产模式 development 开发模式
  mode: "production",

  // 入口文件
  // 用来指定打包时的主文件默认 ./src/index.js
  // entry: "./xj/xj.js",
  // 打包多个文件 用数组
  //   entry: ["./src/xxx.js", "./src/xxx.js"],
  // 打包多个文件生产多个文件 属性名就是文件名
  /* entry: {
    a: "./src/m1.js",
    b: "./src/m2.js",
  },

  //   打包后文件输出的位置
  output: {
    // filename: "小江.js",
    filename: "[name].js", // name 是一个变量 就是entry中的属性名
    path: __dirname + "/dist/zz", // 打包到当前文件夹下的xxx
    clean: true, // 清空之前的打包目录
  }, */

  /* 
    webpack默认情况下，只会处理js文件，如果我们希望它可以处理其他类型的文件，则要为其引入loader
    以css为例:
        使用css-loader可以处理js中的样式
        使用步骤
            安装:npm i css-loader -D 
            配置: module: {
                    rules: [
                        {
                        test: /\.css$/i,
                        use: "css-loader",
                    },
                    ]
                }
  */
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], //从后往后执行
      },
      {
        test: /\jpg$/i,
        type: "asset/resource", // 图片直接资源类型的数据，可以通过指定type来处理
      },
      //  babel 将新代码转为旧代码
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      //   title: "小江",
      template: "./src/index.html",
    }),
  ],
  devtool: "inline-source-map",
}
