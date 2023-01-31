import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
import User1 from 'assets/images/users/user-round.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import { changeRole, logout } from 'redux/action/Auth';
import { base_url, base_url_new } from 'utils/config';
import { NOT_FOUND_IMAGE } from 'views/utilities/common';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const { user, role: userRole } = useSelector((state) => state._auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [role, setrole] = useState(userRole);

    console.log('useruser', userRole);

    const checkRoute = (data) => {
        if (data === 'user') {
            return '/';
        } else {
            return '/dashboard';
        }
    };

    const handleRole = (event) => {
        setrole(event.target.value);
        dispatch(changeRole(event.target.value, navigate, checkRoute(event.target.value)));
    };

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        console.log('Logout');
        dispatch(logout(navigate));
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <p className="p-2 my-0" style={{ textTransform: 'capitalize' }}>
                {user.user.fullname || user.user.username}
            </p>
            <div className="search-fields ">
                <Select value={role} onChange={handleRole} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                    {Array.isArray(user.user.role) && user.user.role.length > 0
                        ? user.user.role.map((data, id) => <MenuItem value={data}>{data}</MenuItem>)
                        : null}
                </Select>
            </div>
            <Chip
                sx={{
                    height: '40px',
                    width: '40px',
                    alignItems: 'center',
                    borderRadius: '100%',
                    transition: 'all .2s ease-in-out'
                    // borderColor: theme.palette.primary.light,
                    // backgroundColor: theme.palette.primary.light,
                }}
                icon={
                    <Avatar
                        src={
                            user?.user?.profile?.includes('http')
                                ? user?.user?.profile
                                : user?.user?.profile
                                ? base_url + user?.user?.profile
                                : NOT_FOUND_IMAGE
                        }
                        sx={{
                            ...theme.typography.mediumAvatar,
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                // label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />

            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    border={false}
                                    elevation={16}
                                    content={false}
                                    boxShadow
                                    shadow={theme.shadows[16]}
                                    style={{ height: 150 }}
                                >
                                    {/* <Box sx={{ p: 2 }}> */}
                                    {/* <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Typography variant="h4">Good Morning,</Typography>
                                                <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                                                    {user.user.username}
                                                </Typography>
                                            </Stack>
                                        </Stack> */}
                                    {/* <OutlinedInput
                                            sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                                            id="input-search-profile"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder="Search profile options"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                                                </InputAdornment>
                                            }
                                            aria-describedby="search-helper-text"
                                            inputProps={{
                                                'aria-label': 'weight'
                                            }}
                                        /> */}
                                    {/* <Divider /> */}
                                    {/* </Box> */}
                                    <PerfectScrollbar style={{ height: '100%', overflowX: 'hidden' }}>
                                        <Box sx={{ p: 2 }}>
                                            {/* <UpgradePlanCard /> */}
                                            {/* <Divider /> */}
                                            <Card
                                                sx={{
                                                    bgcolor: theme.palette.primary.light
                                                }}
                                            >
                                                {/* <CardContent>
                                                    <Grid container spacing={3} direction="column">
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Start DND Mode</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        color="primary"
                                                                        checked={sdm}
                                                                        onChange={(e) => setSdm(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid item container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="subtitle1">Allow Notifications</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Switch
                                                                        checked={notification}
                                                                        onChange={(e) => setNotification(e.target.checked)}
                                                                        name="sdm"
                                                                        size="small"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent> */}
                                            </Card>
                                            {/* <Divider /> */}
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >
                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 0}
                                                    onClick={(event) => handleListItemClick(event, 0, '/dashboard/user-accounts')}
                                                >
                                                    <ListItemIcon>
                                                        <IconSettings stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                                </ListItemButton>
                                                {/* <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 0}
                                                    onClick={(event) => handleListItemClick(event, 0, '/dashboard/user-accounts')}
                                                >
                                                    <ListItemIcon>
                                                        <IconUser stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Open Website</Typography>} />
                                                </ListItemButton> */}

                                                {/* <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 1}
                                                    onClick={(event) => handleListItemClick(event, 1, '/user/social-profile/posts')}
                                                >
                                                    <ListItemIcon>
                                                        <IconUser stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={
                                                            <Grid container spacing={1} justifyContent="space-between">
                                                                <Grid item>
                                                                    <Typography variant="body2">Social Profile</Typography>
                                                                </Grid>
                                                                <Grid item>
                                                                    <Chip
                                                                        label="02"
                                                                        size="small"
                                                                        sx={{
                                                                            bgcolor: theme.palette.warning.dark,
                                                                            color: theme.palette.background.default
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        }
                                                    />
                                                </ListItemButton> */}
                                                <ListItemButton
                                                    sx={{ borderRadius: `${customization.borderRadius}px` }}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5} size="1.3rem" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
