<template>
  <div id="app-root">
    <nav-bar />
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped>
#app-root {
  display: flex;
  flex-direction: column;
}
#content {
  flex: 1;
}
</style>