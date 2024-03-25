<template>
  <div class="search">
    <div class="input-group">
      <select class="form-select" v-model="searchKey">
        <option value="title">書名</option>
        <option value="author">作者</option>
        <option value="publisher">出版社</option>
        <option value="isbn10">ISBN-10</option>
        <option value="isbn13">ISBN-13</option>
      </select>
      <input type="text" class="form-control" name="keyword" v-model="searchValue" placeholder="搜尋" />
      <button class="btn btn-primary" @click="search">
        <img :src="iconSearch" alt="搜尋" />
      </button>
    </div>
    <small v-if="searchKey.substring(0, 4) === 'isbn'" class="input-help">搜尋 ISBN 時僅限完全符合</small>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import iconSearch from '@/assets/search.svg'

const searchKey = ref('title'), searchValue = ref('')
const emit = defineEmits(['search'])
defineExpose({ reset })

function reset() {
  searchKey.value = 'title'
  searchValue.value = ''
}

function search() {
  emit('search', {
    key: searchKey.value,
    value: searchValue.value,
  })
}
</script>

<style scoped>
.search .input-group .form-control {
  flex: 2;
}

.search .input-help {
  padding-left: 0.5rem;
  color: var(--bs-secondary);
}
</style>