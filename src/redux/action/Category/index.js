import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { CLEAR_CATEGORY_IMAGE, GET_ALL_CATEGORIES, GET_ALL_USERS, GET_CATEGORY_IMAGE, UPDATE_ROLE } from '../Action.Constant';
export const getAllCategories = () => async (dispatch) => {
    try {
        const res = await request.get('/products/listCategory');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: data.Categories
            });
        }
    } catch (e) {
        console_log('getAllCategories', e.message);

        // makeToast('error', e.message);
    }
};

export const addCategories = (inputdata, naviagte) => async (dispatch) => {
    console_log('addCategories', inputdata);
    try {
        const res = await request.post('/products/addCategory', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getAllCategories());
            naviagte('/dashboard/categories');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const editCategory = (inputdata, naviagte) => async (dispatch) => {
    console_log('updateUser', inputdata);
    try {
        const res = await request.post('/products/updateCategory', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getAllCategories());
            naviagte('/dashboard/categories');
            dispatch(clearCategoryImage());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const uploadImageCategory = (inputdata) => async (dispatch) => {
    console_log('uploadImageCategory', inputdata);
    try {
        const res = await request.post('/products/uploadImage', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        console.log('uploadImageCategory Image Actions', res.data);
        if (status === 'Success') {
            dispatch({
                type: GET_CATEGORY_IMAGE,
                payload: data.Image
            });
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const clearCategoryImage = () => (dispatch) => {
    dispatch({
        type: CLEAR_CATEGORY_IMAGE
    });
};
export const removeCategories = (inputdata, naviagte) => async (dispatch) => {
    console_log('removeCategories', inputdata);
    try {
        const res = await request.post('/products/removeCategories', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', 'Category Deleted Successfuly!');
            dispatch(getAllUsers());
            naviagte('/dashboard/categories');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};
