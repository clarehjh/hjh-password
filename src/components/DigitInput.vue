<template>
  <div class="digit-input">
    <XsyInputCode
      v-for="(item, index) in inputValue"
      v-model:value="inputValue[index]"
      type="number"
      :auto-focus="index === 0"
      @keydown.delete.native="onDelete(index)"
      @update:value="onInput(index)"
      ref="xsyInput"
      :key="index"
      :min="0"
      :max="9"
      placeholder=""
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, inject, isVue2 } from "vue-demi";
import XsyInputCode from "./HjhInputCode.vue";

interface Props {
  value?: any;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(["update:value", "input"]);

const xsyInput = ref();
const inputValue = ref();

watch(
  () => props.value,
  (val: any) => {
    if (!val) inputValue.value = new Array(6);
  },
  { immediate: true }
);

const onInput = (idx: number) => {
  let val = inputValue.value[idx] === 0 ? true : inputValue.value[idx];
  if (val && xsyInput.value[idx + 1]) {
    xsyInput.value[idx + 1].xsyInput.focus();
  }
  if (isVue2) {
    emit("input", inputValue.value.join(""));
  }
  emit("update:value", inputValue.value.join(""));
};
const onDelete = (idx: number) => {
  let val = inputValue.value[idx] === 0 ? true : inputValue.value[idx];
  if (!val && idx > 0) {
    xsyInput.value[idx - 1].xsyInput.focus();
  }
};
</script>
<style scoped>
.digit-input {
  display: flex;
  justify-content: center;
}
.digit-input .xsy-input {
  width: 40px;
  height: 40px;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 0;
  padding: 1px 5px;
}

.digit-input .xsy-input /deep/ input {
  text-align: center;
}
.digit-input .xsy-input:first-child {
  margin-left: 0;
}
</style>
