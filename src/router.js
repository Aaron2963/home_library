import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: "/login",
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: "/shelves",
    component: () => import('@/views/ShelfListView.vue'),
  },
  {
    path: "/shelf/:id",
    component: () => import('@/views/ShelfView.vue'),
    props: true,
  },
  {
    path: "/books",
    component: () => import('@/views/BookListView.vue'),
  },
  {
    path: "/add",
    component: () => import('@/views/AddBookView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});


export default router;