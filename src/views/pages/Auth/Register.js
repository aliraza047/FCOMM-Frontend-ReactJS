import React, { useRef, useState } from 'react';
import '../styles/Register.scss';
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signupUser } from 'redux/action/Auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import RoleSelector from 'views/dashboard/UserListing/_part/RoleSelector';
import { DayInNumber, MonthInNumber, YearInNumber } from 'views/utilities/common';
import { validateEmail } from 'utils/helper';
import makeToast from 'utils/Toaster';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { Country, State, City } from 'country-state-city';
import DropdownSelector from 'ui-component/dropdown';

const usePlaceholderStyles = styled((theme) => ({
    placeholder: {
        color: '#9f9e9e'
    }
}));

const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
};

export default function Register() {
    const refImage = useRef(null);
    const refImage2 = useRef(null);

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        cpassword: '',
        first_name: '',
        username: '',
        last_name: '',
        showPassword: false,
        showPassword2: false,
        phone_number: '',
        profile: '',
        certificate: '',
        nic: '',
        address: '',
        description: '',
        postalCode: '',
        country: '',
        countryCode: '',
        state: '',
        stateCode: '',
        city: '',
        studio: '',
        studioDesc: ''
    });

    const [url, seturl] = React.useState('');
    const [url2, seturl2] = React.useState('');
    const [role, setrole] = React.useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (prop) => (event) => {
        if (prop == 'countryCode') {
            const countryDetail = Country.getCountryByCode(event.target.value);
            setValues({ ...values, [prop]: event.target.value, country: countryDetail?.name, state: '', stateCode: '', city: '' });
        }
        else if (prop == 'stateCode') {
            const stateDetail = State.getStateByCode(event.target.value);
            setValues({ ...values, [prop]: event.target.value, state: stateDetail?.name, });
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };
    const handleClickShowPassword2 = () => {
        setValues({
            ...values,
            showPassword2: !values.showPassword2
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [answer, setAnswer] = React.useState('');
    const [gender, setgender] = React.useState('');
    const [country, setcountry] = React.useState('');
    const [city, setcity] = React.useState('');
    const [dob1, setdob1] = React.useState('');
    const [dob2, setdob2] = React.useState('');
    const [dob3, setdob3] = React.useState('');

    const imageUpload = (e, type) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            if (type === 1) {
                seturl(e.target.result);
                setValues({ ...values, profile: file });
            } else {
                seturl2(e.target.result);
                setValues({ ...values, certificate: file });
            }
        };
        reader.readAsDataURL(file);
    };

    const imageUploadBanner = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl2(e.target.result);
            setValues({ ...values, certificate: file });
        };
        reader.readAsDataURL(file);
    };

    const handleRegister = () => {
        // const stateDetail = State.getStateByCode(values.state);
        // const countryDetail = Country.getCountryByCode(values.country);

        const fields = {
            username: values.username,
            password: values.password,
            password2: values.cpassword,
            fullname: values.username,
            email: values.email,
            role: role,
            phone_number: values.phone_number,
            date_of_birth: dob2 + '/' + dob1 + '/' + '/' + dob3,
            gender: gender,
            // nic: values.nic,
            country: values.country,
            countryCode: values.countryCode,
            state: values.state,
            stateCode: values.stateCode,
            city: values.city,
            address: values.address,
            postalCode: values.postalCode,
            description: values.description,
            profile: values.profile,
            banner: values.certificate,
            studio: values.studio,
            studioDesc: values.studioDesc,
            myAddresses: JSON.stringify([{
                houseNo: '',
                streetNo: '',
                poBoxNo: values?.postalCode,
                state: values?.state,
                stateCode: values.stateCode,
                city: values?.city,
                country: values?.country,
                countryCode: values?.countryCode
            }])
            
        };
        console.log('Fields', fields);
        var formData = new FormData();
        Object.keys(fields).map((key) => {
            formData.append(key, fields[key]);
        });
        if (validateEmail(values.email)) {
            signupUser(formData, navigate);
        } else {
            makeToast('error', 'Email is not valid');
        }
    };
    return (
        <div className="register">
            <div className="container">
                <div className="register-back">
                    <div className="row align-items-center text-center">
                        <div className="col-lg-3 col-md-3">
                            <img src={Logo} alt="logo" />
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <h3>Register</h3>
                        </div>
                        <div className="col-lg-3 col-md-3" />
                    </div>
                    <div className="row">
                        <div className="col-lg-8 mx-auto col-md-10">
                            <div className="register-form">
                                <div className="row">
                                    <div className="col-lg-5 col-md-5">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            placeholder="Full Name"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PersonOutlineIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            onChange={handleChange('username')}
                                            variant="standard"
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-2" />
                                    <div className="col-lg-5 col-md-5">
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
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-5 col-md-5">
                                        <Input
                                            id="standard-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            autoComplete="new-password"
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
                                    </div>
                                    <div className="col-lg-2 col-md-2" />
                                    <div className="col-lg-5 col-md-5">
                                        <Input
                                            id="standard-adornment-passwords"
                                            type={values.showPassword2 ? 'text' : 'password'}
                                            placeholder="Confirm Password"
                                            autoComplete="new-password"
                                            className="place"
                                            value={values.password2}
                                            onChange={handleChange('cpassword')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword2}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword2 ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-8 col-md-5 mx-auto date-birth">
                                        <div className="row">
                                            <h5>Date of Birth</h5>
                                            <div className="col-lg-4">
                                                <Select
                                                    value={dob1}
                                                    displayEmpty
                                                    onChange={(event) => setdob1(event.target.value)}
                                                    renderValue={dob1 !== '' ? undefined : () => <Placeholder>Day</Placeholder>}
                                                >
                                                    {DayInNumber && DayInNumber.map((data) => <MenuItem value={data}>{data}</MenuItem>)}
                                                </Select>
                                            </div>
                                            <div className="col-lg-4">
                                                <Select
                                                    value={dob2}
                                                    displayEmpty
                                                    onChange={(event) => setdob2(event.target.value)}
                                                    renderValue={dob2 !== '' ? undefined : () => <Placeholder>Month</Placeholder>}
                                                >
                                                    {MonthInNumber && MonthInNumber.map((data) => <MenuItem value={data}>{data}</MenuItem>)}
                                                </Select>
                                            </div>
                                            <div className="col-lg-4">
                                                <Select
                                                    value={dob3}
                                                    displayEmpty
                                                    onChange={(event) => setdob3(event.target.value)}
                                                    renderValue={dob3 !== '' ? undefined : () => <Placeholder>Year</Placeholder>}
                                                >
                                                    {YearInNumber && YearInNumber.map((data) => <MenuItem value={data}>{data}</MenuItem>)}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-5 col-md-5">
                                        <Select
                                            value={gender}
                                            displayEmpty
                                            onChange={(event) => setgender(event.target.value)}
                                            renderValue={gender !== '' ? undefined : () => <Placeholder>Gender</Placeholder>}
                                        >
                                            <MenuItem value="male">Male</MenuItem>
                                            <MenuItem value="female">Female</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="col-lg-2 col-md-2" />
                                    {/* <div className="col-lg-5 col-md-5">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            type={'number'}
                                            placeholder="National ID"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <CreditCardIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            variant="standard"
                                            onChange={handleChange('nic')}
                                        />
                                    </div> */}
                                </div>
                                {/* <div className="row">
                                    <div className="col-lg-5 col-md-5">
                                        <Select
                                            value={country}
                                            displayEmpty
                                            onChange={(event) => setcountry(event.target.value)}
                                            renderValue={country !== '' ? undefined : () => <Placeholder>Country</Placeholder>}
                                        >
                                            <MenuItem value="Country 1">Country 1</MenuItem>
                                            <MenuItem value="Country 2">Country 2</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="col-lg-2 col-md-2" />
                                    <div className="col-lg-5 col-md-5">
                                        <Select
                                            value={city}
                                            displayEmpty
                                            onChange={(event) => setcity(event.target.value)}
                                            renderValue={city !== '' ? undefined : () => <Placeholder>City</Placeholder>}
                                        >
                                            <MenuItem value="City 1">City 1</MenuItem>
                                            <MenuItem value="City 2">City 2</MenuItem>
                                            <MenuItem value="City 3">City 3</MenuItem>
                                        </Select>
                                    </div>
                                </div> */}
                                {/* {console.log('Countries', Country.getAllCountries())}
                                {console.log('State', State.getStatesOfCountry('AF'))}
                                {console.log('City', City.getAllCities())} */}
                                <div className="row">
                                    <div className="col-lg-5 col-md-5">
                                        <DropdownSelector
                                            listData={Country.getAllCountries()}
                                            placeholder={'Select Country'}
                                            setValue={handleChange('countryCode')}
                                            showText={'name'}
                                            setText={'isoCode'}
                                            value={values.countryCode}
                                        />
                                        {/* <CountryDropdown
                                            id="UNIQUE_ID"
                                            className="YOUR_CSS_CLASS"
                                            preferredCountries={['gb', 'us']}
                                            placeholder="Country"
                                            value="Country"
                                            handleChange={handleChange('country')}
                                        ></CountryDropdown> */}
                                    </div>
                                    <div className="col-lg-2 col-md-2" />
                                    {/* <div className="col-lg-5 col-md-5">
                                        <DropdownSelector
                                            listData={State.getStateByCode(values.country)}
                                            placeholder={'Select State'}
                                            setValue={handleChange('state')}
                                            showText={'name'}
                                            value={values.state}
                                        />
                                        
                                    </div> */}
                                </div>

                                {values.country ? (
                                    <div className="row">
                                        <div className="col-lg-5 col-md-5">
                                            <DropdownSelector
                                                listData={State.getStatesOfCountry(values.countryCode)}
                                                placeholder={'Select State'}
                                                setValue={handleChange('stateCode')}
                                                showText={'name'}
                                                setText={'isoCode'}
                                                value={values.stateCode}
                                            />
                                            {/* <TextField
                                      id="input-with-icon-textfield"
                                      placeholder="City"
                                      variant="standard"
                                      onChange={handleChange('city')}
                                  /> */}
                                        </div>

                                        <div className="col-lg-2 col-md-2" />

                                        <div className="col-lg-5 col-md-5">
                                            {values.state ? (
                                                <DropdownSelector
                                                    listData={City.getCitiesOfState(values.countryCode, values.stateCode)}
                                                    placeholder={'Select City'}
                                                    setValue={handleChange('city')}
                                                    showText={'name'}
                                                    setText={'name'}
                                                    value={values.city}
                                                />
                                            ) : null}
                                            {/* <CountryDropdown
                                      id="UNIQUE_ID"
                                      className="YOUR_CSS_CLASS"
                                      preferredCountries={['gb', 'us']}
                                      placeholder="Country"
                                      value="Country"
                                      handleChange={handleChange('country')}
                                  ></CountryDropdown> */}
                                        </div>
                                    </div>
                                ) : null}

                                <div className="row">
                                    <div className="col-lg-5 col-md-5">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            placeholder="Address"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <LocationOnIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            variant="standard"
                                            onChange={handleChange('address')}
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-2" />
                                    <div className="col-lg-5 col-md-5">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            placeholder="Postal Code"
                                            variant="standard"
                                            onChange={handleChange('postalCode')}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <TextField
                                        id="input-with-icon-textfield"
                                        placeholder="Description"
                                        variant="standard"
                                        multiline={true}
                                        rows={3}
                                        onChange={handleChange('description')}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-lg-5 col-md-5">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            type={'number'}
                                            placeholder="Contact Number"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <LocalPhoneOutlinedIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            variant="standard"
                                            onChange={handleChange('phone_number')}
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-2" />
                                    <div className="col-lg-5 col-md-5">
                                        <RoleSelector role={role} setrole={setrole} register={true} />
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col-lg-5 col-md-5">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            placeholder="Company Name"
                                            // InputProps={{
                                            //     endAdornment: (
                                            //         <InputAdornment position="end">
                                            //             <LocationOnIcon />
                                            //         </InputAdornment>
                                            //     )
                                            // }}
                                            variant="standard"
                                            onChange={handleChange('studio')}
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-2" />
                                    <div className="col-lg-5 col-md-5">
                                        <TextField
                                            id="input-with-icon-textfield"
                                            placeholder="Company Description"
                                            variant="standard"
                                            onChange={handleChange('studioDesc')}
                                        />
                                    </div>
                                </div> */}

                                <div className="upload-buttons">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-5">
                                            <div className="upload-heading">
                                                <p>Profile Image (250 x 210)</p>
                                            </div>
                                            <div className="upload-btn">
                                                <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                                    <div className="fixed-plus-icon">
                                                        <AddIcon />
                                                    </div>
                                                    {url && (
                                                        <img
                                                            src={url}
                                                            alt=""
                                                            style={{
                                                                height: 210,
                                                                width: 250,
                                                                objectFit: 'cover',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer',
                                                                position: 'relative',
                                                                top: '-2px',
                                                                left: '-2px'
                                                            }}
                                                        />
                                                    )}

                                                    <input
                                                        ref={refImage}
                                                        type="file"
                                                        name="image"
                                                        id="file-input"
                                                        accept="image/x-png,image/gif,image/jpeg"
                                                        onChange={(e) => imageUpload(e, 1)}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2" />
                                        {/* <div className="col-lg-5 col-md-5">
                                            <div className="upload-heading">
                                                <p>Certificate Image</p>
                                            </div>
                                            <div className="upload-btn">
                                                <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                                    <div className="plus-icon">
                                                        <AddIcon />
                                                    </div>
                                                    {url2 ? (
                                                        <img
                                                            src={url2}
                                                            alt=""
                                                            style={{ height: 146, width: 146, objectFit: 'cover', borderRadius: '8px' }}
                                                        />
                                                    ) : (
                                                        <input
                                                            ref={refImage2}
                                                            type="file"
                                                            id="file-input"
                                                            name="image"
                                                            accept="image/x-png,image/gif,image/jpeg"
                                                            onChange={(e) => imageUploadBanner(e)}
                                                        />
                                                    )}
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="register-btn">
                                    <Button variant="contained" id="register" onClick={handleRegister}>
                                        Register
                                    </Button>
                                </div>
                                <div className="register-login">
                                    <p>
                                        Don’t have an account? <Link to="/dashboard">Login.</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
