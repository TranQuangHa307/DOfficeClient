import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routers from './routes/routes';
import '../public/css/core.scss';

function App() {
    return (
        <Router>
            <Switch>
                {routers.map(({ exact, path, component: Component, layout: Layout, routes: nestedRoutes }, i) => {
                    return (
                        <Route
                            key={i}
                            exact={exact}
                            path={path}
                            render={(props) => {
                                return (
                                    <Layout>
                                        <Component {...props} routes={nestedRoutes} />
                                    </Layout>
                                );
                            }}
                        />
                    );
                })}
            </Switch>
        </Router>
    );
}

export default App;
