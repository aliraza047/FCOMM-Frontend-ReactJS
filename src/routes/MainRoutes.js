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
import Blog from 'views/dashboard/BlogListing';
import Messages from 'views/dashboard/Messages';
import AddBlog from 'views/dashboard/BlogListing/AddBlog';
import AddProduct from 'views/dashboard/ProductListing/AddProduct';
import ProductDetail from 'views/dashboard/ProductListing/ProductDetail';
import BlogDetail from 'views/dashboard/BlogListing/BlogDetails';
import BlogsListing from 'views/dashboard/BlogsListing/index';
import RewardsAndPromotions from 'views/dashboard/RewardsAndPromotions/index';
import RewardsTracking from 'views/dashboard/RewardsAndPromotions/RewardTracking';
import BlogsApproved from 'views/dashboard/BlogsApproved/index';
import AddProductNew from 'views/dashboard/ProductListing/AddProductNew';
import AddCategory from 'views/dashboard/CategoryListing/AddCategory';
import CategoryDetails from 'views/dashboard/CategoryListing/CategoryDetails';
import ReportProduct from 'views/dashboard/AdminReports/ReportProduct';
import ReportDesigner from 'views/dashboard/AdminReports/ReportDesigner';
import updateProductNew from 'views/dashboard/ProductListing/UpdateProduct';
import UpdateProductNew from 'views/dashboard/ProductListing/UpdateProduct';
import ApprovalProductListing from 'views/dashboard/ProductListing/ApprovalProductListing';
import ApprovedManufacture from 'views/dashboard/UserListing/Manfacture/ApprovedManufacture';
import UsersDesigner from 'views/dashboard/UserListing/Users/UsersDesigner';
import UsersBuyers from 'views/dashboard/UserListing/Users/UsersBuyers';
import UsersManufacturers from 'views/dashboard/UserListing/Users/UsersManufacturers';
import UsersAdmins from 'views/dashboard/UserListing/Users/UsersAdmins';
import ApprovedDesigner from 'views/dashboard/UserListing/Designer/ApprovedDesigner';
import AddUserNew from 'views/dashboard/UserListing/AddUserNew';
import AddPriceRange from 'views/dashboard/UserListing/AddPriceRange';
import UpdatePriceRange from 'views/dashboard/UserListing/UpdatePriceRange';
import UpdateUser from 'views/dashboard/UserListing/UpdateUser';
import OrderListing from 'views/dashboard/OrderListing/index';
import OrderDetails from 'views/dashboard/OrdersListing/OrderDetails';
import Community from 'views/dashboard/Community';
import AddThread from 'views/dashboard/Community/AddThread';
import Gallery from 'views/dashboard/Gallery';
import AddPhoto from 'views/dashboard/Gallery/AddPhoto';
import BlogPost from 'views/dashboard/BlogListing/BlogPost';
import HomepageBannerSettings from 'views/dashboard/Settings/HomepageBannerSettings';
import AboutUs from 'views/dashboard/Settings/AboutUs';
import CartRulesSettings from 'views/dashboard/Settings/CartRulesSettings';
import ContactUsSettings from 'views/dashboard/Settings/ContactUsSettings';
import PriceRange from 'views/dashboard/Settings/PriceRange';
import PriceRangeSettings from 'views/dashboard/Settings/PriceRangeSettings';
import DeliveryStatus from 'views/dashboard/Settings/DeliveryStatus';
import DeliveryStatusEdit from 'views/dashboard/Settings/DeliveryStatusEdit';

