<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img :src="logo" alt="Home Library" />
        <span class="ms-2">我的圖書館</span>
      </router-link>
      <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-nav"
        aria-controls="collapse-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapse-nav">
        <ul class="navbar-nav me-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/shelves" aria-current="page">書櫃列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/books">書目</router-link>
          </li>
          <li class="nav-item" v-if="auth.currentUser">
            <router-link class="nav-link" to="/login" @click="logout">登出</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script setup>
import { auth } from '@/utils/db'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'
const router = useRouter()
function logout() {
  auth.signOut()
  router.push('/login')
}
</script>

<style scoped>
.navbar-brand img {
  height: 2rem;
}
</style>