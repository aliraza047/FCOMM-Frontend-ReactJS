import axios from 'axios';
import { server_url } from './config';
import makeToast from './Toaster';
const request = () => {
    let instance = axios.create({});
    instance.interceptors.request.use(async (config) => {
        var jwtToken = await localStorage.getItem('jwtToken');
        config.headers.Authorization = jwtToken ? jwtToken : '';
        config.baseURL = server_url;
        return config;
    });
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log('error.response.data.error', error.response.data.message);
            // makeToast('error', error.response.data.message);
            if ([401, 403].includes(error.response.status)) {
                window.location.href = '/';
            }
            return error.response;
        }
    );
    return instance;
};

export default request();
