<template>
  <div class="xsy-formInput">
    <label :for="name" class="xsy-form_label">
      <span style="color: #f56c6c; margin-right: 4px">*</span>
      {{ label }}
    </label>

    <div class="xsy-form_content">
      <div class="xsy-outInput">
        <input
          class="xsy-innerput"
          :class="{ 'is-error': errors[name] }"
          autocomplete="current-password"
          :type="inputType"
          :id="name"
          :name="name"
          :data-validate="true"
          :data-label="label"
          v-model="inputValue"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span
          v-if="isFocused || inputValue"
          class="xsy-icon"
          @click="togglePasswordVisibility"
        >
          <ClarityEyeShowLine />
        </span>
        <div v-if="errors[name]" class="error">{{ errors[name] }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, defineProps, computed } from "vue-demi";
import ClarityEyeShowLine from "../svg/ClarityEyeShowLine.vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const inputValue = ref("");
const isFocused = ref(false);
const showPassword = ref(false);
const errors = inject<Record<string, string>>("errors", {});
const validateField = inject<Function>("validateField");

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
  validateField(props.name, inputValue.value, props.label);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const inputType = computed(() =>
  props.type === "password" && showPassword.value ? "text" : props.type
);
</script>

<style scoped lang="scss">
.error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}

.xsy-formInput {
  margin-bottom: 30px;
  display: flex;
  .xsy-form_label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    width: 120px;
  }
  .xsy-form_content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    width: 100%;

    .xsy-outInput {
      display: inline-block;
      width: 100%;
      position: relative;
      font-size: 14px;
      .xsy-innerput {
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
        &.is-error {
          border-color: #f56c6c;
        }
      }
    }

    .xsy-icon {
      position: absolute;
      top: 0;
      right: 5px;
      text-align: center;
      cursor: pointer;
      color: #909399;
    }
  }
}
</style>
