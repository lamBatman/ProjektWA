import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/router/views/Login";
import Register from "@/router/views/Register";
import Home from "@/router/views/Home";
import NotFound from "@/router/views/NotFound";
import Rooms from "@/router/views/Rooms";
import {tokenManager} from "@/main";
import Room from "@/router/views/Room";
import Profile from "@/router/views/Profile";
import EditProfile from "@/router/views/EditProfile";
import Chat from "@/router/views/Chat";


Vue.use(VueRouter);

const routes = [
    {path: "/login", component: Login, name: "login"},
    {path: "/register", component: Register, name: "register"},
    {path: "/rooms", component: Rooms, name: "rooms", meta: {requireAuth: true}},
    {path: "/chat", component: Chat, name: "chat", meta: {requireAuth: true}},
    {path: "/rooms/:id", component: Room, name: "room", meta: {requireAuth: true}},
    {path: "/profile/:id", component: Profile, name: "profile", meta: {requireAuth: true}},
    {path: "/editProfile/:id", component: EditProfile, name: "editProfile", meta: {requireAuth: true}},
    {path: "", component: Home, name: "home"},
    {path: "*", component: NotFound, name: "notFound"},
];

const router = new VueRouter({routes, mode:"history"});

router.beforeEach((to, from, next) =>{
    if(to.meta != null && to.meta.requireAuth){
        //kontrola tokenu
        if(tokenManager.isUserLogged()){
            if(to.name !== from.name) {
                next();
            }
        }else{
            next({name: "login"});
        }
    }else{
        next();
    }
})

export default router;