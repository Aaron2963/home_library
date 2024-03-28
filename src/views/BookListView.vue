<template>
  <div class="container my-3">
    <h1 class="mb-3">
      <span>書目</span>
    </h1>
    <div class="action-bar">
      <search-catalog @search="reset" />
      <button class="btn btn-success" @click="addBook">
        <img :src="iconAdd" />
      </button>
    </div>
    <div class="row">
      <div class="col-12 col-lg-4" v-for="(b, i) in books" :key="i">
        <a href="#" @click.prevent="editBook(b.id)">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">{{ b.title }}</h4>
              <div class="text-muted">作者: {{ b.author }}</div>
              <div class="text-muted">出版: {{ b.publisher }}</div>
              <div class="text-muted">ISBN: {{ b.isbnString }}</div>
              <div class="text-muted">{{ b.note }}</div>
              <div class="actions">
                <button class="btn btn-danger" @click.stop="removeBook(b.id)">刪除</button>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="text-center my-3">
      <button class="btn btn-primary w-100" @click="loadBooks" v-if="total && total > books.length">更多</button>
    </div>
    <div class="no-data" v-if="total == 0">
      <h3 class="text-center text-muted mt-5">查無相關書目</h3>
    </div>
    <div ref="modalEditEl" class="modal fade" id="modal-edit" tabindex="-1" data-bs-backdrop="static"
      data-bs-keyboard="false" role="dialog" aria-labelledby="modal-edit-title" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-edit-title">修改書目資料</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateCatalog">
              <input type="hidden" name="id" :value="book.id">
              <div class="mb-3">
                <label for="title" class="form-label">書名</label>
                <input type="text" class="form-control" name="title" id="title" v-model="book.title" required />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input type="text" class="form-control" name="author" id="author" v-model="book.author" />
              </div>
              <div class="mb-3">
                <label for="publisher" class="form-label">出版社</label>
                <input type="text" class="form-control" name="publisher" id="publisher" v-model="book.publisher" />
              </div>
              <div class="mb-3">
                <label for="publishedDate" class="form-label">出版日期</label>
                <input type="text" class="form-control" name="publishedDate" id="publishedDate"
                  v-model="book.publishedDate" />
              </div>
              <div class="mb-3">
                <label for="isbn10" class="form-label">ISBN-10</label>
                <input type="text" class="form-control" name="isbn10" id="isbn10" v-model="book.isbn10" />
              </div>
              <div class="mb-3">
                <label for="isbn13" class="form-label">ISBN-13</label>
                <input type="text" class="form-control" name="isbn13" id="isbn13" v-model="book.isbn13" />
              </div>
              <div class="mb-3">
                <label for="note" class="form-label">備註</label>
                <input type="text" class="form-control" name="note" id="note" v-model="book.note" />
              </div>
              <div class="buttons">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button ref="btnSubmit" type="submit" class="btn btn-primary">儲存</button>
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
import { Modal } from 'bootstrap'
import CatalogController from '@/controllers/CatalogController'
import SearchCatalog from '../components/SearchCatalog.vue'
import Swal from 'sweetalert2'
import Book from '@/types/Book'
import iconAdd from '@/assets/add.svg'

const books = ref([]), total = ref(null), book = ref({})
const modalEditEl = ref(null), btnSubmit = ref(null)
let last, searchKey = 'title', searchValue, modalEdit

async function reset(params) {
  last = null
  books.value = []
  total.value = null
  searchKey = params?.key || 'title'
  searchValue = params?.value || ''
  await loadBooks()
}

async function loadBooks() {
  const { total: count, data } = await CatalogController.list(last, searchKey, searchValue)
  total.value = count
  if (data.length > 0) {
    books.value.push(...data)
    last = data[data.length - 1][searchKey]
  }
}

function editBook(id) {
  book.value = books.value.find(b => b.id === id).copy()
  modalEdit.show()
}

async function addBook() {
  const b = new Book()
  const id = await CatalogController.create(b)
  b.id = id
  books.value.unshift(b)
  book.value = b.copy()
  modalEdit.show()
}

async function removeBook(id) {
  const confirm = await Swal.fire({
    title: '確定刪除？',
    text: '刪除後無法復原',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '確定',
    cancelButtonText: '取消'
  })
  if (confirm.isConfirmed) {
    try {
      await CatalogController.remove(id)
      books.value = books.value.filter(b => b.id !== id)
    } catch (error) {
      console.error('刪除失敗', error)
    }
  }
}

async function updateCatalog(ev) {
  btnSubmit.value.disabled = true
  const oriIndex = books.value.findIndex(b => b.id === book.value.id),
    ori = books.value[oriIndex],
    diffKeys = ori.diff(book.value),
    data = Object.fromEntries(diffKeys.map(k => [k, book.value[k]]))
  try {
    await CatalogController.update(book.value.id, data)
    books.value.splice(oriIndex, 1, book.value)
    modalEdit.hide()
  } catch (error) {
    console.error('更新失敗', error)
  }
  btnSubmit.value.disabled = false
}

onMounted(() => {
  modalEdit = new Modal(modalEditEl.value)
  reset()
})
</script>

<style scoped>
.action-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-bottom: 20px;
}

.search {
  max-width: 500px;
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

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.card-body .actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>