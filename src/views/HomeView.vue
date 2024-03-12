<template>
  <div class="root">
    <div class="container-fluid">
      <h1>我的圖書館</h1>
      <p>管理藏書‧就在指尖</p>
      <div class="buttons">
        <button type="button" class="btn btn-primary btn-lg px-5" @click="go">馬上開始</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { auth } from '@/utils/db'
import { useRouter } from 'vue-router'
const router = useRouter()
function go () {
  if (auth.currentUser) {
    router.push('/shelves')
  } else {
    router.push('/login')
  }
}
</script>

<style scoped>
.root {
  background-image: url('./home.jpg');
  background-position: bottom;
  background-size: cover;
  width: 100%;
  height: calc(100vh - 59px);
  display: flex;
  align-items: center;
}

.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  font-size: 3rem;
  color: #fff;
  text-shadow: 2px 2px 4px #000;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 2px 2px 4px #000;
  margin-bottom: 2rem;
}
</style>