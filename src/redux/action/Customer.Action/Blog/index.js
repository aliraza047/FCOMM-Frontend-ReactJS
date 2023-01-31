import { GET_HOME_ALL_BLOGS } from 'redux/action/Action.Constant';
import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
export const getBlogListing = () => async (dispatch) => {
    try {
        const res = await request.get('/web/getAllBlogs');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Action Blog Listing', res.data);
            dispatch({
                type: GET_HOME_ALL_BLOGS,
                payload: data.Blogs
            });
        }
    } catch (e) {
        console_log('getAllBlogs', e.message);
    }
};

export const filterBlog = (inputData) => async (dispatch) => {
    console.log('filterBlog typ',inputData)
    try {
        const res = await request.post('/web/filterBlogs',inputData );
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            console.log('Action Blog Listing', res.data);
            dispatch({
                type: GET_HOME_ALL_BLOGS,
                payload: data.Blogs
            });
        }
    } catch (e) {
        console_log('getAllBlogs', e.message);
    }
};
