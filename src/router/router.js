//二级子路由
const children = [
    {
        path:"/home",
        alias:"/",
        name:"Home",
        component: ()=>import("../views/Home.vue")
    },
    {
        path:"/class",
        name:"Class",
        component: ()=>import("../views/Class.vue")
    },
    {
        path:"/shopbag",
        name:"Shopbag",
        component: ()=>import("../views/Shopbag.vue")
    },
    {
        path:"/me",
        name:"Me",
        component: ()=>import("../views/Me.vue")
    },
]

export const routes = [
    {
        path:"/",
        name:"Main",
        component : () => import('../views/Main.vue'),
        children:children
    },
    {
        path:"/login",
        name:"Login",
        component : () => import('../views/Login.vue')
    },
    {
        path:"/productDetail",
        name:"ProductDetail",
        component : () => import('../components/ProductDetail')
    },
    {
        path:"/addressList",
        name:"AddressList",
        component : () => import('../views/AddressList')
    },
    {
        path:"/editAddress",
        name:"EditAddress",
        component : () => import('../views/EditAddress')
    },
    {
        path:"/submitOrder",
        name:"SubmitOrder",
        component : () => import('../views/SubmitOrder')
    },
    {
        path:"/securityCenter",
        name:"SecurityCenter",
        component : () => import('../views/SecurityCenter')
    },
    {
        path:"/accountOrder",
        name:"AccountOrder",
        component : () => import('../views/AccountOrder')
    },
    
    
]