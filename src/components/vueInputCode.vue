<template>
  <div :class="['vue-input', isFocus ? 'is-focus' : '']">
    <slot></slot>
    <input
      ref="vueInput"
      :maxlength="maxlength"
      :type="
        type === 'password' ? (passwordVisible ? 'text' : 'password') : type
      "
      :placeholder="placeholder"
      @focus="inputFocus"
      @blur="inputBlur"
      @keydown="onKeydown"
      v-model="inputValue"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, inject, onMounted, isVue2 } from "vue-demi";

interface Props {
  type?: string;
  maxlength?: number;
  placeholder?: string;
  value: any;
  autoFocus?: boolean;
  min?: number;
  max?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  maxlength: 50,
  placeholder: "请输入",
  autoFocus: false,
});

const emit = defineEmits(["update:value", "input"]);

const vueInput = ref();
// 获取焦点
const isFocus = ref(false);
const inputFocus = () => {
  isFocus.value = true;
};
const inputBlur = () => {
  isFocus.value = false;
};

const passwordVisible = ref(false);
const togglePasswordVisible = async () => {
  passwordVisible.value = !passwordVisible.value;
  await nextTick();
  vueInput.value.focus();
};

let keyupNum: any = null;
const onKeydown = (e: any) => {
  if (props.type === "number" && !isNaN(Number(e.key))) {
    keyupNum = e.key;
  }
};

const onInput = (val = inputValue.value) => {
  let emitValue = val;
  if (
    props.type === "number" &&
    typeof props.max === "number" &&
    typeof props.min === "number"
  ) {
    emitValue =
      +emitValue > props.max || +emitValue < props.min ? keyupNum : emitValue;
    vueInput.value.value = emitValue;
  }
  if (isVue2) {
    emit("input", emitValue);
  }
  emit("update:value", emitValue);
};

const inputValue = computed({
  get() {
    return props.value;
  },
  set(val: string | number) {
    onInput(val);
  },
});

const clearInput = () => {
  onInput("");
};

onMounted(() => {
  if (props.autoFocus) {
    vueInput.value.focus();
  }
});
defineExpose({ vueInput });
</script>
<style scoped>
input[type="password"]::-ms-reveal {
  display: none;
}
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input::placeholder {
  color: #a8abb2;
  font-size: 14px;
}
.vue-input {
  min-width: 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 34px;
  line-height: 34px;
  border-radius: 4px;
  border: 1px solid #c0c4cc;
  padding: 2px 11px;
  background-color: #fff;
  position: relative;
}
.vue-input + .vue-input {
  margin-top: 10px;
}
.vue-input input {
  min-width: 0;
  max-width: 100%;
  height: 100%;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  border: none;
  flex: 1;
  margin: 0 5px;
  border-radius: 4px;
  background-color: transparent;
}
.vue-input .inp-icon {
  cursor: pointer;
  position: absolute;
  right: 11px;
  flex-shrink: 0;
}
.icon + .icon {
  margin-left: 5px;
}
.vue-input.is-focus {
  border-color: #409eff;
}
</style>
