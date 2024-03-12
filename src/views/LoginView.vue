<template>
  <div class="container">
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="username" class="form-label">Email</label>
        <input class="form-control" type="email" id="username" name="username" placeholder="Email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">密碼</label>
        <input class="form-control" type="password" id="password" name="password" placeholder="Password" required />
      </div>
      <button ref="btnSubmit" class="btn btn-primary w-100" type="submit">登入</button>
    </form>
  </div>
</template>

<script setup>
import { auth } from '@/utils/db'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const btnSubmit = ref(null)
const router = useRouter()

async function submit(ev) {
  btnSubmit.value.disabled = true
  const form = new FormData(ev.target)
  const username = form.get('username')
  const password = form.get('password')
  try {
    await signInWithEmailAndPassword(auth, username, password)
    console.log('登入成功')
    router.push('/shelves')
  } catch (error) {
    console.error('登入失敗', error)
    Swal.fire({
      icon: 'error',
      title: '登入失敗',
      text: error.message,
    })
  }
  btnSubmit.value.disabled = false
}
</script>

<style scoped>
form {
  width: 400px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: var(--bs-border-radius);
  margin-top: 20px;
}
</style>