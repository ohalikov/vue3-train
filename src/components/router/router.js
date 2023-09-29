import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/components/pages/Main.vue';
import PostPage from '@/components/pages/PostPage.vue';
import About from '@/components/pages/About.vue';
import PostIdPage from '@/components/pages/PostIdPage.vue';
import PostPageWithStore from '@/components/pages/PostPageWithStore';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/posts',
    component: PostPage,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/posts/:id',
    component: PostIdPage,
  },
  {
    path: '/store',
    component: PostPageWithStore,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
