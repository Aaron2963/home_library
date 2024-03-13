import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首頁',
    },
  },
  {
    path: "/login",
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: '登入',
    },
  },
  {
    path: "/shelves",
    component: () => import('@/views/ShelfListView.vue'),
    meta: {
      title: '書櫃列表',
    },
  },
  {
    path: "/shelf/:id",
    component: () => import('@/views/ShelfView.vue'),
    props: true,
    meta: {
      title: '書櫃',
    },
  },
  {
    path: "/books",
    component: () => import('@/views/BookListView.vue'),
    meta: {
      title: '書目',
    },
  },
  {
    path: "/add",
    component: () => import('@/views/AddBookView.vue'),
  },
];

let title = '我的圖書館';
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
router.afterEach((to) => {
  if (to.meta.title) {
    title = [to.meta.title, '我的圖書館'].join(' - ');
  }
  document.title = title;
});

export default router;