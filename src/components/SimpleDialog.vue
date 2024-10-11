<template>
  <!-- <teleport
    :to="appendTo"
    :disabled="appendTo !== 'body' ? false : !appendToBody"
  > -->
    <transition name="xsy-dialog-fade">
      <div
       v-if="visible"
        class="xsy-dialog-overlay"
        @click="handleOverlayClick"
      >
        <div
          class="xsy-dialog-content"
          role="xsy-dialog"
          aria-modal="true"
          :aria-label="title || undefined"
        >
          <div class="xsy-dialog-header">
            <slot name="header">{{ title }}</slot>
            <div class="xsy-text_btn" @click="handleClose">
              <MaterialSymbolsLightClose />
            </div>
          </div>
          <div class="xsy-dialog-body">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" class="xsy-dialog-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  <!-- </teleport> -->
</template>

<script lang="ts" setup>
import MaterialSymbolsLightClose from "../svg/MaterialSymbolsLightClose.vue";
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  appendTo: {
    type: String,
    default: "body",
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);

const handleOverlayClick = (event: Event) => {
  if (event.target === event.currentTarget) {
    handleClose();
  }
};

const handleClose = () => {
  emit("close");
};
</script>

<style scoped>
.xsy-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.xsy-dialog-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 430px;
  width: 100%;
}

.xsy-dialog-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0 20px 0;
}
.xsy-text_btn {
  &:hover {
    color: #66b1ff;
    cursor: pointer;
  }
}
.xsy-dialog-body {
  margin-bottom: 20px;
}

.xsy-dialog-footer {
  text-align: right;
}
</style>
