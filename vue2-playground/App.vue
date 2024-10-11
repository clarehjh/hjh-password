<script lang="ts" setup>
import { isVue2, isVue3 } from "vue-demi";
console.warn(`Vue env: Vue3:${isVue3} -- Vue2: ${isVue2}`);

const change = (msg) => {
  console.log(msg);
};
</script>

<template>
  <hjh-password
    :userInfo="{
      name: '43534534',
      acctName: '111',
      phoneNum: '123',
      role: 'guanliy',
    }"
  />
</template>

<style>
body > div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
