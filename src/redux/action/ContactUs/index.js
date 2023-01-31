import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { getAllSocials } from '../Setting';
// import { store } from '../../../store/index';

export const addContactUs = (inputdata) => async (dispatch) => {
    console_log('addContactUs', inputdata);
    try {
        const res = await request.post('/web/addContact', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};
