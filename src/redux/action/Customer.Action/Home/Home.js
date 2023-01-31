import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { GET_HOME_PAGE_DATA } from '../../Action.Constant';

export const getHomePageData = () => async (dispatch) => {
    try {
        const res = await request.get('/web/index');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_HOME_PAGE_DATA,
                payload: data.Data
            });
        }
    } catch (e) {
        console_log('getHomePageData', e.message);

        // makeToast('error', e.message);
    }
};
