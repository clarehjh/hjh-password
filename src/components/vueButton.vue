<template>
  <button
    class="ea-button"
    :disabled="disabled"
    :class="[buttonStyle, { 'is-plain': buttonProps.plain }]"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from "vue-demi";

interface Props {
  type?: string;
  disabled?: boolean;
  plain?: boolean;
}

const buttonProps = withDefaults(defineProps<Props>(), {
  disabled: false,
  plain: false,
});

const buttonStyle = computed(() => {
  return {
    [`ea-button--${buttonProps.type}`]: buttonProps.type,
  };
});
</script>

<style scoped lang="scss">
.ea-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.is-plain {
  color: #409eff !important;
  background: #ecf5ff !important;
  border-color: #b3d8ff !important;
  &:hover {
    background: #409eff !important;
    border-color: #409eff !important;
    color: #fff !important;
  }
}

.ea-button.ea-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;

  &:hover {
    background: #66b1ff;
    border-color: #66b1ff;
    color: #fff;
  }
}

.ea-button.ea-button--default {
  &:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}

.ea-button.ea-button--text {
  border: unset !important;

  &:hover {
    color: #409eff !important;
    border: unset !important;
    background-color: unset;
  }
}


</style>
