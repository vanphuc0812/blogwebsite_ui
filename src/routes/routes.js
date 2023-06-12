import Home from '../Components/pages/Home/home';
import BlogView from '../Components/pages/BlogView/BlogView';
import Write from '../Components/pages/Write/write';
import { HeaderOnly } from '../layouts';
import Search from '../layouts/components/Search/search';
import config from '../config';
import Login from '../Components/pages/LoginRegister/login';
import Register from '../Components/pages/LoginRegister/register';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.blog, component: BlogView },
    { path: config.routes.write, component: Write, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];
// require login
const privateRoutes = [];

export { publicRoutes, privateRoutes };