import { console_log, Log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { store } from '../../../store/index';
import {
    CLEAR_SETTING_IMAGES,
    GET_ALL_USERS,
    GET_BANNER_IMAGE,
    GET_GALLERY,
    GET_SETTING,
    GET_SLIDER_IMAGE,
    GET_SOCIALS,
    UPDATE_ROLE
} from '../Action.Constant';
export const getSetting = () => async (dispatch) => {
    try {
        const res = await request.get('/setting');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_SETTING,
                payload: data.Setting
            });
            if (data.Setting && data.Setting.slidersImages) {
                dispatch(setImageSlider(data.Setting.slidersImages));
            }
        }
    } catch (e) {
        console_log('getSetting', e.message);

        // makeToast('error', e.message);
    }
};

export const addSocial = (inputdata, close) => async (dispatch) => {
    console_log('addContactUs', inputdata);
    try {
        const res = await request.post('/settings/addSocial', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            close(false);
            dispatch(getAllSocials());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const removeSocial = (inputdata) => async (dispatch) => {
    console_log('removeSocial', inputdata);
    try {
        const res = await request.post('/settings/removeSocial', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getAllSocials());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const getAllSocials = () => async (dispatch) => {
    Log('getAllSocials getAllSocials');

    try {
        const res = await request.post('/settings/getSocial');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        Log('Success Socail', res.data);
        if (status === 'Success') {
            dispatch({
                type: GET_SOCIALS,
                payload: data?.Social
            });
        }
    } catch (e) {
        console_log('getAllSocials', e.message);

        // makeToast('error', e.message);
    }
};

export const addSetting = (inputdata) => async (dispatch) => {
    console_log('addSetting', inputdata);
    try {
        const res = await request.post('/settings/addSetting', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getSetting());
            // dispatch(clearSettingImages());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const editSetting = (inputdata) => async (dispatch) => {
    console_log('editSetting', inputdata);
    try {
        const res = await request.post('/settings/updateSetting', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getSetting());
            dispatch(clearSettingImages());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const uploadImageGallery = (inputdata, navigate) => async (dispatch) => {
    console_log('uploadImageGallery', '');
    const { setting } = await store.getState()._setting;
    try {
        const res = await request.post('/settings/addGallaryImage', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        console.log('uploadImageGallery Image Actions', res.data);
        if (status === 'Success') {
            dispatch(getAllGalleryImages());
            makeToast('success', message);
            navigate('/dashboard/Gallery');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const removeImageGallery = (inputdata, navigate) => async (dispatch) => {
    console_log('removeImageGallery', '');
    try {
        const res = await request.post('/settings/deleteGallary', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        console.log('uploadImageGallery Image Actions', res.data);
        if (status === 'Success') {
            dispatch(getAllGalleryImages());
            makeToast('success', data);
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const getAllGalleryImages = () => async (dispatch) => {
    Log('getAllGalleryImages getAllGalleryImages');

    try {
        const res = await request.post('/settings/getGallaryImage');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        Log('Success', res.data);
        if (status === 'Success') {
            dispatch({
                type: GET_GALLERY,
                payload: data?.Gallary
            });
        }
    } catch (e) {
        console_log('getAllGalleryImages', e.message);

        // makeToast('error', e.message);
    }
};

export const uploadImageSlider =
    (inputdata, image, type, update = false) =>
    async (dispatch) => {
        console_log('uploadImageSlider', type);
        const { setting } = await store.getState()._setting;
        console.log('Store==>', setting?._id);
        try {
            const res = await request.post('/settings/addBanner', inputdata);
            const { message, status, data } = res.data;
            if (status === 'Fail') throw res.data;
            console.log('uploadImageSlider Image Actions', res.data);
            if (status === 'Success') {
                if (type === 'slider') {
                    var varData = image ? [...image, data.image] : [data.image];
                    console.log('Type Slider uploadImageSlider Image Actions', varData);
                    dispatch({
                        type: GET_SLIDER_IMAGE,
                        payload: varData
                    });
                } else {
                    var varData = image ? [...image, data.image] : [data.image];
                    dispatch({
                        type: GET_BANNER_IMAGE,
                        payload: varData
                    });
                }

                setting
                    ? dispatch(editSetting({ id: setting?._id, slidersImages: varData }))
                    : dispatch(addSetting({ slidersImages: varData }));
            }
        } catch (e) {
            makeToast('error', e.message);
        }
    };

export const setImageSlider = (inputdata) => (dispatch) => {
    try {
        dispatch({
            type: GET_SLIDER_IMAGE,
            payload: inputdata
        });
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const clearSettingImages = () => (dispatch) => {
    dispatch({
        type: CLEAR_SETTING_IMAGES
    });
};

export const savePassword = (inputdata) => async (dispatch) => {
    try {
        const res = await request.post('/settings/savePassword', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getSetting());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const enableProtectSite = (inputdata) => async (dispatch) => {
    try {
        const res = await request.post('/settings/enableProtectSite', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getSetting());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};
