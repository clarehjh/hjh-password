<template>
  <div class="digit-input">
    <vueInputCode
      v-for="(item, index) in inputValue"
      v-model:value="inputValue[index]"
      type="number"
      :auto-focus="index === 0"
      @keydown.delete.native="onDelete(index)"
      @update:value="onInput(index)"
      ref="vueInput"
      :key="index"
      :min="0"
      :max="9"
      placeholder=""
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, inject, isVue2 } from "vue-demi";
import vueInputCode from "./vueInputCode.vue";

interface Props {
  value?: any;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(["update:value", "input"]);

const vueInput = ref();
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
  if (val && vueInput.value[idx + 1]) {
    vueInput.value[idx + 1].vueInput.focus();
  }
  if (isVue2) {
    emit("input", inputValue.value.join(""));
  }
  emit("update:value", inputValue.value.join(""));
};
const onDelete = (idx: number) => {
  let val = inputValue.value[idx] === 0 ? true : inputValue.value[idx];
  if (!val && idx > 0) {
    vueInput.value[idx - 1].vueInput.focus();
  }
};
</script>
<style scoped>
.digit-input {
  display: flex;
  justify-content: center;
}
.digit-input .vue-input {
  width: 40px;
  height: 40px;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 0;
  padding: 1px 5px;
}

.digit-input .vue-input /deep/ input {
  text-align: center;
}
.digit-input .vue-input:first-child {
  margin-left: 0;
}
</style>
