// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    PeopleAltOutlinedIcon,
    ForumOutlinedIcon,
    SettingsOutlinedIcon,
    ArtTrackOutlinedIcon,
    NotificationsActiveOutlinedIcon,
    EmailOutlinedIcon,
    ErrorOutlineIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const logistic = {
    id: 'utilities',
    title: '',
    type: 'group',
    children: [
        {
            id: 'order',
            title: 'Orders & Tracking',
            type: 'item',
            url: '/dashboard/orders',
            icon: WorkOutlineOutlinedIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'products',
        //     title: 'Products',
        //     type: 'item',
        //     url: '/dashboard/products',
        //     icon: WorkOutlineOutlinedIcon,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'report',
        //     title: 'Report',
        //     type: 'item',
        //     url: '/dashboard/reports',
        //     icon: ErrorOutlineIcon,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'settings',
        //     title: 'Settings',
        //     type: 'item',
        //     url: '/dashboard/user-accounts',
        //     icon: SettingsOutlinedIcon,
        //     breadcrumbs: false
        // },
        {
            id: 'notification',
            title: 'Notification',
            type: 'item',
            url: '/dashboard/notification',
            icon: NotificationsActiveOutlinedIcon,
            breadcrumbs: false
        },
        // {
        //     id: 'messages',
        //     title: 'Messages',
        //     type: 'item',
        //     url: '/dashboard/messages',
        //     icon: EmailOutlinedIcon,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'community',
        //     title: 'Community',
        //     type: 'item',
        //     url: '/dashboard/community',
        //     icon: ForumOutlinedIcon,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'blog',
        //     title: 'Blog',
        //     type: 'item',
        //     url: '/dashboard/blog',
        //     icon: ArtTrackOutlinedIcon,
        //     breadcrumbs: false
        // },
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

export default logistic;
