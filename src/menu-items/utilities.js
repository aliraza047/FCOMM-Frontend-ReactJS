// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AlignVerticalBottomOutlinedIcon from '@mui/icons-material/AlignVerticalBottomOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    PeopleAltOutlinedIcon,
    AdminPanelSettingsIcon,
    ContentPasteIcon,
    LibraryBooksIcon,
    CategoryOutlinedIcon,
    AlignVerticalBottomOutlinedIcon,
    ErrorOutlineIcon,
    SettingsOutlinedIcon,
    ForumOutlinedIcon,
    PhotoSizeSelectActualOutlinedIcon,
    EmailOutlinedIcon
};

// Admin Sidebar Routes

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: '',
    type: 'group',
    children: [
        {
            id: 'user',
            title: 'Users',
            type: 'collapse',
            url: '/dashboard/users',
            icon: icons.PeopleAltOutlinedIcon,
            children: [
                // {
                //     id: 'users-all',
                //     title: 'All Users',
                //     type: 'item',
                //     url: '/dashboard/users',
                //     breadcrumbs: false
                // },
                {
                    id: 'users-buyers',
                    title: 'Buyers',
                    type: 'item',
                    url: '/dashboard/user-buyers',
                    breadcrumbs: false
                },
                {
                    id: 'user-designer',
                    title: 'Designer',
                    type: 'item',
                    url: '/dashboard/user-designer',
                    breadcrumbs: false
                },
                {
                    id: 'user-manufacture',
                    title: 'Manufacturers',
                    type: 'item',
                    url: '/dashboard/user-manufacture',
                    breadcrumbs: false
                },
                {
                    id: 'user-logistic',
                    title: 'Logistic',
                    type: 'item',
                    url: '/dashboard/user-logistic',
                    breadcrumbs: false
                },
                {
                    id: 'user-admin',
                    title: 'Admins',
                    type: 'item',
                    url: '/dashboard/user-admin',
                    breadcrumbs: false
                },
                {
                    id: 'user-rejected',
                    title: 'Rejected',
                    type: 'item',
                    url: '/dashboard/user-rejected',
                    breadcrumbs: false
                },
                {
                    id: 'user-blocked',
                    title: 'Blocked',
                    type: 'item',
                    url: '/dashboard/user-blocked',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'approved',
            title: 'Approval Designers & Manufacturer',
            type: 'collapse',
            url: '/dashboard/products',
            icon: AdminPanelSettingsIcon,
            children: [
                {
                    id: 'approved-designer',
                    title: 'Designers',
                    type: 'item',
                    url: '/dashboard/designer',
                    breadcrumbs: false
                },
                {
                    id: 'approved-manufacture',
                    title: 'Manufacturers',
                    type: 'item',
                    url: '/dashboard/manufacture',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'products',
            title: 'Products',
            type: 'item',
            url: '/dashboard/products',
            icon: WorkOutlineOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'approved-products',
            title: 'Approval Products',
            type: 'item',
            url: '/dashboard/products-approved',
            icon: WorkOutlineOutlinedIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'blogs',
        //     title: 'Blogs',
        //     type: 'item',
        //     url: '/dashboard/blogs',
        //     icon: ArtTrackOutlinedIcon,
        //     breadcrumbs: false
        // },
        {
            id: 'blog',
            title: 'Blogs Listing & Approval',
            type: 'collapse',
            url: '/dashboard/products',
            icon: LibraryBooksIcon,
            children: [
                {
                    id: 'blog-listing',
                    title: 'Blog Listing',
                    type: 'item',
                    url: '/dashboard/blogs',
                    breadcrumbs: false
                },
                // Temporary comment cause function got issue
                {
                    id: 'blog-approval',
                    title: 'Blog Approval',
                    type: 'item',
                    url: '/dashboard/blogs-approval',
                    breadcrumbs: false
                }
            ]
        },
        // {
        //     id: 'messages',
        //     title: 'Messages',
        //     type: 'item',
        //     url: '/dashboard/messages',
        //     icon: EmailOutlinedIcon,
        //     breadcrumbs: false
        // },
        {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: '/dashboard/orders',
            icon: ArtTrackOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'collapse',
            url: '/dashboard/Settings',
            icon: SettingsOutlinedIcon,
            children: [
                {
                    id: 'homepage-banner',
                    title: 'Homepage Banner',
                    type: 'item',
                    url: '/dashboard/settings-homepage-banner',
                    breadcrumbs: false
                },
                // {
                //     id: 'roles',
                //     title: 'Roles',
                //     type: 'item',
                //     url: '/dashboard/settings-roles',
                //     breadcrumbs: false
                // },
                {
                    id: 'contact-us',
                    title: 'Contact Us',
                    type: 'item',
                    url: '/dashboard/settings-contact-us',
                    breadcrumbs: false
                },
                {
                    id: 'password-protect',
                    title: 'Password Protect',
                    type: 'item',
                    url: '/dashboard/settings-password-protect',
                    breadcrumbs: false
                },
                {
                    id: 'about-us',
                    title: 'About Us',
                    type: 'item',
                    url: '/dashboard/about-us',
                    breadcrumbs: false
                },
                {
                    id: 'status-delivery',
                    title: 'Status Delivery',
                    type: 'item',
                    url: '/dashboard/statusDelivery',
                    breadcrumbs: false
                },
                {
                    id: 'price-range',
                    title: 'Price Range',
                    type: 'item',
                    url: '/dashboard/settings-price-range',
                    breadcrumbs: false
                }
                // {
                //     id: 'promotion',
                //     title: 'Promotion',
                //     type: 'item',
                //     url: '/dashboard/settings-promotion',
                //     breadcrumbs: false
                // },
                // {
                //     id: 'cart-rules',
                //     title: 'Cart Rules',
                //     type: 'item',
                //     url: '/dashboard/settings-cart-rules',
                //     breadcrumbs: false
                // },
                // {
                //     id: 'information-display',
                //     title: 'Information Display',
                //     type: 'item',
                //     url: '/dashboard/settings-information-display',
                //     breadcrumbs: false
                // }
            ]
        },
        {
            id: 'categories',
            title: 'Categories',
            type: 'item',
            url: '/dashboard/categories',
            icon: CategoryOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'report',
            title: 'Report',
            type: 'collapse',
            url: '/dashboard/report',
            icon: ContentPasteIcon,
            children: [
                {
                    id: 'report-designer',
                    title: 'Report Designer',
                    type: 'item',
                    url: '/dashboard/report-designer',
                    breadcrumbs: false
                },
                {
                    id: 'report-product',
                    title: 'Report Product',
                    type: 'item',
                    url: '/dashboard/report-product',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'payment-designer-manufacture',
            title: 'Payment Designer & Manufacture',
            type: 'collapse',
            url: '/dashboard/products',
            icon: LibraryBooksIcon,
            children: [
                {
                    id: 'Designer',
                    title: 'Designer',
                    type: 'item',
                    url: '/dashboard/payment-designer',
                    breadcrumbs: false
                },
                {
                    id: 'Manufacture',
                    title: 'Manufacture',
                    type: 'item',
                    url: '/dashboard/payment-manufacture',
                    breadcrumbs: false
                },
                {
                    id: 'Approval',
                    title: 'Approval',
                    type: 'item',
                    url: '/dashboard/payment-approval',
                    breadcrumbs: false
                }
            ]
        },
        // {
        //     id: 'communnity',
        //     title: 'Community',
        //     type: 'item',
        //     url: '/dashboard/community',
        //     icon: ForumOutlinedIcon,
        //     breadcrumbs: false
        // },
        {
            id: 'gallery',
            title: 'Gallery',
            type: 'item',
            url: '/dashboard/Gallery',
            icon: PhotoSizeSelectActualOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'notification',
            title: 'Notification',
            type: 'item',
            url: '/dashboard/notification',
            icon: NotificationsActiveOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'rewardsandpromotions',
            title: 'Rewards & Promotions',
            type: 'collapse',
            url: '/dashboard/rewards',
            icon: CategoryOutlinedIcon,
            breadcrumbs: false,
            children: [
                {
                    id: 'promo-codes',
                    title: 'Promo Codes',
                    type: 'item',
                    url: '/dashboard/rewards',
                    breadcrumbs: false
                },
                {
                    id: 'tracking-promo-codes',
                    title: 'Tracking Promo Codes',
                    type: 'item',
                    url: '/dashboard/reward-tracking',
                    breadcrumbs: false
                }
            ]
        },
        // {
        //     id: 'util-typography',
        //     title: 'Typography',
        //     type: 'item',
        //     url: '/utils/util-typography',
        //     icon: icons.IconTypography,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'util-color',
        //     title: 'Color',
        //     type: 'item',
        //     url: '/utils/util-color',
        //     icon: icons.IconPalette,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'util-shadow',
        //     title: 'Shadow',
        //     type: 'item',
        //     url: '/utils/util-shadow',
        //     icon: icons.IconShadow,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     icon: icons.IconWindmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default utilities;
