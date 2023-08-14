<script setup lang="ts">
import { ref } from 'vue';

const fullScreen = () => {
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  } else {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
  }
};
</script>

<template>
  <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
</template>

<style scoped>

</style>
