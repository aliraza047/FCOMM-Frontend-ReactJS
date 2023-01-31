import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { store } from '../../../store/index';
import { GET_ALL_REWARDSS , GET_CURRENT_REWARD, REMOVE_CURRENT_REWARD , GET_ALL_REWARDS_TRACKING} from '../Action.Constant';

export const getAllRewards = () => async (dispatch) => {
    try {
        const URL = '/coupons/getAllCoupons';
        const res = await request.get(URL);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_REWARDSS,
                payload: data.Data
            });
        }
    } catch (e) {
        console_log('getAllRewards', e.message);
    }
};

export const addRewards = (inputdata, naviagte) => async (dispatch) => {
    console_log('addRewards', inputdata);
    try {
        const res = await request.post('/coupons/addCoupon', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getAllRewards());
            naviagte('/dashboard/rewards');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const editRewards = (inputdata, naviagte) => async (dispatch) => {
    console_log('editRewards', inputdata);
    try {
        const res = await request.post('/coupons/updateCoupon', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getAllRewards());
            naviagte('/dashboard/rewards');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const deleteRewards = (inputdata) => async (dispatch) => {
    console_log('deleteCoupon', inputdata);
    try {
        const res = await request.delete(`/coupons/deleteCoupon/${inputdata.id}`);
        const { message, status, data } = res.data;
        console.log('res delete',res,data)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getAllRewards());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const applyRewards = (inputdata) => async (dispatch) => {
    console_log('applyRewards', inputdata);
    try {
        const res = await request.post('/coupons/applyCoupon', inputdata);
        const { message, status, data } = res.data;
        console.log('res applyRewards',res)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch({
                type: GET_CURRENT_REWARD,
                payload: data?.Data
            });
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const removeReward = () => async (dispatch) => {
    dispatch({
        type: REMOVE_CURRENT_REWARD,
    });
};

export const couponEmail = (inputdata) => async (dispatch) => {
    console_log('applyRewards', inputdata);
    try {
        const res = await request.post('/coupons/sentEmailCoupon', inputdata);
        const { message, status, data } = res.data;
        console.log('res applyRewards',res)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const getAllRewardTracking = () => async (dispatch) => {
    try {
        const URL = '/coupons/getAllCouponApplied';
        const res = await request.get(URL);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_REWARDS_TRACKING,
                payload: data.Data
            });
        }
    } catch (e) {
        console_log('getAllRewardTracking', e.message);
    }
};