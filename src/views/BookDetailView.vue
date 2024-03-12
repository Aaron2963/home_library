<template>
  <div>
    <h1>Book: {{ id }}</h1>
    <div v-if="book">
      <h4>{{ book.title }}</h4>
      <h5 class="text-muted">{{ book.author }}</h5>
    </div>

  </div>
</template>

<script setup>
import { getBook } from '@/utils/db'
import { ref, onMounted } from 'vue'

const book = ref(null)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  book.value = await getBook(props.id)
})
</script>

<style scoped></style>