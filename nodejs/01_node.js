console.log("111111")
function sum(a, b, cd) {
  setTimeout(() => {
    // console.log(cd)
    cd(a + b)
  }, 5000)
}
sum(123, 456, (result) => {
  sum(result, 777, (result) => {
    console.log(result)
  })
  console.log(result)
})
console.log("222222")
