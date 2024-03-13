<template>
  <div class="container my-3">
    <bread-crumb :parents="['/shelves']" current="書櫃" />
    <h1 class="mb-3">書櫃【{{ shelf.name }}】</h1>
    <div class="actions">
      <button class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#modal-edit-shelf">
        <img :src="iconEdit" alt="edit">
        <span>修改名稱</span>
      </button>
      <button class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#modal-add">
        <img :src="iconAdd" alt="edit">
        <span>新增書籍</span>
      </button>
    </div>
    <table class="table d-none d-lg-table">
      <thead>
        <tr>
          <th>書名</th>
          <th>作者</th>
          <th>出版社</th>
          <th>ISBN</th>
          <th>數量</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(b, i) in books" :key="i">
          <td>
            <div>{{ b.title }}</div>
            <small class="text-muted">{{ b.note }}</small>
          </td>
          <td>{{ b.author }}</td>
          <td>{{ b.publisher }}</td>
          <td>{{ b.isbn13 ?? b.isbn10 }}</td>
          <td class="number">{{ b.quantity }}</td>
          <td>
            <button class="btn btn-danger btn-sm" @click="remove(b.id)">
              <img :src="iconClose" alt="remove">
            </button>
          </td>
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
    <div ref="modalEditShelfEl" class="modal fade" id="modal-edit-shelf" tabindex="-1" data-bs-backdrop="static"
      data-bs-keyboard="false" role="dialog" aria-labelledby="title-edit-shelf" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="title-edit-shelf">修改書櫃名稱</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editShelf">
              <div class="mb-3">
                <input type="text" class="form-control" name="name" placeholder="書櫃名稱" />
              </div>
              <div class="text-end mb-3">
                <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary">確定</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div ref="modalAddEl" class="modal fade" id="modal-add" tabindex="-1" data-bs-backdrop="static"
      data-bs-keyboard="false" role="dialog" aria-labelledby="title-add" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="title-add">新增書籍</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="add">
              <div class="mb-3">
                <input type="text" class="form-control" name="isbn" placeholder="ISBN" />
              </div>
              <div class="text-end mb-3">
                <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary">確定</button>
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
import { Timestamp } from 'firebase/firestore/lite';
import DepositController from '@/controllers/DepositController';
import Swal from 'sweetalert2';
import BreadCrumb from '@/components/BreadCrumb.vue';
import iconEdit from '@/assets/edit.svg';
import iconAdd from '@/assets/add.svg';
import iconClose from '@/assets/close.svg';

const shelf = ref({}), books = ref([]), modalEditShelfEl = ref(null);
let modalEditShelf = null;

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

async function editShelf(ev) {
  try {
    const fd = new FormData(ev.target),
      name = fd.get('name'),
      modifiedAt = Timestamp.now()
    await DepositController.updateShelf(shelf.value.id, {
      name: name,
      modifiedAt: modifiedAt
    })
    shelf.value.name = name
    shelf.value.modifiedAt = modifiedAt
    document.title = `書櫃【${name}】- 我的圖書館`
    modalEditShelf.hide()
  } catch (error) {
    modalEditShelf.hide()
    Swal.fire('修改失敗', error.message, 'error')
  }
}

async function remove(id) {
  try {
    const newBooks = shelf.value.books.filter(b => b.id !== id),
      modifiedAt = Timestamp.now()
    await DepositController.updateShelf(shelf.value.id, {
      newBooks, modifiedAt
    })
    shelf.value.books = newBooks
    shelf.value.modifiedAt = modifiedAt
    books.value = await shelf.value.getPayload()
  } catch (error) {
    Swal.fire('刪除失敗', error.message, 'error')
  }
}

async function add(ev) {
  //TODO: Add book to shelf
}

onMounted(async () => {
  shelf.value = await DepositController.getShelf(props.id)
  books.value = await shelf.value.getPayload()
  document.title = `書櫃【${shelf.value.name}】- 我的圖書館`
  modalEditShelf = new Modal(modalEditShelfEl.value)
})
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin: 1rem 0;
}

.actions .btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

th,
td {
  text-align: center;
  vertical-align: middle;
}

td.number {
  text-align: right;
}
</style>