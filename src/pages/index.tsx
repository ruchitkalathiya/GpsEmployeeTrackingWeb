import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import { Link, useHistory } from "react-router-dom";

import AuthStorage from '../helper/AuthStorage'
import Layout from '../layouts/Layout'
import ErrorPage1 from './errors/ErrorPage1';
import ForgotPass from './forgotpass/ForgotPass';
import Homepage from './homepage/Homepage'
import Profile from './user/Profile'
import Dashboard from "./dashboard/Dashboard";
import Viewloaction from './dashboard/Viewloaction';
import Viewimage from "./dashboard/Viewimage";
const Index = () => {
    const defaultLayout = ({ children }: any) => {
        return <Layout>
            {children}
        </Layout>
    }

    const noLayout = ({ children }: any) => {
        return children
    }

    return (
        <>
            <Switch>
                <RouteWrapper exact={true} path="/" component={Homepage} layout={defaultLayout} isPrivateRoute={false} />
                <RouteWrapper exact={true} path="/profile" component={Profile} layout={noLayout} isPrivateRoute={true} />
                <RouteWrapper exact={false} path="/forgotpass" component={ForgotPass} layout={defaultLayout} isPrivateRoute={false} />
                <RouteWrapper exact={true} path="/dashboard" component={Dashboard} layout={defaultLayout} isPrivateRoute={false} />
                <RouteWrapper exact={true} path="/viewloaction" component={Viewloaction} layout={defaultLayout} isPrivateRoute={false} />
                <RouteWrapper exact={true} path="/Viewimage" component={Viewimage} layout={defaultLayout} isPrivateRoute={false} />
                <Route path="/error" component={ErrorPage1}></Route>
                <Redirect from="**" to="/error" />
            </Switch>
        </>
    )
}

export default Index

interface RouteWrapperProps {
    component: any;
    layout: any;
    exact: boolean;
    path: string;
    isPrivateRoute: boolean;
}

function RouteWrapper({
    component: Component,
    layout: Layout,
    isPrivateRoute,
    ...rest
}: RouteWrapperProps) {
    const history = useHistory()
    const isAuthenticated: boolean = isPrivateRoute ? AuthStorage.isUserAuthenticated() : true;
    return (
        <>
            {isAuthenticated ?
                (
                    <Route {...rest} render={(props) =>
                        <Layout {...props}>
                            <Component {...props} />
                        </Layout>
                    } />
                )
                :
                history.push('/')
            }
        </>
    );
}