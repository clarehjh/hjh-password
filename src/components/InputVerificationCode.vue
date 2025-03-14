<template>
  <div class="input-verification-code">
    <SimpleDialog
      v-if="dialogVisible"
      :visible="dialogVisible"
      title="My Dialog"
      @close="closeDialog"
    >
      <template #header>
        <span class="vue-header-title">修改密码</span>
      </template>
      <div class="tips">
        为了确保帐号安全，请输入发送至{{ phone }}的{{
          6
        }}位验证码。如未收到，请尝试重新获取验证码。
      </div>
      <DigitInput v-model:value="captchaCode" />
      <div class="sms-tip">
        <span v-if="countDownNum">
          <span class="subject-color">{{ countDownNum }}秒</span>后重新获取
        </span>
        <span
          v-else
          class="subject-color"
          style="cursor: pointer"
          @click="regain"
          >重新获取验证码</span
        >
      </div>
      <template #footer>
        <vueButton
          type="primary"
          :disabled="captchaCode.length < 6"
          @click.native="verification"
          >验证</vueButton
        >
      </template>
    </SimpleDialog>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed } from "vue-demi";
import DigitInput from "./DigitInput.vue";
import vueButton from "./vueButton.vue";
import useCountDown from "../hooks/UseCountDown";
import SimpleDialog from "./SimpleDialog.vue";

interface Props {
  phoneNum: string;
}

const props = withDefaults(defineProps<Props>(), {});
const dialogVisible = ref(inject("dialogVisible"));

const captchaCode = ref("");

const emit = defineEmits(["submit", "regain"]);

const verification = () => {
  emit("submit", captchaCode.value);
  captchaCode.value = "";
};

const regain = () => {
  emit("regain");
};
function closeDialog() {
  dialogVisible.value = false;
  emit("update:showDialog", false);
}
const phone = computed(() => {
  return props.phoneNum ? props.phoneNum.replace(/(\d{3})\d{4}/, "$1****") : "";
});
const { countDownNum, countDownFun, stopCountDown } = useCountDown(60);
onMounted(() => {
  countDownFun();
});
onUnmounted(() => {
  stopCountDown();
});
defineExpose({ countDownFun });
</script>
<style scoped>
.vue-header-title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
  width: 100%;
  font-weight: bold;
}
.input-verification-code .tips {
  font-size: 14px;
  margin-bottom: 10px;
  line-height: 24px;
  font-weight: 600;
}

.input-verification-code .sms-tip {
  color: #999;
  font-size: 14px;
  margin-top: 10px;
}
</style>
