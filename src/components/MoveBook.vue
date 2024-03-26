<template>
  <div class="action-bar">
    <form @submit.prevent="move">
      <div class="input-group">
        <select class="form-select" name="shelf" v-model="shelfId" required>
          <option value="">請選擇書櫃</option>
          <option v-for="(s, i) in shelves" :key="i" :value="s.id">{{ s.name }}</option>
        </select>
        <button type="submit" class="btn btn-primary">轉移</button>
      </div>
    </form>
    <button v-if="allowCreate" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal-create-shelf">
      轉移到新書櫃
    </button>
    <div class="modal fade" id="modal-create-shelf" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
      role="dialog" aria-labelledby="modal-create-shelf-title" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-create-shelf-title">轉移到新書櫃</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createShelf">
              <div class="mb-5">
                <label for="shelf-name" class="form-label">書櫃名稱</label>
                <input type="text" class="form-control" id="shelf-name" name="name" required>
              </div>
              <div class="text-end">
                <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-success">新增並轉移</button>
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
import StockBook from '@/types/StockBook'
import SessionController from '@/controllers/SessionController'
import DepositController from '@/controllers/DepositController'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  allowCreate: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['moved'])

const shelves = ref([]), shelfId = ref('')
let modal;

async function loadShelves() {
  shelves.value = await DepositController.getShelves()
}

async function move() {
  if (shelfId.value == '') return
  const rs = await DepositController.addBooks(shelfId.value, props.items.map(b => {
    if (b instanceof StockBook) return b
    return StockBook.fromBook(b, 1)
  }))
  if (rs) {
    await SessionController.clear()
  }
  emit('moved', shelfId.value)
}

async function createShelf(ev) {
  const name = ev.target.name.value
  if (!name) return
  const newShelf = await DepositController.createShelf(name)
  if (!newShelf) return
  shelves.value.push(newShelf)
  shelfId.value = newShelf.id
  ev.target.reset()
  modal.hide()
  await move();
}

onMounted(() => {
  modal = new Modal(document.getElementById('modal-create-shelf'))
  loadShelves()
})
</script>

<style scoped>
.action-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 100%;
  width: 500px;
}

.action-bar>*:first-child {
  flex: 1;
}
</style>