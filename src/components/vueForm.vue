<template>
  <form @submit.prevent="validateForm">
    <slot></slot>
  </form>
</template>

<script>
import { provide, reactive } from "vue-demi";

export default {
  name: "vueForm",
  setup() {
    const errors = reactive({});
    const formData = reactive({});

    const validateField = (field, value, label) => {
      if (!value) {
        errors[field] = `请输入${label}`;
      } else if (field === "newPassword") {
        const pattern =
          /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z.!@#$%^&*()-]+$)(?![a-z0-9]+$)(?![a-z.!@#$%^&*()-]+$)(?![0-9.!@#$%^&*()-]+$)[a-zA-Z0-9.!@#$%^&*()-]{8,20}$/;
        if (!pattern.test(value)) {
          errors[field] =
            "请输入8-20位的密码，包含大写字母、小写字母、数字、特殊字符中的3种，且不能包含空格";
        } else {
          delete errors[field];
        }
      } else if (field === "confirmPassword") {
        if (value !== formData.newPassword) {
          errors[field] = "确认密码必须和新密码一致";
        } else {
          delete errors[field];
        }
      } else {
        delete errors[field];
      }

      formData[field] = value;
    };

    const validateForm = () => {
      const fields = document.querySelectorAll("[data-validate]");
      fields.forEach((field) => {
        validateField(field.name, field.value, field.dataset.label);
      });

      if (Object.keys(errors).length === 0) {
        return formData;
      } else {
        return null;
      }
    };

    provide("validateField", validateField);
    provide("errors", errors);

    return {
      validateForm,
      formData,
    };
  },
};
</script>
