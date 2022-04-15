import React, { FC } from 'react'
import AuthStorage from '../helper/AuthStorage';
import Footer from './footer/Footer'
import AuthHeader from './header/AuthHeader'
import Header from './header/Header'

interface Props {
    // any props that come into the component
}

const Layout: FC<Props> = ({ children, ...props }) => (
    <div>
        {AuthStorage.isUserAuthenticated() ? 
        <AuthHeader /> 
        : <Header /> }
        <div {...props}>{children}</div>
        {/* <Footer/> */}
    </div>
);

export default Layout;