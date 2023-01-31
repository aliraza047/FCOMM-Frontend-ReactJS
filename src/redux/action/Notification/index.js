import { console_log } from 'utils/helper';
import request from 'utils/request';
import { GET_NOTIFICATIONS } from '../Action.Constant';

export const getAllNotifications = () => async (dispatch) => {
    try {
        const res = await request.get('/settings/getNotification');
        const { message, status, data } = res.data;
        console.log('getAllNotifications data', data.count)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_NOTIFICATIONS,
                payload: data?.notification
            });
        }
    } catch (e) {
        console_log('getAllNotification', e.message);
    }
};

export const getNotifyCount= () => async (dispatch) => {
    try {
        const res = await request.get('/settings/getNotification');
        const { message, status, data } = res.data;
        console.log('getAllNotifications data', data.count)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            JSON.stringify(localStorage.setItem("notifyCount" , JSON.parse(data.count)))              
        }
    } catch (e) {
        console_log('getAllNotification', e.message);
    }
};

export const addMarkAsRead = (inputdata) => async (dispatch) => {
    console_log('addMarkAsRead', inputdata);
    try {
        const res = await request.post('/settings/markAsRead', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch(getAllNotifications());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};
