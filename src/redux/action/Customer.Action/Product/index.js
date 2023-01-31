import {
    CLEAR_PRODUCTS_WEB,
    GET_ALL_PUBLIC_CATEGORIES,
    GET_HOME_ALL_BLOGS,
    GET_HOME_ALL_PRODUCTS,
    GET_PRODUCTS_BY_CATEGORY,
    GET_PRODUCTS_BY_DESIGNER,
    GET_DESIGNER_DETAIL,
    GET_SEARCH_PARM,
    CLEAR_SEARCH_PARM
} from 'redux/action/Action.Constant';
import { console_log, Log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
export const getProductListing = () => async (dispatch) => {
    try {
        const res = await request.get('/web/getAllProducts');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Action Product Listing', res.data);
            dispatch({
                type: GET_HOME_ALL_PRODUCTS,
                payload: data.Product
            });
        }
    } catch (e) {
        console_log('getProductListing', e.message);
    }
};

export const imageToBase64 = (inputData) => async (dispatch) => {
    try {
        const res = await request.post('/web/getImageBas',inputData );
        const { message, status, data } = res.data;
        console.log('sss', data.Product)
        return data.Product
    } catch (e) {
        console_log('getProductListing', e.message);
    }
};

export const getSearchParm = ({ data }) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SEARCH_PARM,
            payload: data
        });
    } catch (e) {
        console_log('getProductListing', e.message);
    }
};

export const clearSearchParm = () => (dispatch) => {
    dispatch({
        type: CLEAR_SEARCH_PARM
    });
};

export const getProductsFiltered = (inputDat) => async (dispatch) => {
    try {
        const res = await request.post('/web/filteredProducts', inputDat);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Action Product Listing', res.data);
            let prod = data.Product;
            if (inputDat?.minPrice) {
                prod = prod.filter((product) => product?.checkTotal === true);
            }
            dispatch({
                type: GET_HOME_ALL_PRODUCTS,
                payload: prod
            });
        }
    } catch (e) {
        console_log('getProductListing', e.message);
    }
};

export const getAllCustomerSideCategories = () => async (dispatch) => {
    try {
        const res = await request.get('/web/getAllCategories');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Action getAllCategories', res.data);
            dispatch({
                type: GET_ALL_PUBLIC_CATEGORIES,
                payload: data.Categories
            });
        }
    } catch (e) {
        console_log('getAllCustomerSideCategories', e.message);
    }
};

export const getProductsByDesigner = (inputData) => async (dispatch) => {
    try {
        const res = await request.post('/web/getProductsByDesigner', inputData);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Action Product Listing by Designer', res.data);
            dispatch({
                type: GET_PRODUCTS_BY_DESIGNER,
                payload: data.Product
            });
            dispatch({
                type: GET_HOME_ALL_PRODUCTS,
                payload: data.Product
            });
            dispatch({
                type: GET_DESIGNER_DETAIL,
                payload: data.User
            })
        }
    } catch (e) {
        console_log('getProductsByDesigner', e.message);
    }
};

export const getProductsByCategory = (inputData) => async (dispatch) => {
    try {
        const res = await request.post('/web/getProductsByCategory', inputData);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Action Product Listing by Category', res.data);
            dispatch({
                type: GET_HOME_ALL_PRODUCTS,
                payload: data.Product
            });

            dispatch({
                type: GET_PRODUCTS_BY_CATEGORY,
                payload: data.Product
            });
        }
    } catch (e) {
        console_log('getProductsByCategory', e.message);
    }
};

export const clearProductListing = () => (dispatch) => {
    Log('CLEAR PRODUCT LISTING');
    dispatch({
        type: CLEAR_PRODUCTS_WEB
    });
};
