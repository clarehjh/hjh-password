# 说明

用户信息加修改密码 组件支持 vue2,vue3

## 配置属性

| 字段               | 类型      | 默认值                                                                      | 描述             |
| ------------------ | --------- | --------------------------------------------------------------------------- | ---------------- |
| `isChangePassword` | `boolean` | `true`                                                                      | 是否显示修改密码 |
| `isTelephone`      | `boolean` | `true`                                                                      | 是否显示手机号   |
| `isRole`           | `boolean` | `true`                                                                      | 是否显示角色     |
| `isUserName`       | `boolean` | `true`                                                                      | 是否显示账号     |
| `userInfo`         | `object`  | `{name: "name", phoneNum: "telephone", role: "role", acctName: "userName"}` | 用户信息         |

## 配置方法

| 方法名             | 参数         | 返回类型 | 描述                                                        |
| ------------------ | ------------ | -------- | ----------------------------------------------------------- |
| `changePassword`   | `val: any`   | `void`   | 提交修改密码                                                |
| `doFlag`           | 无           | `void`   | 是否需要双因子认证                                          |
| `verificationCode` | 无           | `void`   | 双因子认证短信验证                                          |
| `setFlag`          | `e: boolean` | `void`   | 控制是否展示双因子弹窗（通过 ref 调用）                     |
| `changeDialog`     | `e: boolean` | `void`   | 点击提交修改密码成功后调用请传入参数 false（通过 ref 调用） |


> 代码配置示例 :

```vue
<template>
  <hjh-password
    ref="hjhPassword"
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

<script lang="ts" setup>
import { ref } from "vue";
import hjhPassword from "@hjh/password"";
import "@hjh/password/dist/style.css";
import {isEnableTwoFactorAuth,verifyCaptchaCode，modifyPassword} from '../src/api/index';

const hjhPassword=ref()
const captchaId=ref('')
const captchaKey=ref('')
const test=()=>{
  //验证是否需要双因子短信验证
  isEnableTwoFactorAuth().then(res=>{
    hjhPassword.value.setFlag(res.data.flag)
    captchaId.value=res.data.captchaId
  })
}

//不需要双因子认证这个函数不需要调用
const verificationCode=(e)=>{
  verifyCaptchaCode({captchaId:  captchaId.value,captchaCode:e}).then(res=>{
    if(res.data.captchaKey){
      //成功则关闭双因子短信验证弹窗
      hjhPassword.value.setFlag(false)
    }
})
}
const change = (data) => {
  modifyPassword({ oldPassword: data.oldPassword; newPassword: data.newPassword; captchaKey: captchaKey.value }).then(res=>{
    if(res===200){
hjhPassword.value.changeDialog(false)
    }
  })
};
</script>
```

> 接口需要三个地址：

- 是否开启双因子：
- 修改密码-短信验证：
- 修改密码：
