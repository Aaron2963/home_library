<template>
  <div class="container my-3">
    <h1 class="mb-3">書櫃列表 ({{ shelves.length }})</h1>
    <div class="actions">
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal-add">
        <img :src="iconAdd" alt="add">
        <span>新增書櫃</span>
      </button>
    </div>
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
                <div class="text-muted">修改於 {{ s.modifyAgo }}</div>
                <button class="btn btn-danger btn-sm" type="button" @click.stop.prevent="remove(s.id)">
                  <img :src="iconRemove" alt="remove">
                </button>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="modal fade" id="modal-add" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
      aria-labelledby="title-add" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="title-add">新增書櫃</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="add">
              <div class="mb-4">
                <label for="name" class="form-label">書櫃名稱</label>
                <input type="text" class="form-control" id="name" name="name" required>
              </div>
              <div class="actions">
                <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-success">新增</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import DepositController from '@/controllers/DepositController';
import iconRemove from '@/assets/close.svg'
import iconAdd from '@/assets/add.svg'

const shelves = ref([])
let modal;

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

async function add(ev) {
  ev.preventDefault()
  const name = ev.target.name.value
  if (!name) return
  const newShelf = await DepositController.createShelf(name)
  shelves.value.unshift(newShelf)
  modal.hide()
}

onMounted(async () => {
  modal = new Modal(document.getElementById('modal-add'))
  shelves.value = await DepositController.getShelves()
})
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
}

.actions .btn.btn-success {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>