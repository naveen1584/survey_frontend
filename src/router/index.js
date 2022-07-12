import { createRouter, createWebHashHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";
import AdminVueVue from "@/views/AdminVue.vue";
import UserView from "@/views/UserView.vue";
const routes = [
    {
        meta: {
            title: "Select style",
            fullScreen: true
        },
        path: "/style",
        name: "style",
        component: Style
    },
    {
        // Document title tag
        // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
        meta: {
            title: "Dashboard"
        },
        path: "/dashboard",
        name: "dashboard",
        component: Home
    },
    {
        meta: {
            title: "Admin"
        },
        path: "/admin",
        name: "admin",
        component: AdminVueVue
    },
    {
        meta: {
            title: "User"
        },
        path: "/user",
        name: "user",
        component: UserView
    },
    {
        meta: {
            title: "Tables"
        },
        path: "/tables",
        name: "tables",
        component: () => import("@/views/TablesView.vue")
    },
    {
        meta: {
            title: "Forms"
        },
        path: "/forms",
        name: "forms",
        component: () => import("@/views/FormsView.vue")
    },
    {
        meta: {
            title: "Profile"
        },
        path: "/profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue")
    },
    {
        meta: {
            title: "Ui"
        },
        path: "/ui",
        name: "ui",
        component: () => import("@/views/UiView.vue")
    },
    {
        meta: {
            title: "Responsive layout"
        },
        path: "/responsive",
        name: "responsive",
        component: () => import("@/views/ResponsiveView.vue")
    },
    {
        meta: {
            title: "Login",
            fullScreen: true
        },
        path: "/",
        name: "login",
        component: () => import("@/views/LoginView.vue")
    },
    {
        meta: {
            title: "Error",
            fullScreen: true
        },
        path: "/error",
        name: "error",
        component: () => import("@/views/ErrorView.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    }
});

export default router;
