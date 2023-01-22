/* 
    ES 模块化
*/
//向外部导出内容
export let a = 20
export const b = "小江"
export const c = { name: "LUYU" }
export let d = () => {
  console.log(`我是${b}`)
}

//默认导出 一个模块只有一个默认导出
// export default 后面必须跟一个值
export default (a, b) => {
  return a + b
}
// export default function sum(a, b) {
//   return a + b
// }
