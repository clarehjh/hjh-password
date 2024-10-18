<script lang="ts">
export default {
  name: "hjh-password",
};
</script>
<script setup lang="ts">
import { ref ,provide,onMounted,watch} from "vue-demi";
import Information from "./components/Information.vue";
import ChangePassword from "./components/ChangePassword.vue";
import InputVerificationCode from "./components/InputVerificationCode.vue";

const show = ref(false);
const inputVerificationCodeRef = ref();
const show1=ref(false)
const emit = defineEmits(["changePassword","verificationCode",'doFlag']);
provide('dialogVisible',show)
provide('dialogVisible1',show1)

const props = withDefaults(
  defineProps<{
    isTelephone?: boolean;
    isChangePassword?: boolean;
    isUserName?: boolean;
    userInfo: {
      name: string;
      phoneNum: string;
      role: string;
      acctName: string;
    };
    isRole?: boolean;
  }>(),
  {
    isTelephone: true,
    isChangePassword: true,
    isUserName: true,
    userInfo: () => ({
      name: "name",
      phoneNum: "telephone",
      role: "role",
      acctName: "userName",
    }),
    isRole: true,
  }
);
const openDialog =async () => {
  emit('doFlag')
};

const changeDialog=(e:boolean)=>{
  show.value=e
  show1.value=e

}
const submit = (result: any) => {
  emit("changePassword", result);
};
const regain=()=>{
  inputVerificationCodeRef.value.countDownFun();
  emit('doFlag')
};

const vcSubmit=async(e:number)=>{
  emit("verificationCode", e);
};

const setFlag=(e:boolean)=>{
if(e){
  show.value=true
}else{
  show1.value=true
}
}

defineExpose({ setFlag,changeDialog});


</script>

<template>
  <div class="digit-input">
    <Information
      :isTelephone="props.isTelephone"
      :isChangePassword="props.isChangePassword"
      :isUserName="props.isUserName"
      :isRole="props.isRole"
      @showDialog="openDialog"
      :userInfo="props.userInfo"
    >
</Information>
    <InputVerificationCode
        v-if="show"
        ref="inputVerificationCodeRef"
        :phoneNum="userInfo.phoneNum"
       @submit="vcSubmit"  @regain="regain"
       @update:showDialog="changeDialog"
      />
      <ChangePassword v-if="show1" @update:showDialog="changeDialog" @submit-event="submit" />

  </div>
</template>

<style lang="scss"></style>
