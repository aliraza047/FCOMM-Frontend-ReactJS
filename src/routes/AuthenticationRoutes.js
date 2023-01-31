import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Login from '../views/pages/Auth/Login';
import Register from '../views/pages/Auth/Register';
import ForgetPassword from 'views/pages/Auth/ForgetPassword';
import VerifyPin from 'views/pages/Auth/VerifyPin';
import ResetPassword from 'views/pages/Auth/ResetPassword';
import CustomerLogin from 'views/customer/Auth';
import Home from 'views/pages/home';
import StoriesDetails from 'views/pages/Web/stories/StoriesDetails';
import ShopCardDetail from 'views/pages/Web/Shop/ShopCardDetail';
import DesignerProducts from 'views/pages/Web/Following/DesignerProducts';
import Favourite from 'views/pages/Web/Favourites/Index';
import FavouriteDesignerProducts from 'views/pages/Web/Favourites/FavouriteDesignerProducts';

const Shop = Loadable(lazy(() => import('views/pages/Web/Shop/index')));
const Stories = Loadable(lazy(() => import('views/pages/Web/stories/index')));

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
import Checkout from 'views/pages/Web/Checkout/Index';
import Following from 'views/pages/Web/Following/Index';
import Stylist from 'views/pages/Web/Stylist/Index';
import Visualization from 'views/pages/Web/Visualization/index';
import AboutUs from 'views/pages/Web/AboutUs';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
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
            path: '/about-us',
            element: <AboutUs />
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
            path: '/auth/',
            element: <CustomerLogin />
        },
        {
            path: '/dashboard/register',
            element: <Register />
        },
        {
            path: '/dashboard/',
            element: <Login />
        },
        {
            path: '/forgot-password',
            element: <ForgetPassword />
        },
        {
            path: '/verify-pin',
            element: <VerifyPin />
        },
        {
            path: '/reset-password',
            element: <ResetPassword />
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
            path: '/stylist',
            element: <Stylist />
        },
        {
            path: '/visualization',
            element: <Visualization />
        }
    ]
};

export default AuthenticationRoutes;
