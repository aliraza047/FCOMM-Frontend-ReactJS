import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkAuth } from 'redux/action/Auth';
import LoginRegister from '../Auth/tabs/LoginRegister';

export default function CustomerLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // useEffect(() => {
    //     dispatch(checkAuth(navigate));
    // }, []);

    return (
        <div>
            <LoginRegister />
        </div>
    );
}
