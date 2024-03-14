<template>
  <div id="app-root">
    <nav-bar :key="loggedIn" />
    <div id="content" v-if="showContent">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { auth } from '@/utils/db';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter, useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const loggedIn = ref(false);
const router = useRouter(), route = useRoute();
const showContent = computed(() => ['login','home'].includes(route.name) || loggedIn.value);
onAuthStateChanged(auth, (user) => {
  if (!user) {
    loggedIn.value = false;
    router.push("/login");
  } else {
    loggedIn.value = true;
  }
})
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