import Home from '../Components/pages/Home';
import BlogView from '../Components/pages/BlogView';
import Upload from '../Components/pages/Upload';
import { HeaderOnly } from '../layouts';
import Search from '../Components/pages/Search';
import config from '../config';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.blog, component: BlogView },
    { path: config.routes.write, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
];
// require login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
