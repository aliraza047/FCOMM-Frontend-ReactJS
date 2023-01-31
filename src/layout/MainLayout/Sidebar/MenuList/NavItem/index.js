import PropTypes from 'prop-types';
import { forwardRef, useEffect , useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotifications, addMarkAsRead } from 'redux/action/Notification';
import NotificationIcon from '@mui/icons-material/FiberManualRecord';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';
import config from 'config';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { isArrayCheck } from 'views/utilities/common';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //




const NavItem = ({ item, level }) => {

    
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const { all_notifications } = useSelector((state) => state._notification);
    console.log("all_notifications.length",all_notifications)
    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={`${config.basename}${item.url}`} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch({ type: MENU_OPEN, id });
        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
        localStorage.setItem('@menu', id);
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
        dispatch(getAllNotifications());

        // eslint-disable-next-line
    }, []);

    console.log('Menu =>', localStorage.getItem('@menu') === item.id, localStorage.getItem('@menu'), item.id);
    // console.log('localStorage.getItem("notifyCount")', localStorage.getItem("notifyCount"))
    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor:
                    level > 1 ? 'transparent !important' : localStorage.getItem('@menu') === item.id ? '#c3724e !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={localStorage.getItem('@menu') === item.id}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            {/* { item.title == 'Notification'&& isArrayCheck(all_notifications) && Number(localStorage.getItem("notifyCount"))< Number(all_notifications.length) && <NotificationIcon className='dot-icon' sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</NotificationIcon>} */}
            { item.title == 'Notification' && localStorage.getItem("notifyCount") && Number(localStorage.getItem("notifyCount")) < Number(all_notifications.length) && <NotificationIcon className='dot-icon' sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</NotificationIcon>}
            <ListItemText
                primary={
                    <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
