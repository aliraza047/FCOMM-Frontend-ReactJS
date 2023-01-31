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
import { checkAuth, forgotPassword, loginUser } from '../../../redux/action/Auth/index';
import { useDispatch } from 'react-redux';

export default function ForgetPassword() {
    const [values, setValues] = React.useState({
        email: '',
        showPassword: false
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(checkAuth(navigate));
    // }, []);
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
                                        <h3>Forgot Password</h3>

                                        <div className="register-login">
                                            <p>Kindly Check Your Inbox</p>
                                        </div>

                                        <TextField
                                            id="input-with-icon-textfield"
                                            placeholder="user@gmail.com"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <EmailOutlinedIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            variant="standard"
                                            onChange={handleChange('email')}
                                        />
                                        <div className="login-btn">
                                            <Button variant="contained" onClick={() => dispatch(forgotPassword(values.email, navigate))}>
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
