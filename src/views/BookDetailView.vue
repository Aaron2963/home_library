<template>
  <div>
    <h1>Book: {{ id }}</h1>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>