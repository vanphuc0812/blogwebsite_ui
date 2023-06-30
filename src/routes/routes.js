import Home from '../Components/pages/Home/home';
import BlogView from '../Components/pages/BlogView/BlogView';
import Write from '../Components/pages/Write/write';
import { HeaderOnly } from '../layouts';
import Search from '../layouts/components/Search/search';
import config from '../config';
import Login from '../Components/pages/LoginRegister/login';
import Register from '../Components/pages/LoginRegister/register';
import Blogger from '../Components/pages/Blogger/blogger';
import EditBlog from '../Components/pages/EditBlog/editBlog';
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.blog, component: BlogView },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.edit, component: EditBlog, layout: HeaderOnly },
    { path: config.routes.write, component: Write, layout: HeaderOnly },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.blogger, component: Blogger },
];
// require login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
