import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';


import { GET_ABOUT_US } from '../Action.Constant';

export const getAboutUs = () => async (dispatch) => {
    try {
        const res = await request.get('/web/getAboutUs');
        const { message, status, data } = res.data;
        console.log('data',data.Data)
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ABOUT_US,
                payload: data?.Data[0]
            });
        }
    } catch (e) {
        console_log('getAllNotification', e.message);
    }
};

export const addAboutUs = (inputdata , navigate) => async (dispatch) => {
    console_log('addContactUs', inputdata);
    try {
        const res = await request.post('/aboutus/addAboutUs', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            // navigate('/dashboard')
            dispatch(getAboutUs());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
}
