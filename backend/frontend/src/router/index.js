import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/classrooms/:building',
      name: 'classrooms',
      component: () => import('../views/ClassroomsView.vue')
    },
    {
      path: '/gathering-points/:gatheringPoint?',
      name: 'gathering-points',
      component: () => import('../views/GatheringPointsView.vue')
    }
  ]
})

export default router
