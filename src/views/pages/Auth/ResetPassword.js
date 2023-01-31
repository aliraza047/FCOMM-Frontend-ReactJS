import React, { useEffect } from 'react';
import '../styles/Login.scss';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { PATH_NAME } from '../../Routing/Path.name';
import { useNavigate } from 'react-router';
import { checkAuth, loginUser, resetPassword } from '../../../redux/action/Auth/index';
import { useDispatch } from 'react-redux';
import makeToast from 'utils/Toaster';

export default function ResetPassword() {
    const [values, setValues] = React.useState({
        password: '',
        cpassword: '',
        showPassword: false
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // useEffect(() => {
    //     dispatch(checkAuth(navigate));
    // }, []);

    const onClickResetPassword = () => {
        if (values.password && values.cpassword) {
            if (values.password === values.cpassword) {
                dispatch(resetPassword(values.password, navigate));
            } else {
                makeToast('error', 'Password Does not Match');
            }
        } else {
            makeToast('error', 'Kindly Fill All the Fields');
        }
    };
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-md-12 mx-auto">
                        <div className="login-back">
                            <div className="row">
                                <div className="col-lg-4 col-md-2">
                                    <img src={Logo} alt="logo" />
                                </div>
                                <div className="col-lg-4 col-md-8">
                                    <div className="email-password">
                                        <h3>Reset Password</h3>
                                        <Input
                                            id="standard-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            placeholder="New Password"
                                            className="place"
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <br />
                                        <Input
                                            id="standard-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            placeholder="Confirm Password"
                                            className="place"
                                            value={values.cpassword}
                                            onChange={handleChange('cpassword')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <div className="login-btn">
                                            <Button variant="contained" onClick={onClickResetPassword}>
                                                Submit
                                            </Button>
                                        </div>
                                        <div className="register-login">
                                            <p>
                                                Don’t have an account? <Link to="/dashboard/register">Register.</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
