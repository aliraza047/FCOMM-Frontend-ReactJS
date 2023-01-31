import React from 'react';
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';
import { console_log } from 'utils/helper';
import { useSelector } from 'react-redux';
import UserRoutes from './UserRoutes';
import DesignerRoutes from './DesignerRoutes';
import ManufacturerRoutes from './ManufacturerRoutes';
import HomeRoutes from './HomeRoutes';
import ProtectSite from 'views/pages/Web/ProtectSite';
import { checkProtectSite  } from "utils/helper";
import LogisticRoutes from './LogisticRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes({
    setting
}) {
    const { isAuthenticated, user, role } = useSelector((state) => state._auth);
    const haveAccess = checkProtectSite();

    const isDashboardPath = () => {
        let isDashboard = false;
        
        const pathname = window.location.pathname;
        if (
            pathname.includes("/dashboard") ||
            pathname.includes("/forgot-password") || 
            pathname.includes("/verify-pin") || 
            pathname.includes("/reset-password")
        ) {
            isDashboard = true;
        }

        return isDashboard;
    }
    
    console_log('Auth Data', role);
    if (isAuthenticated && role === 'user') {
        console.log('User');
        return useRoutes([UserRoutes, HomeRoutes], config.basename);
    } else if (isAuthenticated && role === 'admin') {
        console.log('Admin');
        return useRoutes([MainRoutes, UserRoutes], config.basename);
    } else if (isAuthenticated && role === 'designer') {
        console.log('designer');
        return useRoutes([DesignerRoutes], config.basename);
    } else if (isAuthenticated && role === 'manufacturer') {
        console.log('manufacturer');
        return useRoutes([ManufacturerRoutes], config.basename);
    } else if (isAuthenticated && role === 'logistic') {
        console.log('logistic');
        return useRoutes([LogisticRoutes], config.basename);
    } else {
        if (haveAccess || isDashboardPath() || setting?.enableProtectPassword !== true) {
            return useRoutes([AuthenticationRoutes], config.basename);
        } else {
            return useRoutes([{
                path: window.location.pathname,
                element: <ProtectSite />
            }], config.basename);
        }
    }
}
