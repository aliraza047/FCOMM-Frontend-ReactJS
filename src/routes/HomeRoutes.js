import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddUser from 'views/dashboard/UserListing/AddUser';
import UserDetail from 'views/dashboard/UserListing/UserDetail';
import MyAccount from 'views/pages/Auth/MyAccount';
import Dashboard from 'views/dashboard/Default';
import MainDashboard from 'views/dashboard/main';
import ProductListing from 'views/dashboard/ProductListing';
import Home from 'views/pages/home';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const UserListing = Loadable(lazy(() => import('views/dashboard/UserListing/index')));

// ==============================|| MAIN ROUTING ||============================== //

const HomeRoutes = {
    path: '/home',
    children: [
        {
            path: '/',
            element: <Home />
        }
    ]
};

export default HomeRoutes;
