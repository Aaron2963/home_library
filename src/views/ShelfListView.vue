<template>
  <div class="container my-3">
    <h1 class="mb-3">書櫃列表 ({{ shelves.length }})</h1>
    <div class="pool row">
      <div class="col-12 col-lg-3" v-for="(s, i) in shelves" :key="i">
        <router-link :to="`/shelf/${s.id}`">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">
                <span>{{ s.name }}</span>
                <small class="text-secondary ms-2">({{ s.bookCount }})</small>
              </h4>
              <div class="d-flex justify-content-between">
                <div class="text-muted">修改於{{ s.modifyDate }}</div>
                <button class="btn btn-danger btn-sm" type="button" @click.stop.prevent="remove(s.id)">
                  <img :src="iconRemove" alt="remove">
                </button>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2';
import DepositController from '@/controllers/DepositController';
import iconRemove from '@/assets/close.svg'

const shelves = ref([])

async function remove(id) {
  const result = await Swal.fire({
    title: '確定要刪除嗎？',
    text: '刪除後將無法復原',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '確定',
    cancelButtonText: '取消'
  })
  if (!result.isConfirmed) return
  await DepositController.deleteShelf(id)
  shelves.value = shelves.value.filter(s => s.id !== id)
}

onMounted(async () => {
  shelves.value = await DepositController.getShelves()
})
</script>