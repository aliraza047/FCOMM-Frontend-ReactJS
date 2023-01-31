import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddUser from 'views/dashboard/UserListing/AddUser';
import UserDetail from 'views/dashboard/UserListing/UserDetail';
import MyAccount from 'views/pages/Auth/MyAccount';
import ProductListing from 'views/dashboard/ProductListing';
import ProductDetail from 'views/dashboard/ProductListing/ProductDetail';
import UpdateProductNew from 'views/dashboard/ProductListing/UpdateProduct';
import OrderListing from 'views/dashboard/OrderListing';
import Dashboard from 'views/dashboard/Manufecturer';
import Report from 'views/dashboard/Report';
import Community from 'views/dashboard/Community';
import Notification from 'views/dashboard/Notifications';
import Blog from 'views/dashboard/BlogListing';
import Messages from 'views/dashboard/Messages';
import PaymentRequest from 'views/dashboard/MyPayment';
import AddPaymentRequest from 'views/dashboard/MyPayment/AddPaymentRequest';
import UpdatePaymentRequest from 'views/dashboard/MyPayment/UpdatePaymentRequest';
import PaymentHistory from 'views/dashboard/MyPayment/PaymentHistory';

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

const ManufacturerRoutes = {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/user-accounts',
            element: <MyAccount />
        },
        {
            path: '/products',
            element: <ProductListing />
        },
        {
            path: '/products-details',
            element: <UpdateProductNew />
        },
        {
            path: '/orders',
            element: <OrderListing />
        }
        ,
        {
            path: '/reports',
            element: <Report />
        },
        {
            path: '/community',
            element: <Community />
        },
        {
            path: '/notification',
            element: <Notification />
        },
        {
            path: '/blog',
            element: <Blog />
        },
        {
            path: '/messages',
            element: <Messages />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/request-payment',
            element: <PaymentRequest />
        },
        {
            path: '/add-payment-request',
            element: <AddPaymentRequest />
        },
        {
            path: '/update-request-payment',
            element: <UpdatePaymentRequest />
        },
        {
            path: '/history-payment',
            element: <PaymentHistory />
        }
    ]
};

export default ManufacturerRoutes;
