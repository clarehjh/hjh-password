import { ref, onBeforeUnmount } from 'vue-demi'

// 倒计时
const useCountDown = (countNum: number) => {
  let timer:any = null
  const countDownNum:any = ref(null)
  const countDownFun = (cb?: Function) => {
    if (timer) return
    countDownNum.value = countNum
    timer = setInterval(() => {
      countDownNum.value--
      if (countDownNum.value <= 0) {
        clearInterval(timer)
        timer = null
        countDownNum.value = null
        cb && cb()
      }
    }, 1000)
  }
  const stopCountDown = () => {
    if (!timer) return
    clearInterval(timer)
    timer = null
    countDownNum.value = null
  }

  onBeforeUnmount(() => {
    stopCountDown()
  })

  return {
    countDownNum,
    countDownFun,
    stopCountDown
  }
}


// const chooseDialog=(flag:number)=>{
// if(flag===1){
//   return 
// }
// }

export default useCountDown