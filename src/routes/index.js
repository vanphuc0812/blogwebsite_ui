import Home from "../Components/pages/Home/indes";
import BlogView from "../Components/pages/BlogView/indes";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/view", component: BlogView }
]
// require login
const privateRoutes = [

]

export {publicRoutes, privateRoutes}