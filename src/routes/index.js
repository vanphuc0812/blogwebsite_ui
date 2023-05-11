import Home from '../Components/pages/Home';
import BlogView from '../Components/pages/BlogView';
import Upload from '../Components/pages/Upload';
import { HeaderOnly } from '../Components/Layout';
import Search from '../Components/pages/Search';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/view', component: BlogView },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
];
// require login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
