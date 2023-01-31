import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { GET_ALL_PAYMENT, CLEAR_ALL_PAYMENT, GET_MY_PAYMENTS, GET_USER_PAYMENTS, GET_PAYMENT_BALANCE } from '../Action.Constant';
import { store } from '../../../store/index';
import { isArrayCheck } from 'views/utilities/common';

export const clearUserApprovedRequest = () => (dispatch) => {
    dispatch({
        type: GET_USER_PAYMENTS,
        payload: []
    });
};
export const getUserApprovedRequest = (inputData) => async (dispatch) => {
    dispatch(clearUserApprovedRequest());
    try {
        // const URL = inputData ? '/blogs/getBlogs?isApproved=' + inputData?.isApproved : '/blogs/getBlogs?isApproved=';
        const res = await request.post('/transactions/getMyTransactions', inputData);
        const { message, status, data } = res.data;
        console.log('payment res', res.data);
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_USER_PAYMENTS,
                payload: data.Data
            });
        }
    } catch (e) {
        console_log('getMyRequest', e.message);
    }
};

export const getMyRequest = (inputData) => async (dispatch) => {
    try {
        const res = await request.post('/transactions/getMyTransactions', inputData);
        const { message, status, data } = res.data;
        console.log('payment res', res.data);
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_PAYMENT,
                payload: data.Data
            });
        }
    } catch (e) {
        console_log('getMyRequest', e.message);
    }
};

export const getAllPayment = (inputData) => async (dispatch) => {
    console.log('get all payments', inputData);
    try {
        console.log('getAllPayment', inputData);
        const res = await request.post('/transactions/getAllTransactions', inputData);
        const { message, status, data } = res.data;
        console.log('payment res', res.data);
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Before Data All Payments ===>', data);
            let newData = data;
            if (isArrayCheck(newData)) {
                console.log('Before Data All Payments IF===>', data);
                newData = newData.map((dat) => dat?.data);
                dispatch({
                    type: GET_ALL_PAYMENT,
                    payload: newData
                });
            } else {
                console.log('Before Data All Payments ELSE===>', data);
                if (isArrayCheck(data?.Data)) {
                    dispatch({
                        type: GET_ALL_PAYMENT,
                        payload: data.Data
                    });
                } else {
                    dispatch({
                        type: GET_ALL_PAYMENT,
                        payload: []
                    });
                }
            }
        }
    } catch (e) {
        console_log('getAllBlogs', e.message);
    }
};

export const sendPaymentRequest =
    (inputData, navigate, key = true, handleClose) =>
    async (dispatch) => {
        try {
            console.log('sendPaymentRequest', inputData, inputData.get('chkCall'));
            const res = await request.post('/transactions/request', inputData);
            const { message, status, data } = res.data;
            console.log('payment res', res.data);
            if (status === 'Fail') makeToast('error', message);
            if (status === 'Success') {
                makeToast('success', message);
                if (key) {
                    dispatch(getMyRequest());
                    navigate('/dashboard/request-payment');
                } else {
                    dispatch(getAllPayment({ role: inputData.get('chkCall'), status: 'approved' }));
                    handleClose();
                }
            }
        } catch (e) {
            console_log('getAllBlogs', e.message);
        }
    };

export const deletePaymentRequest = (inputData) => async (dispatch) => {
    try {
        console.log('sendPaymentRequest', inputData);
        const res = await request.post('/transactions/deleteTransactionReq', inputData);
        const { message, status, data } = res.data;
        console.log('payment res', res.data);
        if (status === 'Fail') makeToast('error', message);
        if (status === 'Success') {
            makeToast('success', data);
            dispatch(getMyRequest());
        }
    } catch (e) {
        console_log('getAllBlogs', e.message);
    }
};

export const editPaymentRequest =
    (inputData, handleClose, key = true) =>
    async (dispatch) => {
        try {
            console.log('editPaymentRequest', inputData);
            const res = await request.post('/transactions/updateTransactions', inputData);
            const { message, status, data } = res.data;
            console.log('payment res', res.data);
            if (status === 'Fail') makeToast('error', message);
            if (status === 'Success') {
                makeToast('success', message);
                if (key) {
                    dispatch(getAllPayment({ status: 'pending' ,approvalRequest: true }));
                    handleClose();
                } else {
                    dispatch(getMyRequest());
                    handleClose('/dashboard/request-payment');
                }

                // navigate('/dashboard/request-payment')
            }
        } catch (e) {
            console_log('getAllBlogs', e.message);
        }
    };

export const clearPaymentListing = () => (dispatch) => {
    console.log('clearPaymentListing');
    dispatch({
        type: CLEAR_ALL_PAYMENT
    });
};

export const getPaymentBalance = (inputData) => async (dispatch) => {
    try {
        const res = await request.post('/balances/getBalance', inputData);
        const { message, status, data } = res.data;
        console.log('payment res', res.data);
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_PAYMENT_BALANCE,
                payload: data
            });
        }
    } catch (e) {
        console_log('getBalance', e.message);
    }
};
