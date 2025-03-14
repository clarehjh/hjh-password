<template>
  <div style="padding-top: 20px">
    <div class="vue-item">
      <div class="vue-label">姓名</div>
      <div class="vue-value">{{ userInfo.name }}</div>
    </div>
    <div class="vue-item" v-if="isUserName">
      <div class="vue-label">账号</div>
      <div class="vue-value">
        {{ userInfo.acctName ? userInfo.acctName : "" }}
      </div>
    </div>
    <div class="vue-item" v-if="isTelephone">
      <div class="vue-label">手机号</div>
      <div class="vue-value">
        {{ userInfo.phoneNum ? userInfo.phoneNum.substr(0, 7) + "****" : "" }}
      </div>
    </div>
    <div class="vue-item" v-if="isRole">
      <div class="vue-label">角色</div>
      <div class="vue-value">
        {{ userInfo.role ? userInfo.role : "" }}
      </div>
    </div>
    <div class="vue-item" v-if="isChangePassword">
      <div class="vue-label">密码管理</div>
      <vueButton type="primary" plain @click.native="openDialog"
        >修改密码</vueButton
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue-demi";
import vueButton from "./vueButton.vue";

defineProps({
  isTelephone: {
    type: Boolean,
    default: true,
  },
  isChangePassword: {
    type: Boolean,
    default: true,
  },

  isRole: {
    type: Boolean,
    default: true,
  },

  isUserName: {
    type: Boolean,
    default: true,
  },
  userInfo: {
    type: Object,
    default: () => ({
      name: "name",
      phoneNum: "telephone",
      role: "role",
      acctName: "userName",
    }),
  },
});

const dialogVisible = ref(false);
const emit = defineEmits(["showDialog"]);

const openDialog = () => {
  dialogVisible.value = true;
  emit("showDialog");
};
</script>

<style scoped>
.vue-item {
  height: 56px;
  line-height: 56px;
  box-shadow: inset 0px -1px 0px 0px #ebedf0;
  display: flex;
  align-items: center;
}

/* .vue-item {
  color: #333;
  font-size: 14px;
  display: flex;
  margin: 0 20px;
} */
.vue-label {
  width: 100px;
  text-align: right;
  margin-right: 120px;
}
</style>
