// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AlignVerticalBottomOutlinedIcon from '@mui/icons-material/AlignVerticalBottomOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    NotificationsActiveOutlinedIcon,
    IconWindmill,
    PeopleAltOutlinedIcon,
    ErrorOutlineIcon,
    ArtTrackOutlinedIcon,
    SettingsOutlinedIcon,
    ForumOutlinedIcon,
    StarBorderIcon,
    EmailOutlinedIcon,
    ContentPasteIcon,
    LibraryBooksIcon,
    AlignVerticalBottomOutlinedIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const designer = {
    id: 'utilities',
    title: '',
    type: 'group',
    children: [
        {
            id: 'products',
            title: 'My Products',
            type: 'item',
            url: '/dashboard/products',
            icon: WorkOutlineOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: '/dashboard/orders',
            icon: AlignVerticalBottomOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'buyer-feedback',
            title: 'Review / Buyer Feedback',
            type: 'item',
            url: '/dashboard/buyer-feedback',
            icon: StarBorderIcon,
            breadcrumbs: false
        },
        // Temporary comment cause function got issue
        {
            id: 'designer-blog',
            title: 'Blog',
            type: 'item',
            url: '/dashboard/blogs',
            icon: LibraryBooksIcon,
            breadcrumbs: false
        },
        {
            id: 'report',
            title: 'Report',
            type: 'item',
            url: '/dashboard/designer-report',
            icon: icons.ContentPasteIcon,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/dashboard/user-accounts',
            icon: SettingsOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'my-payment',
            title: 'My Payment',
            type: 'collapse',
            icon: icons.IconWindmill,
            children: [
                {
                    id: 'request-payment',
                    title: 'Request Payment',
                    type: 'item',
                    url: '/dashboard/request-payment',
                    breadcrumbs: false
                },
                {
                    id: 'history-payment',
                    title: 'History Payment',
                    type: 'item',
                    url: '/dashboard/history-payment',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'notifications',
            title: 'Notification',
            type: 'item',
            url: '/dashboard/notifications',
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
       
    ]
};

export default designer;
