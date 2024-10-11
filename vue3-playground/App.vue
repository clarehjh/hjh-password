<script lang="ts" setup>
import { isVue2, isVue3, ref } from "vue-demi";
// import {isEnableTwoFactorAuth,verifyCaptchaCode} from '../src/api/index';

console.warn(`Vue env: Vue3:${isVue3} -- Vue2: ${isVue2}`);
const change = (msg) => {
  console.log(msg);
  showDialog.value.changeDialog(false)
};
const captchaId=ref('')
const verificationCode=(e)=>{
  console.log(e)
  showDialog.value.setFlag(false)
//   verifyCaptchaCode({captchaId:  captchaId.value,captchaCode:e}).then(res=>{
//     if(res.data.captchaKey){
//       showDialog.value.setFlag(false)
//     }
// })
}
const showDialog=ref()
const token =ref('')
const test=()=>{
  // isEnableTwoFactorAuth().then(res=>{
  //   showDialog.value.setFlag(res.data.flag)
  //   captchaId.value=res.data.captchaId
  // })
  showDialog.value.setFlag(true)

}
const loginSuccess=(res)=>{
  console.log(res)
token.value=res.token
console.log(token.value)
}


</script>

<template>
   
    <hjh-password
    ref="showDialog"
    :userInfo="{
      name: '43534534',
      acctName: '111',
      phoneNum: '123',
      role: 'guanliy',
    }"
    @doFlag="test"
    @changePassword="change"
    @verificationCode="verificationCode"
   />
 
 
</template>

<style>
body > div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
