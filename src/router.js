import { createRouter, createWebHistory } from "vue-router";
import { auth } from '@/utils/db'

const routes = [
  {
    path: "/",
    component: () => import('@/views/HomeView.vue'),
    name: 'home',
    meta: {
      title: '首頁',
    },
  },
  {
    path: "/login",
    component: () => import('@/views/LoginView.vue'),
    name: 'login',
    meta: {
      title: '登入',
    },
  },
  {
    path: "/shelves",
    component: () => import('@/views/ShelfListView.vue'),
    meta: {
      title: '書櫃列表',
      needAuth: true,
    },
  },
  {
    path: "/shelf/:id",
    component: () => import('@/views/ShelfView.vue'),
    props: true,
    meta: {
      title: '書櫃',
      needAuth: true,
    },
  },
  {
    path: "/books",
    component: () => import('@/views/BookListView.vue'),
    meta: {
      title: '書目',
      needAuth: true,
    },
  },
];

let title = '我的圖書館';
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.needAuth && !auth.currentUser) {
    next({ name: 'login' });
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (to.meta.title) {
    title = [to.meta.title, '我的圖書館'].join(' - ');
  }
  document.title = title;
});

export default router;