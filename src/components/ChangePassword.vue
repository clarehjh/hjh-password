<template>
  <div>
    <SimpleDialog
      v-if="dialogVisible"
      :visible="dialogVisible"
      title="My Dialog"
      @close="closeDialog"
    >
      <template #header>
        <span class="vue-header-title">修改密码</span>
      </template>
      <vueForm ref="formRef">
        <input
          type="text"
          name="username"
          autocomplete="username"
          style="display: none"
        />

        <vueInput type="password" name="oldPassword" label="旧密码" />
        <vueInput type="password" name="newPassword" label="新密码" />
        <vueInput type="password" name="confirmPassword" label="确认密码" />
      </vueForm>
      <template #footer>
        <vueButton type="default" @click.native="closeDialog">取消</vueButton>
        <vueButton
          type="primary"
          @click.native="submitForm"
          style="margin-left: 10px"
          >提交</vueButton
        >
      </template>
    </SimpleDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from "vue-demi";
import SimpleDialog from "./SimpleDialog.vue";
import vueForm from "./vueForm.vue";
import vueInput from "./vueInput.vue";
import vueButton from "./vueButton.vue";
// const props = defineProps({
//   showDialog: {
//     type: Boolean,
//     default: false,
//   },
// });
const dialogVisible = ref(inject("dialogVisible1"));

const emit = defineEmits(["update:showDialog", "submit-event"]);
// const dialogVisible = computed({
//   get() {
//     return props.showDialog;
//   },
//   set(value) {
//     emit("update:showDialog", value);
//   },
// });

function closeDialog() {
  dialogVisible.value = false;
  emit("update:showDialog", false);
}

const formRef = ref();
const submitForm = () => {
  const result = formRef.value?.validateForm();
  if (result) {
    // console.log("Form submitted successfully:", result);
    emit("submit-event", result);
  } else {
    console.log("Form validation failed.");
  }
};
</script>

<style scoped lang="scss">
.vue-header-title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
  width: 100%;
  font-weight: 500;
}
</style>
