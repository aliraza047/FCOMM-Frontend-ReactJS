import { MENU_OPEN } from 'store/actions';
import { console_log, Log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { store } from '../../../store/index';
import {
    ADD_PRODUCT,
    ADD_VARIANT,
    GET_ALL_PRODUCTS,
    VARIANT_IMAGE,
    CLEAR_VARIANT_IMAGE,
    CLEAR_VARIANT,
    ALL_PRODUCT_IMAGE,
    CLEAR_PRODUCT_IMAGE,
    GET_ALL_PRODUCTS_NOT_APPROVED,
    CLEAR_PRODUCTS_LISTING,
    GET_PRODUCT_REVIEWS,
    CLEAR_PRODUCT_REVIEWS,
    GET_ALL_PRODUCTS_REVIEWS,
    ALL_PRODUCT_VISUALIZATION_IMAGES,
    ALL_VISUAL_IMAGE,
    CLEAR_VISUAL_IMAGE,
    SET_VISUAL_PRODUCT_IMAGE,
    GET_PRODUCT_PRICE_RANGE
} from '../Action.Constant';
export const getAllProducts =
    (value = null) =>
    async (dispatch) => {
        dispatch(clearProductListing());
        const state = await store.getState()._auth;
        const URL = value
            ? `/products/getProducts?isApproved=${value}&role=${state?.role}`
            : `/products/getProducts?isApproved=approved&role=${state?.role}`;
        try {
            const res = await request.get(URL);
            const { message, status, data } = res.data;
            if (status === 'Fail') throw res.data;
            if (status === 'Success') {
                dispatch({
                    type: GET_ALL_PRODUCTS,
                    payload: data.Product
                });
            }
        } catch (e) {
            console_log('getAllProducts', e.message);
        }
    };

export const getAllNotApprovedProduct = (inputData) => async (dispatch) => {
    console.log('getAllNotApprovedProduct', inputData);
    try {
        const res = await request.get(`/products/getProducts?isApproved=${inputData?.isApproved}&role=${inputData?.role}`);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_PRODUCTS_NOT_APPROVED,
                payload: data.Product
            });
        }
    } catch (e) {
        console_log('getAllProducts', e.message);
    }
};

export const getProductsWithReviews = () => async (dispatch) => {
    console.log('getProductsWithReviews');
    try {
        const res = await request.get('/products/getProductReview');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_PRODUCTS_REVIEWS,
                payload: data?.rating
            });
        }
    } catch (e) {
        console_log('getProductsWithReviews Error', e.message);
    }
};

export const addProduct =
    (inputdata, naviagte, popup = null) =>
    async (dispatch) => {
        console_log('addProduct', inputdata);
        const state = await store.getState()._auth;

        try {
            const res = await request.post('/products/addProduct', inputdata);
            const { message, status, data } = res.data;
            if (status === 'Fail') throw res.data;
            if (status === 'Success') {
                makeToast('success', message);
                dispatch(getAllProducts('unapproved'));
                naviagte('/dashboard/products', { state: { value: 'unapproved' } });
                dispatch(clearVariant());
                dispatch(clearProductImage());
                if (popup) {
                    popup(true);
                }
            }
        } catch (e) {
            makeToast('error', e.message);
        }
    };

