import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import lesson from "../views/lesson";
import student from "../views/student";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'log',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/lesson/:id',
    name: 'lesson',
    component: lesson
  },
  {
    path: '/student/:id',
    name: 'student',
    component: student
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
