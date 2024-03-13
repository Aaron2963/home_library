<template>
  <div class="container my-3">
    <bread-crumb :parents="['/shelves']" current="書櫃" />
    <h1 class="mb-3">書櫃【{{ shelf.name }}】</h1>
    <table class="table d-none d-lg-table">
      <thead>
        <tr>
          <th>#</th>
          <th>書名</th>
          <th>作者</th>
          <th>出版社</th>
          <th>ISBN</th>
          <th>數量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(b, i) in books" :key="i">
          <td>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" :value="b.id" />
            </div>
          </td>
          <td>
            <div>{{ b.title }}</div>
            <small class="text-muted">{{ b.note }}</small>
          </td>
          <td>{{ b.author }}</td>
          <td>{{ b.publisher }}</td>
          <td>{{ b.isbn13 ?? b.isbn10 }}</td>
          <td class="number">{{ b.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <div class="row d-flex d-lg-none">
      <div class="col-12" v-for="(b, i) in books" :key="i">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">{{ b.title }}</h4>
            <div class="text-muted">作者: {{ b.author }}</div>
            <div class="text-muted">出版: {{ b.publisher }}</div>
            <div class="text-muted">ISBN: {{ b.isbn13 ?? b.isbn10 }}</div>
            <div class="text-muted">{{ b.note }}</div>
            <h5 class="text-end">{{ b.quantity }}本</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DepositController from '@/controllers/DepositController';
import BreadCrumb from '@/components/BreadCrumb.vue';
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
th,
td {
  text-align: center;
}

td.number {
  text-align: right;
}
</style>