import PasswordProtectSettings from 'views/dashboard/Settings/PasswordProtectSettings';
// import PasswordProtectSettings from 'views/dashboard/Settings/PasswordProtectSettings';
import InformationDisplaySettings from 'views/dashboard/Settings/InformationDisplaySettings';
import PromotionSettings from 'views/dashboard/Settings/PromotionSettings';
import RolesSettings from 'views/dashboard/Settings/RolesSettings';
import RuleAddEdit from 'views/dashboard/Settings/RuleAddEdit';
import RoleAddEdit from 'views/dashboard/Settings/RoleAddEdit';
import UsersRejected from 'views/dashboard/UserListing/Users/UsersRejected';
import UsersBlocked from 'views/dashboard/UserListing/Users/UsersBlocked';
import DetailReport from 'views/dashboard/AdminReports/_part/DetailReport';
import DetailReportProduct from 'views/dashboard/AdminReports/_part/DetailReportProduct';
import Unapproved from 'views/dashboard/BlogsListing/Unapproved';
import Notifications from 'views/dashboard/Notifications';
import UsersLogistic from 'views/dashboard/UserListing/Users/UsersLogistic';
import AddReward from 'views/dashboard/RewardsAndPromotions/AddReward';
import EditReward from 'views/dashboard/RewardsAndPromotions/EditReward';
import Payment from 'views/dashboard/Payment';
import PaymentDesigner from 'views/dashboard/Payment/PaymentDesigner';
import PaymentManufacture from 'views/dashboard/Payment/PaymentManufacture';
import UnapprovedPayment from 'views/dashboard/Payment/UnapprovedPayments';
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
const CategoryListing = Loadable(lazy(() => import('views/dashboard/CategoryListing/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <MainDashboard />
        },
        {
            path: '/notification',
            element: <Notifications />
        },
        {
            path: '/main',
            element: <MainDashboard />
        },
        {
            path: '/users',
            element: <UserListing />
        },
        {
            path: '/orders',
            element: <OrderListing />
        },
        {
            path: '/orders-details',
            element: <OrderDetails />
        },
        {
            path: '/user-designer',
            element: <UsersDesigner />
        },
        {
            path: '/user-buyers',
            element: <UsersBuyers />
        },
        {
            path: '/user-manufacture',
            element: <UsersManufacturers />
        },
        {
            path: '/user-logistic',
            element: <UsersLogistic />
        },
        {
            path: '/user-admin',
            element: <UsersAdmins />
        },
        {
            path: '/user-rejected',
            element: <UsersRejected />
        },
        {
            path: '/detail-report',
            element: <DetailReport />
        },
        {
            path: '/detail-report-product',
            element: <DetailReportProduct />
        },
        {
            path: '/user-blocked',
            element: <UsersBlocked />
        },
        {
            path: '/designer',
            element: <ApprovedDesigner />
        },
        {
            path: '/manufacture',
            element: <ApprovedManufacture />
        },
        {
            path: '/users-details',
            element: <UpdateUser />
        },
        {
            path: '/add-users',
            element: <AddUserNew />
        },
        {
            path: '/add-Price-Range',
            element: <AddPriceRange />
        },
        {
            path: '/update-Price-Range',
            element: <UpdatePriceRange />
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
            path: '/products-approved',
            element: <ApprovalProductListing />
        },
        {
            path: '/categories',
            element: <CategoryListing />
        },
        {
            path: '/add-category',
            element: <AddCategory />
        },
        {
            path: '/category-details',
            element: <CategoryDetails />
        },
        {
            path: '/report-designer',
            element: <ReportDesigner />
        },
        {
            path: '/report-product',
            element: <ReportProduct />
        },
        {
            path: '/settings-homepage-banner',
            element: <HomepageBannerSettings />
        },
        {
            path: '/about-us',
            element: <AboutUs />
        },
        {
            path: '/statusDelivery',
            element: <DeliveryStatus />
        },
        {
            path: '/editstatusDelivery',
            element: <DeliveryStatusEdit />
        },
        {
            path: '/settings-cart-rules',
            element: <CartRulesSettings />
        },
        {
            path: '/settings-contact-us',
            element: <ContactUsSettings />
        },
        {
            path: '/settings-price-range',
            // element: <PriceRange />
            element: <PriceRangeSettings />
        },
        {
            path: '/settings-password-protect',
            element: <PasswordProtectSettings />
        },
        {
            path: '/settings-information-display',
            element: <InformationDisplaySettings />
        },
        {
            path: '/settings-promotion',
            element: <PromotionSettings />
        },
        {
            path: '/settings-roles',
            element: <RolesSettings />
        },
        {
            path: '/rule-add-edit',
            element: <RuleAddEdit />
        },
        {
            path: '/role-add-edit',
            element: <RoleAddEdit />
        },
        {
            path: '/community',
            element: <Community />
        },
        {
            path: '/addthread',
            element: <AddThread />
        },
        {
            path: '/addphoto',
            element: <AddPhoto />
        },
        {
            path: '/gallery',
            element: <Gallery />
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
            path: '/blogs',
            element: <BlogsListing />
        },
        {
            path: '/messages',
            element: <Messages />
        },
        {
            path: '/blog-post',
            element: <BlogPost />
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
            path: '/blogs',
            element: <BlogsListing />
        },
        {
            path: '/blogs-approval',
            element: <Unapproved />
        },
        {
            path: '/blogs-approved',
            element: <BlogsApproved />
        },
        {
            path: '/rewards',
            element: <RewardsAndPromotions />
        },
        {
            path: '/add-reward',
            element: <AddReward />
        },
        {
            path: '/edit-reward',
            element: <EditReward />
        },
        {
            path: '/reward-tracking',
            element: <RewardsTracking />
        },
        //
        {
            path: '/payment-designer',
            element: <PaymentDesigner />
        },
        {
            path: '/payment-manufacture',
            element: <PaymentManufacture />
        },
        {
            path: '/payment-approval',
            element: <UnapprovedPayment />
        }
    ]
    // path: '/dummy',
    // children: [
    //     {
    //         path: '/',
    //         element: <Home />
    //     }
    // ]
};

export default MainRoutes;
