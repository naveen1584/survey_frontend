import { createRouter, createWebHashHistory } from "vue-router";
import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";
import AdminVue from "@/views/AdminVue.vue";
import CreateSurvey from "@/views/CreateSurvey.vue";
import TakeSurveyVue from "@/views/TakeSurvey.vue";
import UserView from "@/views/UserView.vue";
import TakeSurveyForm from "@/views/TakeSurveyForm.vue";

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
        meta: {
            title: "Dashboard"
        },
        path: "/dashboard",
        name: "dashboard",
        component: Home
    },
    {
        meta: {
            title: "User Dashboard"
        },
        path: "/user/dashboard",
        name: "user",
        component: UserView
    },
    {
        meta: {
            title: "Admin"
        },
        path: "/admin/surveys",
        name: "admin",
        component: AdminVue
    },
    {
        meta: {
            title: "Take Survey"
        },
        path: "/takeSurvey/:surveyID",
        name: "takeSurvey",
        component: TakeSurveyVue
    },
    {
        meta: {
            title: "Add Survey Link"
        },
        path: "/addLink",
        name: "addLink",
        component: TakeSurveyForm
    },
    {
        meta: {
            title: "Create Survey"
        },
        path: "/createSurvey",
        name: "createSurvey",
        component: CreateSurvey
    },
    // {
    //     meta: {
    //         title: "Tables"
    //     },
    //     path: "/tables",
    //     name: "tables",
    //     component: () => import("@/views/TablesView.vue")
    // },
    // {
    //     meta: {
    //         title: "Forms"
    //     },
    //     path: "/forms",
    //     name: "forms",
    //     component: () => import("@/views/FormsView.vue")
    // },
    {
        meta: {
            title: "Profile"
        },
        path: "/profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue")
    },
    // {
    //     meta: {
    //         title: "Ui"
    //     },
    //     path: "/ui",
    //     name: "ui",
    //     component: () => import("@/views/UiView.vue")
    // },
    // {
    //     meta: {
    //         title: "Responsive layout"
    //     },
    //     path: "/responsive",
    //     name: "responsive",
    //     component: () => import("@/views/ResponsiveView.vue")
    // },
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
            title: "Register",
            fullScreen: true
        },
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue")
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
