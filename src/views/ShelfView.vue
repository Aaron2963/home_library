<template>
  <div class="container">
    <h1>{{ shelf.name }}</h1>
    <ul>
      <li v-for="(b, i) in books">
        <b>{{ b.title }}</b>
        <span> x {{ b.quantity }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DepositController from '@/controllers/DepositController';
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const shelf = ref({}), books = ref([])
onMounted(async () => {
  shelf.value = await DepositController.getShelf(props.id)
  books.value = await shelf.value.getPayload()
})
</script>

<style scoped>

</style>