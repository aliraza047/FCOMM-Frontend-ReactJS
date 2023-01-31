import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { store } from '../../../store/index';
import { CLEAR_CATEGORY_IMAGE, GET_ALL_ORDERS, GET_ALL_USERS, GET_CATEGORY_IMAGE, UPDATE_ROLE,GET_SINGLE_ORDER, GET_SINGLE_ORDER_TRACKING } from '../Action.Constant';
export const getAllOrders = () => async (dispatch) => {
    const state = await store.getState()._auth;
    console.log('logistic state', state?.role)
    try {
        const res = await request.get('/order/getAllOrders?role=' + state?.role);
        const { message, status, data } = res.data;
        console.log('logistic resp ', data.Data)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_ORDERS,
                payload: data.Data
            });
        }
    } catch (e) {
        console_log('getAllOrders', e.message);
    }
};

export const getSingleOrders = (data) => async (dispatch) => {
    try {
            dispatch({
                type: GET_SINGLE_ORDER,
                payload: data
            });
    } catch (e) {
        console_log('getSingleOrders', e.message);
    }
};

export const getSingleOrderTracking = (inputData) => async (dispatch) => {
    try {
        console.log('getSingleOrderTracking', inputData)
        const res = await request.post('/order/tracking', inputData)
        const { message, status, data } = res.data;
        console.log('res getSingleOrderTracking',data)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_SINGLE_ORDER_TRACKING,
                payload: data?.shipments[0]
            });
        }
    } catch (e) {
        console_log('getAllOrders', e.message);
    }
};

export const editOrder = (inputdata) => async (dispatch) => {
    console_log('editOrder', inputdata);
    try {
        const res = await request.post('/order/updateOrder', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getSingleOrders(data?.Data))
            dispatch(getAllOrders());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const shippmentOrder = (inputdata , setVisible) => async (dispatch) => {
    console_log('editOrder', inputdata);
    try {
        const res = await request.post('/order/createShipment', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getSingleOrders(data))
            dispatch(getAllOrders());
            setVisible(false)
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};
