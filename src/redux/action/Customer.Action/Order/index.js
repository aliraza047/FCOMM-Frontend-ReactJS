import { addMethodArray, checkValueInArray, checkValueInArrayCart, console_log, removeArrayShipping } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { removeCart, removeItemInCart } from '../Cart';
import { isArrayCheck } from 'views/utilities/common';
import { GET_ORDERS, GET_SHIPPING_DHL, SELECTED_PRODUCTS, REMOVE_SHIPPING_DHL } from 'redux/action/Action.Constant';
import { payUsingStripe } from 'redux/action/User';
import { store } from '../../../../store/index';

export const placeOrder = (inputdata, naviagte, id, cartdata, user) => async (dispatch) => {
    console_log('placeOrder', { inputdata, cartdata });
    const state = await store.getState()._cart;

    try {
        const res = await request.post('/order/place', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            console.log('Placre Order Success===>', data);
            const orderIds = data?.Data?.map((x) => x._id);

            for (let i = 0; i < inputdata?.products?.length; i++) {
                console.log(
                    i,
                    '=Loop=>',
                    inputdata?.products[i],
                    state?.cart_data,
                    checkValueInArrayCart(state?.cart_data, inputdata?.products[i]?.productId)
                );
                if (checkValueInArrayCart(state?.cart_data, inputdata?.products[i]?.productId)) {
                    dispatch(removeItemInCart({ id: inputdata?.products[i]?.productId }));
                }
            }
            dispatch(setSelectedProducts([]));
            dispatch(
                payUsingStripe({
                    amount: Number(inputdata?.totalAmount) * 100,
                    orderId: JSON.stringify(orderIds),
                    cus_id: user?.user?.cus_id,
                    source: String(inputdata?.payment?.account)
                })
            );
            naviagte('/');
            localStorage.setItem('checkout', null);
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const getProductDeliveryCharges = (inputdata, prevData) => async () => {
    try {
        // if(prevData){
        //     dispatch(removeDHLResponse());
        // }
        const res = await request.post('/order/getDeliveryCharges', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            // const reArr = removeArrayShipping(state?.shipping_data, data);
            // const upArr = addMethodArray(reArr, data);
            // console.log('Data Sucess Dhl Api =>', upArr);

            // dispatch(saveDHLResponse([data]));
            return data;
        }
    } catch (e) {
        makeToast('error', e.message);
        return null;
    }
};

export const saveDHLResponse = (data) => (dispatch) => {
    dispatch({
        type: GET_SHIPPING_DHL,
        payload: data
    });
};

export const removeDHLResponse = (data) => (dispatch) => {
    dispatch({
        type: REMOVE_SHIPPING_DHL
    });
};

export const getAllMyOrders = () => async (dispatch) => {
    try {
        const res = await request.get('/order/getAllOrders?role=user');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ORDERS,
                payload: data.Data
            });
        }
    } catch (e) {
        console_log('getAllMyOrders', e.message);
    }
};

export const setSelectedProducts = (data) => (dispatch) => {
    console.log('Redux Selected Added', data);
    dispatch({
        type: SELECTED_PRODUCTS,
        payload: data
    });
};

export const clearShippingDHL = () => (dispatch) => {
    dispatch({
        type: GET_SHIPPING_DHL,
        payload: []
    });
};
