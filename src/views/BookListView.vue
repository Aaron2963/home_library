<template>
  <div class="container my-3">
    <h1 class="mb-3">書目</h1>
    <div class="search">
      <div class="input-group">
        <select class="form-select" v-model="searchKey">
          <option value="title">書名</option>
          <option value="author">作者</option>
          <option value="publisher">出版社</option>
          <option value="isbn10">ISBN-10</option>
          <option value="isbn13">ISBN-13</option>
        </select>
        <input type="text" class="form-control" v-model="searchValue" placeholder="搜尋" />
        <button class="btn btn-primary" @click="reset">
          <img :src="iconSearch" alt="搜尋" />
        </button>
      </div>
      <small v-if="searchKey.substring(0,4) === 'isbn'" class="input-help">搜尋 ISBN 時僅限完全符合</small>
    </div>
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
      <button class="btn btn-primary w-100" @click="loadBooks" v-if="total && total > books.length">更多</button>
    </div>
    <div class="no-data" v-if="total == 0">
      <h3 class="text-center text-muted mt-5">查無相關書目</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CatalogController from '@/controllers/CatalogController';
import iconSearch from '@/assets/search.svg'

const books = ref([]), total = ref(null), searchKey = ref('title'), searchValue = ref(null)
let last = null

function reset() {
  last = null
  books.value = []
  total.value = null
  loadBooks()
}

async function loadBooks() {
  const { total: count, data } = await CatalogController.list(last, searchKey.value, searchValue.value)
  total.value = count
  if (data.length > 0) {
    books.value.push(...data)
    last = data[data.length - 1][searchKey.value]
  }
}

onMounted(() => {
  reset()
})
</script>

<style scoped>
.search {
  margin-bottom: 20px;
  max-width: 500px;
  margin-left: auto;
}

.search .input-group .form-control {
  flex: 2;
}

.search .input-help {
  padding-left: 0.5rem;
  color: var(--bs-secondary);
}

.btn.w-100 {
  max-width: 500px;
}
</style>