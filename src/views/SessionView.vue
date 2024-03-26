<template>
  <div class="container my-3">
    <h1 class="mb-3">
      <span>掃描結果</span>
      <small class="text-muted">共{{ items.length }}本書</small>
    </h1>
    <div v-if="items.length === 0">
      <h4 class="text-secondary text-center my-5">目前沒有掃描後的書籍</h4>
    </div>
    <div v-if="items.length > 0" class="pool row">
      <div v-for="(b, i) in items" :key="i" class="col-12 col-lg-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ b.title }}</h4>
            <div class="text-muted">作者: {{ b.author }}</div>
            <div class="text-muted">出版: {{ b.publisher }}</div>
            <div class="text-muted">ISBN: {{ b.isbnString }}</div>
            <div class="text-muted">{{ b.note }}</div>
            <div class="actions text-end mt-2">
              <button class="btn btn-danger" @click="SessionController.remove(b)">刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="items.length > 0" class="my-3">
      <move-book class="mx-auto" :items="items" @moved="moved" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import toast from '@/utils/toast'
import SessionController from '@/controllers/SessionController'
import MoveBook from '@/components/MoveBook.vue'

const session = ref({}), items = ref([])
const router = useRouter()

async function loadSession() {
  session.value = await SessionController.get()
  items.value = await session.value.getBooks()
}

function moved(shelfId) {
  console.log('moved', shelfId)
  toast.fire({
    icon: 'success',
    title: '書籍已轉移到新書櫃'
  })
  router.push(`/shelf/${shelfId}`)
}

onMounted(() => {
  SessionController.subscribe(() => {
    loadSession()
  })
})

onUnmounted(() => {
  SessionController.unsubscribe()
})
</script>

<style scoped>
h1 small {
  font-size: 0.5em;
}
</style>