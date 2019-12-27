function load(component) {
    return () => import(`../pages/${component}.vue`)
}

const routes = [
    {
        path: '*',
        redirect: '/home'
    },
    {
        path: '/home',
        component: load('home')
    },
    {
        path: '/make',
        name:'make',
        component: load('make')
    }
]

export default routes