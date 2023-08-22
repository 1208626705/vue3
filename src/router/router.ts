// 对外暴露路由数组
export const constantRoute = [
    {
        name: 'login', // 名称
        path: '/login', // 路由路径
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: "登录",
            hidden: true,
        },


    },
    {
        name: '', // 名称
        component: () => import('@/layout/index.vue'),
        path: '/', // 登录之后的
        meta: {
            // title: "layout",
            // hidden: false,
            // icon: "Discount",
        },
        redirect: "/home",
        children: [
            {
                name: 'home', // 名称
                path: '/home', // 登录之后的
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: "主页",
                    hidden: false,
                    icon: "House",
                },
            },

        ]
    },
    {
        name: 'acl', // 名称
        path: '/acl', // 登录之后的
        component: () => import('@/layout/index.vue'),
        meta: {
            title: "权限管理",
            hidden: false,
            icon: "Lock",
        },
        children: [
            {
                name: 'user', // 名称
                path: '/acl/user', // 登录之后的
                component: () => import('@/views/acl/user/index.vue'),
                meta: {
                    title: "用户管理",
                    hidden: false,
                    icon: "User",
                },
            },
            {
                name: 'role', // 名称
                path: '/acl/role', // 登录之后的
                component: () => import('@/views/acl/role/index.vue'),
                meta: {
                    title: "角色管理",
                    hidden: false,
                    icon: "Avatar",
                },
            },
            {
                name: 'permission', // 名称
                path: '/acl/permission', // 登录之后的
                component: () => import('@/views/acl/permission/index.vue'),
                meta: {
                    title: "角色管理",
                    hidden: false,
                    icon: "User",
                },
            },
        ]


    },
    {
        name: '404', // 名称
        path: '/404', // 找不到路径
        component: () => import('@/views/404/index.vue'),
        meta: {
            title: "404",
            hidden: true,
        },

    },
    {
        name: 'Any', // 名称
        path: '/:pathMatch(.*)*', // 路由路径
        redirect: '/login',
        meta: {
            title: "任意路由",
            hidden: true,
        },
    },
    {


        name: "screen",
        path: '/screen', // 路由路径
        component: () => import('@/views/screen/index.vue'),
        meta: {
            title: "数据大屏",
            hidden: false,
            icon: "FullScreen",
        },


    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            icon: 'Goods',
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingCartFull',
                },
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'ChromeFilled',
                },
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    icon: 'Calendar',
                },
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    icon: 'Orange',
                },
            },
        ],
    },


]
