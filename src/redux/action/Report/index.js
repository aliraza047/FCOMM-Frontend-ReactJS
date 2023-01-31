import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { store } from '../../../store/index';

import {
    GET_REPORT,
    GET_REPORT_OF_COM_ORDER,
    GET_REPORT_OF_CAN_ORDER,
    GET_REPORT_PRODUCT_ID,
    CLEAR_REPORT,
    CLEAR_USER_REPORT,
    GET_REPORT_BY_USERID,
    GET_DESIGNERS_PROFIT,
    GET_REPORT_SOLD_PRODUCTS
} from 'redux/action/Action.Constant';

export const getAllReport = () => async (dispatch) => {
    try {
        const res = await request.get('/reports/report?role=admin&startDate=2021-02-01&endDate=2022-03-03');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_REPORT,
                payload: data
            });
        }
    } catch (e) {
        console_log('getReports', e.message);
    }
};

export const reportByProductStatusGraph = (statusProduct) => async (dispatch) => {
    try {
        const res = await request.get(`/reports/reportByProductStatusGraph?status=${statusProduct.status}&role=admin`);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            if (statusProduct.status == 'shipped') {
                dispatch({
                    type: GET_REPORT_OF_COM_ORDER,
                    payload: data
                });
            } else if (statusProduct.status == 'cancelled') {
                dispatch({
                    type: GET_REPORT_OF_CAN_ORDER,
                    payload: data
                });
            }
        }
    } catch (e) {
        console_log('getReports', e.message);
    }
};

export const getProductReportById =
    (obj, newDispatch = false) =>
    async (dispatch) => {
        const { id, start, end } = obj;
        console.log('Call Action getProductReportById', id);
        dispatch(clearReportState());
        try {
            const res = await request.get(`/reports/reportByProductId?id=${id}&startDate=${start}&endDate=${end}`);
            const { message, status, data } = res.data;
            if (status === 'Fail') throw res.data;
            if (status === 'Success') {
                if (newDispatch) {
                    dispatch({
                        type: GET_REPORT_PRODUCT_ID,
                        payload: data
                    });
                } else {
                    dispatch({
                        type: GET_REPORT,
                        payload: data
                    });
                }
            }
        } catch (e) {
            console_log('getProductReportById', e.message);
        }
    };

export const getReportByUserId = (obj) => async (dispatch) => {
    const { id, start, end } = obj;
    try {
        const res = await request.get(`/reports/reportByUserId?userId=${id}&startDate=${start}&endDate=${end}`);
        const { message, status, data } = res.data;
        console.log('getReportByUserId', res.data);
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_REPORT_BY_USERID,
                payload: data
            });
        }
    } catch (e) {
        console_log('getReportByUserId', e.message);
    }
};

export const getProductReportByIdAndStatus = (obj) => async (dispatch) => {
    dispatch(clearReportAllState(obj));
    const state = await store.getState()._auth;
    const { id, status, userId } = obj;
    const URL = userId
        ? `/reports/reportByProductIdAndStatus?id=${id}&status=${status}&role=${state.role}&userId=${userId}`
        : id
        ? `/reports/reportByProductIdAndStatus?id=${id}&status=${status}&role=${state.role}`
        : `/reports/reportByProductIdAndStatus?status=${status}&role=${state.role}`;
    try {
        const res = await request.get(URL);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Response SHIPPED', data);
            if (obj.status === 'shipped' || obj.status === 'received') {
                console.log('SHIPPED', data);
                dispatch({
                    type: GET_REPORT_OF_COM_ORDER,
                    payload: data
                });
            } else if (obj.status === 'cancelled') {
                dispatch({
                    type: GET_REPORT_OF_CAN_ORDER,
                    payload: data
                });
            } else if (obj.status === 'all') {
                dispatch({
                    type: GET_REPORT_PRODUCT_ID,
                    payload: data
                });
            } else if (obj.status === 'sold') {
                dispatch({
                    type: GET_REPORT_SOLD_PRODUCTS,
                    payload: data
                });
            }
        }
    } catch (e) {
        console_log('getProductReportByIdAndStatus', e.message);
    }
};

export const getReportOfDesignerProfit = () => async (dispatch) => {
    try {
        const res = await request.get('/reports/reportByDesignerProfit');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_DESIGNERS_PROFIT,
                payload: data?.profit
            });
        }
    } catch (e) {
        console_log('getReportOfDesignerProfit', e.message);

        // makeToast('error', e.message);
    }
};

export const clearUserReport = () => (dispatch) => {
    dispatch({
        type: CLEAR_USER_REPORT
    });
};
export const clearReportState = () => (dispatch) => {
    dispatch({
        type: CLEAR_REPORT
    });
};

export const clearReportAllState = (obj) => (dispatch) => {
    const data = [];
    if (obj.status === 'shipped' || obj.status === 'received') {
        dispatch({
            type: GET_REPORT_OF_COM_ORDER,
            payload: data
        });
    } else if (obj.status === 'cancelled') {
        dispatch({
            type: GET_REPORT_OF_CAN_ORDER,
            payload: data
        });
    } else if (obj.status === 'all') {
        dispatch({
            type: GET_REPORT_PRODUCT_ID,
            payload: data
        });
    } else if (obj.status === 'sold') {
        dispatch({
            type: GET_REPORT_SOLD_PRODUCTS,
            payload: data
        });
    }
};
