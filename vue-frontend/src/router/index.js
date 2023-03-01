import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: () => import("@/views/dashboard") },
  { path: "/login", component: () => import("@/views/login") },
  { path: "/register", component: () => import("@/views/register") },
  { path: "/404", component: () => import("@/views/404") },
  { path: "*", redirect: "/404" },
];

const router = new VueRouter({
  routes,
});

export default router;
