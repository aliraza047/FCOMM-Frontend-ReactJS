import { GET_CART, GET_CART_PRICE } from 'redux/action/Action.Constant';
import { console_log, Log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';

export const getCartMyData = () => async (dispatch) => {
    try {
        const res = await request.get('/cart/getMyCart');
        const { message, status, data } = res.data;
        console.log('Action Cart Data Api', res.data);
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            let arrData = data?.Data?.products?.map((x) => x.productId);
            let pric = 0;
            let priceData = data?.Data?.products?.map((x, id) => {
                pric += (Number(x?.productId?.totalPrice) + Number(x?.productId?.makerPrice)) * Number(data?.Data?.products[id]?.quantity);
            });

            console.log('Action Cart Data Api', pric);
            dispatch({
                type: GET_CART,
                payload: data?.Data?.products
            });
            dispatch({
                type: GET_CART_PRICE,
                payload: pric
            });
        }
    } catch (e) {
        // console_log('getCartMyData', e.message);
    }
};

export const checkCart = () => async (dispatch) => {
    try {
        const res = await request.get('/cart/checkCart');
        const { message, status, data } = res.data;
        console.log('Action checkCart Cart Data Api', res.data);
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch(getCartMyData());
        }
    } catch (e) {
        // console_log('getCartMyData', e.message);
    }
};

export const addCart = (inputdata) => async (dispatch) => {
    try {
        const res = await request.post('/cart/addCart', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getCartMyData());
        }
    } catch (e) {
        Log('error', e.message);
    }
};

export const addItemInCart = (inputdata) => async (dispatch) => {
    try {
        const res = await request.post('/cart/addItem', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getCartMyData());
        }
    } catch (e) {
        Log('error', e.message);
    }
};

export const removeItemInCart = (inputdata) => async (dispatch) => {
    console.log('Cart Item Remove', inputdata);
    try {
        const res = await request.post('/cart/removeItem', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getCartMyData());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const removeCart = () => async (dispatch) => {
    try {
        const res = await request.get('/cart/removeMyCart');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', data);
            dispatch({
                type: GET_CART,
                payload: []
            });
        }
    } catch (e) {
        Log('error', e.message);
    }
};

export const removeLocalCart = () => async (dispatch) => {
    try {
        await localStorage.removeItem('@cart');
        dispatch({
            type: GET_CART,
            payload: []
        });
        makeToast('success', 'Your Cart is Empty Now');
    } catch (error) {
        makeToast('error', 'There is some error while deleting Cart');
    }
};
export const getLocalCart = () => async (dispatch) => {
    var data = await localStorage.getItem('@cart');
    data = JSON.parse(data);
    console.log('Data Async', data);
    if (data) {
        dispatch({
            type: GET_CART,
            payload: data
        });
    }
    return null;
};

export const setLocalCart = (product) => async (dispatch) => {
    var data = await localStorage.getItem('@cart');
    data = JSON.parse(data);
    if (data) {
        const checkID = data.find((x) => x._id === product._id);

        if (!checkID) {
            await localStorage.setItem('@cart', JSON.stringify([...data, product]));
            makeToast('success', 'Item added Successfully');
        } else {
            makeToast('error', 'Item Already Added');
        }
    } else {
        localStorage.setItem('@cart', JSON.stringify([product]));
        makeToast('success', 'Item added Successfully');
    }
    dispatch(getLocalCart());
};

export const RemoveSingleLocalCart = (product) => async (dispatch) => {
    var data = await localStorage.getItem('@cart');
    data = JSON.parse(data);
    if (data) {
        const filteredData = data.filter((x) => x._id != product._id);
        await localStorage.setItem('@cart', JSON.stringify(filteredData));
        makeToast('success', 'Item Removed Successfully');
    }
    dispatch(getLocalCart());
};
