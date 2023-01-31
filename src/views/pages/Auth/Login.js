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
import { checkAuth, loginUser } from '../../../redux/action/Auth/index';
import { useDispatch } from 'react-redux';
import UserApprovedPopup from './_part/UserApprovedPopup';
import makeToast from 'utils/Toaster';
import { CheckEmail, validateEmail } from 'utils/helper';

export default function Login() {
    const [values, setValues] = React.useState({
        password: '',
        email: '',
        showPassword: false
    });
    const [approvedPopup, setapprovedPopup] = React.useState(false);
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
    const handleLogin = () => {
        if (values.email && values.password) {
            if (validateEmail(values.email)) {
                dispatch(loginUser(values, navigate, setapprovedPopup));
            } else {
                makeToast('error', 'Email is not valid');
            }
        } else {
            makeToast('error', 'Kindly input all fields');
        }
    };

    useEffect(() => {
        dispatch(checkAuth(navigate));
    }, []);

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
                                        <h3>Login</h3>
                                        <TextField
                                            id="input-with-icon-textfield"
                                            placeholder="Email"
                                            autoComplete="new-password"
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
                                        <br />
                                        <Input
                                            id="standard-adornment-password"
                                            autoComplete="new-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            placeholder="Password"
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
                                        <div className="text-left forgotPassword">
                                            <Link to="/forgot-password" underline="none">
                                                Forgotten password ?
                                            </Link>
                                        </div>
                                        <div className="login-btn">
                                            <Button variant="contained" id="login" onClick={handleLogin}>
                                                Login
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
            <UserApprovedPopup visible={approvedPopup} setVisible={setapprovedPopup} />
        </div>
    );
}
