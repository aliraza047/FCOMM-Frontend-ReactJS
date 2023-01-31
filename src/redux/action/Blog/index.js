import { console_log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { CLEAR_BLOG_IMAGE, GET_ALL_BLOGS, GET_BLOG_IMAGE } from '../Action.Constant';
import { store } from '../../../store/index';

export const getAllBlogs = (inputData) => async (dispatch) => {
    try {
        const URL = inputData ? '/blogs/getBlogs?isApproved=' + inputData?.isApproved : '/blogs/getBlogs?isApproved=';
        const res = await request.get(URL);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_ALL_BLOGS,
                payload: data.Blogs
            });
        }
    } catch (e) {
        console_log('getAllBlogs', e.message);
    }
};

export const addBlog = (inputdata, naviagte) => async (dispatch) => {
    console_log('addBlog', inputdata);
    try {
        const res = await request.post('/blogs/addBlog', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getAllBlogs());
            naviagte('/dashboard/blogs');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const editBlog = (inputdata, naviagte , naviagteBool = true ) => async (dispatch) => {
    console_log('editBlog my', inputdata);
    const state = await store.getState()._auth;
    const data = inputdata
    data['role'] = state?.role
    console.log('data edit',data)
    try {
        const res = await request.post('/blogs/updateBlog', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            
            if(naviagteBool){
                dispatch(getAllBlogs());
                naviagte('/dashboard/blogs');
            }else{
                dispatch(getAllBlogs({ isApproved: 'pending' }));
                naviagte('/dashboard/blogs-approval');
            }
            
            dispatch(clearBlogImage());
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const uploadBlogImage = (inputdata) => async (dispatch) => {
    console_log('uploadBlogImage', inputdata);
    try {
        const res = await request.post('/blogs/uploadImage', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        console.log('uploadBlogImage Image Actions', res.data);
        if (status === 'Success') {
            dispatch({
                type: GET_BLOG_IMAGE,
                payload: data.Image
            });
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};

export const clearBlogImage = () => (dispatch) => {
    dispatch({
        type: CLEAR_BLOG_IMAGE
    });
};
export const removeBlog = (inputdata, naviagte) => async (dispatch) => {
    console_log('removeBlog', inputdata);
    try {
        const res = await request.post('/blogs/deleteBlog', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', 'Blog Deleted Successfully!');
            dispatch(getAllBlogs({ isApproved: 'approved' }));
            naviagte('/dashboard/blogs');
        }
    } catch (e) {
        makeToast('error', e.message);
    }
};
