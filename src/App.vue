<template>
  <div id="app-root" :class="{loading: loggedIn === null}">
    <nav-bar :key="loggedIn" />
    <div id="content" v-if="showContent">
      <router-view />
    </div>
    <div v-if="!showContent && loggedIn != null" class="to-login">
      <router-link to="/login" class="btn btn-primary btn-lg w-100">請先登入</router-link>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { auth } from '@/utils/db';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter, useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const loggedIn = ref(null);
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
#app-root.loading {
  position: relative;
  height: 100vh;
  width: 100%;
}
#app-root.loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
#app-root.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}
#content {
  flex: 1;
}
.to-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 2rem;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>