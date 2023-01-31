import { GET_CART, GET_CART_PRICE, GET_WISHLIST } from 'redux/action/Action.Constant';
import { console_log, Log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';

export const getWishlistData = () => async (dispatch) => {
    try {
        const res = await request.get('/wishlist/getMyWishlist');
        const { message, status, data } = res.data;
        console.log('Action Wishlist Data Api', res.data);
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Action Wishlist Data Api');
            dispatch({
                type: GET_WISHLIST,
                payload: data?.Data?.products
            });
        } else {
            dispatch({
                type: GET_WISHLIST,
                payload: []
            });
        }
    } catch (e) {
        dispatch({
            type: GET_WISHLIST,
            payload: []
        });
    }
};

export const addWishlist = (inputdata) => async (dispatch) => {
    try {
        const res = await request.post('/wishlist/addWishlist', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getWishlistData());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const addItemInWishlist = (inputdata) => async (dispatch) => {
    try {
        const res = await request.post('/wishlist/addItem', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getWishlistData());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const removeItemInWishlist = (inputdata) => async (dispatch) => {
    console.log('Wishlist Item Remove', inputdata);
    try {
        const res = await request.post('/wishlist/removeItem', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getWishlistData());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const removeWishlist = () => async (dispatch) => {
    try {
        const res = await request.get('/wishlist/removeMyWishlist');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', data);
            dispatch({
                type: GET_WISHLIST,
                payload: []
            });
        }
    } catch (e) {
        Log('error', e.message);
    }
};

// export const removeLocalCart = () => async (dispatch) => {
//     try {
//         await localStorage.removeItem('@cart');
//         dispatch({
//             type: GET_CART,
//             payload: []
//         });
//         makeToast('success', 'Your Cart is Empty Now');
//     } catch (error) {
//         makeToast('error', 'There is some error while deleting Cart');
//     }
// };
// export const getLocalCart = () => async (dispatch) => {
//     var data = await localStorage.getItem('@cart');
//     data = JSON.parse(data);
//     console.log('Data Async', data);
//     if (data) {
//         dispatch({
//             type: GET_CART,
//             payload: data
//         });
//     }
//     return null;
// };

// export const setLocalCart = (product) => async (dispatch) => {
//     var data = await localStorage.getItem('@cart');
//     data = JSON.parse(data);
//     if (data) {
//         const checkID = data.find((x) => x._id === product._id);

//         if (!checkID) {
//             await localStorage.setItem('@cart', JSON.stringify([...data, product]));
//             makeToast('success', 'Item added Successfully');
//         } else {
//             makeToast('error', 'Item Already Added');
//         }
//     } else {
//         localStorage.setItem('@cart', JSON.stringify([product]));
//         makeToast('success', 'Item added Successfully');
//     }
//     dispatch(getLocalCart());
// };

// export const RemoveSingleLocalCart = (product) => async (dispatch) => {
//     var data = await localStorage.getItem('@cart');
//     data = JSON.parse(data);
//     if (data) {
//         const filteredData = data.filter((x) => x._id != product._id);
//         await localStorage.setItem('@cart', JSON.stringify(filteredData));
//         makeToast('success', 'Item Removed Successfully');
//     }
//     dispatch(getLocalCart());
// };
