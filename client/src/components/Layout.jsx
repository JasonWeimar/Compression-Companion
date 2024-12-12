// Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    const location = useLocation();

    const hideHeaderRoutes = ["/", "/companion/auth"];

    const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

    return (
        <div>
            {!shouldHideHeader && <Header />}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
