<template>
  <div id="app-root">
    <nav-bar />
    <div id="content" v-if="loggedIn">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { auth } from '@/utils/db';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const loggedIn = ref(false);
const router = useRouter();
onAuthStateChanged(auth, (user) => {
  if (!user) {
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