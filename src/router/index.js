//Main router file
import {BrowserRouter, withRouter, Switch, Route} from 'react-router-dom';
import React , {createContext, useContext} from 'react';
import {createBrowserHistory} from 'history';

const routerContext = createContext();

const history = createBrowserHistory();

export const Router = ({children}) => (
    <BrowserRouter history={history}>
        <RouterProvider>
            {children}
        </RouterProvider>
    </BrowserRouter>
);

const RouterProvider = withRouter(
    ({children, ...routerProps}) => (
        <routerContext.Provider value={routerProps}>
            {children}
        </routerContext.Provider>)
);

export const useRouter = () =>{
    const routerProps = useContext(routerContext);
    //@Return routing api
    //Redirect
    return {
        pathname: routerProps.pathname,
        location: routerProps.location,
        push: routerProps.history.push,
        replace: routerProps.history.replace
    }
}
export {Switch, Route}