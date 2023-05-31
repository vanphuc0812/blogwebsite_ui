import Home from '../Components/pages/Home';
import BlogView from '../Components/pages/BlogView';
import Upload from '../Components/pages/Upload';
import { HeaderOnly } from '../Components/Layout';
import Search from '../Components/pages/Search';
import routesConfig from '../config/routes';
const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.blog, component: BlogView },
    { path: routesConfig.write, component: Upload, layout: HeaderOnly },
    { path: routesConfig.search, component: Search, layout: null },
];
// require login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
