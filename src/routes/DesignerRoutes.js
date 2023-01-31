import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddUser from 'views/dashboard/UserListing/AddUser';
import UserDetail from 'views/dashboard/UserListing/UserDetail';
import MyAccount from 'views/pages/Auth/MyAccount';
import ProductListing from 'views/dashboard/ProductListing';
import DesignerBlog from 'views/dashboard/DesignerBlog/index';
import AddProduct from 'views/dashboard/ProductListing/AddProduct';
import ProductDetail from 'views/dashboard/ProductListing/ProductDetail';
import AddProductNew from 'views/dashboard/ProductListing/AddProductNew';
import UpdateModalVariaton from 'views/dashboard/ProductListing/_part/Modal/UpdateModalVariaton';
import UpdateProductNew from 'views/dashboard/ProductListing/UpdateProduct';
import DesignerReport from 'views/dashboard/DesignerReports';
import Dashboard from 'views/dashboard/Default';
import OrderListing from 'views/dashboard/OrderListing/index';
import BuyerFeedback from 'views/dashboard/BuyerFeedback/index';
import Notifications from 'views/dashboard/Notifications';
import Community from 'views/dashboard/Community';
import Messages from 'views/dashboard/Messages';
import Blog from 'views/dashboard/BlogListing';
import { getBlogListing } from 'redux/action/Customer.Action/Blog';
import AddBlog from 'views/dashboard/BlogListing/AddBlog';
import BlogDetail from 'views/dashboard/BlogListing/BlogDetails';
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

const DesignerRoutes = {
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
            path: '/add-product',
            element: <AddProductNew />
        },
        {
            path: '/products-details',
            element: <UpdateProductNew />
        },
        {
            path: '/designer-report',
            element: <DesignerReport />
        },
        {
            path: '/blogs',
            element: <DesignerBlog />
        },
        {
            path: '/add-blog',
            element: <AddBlog />
        },
        {
            path: '/blogs-details',
            element: <BlogDetail />
        },
        {
            path: '/orders',
            element: <OrderListing />
        },
        {
            path: '/community',
            element: <Community />
        },
        {
            path: '/notifications',
            element: <Notifications />
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
            path: '/blog',
            element: <Blog />
        },
        {
            path: '/buyer-feedback',
            element: <BuyerFeedback />
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

export default DesignerRoutes;
