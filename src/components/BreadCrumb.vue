<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="pr in inactiveItems" :key="pr.path" class="breadcrumb-item">
        <router-link :to="pr.path">{{ pr.title }}</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">{{ props.current }}</li>
    </ol>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const inactiveItems = ref([])
const props = defineProps({
  parents: {
    type: Array,
    required: true
  },
  current: {
    type: String,
    required: true
  }
})

function initialize() {
  inactiveItems.value = []
  const routes = router.getRoutes()
  props.parents.forEach(parent => {
    const route = routes.find(route => route.path === parent)
    if (route && route.meta?.title) {
      inactiveItems.value.push({
        title: route.meta.title,
        path: route.path
      })
    }
  })
}

onMounted(initialize)
</script>

<style scoped>
.breadcrumb {
  --bs-breadcrumb-divider: '>';
}
.breadcrumb a {
  text-decoration: none;
  color: #0d6efd;
}
</style>