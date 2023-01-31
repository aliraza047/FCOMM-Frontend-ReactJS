import { CLOSE_DRAWER, GET_HOME_ALL_BLOGS, OPEN_DRAWER } from 'redux/action/Action.Constant';
import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
export const openDrawer = () => async (dispatch) => {
    dispatch({
        type: OPEN_DRAWER
    });
};

export const closeDrawer = () => async (dispatch) => {
    dispatch({
        type: CLOSE_DRAWER
    });
};
