import MainPage from './pages/MainPage.svelte';
import NotFoundPage from './pages/NotFoundPage.svelte';
import ReleasePage from './pages/ReleasePage/ReleasePage.svelte'
import ReleasePageRecomends from './pages/ReleasePage/ReleasePageRecomends.svelte'
import ReleasePageRelated from './pages/ReleasePage/ReleasePageRelated.svelte'
import CollectionPage from './pages/CollectionPage.svelte'

const routes = [
    {
        name: `/`,
        component: MainPage
    },

    // ReleasePage
    {
        name: '/release/:releaseId',
        component: ReleasePage
    },
    {
        name: '/release_related/:releaseId',
        component: ReleasePageRelated
    },
    {
        name: '/release_recomends/:releaseId',
        component: ReleasePageRecomends
    },

    // CollectionPage
    {
        name: '/collection/:collectionId',
        component: CollectionPage
    },
    {
        name: '404',
        path: '/404',
        component: NotFoundPage
    }
]

export { routes }