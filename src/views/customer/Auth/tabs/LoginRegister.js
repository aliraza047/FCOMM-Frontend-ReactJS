import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../../../../assets/scss/style.scss';
import makeToast from 'utils/Toaster';
import { useDispatch } from 'react-redux';
import { loginUser, signupUser, checkAuth } from 'redux/action/Auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import UserApprovedPopup from 'views/pages/Auth/_part/UserApprovedPopup';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { validateEmail } from 'utils/helper';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

function LoginRegister() {
    const [value, setValue] = React.useState(0);
    const [fullName, setfullName] = useState('');
    const [userName, setuserName] = useState('');
    const [email, setemail] = useState('');
    const [phoneNum, setphoneNum] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [open, setopen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(checkAuth(navigate));
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleRegister = () => {
        if (fullName && userName && email && phoneNum && password && cpassword) {
            if (cpassword === password) {
                if (validateEmail(email)) {
                    signupUser(
                        {
                            email: email,
                            password: password,
                            username: userName,
                            fullname: userName,
                            last_name: fullName,
                            phone_number: phoneNum,
                            role: 'user'
                        },
                        setValue,
                        'user'
                    );
                } else {
                    makeToast('error', 'Email is not valid');
                }
            } else {
                makeToast('error', 'Password Doesnt Match');
            }
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
    const handleLogin = () => {
        if (email && password) {
            if (validateEmail(email)) {
                dispatch(loginUser({ email, password }, navigate));
                dispatch(checkAuth(navigate));
            } else {
                makeToast('error', 'Email is not valid');
            }
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
    return (
        <div>
            <div className="login-register">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-2"></div>
                        <div className="col-lg-4 col-md-8 col-11 mx-auto login-back">
                            <div className="register-login">
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Register" {...a11yProps(0)} className="border-right" />
                                    <Tab label="Login" {...a11yProps(1)} />
                                </Tabs>
                                <TabPanel value={value} index={0}>
                                    <TextField
                                        id="standard-basic"
                                        label="Full Name"
                                        variant="standard"
                                        onChange={(e) => setfullName(e.target.value)}
                                    />
                                    <TextField
                                        id="standard-basic"
                                        label="Username"
                                        variant="standard"
                                        onChange={(e) => setuserName(e.target.value)}
                                    />
                                    <TextField
                                        id="standard-basic"
                                        label="Email"
                                        variant="standard"
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                    <TextField
                                        id="standard-basic"
                                        label="Phone No."
                                        variant="standard"
                                        onChange={(e) => setphoneNum(e.target.value)}
                                    />
                                    <TextField
                                        id="standard-basic"
                                        label="Password"
                                        variant="standard"
                                        type={'password'}
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                    <TextField
                                        id="standard-basic"
                                        label="Confirm Password"
                                        variant="standard"
                                        type={'password'}
                                        onChange={(e) => setcpassword(e.target.value)}
                                    />
                                    <Button className="login-register-btn" onClick={handleRegister}>
                                        Register
                                    </Button>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <TextField
                                        id="standard-basic"
                                        label="Email"
                                        variant="standard"
                                        onChange={(e) => setemail(e.target.value)}
                                    />
                                    <TextField
                                        id="standard-basic"
                                        label="Password"
                                        variant="standard"
                                        type={'password'}
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                    <Button className="login-register-btn" onClick={handleLogin}>
                                        Login
                                    </Button>
                                    <Link className="forget-password" to="/forgot-password">
                                        Forget Password?
                                    </Link>
                                </TabPanel>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-2" />
                    </div>
                </div>
            </div>
            <UserApprovedPopup visible={open} setVisible={setopen} />
        </div>
    );
}

export default LoginRegister;
