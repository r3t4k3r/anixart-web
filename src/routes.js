import MainPage from './pages/MainPage.svelte';
import NotFoundPage from './pages/NotFoundPage.svelte';


const routes = [
    {
        name: `/`,
        path: '/',
        component: MainPage
    },
    {
        name: '404',
        path: '/404',
        component: NotFoundPage
    }
]

export { routes }