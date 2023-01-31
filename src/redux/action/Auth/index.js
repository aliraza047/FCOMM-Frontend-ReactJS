import axios from 'axios';
import { server_url } from 'utils/config';
import { console_log } from 'utils/helper';
import request from '../../../utils/request';
import makeToast from '../../../utils/Toaster';
import { AUTH_USER, GET_MY_PROFILE, UPDATE_ROLE, USER_LOGOUT, UPDATE_USER } from '../Action.Constant';
import { getAllUserListing } from '../User';
export const loginUser = (userData, navigate, approvedPopup) => async (dispatch) => {
    console_log('loginUser', userData);
    try {
        const res = await request.post('/auth/login', userData);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            console_log('Login Data', data);
            setToken(data.token, data.user);
            dispatch({
                type: AUTH_USER,
                payload: data
            });
            await dispatch(getNotifyCount());
            dispatch(checkAuth(navigate));
            
        }
    } catch (e) {
        makeToast('error', e.message);
        // if (e.message === 'User need Approval before login') {
        //     approvedPopup(true);
        // }
    }
};

export const signupUser = async (userData, naviagte, type) => {
    console_log('signupUser', userData);
    // const {
    //     email,
    //     password,
    //     username,
    //     banner,
    //     profile,
    //     phone_number,
    //     description,
    //     role,
    //     fullname,
    //     gender,
    //     nic,
    //     country,
    //     address,
    //     postalCode
    // } = userData;
    try {
        const res = await request.post(
            '/auth/signup',
            //  {
            //     email,
            //     password,
            //     username,
            //     last_name: username,
            //     phone_number,
            //     role,
            //     fullname,
            //     gender: gender,
            //     nic: nic,
            //     country: country,
            //     address: address,
            //     postalCode: postalCode,
            //     description,
            //     profile,
            //     banner
            // }
            userData
        );
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            console_log('Data', data);
            if (type && type === 'user') {
                naviagte(1);
            } else {
                naviagte('/dashboard/');
            }
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const getNotifyCount= () => async (dispatch) => {
    try {
        const res = await request.get('/settings/getNotification');
        const { message, status, data } = res.data;
        console.log('getAllNotifications data', data.count)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            localStorage.setItem("notifyCount" , data.count)           
        }
    } catch (e) {
        console_log('getAllNotification', e.message);
    }
};
export const getMyProfile = () => async (dispatch) => {
    try {
        const res = await request.get('/users');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            localStorage.setItem('user', JSON.stringify(data?.user));
            dispatch({
                type: GET_MY_PROFILE,
                payload: data
            });
        }
    } catch (e) {
        console_log('getMyProfile', e.message);

        // makeToast('error', e.message);
    }
};

export const forgotPassword = (inputdata, navigate) => async (dispatch) => {
    console_log('forgotPassword', inputdata);
    try {
        const res = await request.post('/auth/forgotemail', { email: inputdata });
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            localStorage.setItem('forgotToken', data.token);
            makeToast('success', message);
            console_log('Data', data);
            navigate('/verify-pin');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const changePassword = (inputdata, close) => async (dispatch) => {
    console_log('changePassword', inputdata);
    try {
        const token = localStorage.getItem('jwtToken');
        const res = await request.post('/auth/changepassword', inputdata  , { headers: { Authorization: token }});
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            close();
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const followAndUnFollowDesigner = (inputdata) => async (dispatch) => {
    console_log('followAndUnFollowDesigner', inputdata);
    try {
        const res = await request.post('/users/follow', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getAllUserListing({ isApproved: 'approved', role: 'designer' }));
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const verifyPinCode = async (inputdata, navigate) => {
    const token = localStorage.getItem('forgotToken');
    console_log('verifyPinCode', inputdata, localStorage.getItem('forgotToken'));

    try {
        const res = await axios.post(server_url + 'auth/verifyforgotpin', { pinCode: inputdata }, { headers: { Authorization: token } });
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            console_log('Data', data);
            navigate('/reset-password');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const resetPassword = (inputdata, navigate) => async (dispatch) => {
    console_log('resetpassword', inputdata);
    const token = localStorage.getItem('forgotToken');
    try {
        const res = await axios.post(server_url + 'auth/resetpassword', { password: inputdata }, { headers: { Authorization: token } });
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            console_log('Data', data);
            navigate('/dashboard');
            localStorage.removeItem('forgotToken');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

const setToken = (token, user) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', JSON.stringify('admin'));
};

export const logout =
    (navigate, user = false) =>
    (dispath) => {
        const tokenProtectSite = localStorage.getItem("tokenProtectSite");
        localStorage.clear();
        localStorage.setItem('tokenProtectSite', tokenProtectSite);

        if (user) {
            navigate('/auth');
        } else {
            navigate('/dashboard');
        }
        dispath({
            type: USER_LOGOUT
        });
    };

const checkRedirection = (user, navigate) => {
    if (user.role?.includes('admin') || user.role?.includes('designer') || user.role?.includes('manufacturer') || user.role?.includes('logistic')) {
        navigate('/dashboard/');
    } else {
        navigate('/home');
    }
};

export const checkAuth = (navigate) => (dispatch) => {
    const token = localStorage.getItem('jwtToken');
    var user = localStorage.getItem('user');
    var checkout = localStorage.getItem('checkout');
    checkout = JSON.parse(checkout);
    user = JSON.parse(user);

    if (token) {
        if (checkout) {
            navigate('/checkout', { state: checkout });
        } else {
            if (navigate) {
                checkRedirection(user, navigate);
            }
            dispatch({
                type: AUTH_USER,
                payload: { token: token, user: user }
            });
        }
    } else {
        // navigate('/');
    }
};

export const changeRole = (data, navigate, route) => async (dispatch) => {
    navigate(route);
    dispatch({
        type: UPDATE_ROLE,
        payload: data
    });
};

export const updateUser = (userData) => async (dispatch) => {
    try {
        const res = await request.post('/users/updateUser', userData);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getMyProfile());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const updateProfile = (userData) => async (dispatch) => {
    console.log('Imagge Data =>', userData);
    try {
        const res = await request.post('/users/updateUserProfilePic', userData);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getMyProfile());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const loginProtectSite = async (inputdata) => {
    try {
        const res = await request.post('/auth/loginProtectSite', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            localStorage.setItem('tokenProtectSite', data.token);
            window.location.reload();
        }
    } catch (e) {
        makeToast('error', e.message);
    }
}