<template>
  <div class="container my-3">
    <h1 class="mb-3">書櫃列表 ({{ shelves.length }})</h1>
    <div class="pool row">
      <div class="col-12 col-lg-3" v-for="(s, i) in shelves" :key="i">
        <router-link :to="`/shelf/${s.id}`">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">{{ s.name }}</h4>
              <div class="text-muted">修改於{{ s.modifyDate }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DepositController from '@/controllers/DepositController';

const shelves = ref([])
onMounted(async () => {
  shelves.value = await DepositController.getShelves()
})
</script>