<template>
  <div class="container my-3">
    <h1 class="mb-3">書目</h1>
    <div class="row" @scroll="onScroll">
      <div class="col-12" v-for="(b, i) in books" :key="i">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ b.title }}</h4>
            <div class="text-muted">作者: {{ b.author }}</div>
            <div class="text-muted">出版: {{ b.publisher }}</div>
            <div class="text-muted">ISBN: {{ b.isbn13 ?? b.isbn10 }}</div>
            <div class="text-muted">{{ b.note }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center my-3">
      <button class="btn btn-primary w-100" @click="more" v-if="total > books.length">更多</button>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CatalogController from '@/controllers/CatalogController';

const books = ref([]), total = ref(0)

async function more(ev) {
  books.value.push(...await CatalogController.list(false))
}

onMounted(async () => {
  total.value = await CatalogController.count();
  books.value = await CatalogController.list(true)
})
</script>

<style scoped>
.row {
  overflow-y: auto;
}
</style>