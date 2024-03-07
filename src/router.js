import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import('@/views/BookListView.vue'),
  },
  {
    path: "/book/:id",
    component: () => import('@/views/BookDetailView.vue'),
    props: true,
  },
  {
    path: "/book-edit/:id",
    component: () => import('@/views/BookFormView.vue'),
    props: true,
  },
  {
    path: "/add",
    component: () => import('@/views/AddBookView.vue'),
  },
  {
    path: "/about",
    component: () => import('@/views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});


export default router;