export const addVariant = (inputdata, naviagte, variant) => async (dispatch) => {
    console_log('addVariant', inputdata, variant);
    try {
        const res = await request.post('/products/addVariant', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);

            let varData = variant ? [...variant, data.Variant] : [data.Variant];
            console.log('Vardata', varData);
            dispatch({
                type: ADD_VARIANT,
                payload: varData
            });
            naviagte();
            dispatch(clearVariantImage());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const addProductView = async (inputdata) => {
    console_log('addView', inputdata);
    try {
        const res = await request.post('/products/addProductViewByProdId ', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
        }
    } catch (e) {
        // makeToast('error', e.message);
    }
};

export const uploadImageVariant = (inputdata, image) => async (dispatch) => {
    console_log('uploadImageVariant', inputdata, image);
    try {
        const res = await request.post('/products/addGallaryImage', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        let imageFile = image ? image : [];
        let varData = image ? [...image, data.image] : [data.image];
        console.log('uploadImageVariant Image Actions', varData);
        if (status === 'Success') {
            dispatch({
                type: VARIANT_IMAGE,
                payload: varData
            });
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const uploadImageProduct = (inputdata, image) => async (dispatch) => {
    console_log('uploadImageProduct', inputdata, image);
    try {
        const res = await request.post('/products/addProductGallaryImage', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        let varData = image ? [...image, data.image] : [data.image];
        console.log('uploadImageProduct Image Actions', varData);
         console.log('ttt',varData)
        if (status === 'Success') {
            dispatch({
                type: ALL_PRODUCT_IMAGE,
                payload: varData
            });
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const uploadVisualProduct = (inputdata) => async (dispatch) => {
    // console_log('uploadImageProduct', inputdata, image);
    try {
        // const res = await request.post('/web/imageUpload', inputdata);
        // const { message, status, data } = res.data;
        // if (status === 'Fail') throw res.data;
        // let varData = [data.image];
        // console.log('uploadImageProduct Image Actions', varData);
        //  console.log('ttt',varData)
        if (inputdata) {
            dispatch({
                type: ALL_VISUAL_IMAGE,
                payload: inputdata
            });
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const clearVisualProduct = () => (dispatch) => {
    dispatch({
        type: CLEAR_VISUAL_IMAGE
    });
};

export const setVisualProductImage = (inputData) => (dispatch) => {
    console.log('input setVisualProductImage',inputData)
    dispatch({
        type: SET_VISUAL_PRODUCT_IMAGE,
        payload:inputData
    });
};

export const setImageProduct = (inputdata) => async (dispatch) => {
    console_log('uploadImageProduct ali', inputdata);
    try {
            dispatch({
                type: ALL_PRODUCT_IMAGE,
                payload: inputdata
            })
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const setVisualImageProduct = (inputdata) => async (dispatch) => {
    console_log('uploadImageProduct ali', inputdata);
    try {
            dispatch({
                type: ALL_PRODUCT_VISUALIZATION_IMAGES,
                payload: inputdata
            })
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const uploadVisualImageProduct = (inputdata, image) => async (dispatch) => {
    console_log('uploadVisualImageProduct', inputdata, image);
    try {
        const res = await request.post('/products/addProductTransparentImage', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        let varData = image ? [...image, data.image] : [data.image];
        console.log('uploadVisualImageProduct Image Actions', varData);

        if (status === 'Success') {
            dispatch({
                type: ALL_PRODUCT_VISUALIZATION_IMAGES,
                payload: varData
            });
        }
    } catch (e) {
        makeToast('uploadVisualImageProduct error', e.message);
    }
};

export const removeImageProduct = (inputdata) => (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_IMAGE,
            payload: inputdata
        });
    } catch (e) {
        makeToast('error', e.message);
    }
};
export const removeVisualImageProduct = (inputdata) => (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_VISUALIZATION_IMAGES,
            payload: inputdata
        });
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const clearVariant = () => (dispatch) => {
    dispatch({
        type: CLEAR_VARIANT
    });
};
export const clearProductListing = () => (dispatch) => {
    dispatch({
        type: CLEAR_PRODUCTS_LISTING
    });
};
export const clearProductImage = () => (dispatch) => {
    dispatch({
        type: CLEAR_PRODUCT_IMAGE
    });
};

export const clearVariantImage = () => (dispatch) => {
    dispatch({
        type: CLEAR_VARIANT_IMAGE
    });
};
export const editProduct =
    (inputdata, naviagte, unapproveData = null) =>
    async (dispatch) => {
        const state = await store.getState()._auth;
        console_log('editProduct', inputdata);
        try {
            const res = await request.post('/products/updateProduct', inputdata);
            const { message, status, data } = res.data;
            if (status === 'Fail') throw res.data;
            if (status === 'Success') {
                makeToast('success', message);
                dispatch(getAllProducts());
                dispatch(getAllNotApprovedProduct({ isApproved: 'unapproved', role: state?.role }));

                if (unapproveData) {
                    dispatch(getAllProducts());
                    if (state?.role === 'designer') {
                        Log('DESIGNER');
                        naviagte('/dashboard/products', { state: { value: '' } });
                    } else {
                        if (inputdata.isAdminEdit) {
                            naviagte('/dashboard/products');
                        } else {
                            naviagte('/dashboard/products-approved');
                        }
                        localStorage.setItem('@menu', 'products');
                        Log('MENU ADMIN');
                    }
                }
                dispatch(clearVariant());
                dispatch(clearVariantImage());
                dispatch(clearProductImage());
            }
        } catch (e) {
            makeToast('error', e.message);
        }
    };

export const removeMultiProducts = (inputdata) => async (dispatch) => {
    console_log('removeMultiProducts', inputdata);
    try {
        const res = await request.post('/products/removeProducts', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', data);
            dispatch(getAllProducts());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const editVariant = (inputdata, naviagte, close) => async (dispatch) => {
    console_log('updateVariant', inputdata);
    try {
        const res = await request.post('/products/updateVariant', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            if (close) {
                close();
            }
            makeToast('success', message);
            dispatch(getAllProducts());

            if (naviagte) {
                naviagte('/dashboard/products');
            }
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};
export const deleteVariation = (inputdata, storeData) => async (dispatch) => {
    try {
        let data = storeData;
        data = data.filter((x) => x?._id != inputdata);
        console.log('Data Filtered', data);
        dispatch({
            type: ADD_VARIANT,
            payload: data
        });
        makeToast('success', 'Variation Deleted Successfully');
    } catch (error) {
        makeToast('error', 'There is some error while deleting variant');
    }
};

export const addReview = async (inputdata, close) => {
    console_log('addReview', inputdata);
    try {
        const res = await request.post('/products/addReview', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            close();
        }
    } catch (e) {
        makeToast('addReview error', e.message);
    }
};

export const getReviewsByProductId = (prodId) => async (dispatch) => {
    dispatch(clearProductReviewsListing());
    console.log('getReviewsByProductId', prodId);
    try {
        const res = await request.get(`/web/getReviewByProdId?prodId=${prodId}`);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_PRODUCT_REVIEWS,
                payload: data
            });
        }
    } catch (e) {
        console_log('getAllProducts', e.message);
    }
};

export const clearProductReviewsListing = () => (dispatch) => {
    console.log('clearProductReviewsListing');
    dispatch({
        type: CLEAR_PRODUCT_REVIEWS
    });
};

export const getPriceRange= () => async (dispatch) => {
    try {
        const res = await request.get('/products/getProductPrice');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_PRODUCT_PRICE_RANGE,
                payload: data.Product
            });
        }
    } catch (e) {
        console_log('getAllProducts', e.message);
    }
};

export const setPriceRange= (inputdata , naviagte) => async (dispatch) => {
    console_log('setPriceRange', inputdata);
    try {
        const res = await request.post('/products/addProductPrice' , inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getPriceRange());
            naviagte('/dashboard/settings-price-range')
        }   
    } catch (e) {
        console_log('getAllProducts', e.message);
    }
};

export const updatPriceRange= (inputdata , naviagte) => async (dispatch) => {
    console_log('setPriceRange', inputdata);
    try {
        const res = await request.post('/products/updateProductPrice' , inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getPriceRange());
            naviagte('/dashboard/settings-price-range')
        }   
    } catch (e) {
        console_log('getAllProducts', e.message);
    }
};

export const deletePriceRange= (inputdata ) => async (dispatch) => {
    console_log('setPriceRange', inputdata);
    try {
        const res = await request.delete(`/products/deleteProductPrice/${inputdata.id}` );
        console.log('deletePriceRange',res)
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', data);
            dispatch(getPriceRange());
        }   
    } catch (e) {
        console_log('getAllProducts', e.message);
    }
};

// export const removeUser = (inputdata, naviagte) => async (dispatch) => {
//     console_log('removeUser', inputdata);
//     try {
//         const res = await request.post('/dashboard/removeUser', inputdata);
//         const { message, status, data } = res.data;
//         if (status === 'Fail') throw res.data;
//         if (status === 'Success') {
//             makeToast('success', 'User Deleted Successfully!');
//             dispatch(getAllUsers());
//             naviagte('/dashboard/users');
//         }
//     } catch (e) {
//         makeToast('error', e.message);
//     }
// };

// export const approveUser = (inputdata) => async (dispatch) => {
//     console_log('approveUser', inputdata);
//     try {
//         const res = await request.post('/dashboard/approveUser', inputdata);
//         const { message, status, data } = res.data;
//         if (status === 'Fail') throw res.data;
//         if (status === 'Success') {
//             makeToast('success', 'User Approved Successfuly!');
//             dispatch(getAllUsers());
//         }
//     } catch (e) {
//         makeToast('error', e.message);
//     }
// };
