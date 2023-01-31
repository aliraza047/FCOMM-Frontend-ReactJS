import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { getSetting, savePassword, enableProtectSite } from 'redux/action/Setting';
import { useDispatch, useSelector } from 'react-redux';

const PasswordProtectSettings = () => {
    const dispatch = useDispatch();
    const { setting } = useSelector((state) => state._setting);

    const [values, setValues] = useState({
        password: '',
        confirmPassword: '',
        currentPassword: ''
    });
    const stateEnable = setting?.enableProtectPassword ? setting?.enableProtectPassword : false;

    useEffect(() => {
        dispatch(getSetting());
    }, []);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSavePassword = () => {
        dispatch(
            savePassword({
                ...values,
                _id: setting?._id
            })
        );
    };

    const handleEnableProtect = (e) => {
        const checked = !stateEnable;
        dispatch(
            enableProtectSite({
                enableProtectPassword: checked,
                _id: setting?._id
            })
        );
    };

    return (
        <div className="row">
            <div className="contactussettings">
                <div className="heading">
                    <h2>Settings - Password Protect</h2>
                </div>
                <div className="col-md-6">
                    <div
                        style={{
                            fontFamily: 'Mulish-Bold !important',
                            color: '#000',
                            fontSize: '16px'
                        }}
                    >
                        <Switch checked={stateEnable} onChange={(e) => handleEnableProtect(e)} />
                        <span style={{ fontSize: '16px' }}>Enable Protect Site </span>
                    </div>

                    {setting?.sitePassword && (
                        <div className="input-field">
                            <label className="label" htmlFor="currentPassword">
                                Current Password
                            </label>
                            <input
                                type="password"
                                className="form-control "
                                name="currentPassword"
                                value={values.currentPassword}
                                onChange={handleChange('currentPassword')}
                            />
                        </div>
                    )}
                    <div className="input-field">
                        <label className="label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control "
                            name="password"
                            value={values.password}
                            onChange={handleChange('password')}
                        />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control "
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                        />
                    </div>
                    <div className="save-btn">
                        <Button variant="contained" className="savebtn mx-2" onClick={() => handleSavePassword()}>
                            Cancel
                        </Button>

                        <Button variant="contained" className="savebtn" onClick={() => handleSavePassword()}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordProtectSettings;
