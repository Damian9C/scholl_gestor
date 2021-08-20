import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomeViews/Home.vue'
import Login from "../views/Login";
import lesson from "../views/HomeViews/Lesson";
import student from "../views/HomeViews/Student";
import {auth} from "../util";
import AdminModule from "../views/AdminViews/AdminModule";
import AdminStaff from "../views/AdminViews/AdminStaff";
import AdminGroups from "../views/AdminViews/AdminGroups";

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      requestAuth: true
    }
  },
  {
    path: '/AdminModule',
    name: 'AdminModule',
    component: AdminModule,
    meta:{
      requestAuth: true
    }
  },
  {
    path: '/AdminModule/AdminStaff',
    name: 'AdminStaff',
    component: AdminStaff,
    meta:{
      requestAuth: true
    }
  },
  {
    path: '/AdminModule/AdminGroups',
    name: 'AdminGroups',
    component: AdminGroups,
    meta:{
      requestAuth: true
    }
  },
  {
    path: '/lesson/:id',
    name: 'lesson',
    component: lesson,
    meta:{
      requestAuth: true
    }
  },
  {
    path: '/student/:id',
    name: 'student',
    props: true,
    component: student,
    meta:{
      requestAuth: true
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let user = auth.currentUser;
  let premises = to.matched.some(record => record.meta.requestAuth)

  if (!user && premises){
    next('login')
  }else if (!premises && user){
    next('home')
  }else {
    next();
  }

});

export default router
