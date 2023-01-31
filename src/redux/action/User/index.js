import { console_log, Log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { GET_ALL_USERS, UPDATE_ROLE, CLEAR_USER, GET_DASHBOARD_DATA, GET_DESIGNERS_PROFIT } from '../Action.Constant';
import { getMyProfile, updateProfile } from '../Auth/index';
import { store } from '../../../store/index';
export const getAllUsers =
    (obj = null) =>
    async (dispatch) => {
        const URL = obj?.isActive ? '/users/getUsers?isActive=' + obj?.isActive : '/users/getUsers';
        try {
            const res = await request.get(URL);
            const { message, status, data } = res.data;
            if (status === 'Fail') throw res.data;
            if (status === 'Success') {
                dispatch({
                    type: GET_ALL_USERS,
                    payload: data.users
                });
            }
        } catch (e) {
            console_log('getAllUsers', e.message);

            // makeToast('error', e.message);
        }
    };

export const getDashboardData = () => async (dispatch) => {
    const state = await store.getState()._auth;
    try {
        const res = await request.get('/reports/dashboard?role=' + state?.role);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_DASHBOARD_DATA,
                payload: data
            });
            // handleLocalStorage(data.notifyCount)
        }
    } catch (e) {
        console_log('getAllUsers', e.message);

        // makeToast('error', e.message);
    }
};

const handleLocalStorage = (aa) => {
    window.localStorage.setItem('notifyCount', JSON.stringify(aa));

    // window.localStorage.setItem("notifyCount", aa);
    //     const prevCount = window.localStorage.getItem("notifyCount");
    //     if(aa == prevCount){
    //         window.localStorage.setItem("notifyCount", aa);
    //     }else{
    //         window.localStorage.setItem("notifyCount", aa);
    //     window.dispatchEvent(new Event("storage"));
    // }
};

export const getAllUserListing = (inputData) => async (dispatch) => {
    const URL =
        inputData.isApproved && inputData.role
            ? `/auth/getUsers?isApproved=${inputData.isApproved}&role=${inputData.role}`
            : inputData.isActive
            ? `/auth/getUsers?isActive=${!inputData.isActive}`
            : inputData.isApproved
            ? `/auth/getUsers?isApproved=${inputData.isApproved}`
            : inputData.role
            ? `/auth/getUsers?role=${inputData.role}`
            : `/auth/getUsers`;
    console.log('Input get Users', URL, inputData?.isActive);

    try {
        const res = await request.get(URL);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_USERS,
                payload: data.users
            });
        }
    } catch (e) {
        console_log('getAllUsers', e.message);

        // makeToast('error', e.message);
    }
};

export const getUserListingManuDes = (inputData) => async (dispatch) => {
    // const URL = `/auth/getUserManuDes?isApproved=${inputData.isApproved}&role=${inputData.role}`
    // console.log('Input get Users', URL, inputData?.isActive);
console.log('getUserListingManuDes', inputData)
    try {
        const res = await request.post('/auth/getUserManuDes', inputData);
        const { message, status, data } = res.data;
        console.log('res res', data)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_USERS,
                payload: data.users
            });
        }
    } catch (e) {
        console_log('getAllUsers', e.message);

        // makeToast('error', e.message);
    }
};

export const clearUserListing = () => (dispatch) => {
    dispatch({
        type: CLEAR_USER
    });
};

export const addUser = (inputdata, naviagte, profileImageData) => async (dispatch) => {
    console_log('addUser', inputdata);
    console_log('addUser image File', profileImageData);

    try {
        const res = await request.post('/users/createUser', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            if (profileImageData) {
                console_log('Success addUser image File', profileImageData);
                var formData = new FormData();
                const fields = { userId: data?.user._id, profile: profileImageData };
                Object.keys(fields).map((key) => {
                    formData.append(key, fields[key]);
                });
                dispatch(updateProfile(formData));
            }
            if (inputdata?.role?.includes('manufacturer') === true) {
                naviagte('/dashboard/user-manufacture');
                dispatch(getAllUserListing({ isApproved: 'approved', role: 'manufacturer' }));
            } else if (inputdata?.role?.includes('designer') === true) {
                naviagte('/dashboard/user-designer');
                dispatch(getAllUserListing({ isApproved: 'approved', role: 'designer' }));
            }else if (inputdata?.role?.includes('logistic') === true) {
                naviagte('/dashboard/user-designer');
                dispatch(getAllUserListing({ isApproved: 'approved', role: 'designer' }));
            } else if (inputdata?.role?.includes('admin') === true) {
                naviagte('/dashboard/user-admin');
                dispatch(getAllUserListing({ isApproved: 'approved', role: 'admin' }));
            } else if (inputdata?.role?.includes('user') === true) {
                naviagte('/dashboard/user-buyers');
                dispatch(getAllUserListing({ isApproved: 'approved', role: 'user' }));
            }
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const editUser =
    (inputdata, type = '', navigate = null, imageData = null) =>
    async (dispatch) => {
        console_log('updateUser', inputdata);
        try {
            const res = await request.post('/users/updateUser', inputdata);
            const { message, status, data } = res.data;
            if (status === 'Fail') throw res.data;
            if (status === 'Success') {
                if (imageData) {
                    console_log('Success addUser image File', imageData);
                    var formData = new FormData();
                    const fields = { userId: inputdata?.id, profile: imageData };
                    Object.keys(fields).map((key) => {
                        formData.append(key, fields[key]);
                    });
                    dispatch(updateProfile(formData));
                }
                console.log(message);
                makeToast('success', message);
                // dispatch(getAllUsers());
                if (type?.includes('manufacturer') === true) {
                    console.log('Manufacture');
                    dispatch(getAllUserListing({ isApproved: 'unapproved', role: 'manufacturer' }));
                }
                if (type?.includes('designer') === true) {
                    console.log('Designer');
                    dispatch(getAllUserListing({ isApproved: 'unapproved', role: 'designer' }));
                }
                if (type?.includes('user') === true) {
                    console.log('User');
                    dispatch(getAllUserListing({ isApproved: 'unapproved', role: 'user' }));
                }
                if (navigate) {
                    navigate(-1);
                }

                dispatch(getMyProfile());
            }
        } catch (e) {
            makeToast('error', e.message);
        }
    };

export const payUsingStripe = (inputdata) => async (dispatch) => {
    console_log('payUsingStripe', inputdata);
    try {
        const res = await request.post('/stripe/charge', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            Log('Charge DATA=>', res.data);
            makeToast('success', message);
            makeToast('success', 'Your Order has been Placed!Thanks');
        }
    } catch (e) {
        makeToast('payUsingStripe error', e.message);
    }
};

export const addNewStripeCard = (inputdata, close, load) => async (dispatch) => {
    console_log('addNewStripeCard', inputdata);
    try {
        const res = await request.post('/stripe/addCard', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            close(false);
            load(false);
            makeToast('success', message);
            dispatch(getMyProfile());
        }
        load(false);
    } catch (e) {
        makeToast('addNewStripeCard error', e.message);
        load(false);
    }
};

export const removeUser = (inputdata, naviagte) => async (dispatch) => {
    console_log('removeUser', inputdata);
    try {
        const res = await request.post('/users/removeUser', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', 'User Deleted Successfully!');
            dispatch(getAllUsers());
            naviagte('/dashboard/users');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const approveUser = (inputdata, type) => async (dispatch) => {
    console_log('approveUser', inputdata);
    try {
        const res = await request.post('/users/approveUser', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', 'User Approved Successfully!');
            // dispatch(getAllUserListing())
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};
