import { console_log, Log } from 'utils/helper';
import request from 'utils/request';
import makeToast from 'utils/Toaster';
import { GET_CHAT, GET_CONVERSATIONS } from '../Action.Constant';

export const getMyConversations = () => async (dispatch) => {
    try {
        const res = await request.get('/users/getConversation');
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            dispatch({
                type: GET_CONVERSATIONS,
                payload: data?.Data
            });
        }
    } catch (e) {
        console_log('getMyConversations error', e.message);

        // makeToast('error', e.message);
    }
};

export const createConversation = (Id, close) => async (dispatch) => {
    console_log('createConversation', Id);
    try {
        const res = await request.post('/users/createConversation?receiverId=' + Id);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            close(false);
            dispatch(getMyConversations());
        }
    } catch (e) {
        makeToast('createConversation error', e.message);
    }
};

export const sendMessage = (inputdata) => async (dispatch) => {
    console_log('sendMessage', inputdata);
    try {
        const res = await request.post('/users/sendmessage', inputdata);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        if (status === 'Success') {
            makeToast('success', message);
            dispatch(getChat(inputdata?.conID));
        }
    } catch (e) {
        makeToast('sendMessage error', e.message);
    }
};

export const getChat = (Id) => async (dispatch) => {
    Log('getChat getChat', Id);

    try {
        const res = await request.get('/users/getmessage?conversationId=' + Id);
        const { message, status, data } = res.data;
        if (status === 'Fail') throw res.data;
        Log('Success Socail', res.data);
        if (status === 'Success') {
            dispatch({
                type: GET_CHAT,
                payload: data?.Data
            });
        }
    } catch (e) {
        console_log('getChat', e.message);

        // makeToast('error', e.message);
    }
};
