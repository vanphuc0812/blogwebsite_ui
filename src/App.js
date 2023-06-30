import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes/routes';
import DefaultLayout from './layouts';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <div>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Layout = route.layout || DefaultLayout;
                            if (route.layout === null) Layout = Fragment;

                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route, index) => {
                            let Layout = route.layout || DefaultLayout;
                            if (route.layout === null) Layout = Fragment;

                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </div>
    );
}

export default App;
