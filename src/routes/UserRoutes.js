import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AddUser from 'views/dashboard/UserListing/AddUser';
import UserDetail from 'views/dashboard/UserListing/UserDetail';

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

const Home = Loadable(lazy(() => import('views/pages/home/index')));
const Stories = Loadable(lazy(() => import('views/pages/Web/stories/index')));
const AboutUs = Loadable(lazy(() => import('views/pages/Web/AboutUs/index')));

// ==============================|| MAIN ROUTING ||============================== //
import React from 'react';
import StoriesDetails from 'views/pages/Web/stories/StoriesDetails';
import ShopCardDetail from 'views/pages/Web/Shop/ShopCardDetail';
import Checkout from 'views/pages/Web/Checkout/Index';
import Following from 'views/pages/Web/Following/Index';
import DesignerProducts from 'views/pages/Web/Following/DesignerProducts';
import Favourite from 'views/pages/Web/Favourites/Index';
import FavouriteDesignerProducts from 'views/pages/Web/Favourites/FavouriteDesignerProducts';
import MyOrder from 'views/pages/Web/MyOrder/Index';
import Membership from 'views/pages/Web/Membership/Index';
import Stylist from 'views/pages/Web/Stylist/Index';
import FeaturedDetails from 'views/pages/Web/Stylist/FeaturedDetails';
import MyAccount from 'views/pages/Web/MyAccount/index';
import Shop from 'views/pages/Web/Shop/index';
import Visualization from 'views/pages/Web/Visualization/index';

const UserRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/stories',
            element: <Stories />
        },
        {
            path: '/about-us',
            element: <AboutUs />
        },
        {
            path: '/stories-details/:id',
            element: <StoriesDetails />
        },
        {
            path: '/shop',
            element: <Shop />
        },
        {
            path: '/shop/:paramSearch',
            element: <Shop />
        },
        {
            path: '/shop-dtails/:id',
            element: <ShopCardDetail />
        },
        {
            path: '/checkout',
            element: <Checkout />
        },
        {
            path: '/following',
            element: <Following />
        },
        {
            path: '/favourite',
            element: <Favourite />
        },
        {
            path: '/designer-products',
            element: <DesignerProducts />
        },
        ,
        {
            path: '/favourite-designer-products',
            element: <FavouriteDesignerProducts />
        },
        {
            path: '/my-order',
            element: <MyOrder />
        },
        {
            path: '/membership',
            element: <Membership />
        },
        {
            path: '/stylist',
            element: <Stylist />
        },
        {
            path: '/featured-details',
            element: <FeaturedDetails />
        },
        {
            path: '/my-account',
            element: <MyAccount />
        },
        {
            path: '/visualization',
            element: <Visualization />
        }
    ]
};

export default UserRoutes;
