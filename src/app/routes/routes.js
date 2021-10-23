import routerNames from './routes-name';
import Layout from '../components/layout/layout'
import HomePage from '../components/home/home';

const routes = [
    {
        exact: true,
        path: routerNames.homePage,
        component: HomePage,
        layout: Layout,
    }
];

export default routes;
