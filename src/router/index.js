import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import lesson from "../views/Lesson";
import student from "../views/Student";
import firebase from "firebase";

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
    component: Home,
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
  if (to.matched.some(ruta => ruta.meta.requestAuth)){
    const user = firebase.auth().currentUser;
    if (user){
      next();
    }else{
      next({name:'home'});
    }
  }else {
    next();
  }
});

export default router
