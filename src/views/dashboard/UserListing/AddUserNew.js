// project imports
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import UserImg from '../../../assets/images/users/user-round.svg';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser, removeUser } from 'redux/action/User';
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import { RMIUploader } from 'react-multiple-image-uploader';
import edit from '../../../assets/images/icons/edit-pencil.svg';
import upload from '../../../assets/images/icons/upload-image.svg';
import flag from '../../../assets/images/icons/flag-icon.svg';
import { getSetting } from 'redux/action/Setting';
import { base_url, base_url_new } from 'utils/config';
import RoleSelector from './_part/RoleSelector';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Input from '@mui/material/Input';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { updateProfile } from '../../../redux/action/Auth/index';
import DropdownSelector from 'ui-component/dropdown';
import { City, Country, State } from 'country-state-city';
const usePlaceholderStyles = styled((theme) => ({
    placeholder: {
        color: '#9f9e9e'
    }
}));

const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
};

const AddUserNew = () => {
    const { isAuthenticated, user, role: userRole } = useSelector((state) => state._auth);
    const [isLoading, setLoading] = useState(true);
    const [userName, setuserName] = useState('');
    const [idCard, setidCard] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [country, setcountry] = useState('');
    const [city, setcity] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [state, setstate] = useState('');
    const [address, setaddress] = useState('');
    const [description, setdescription] = useState('');

    const [gender, setgender] = useState('');
    const [lastName, setlastName] = useState('');
    const [role, setrole] = useState([]);
    const [alignment, setAlignment] = useState(0);
    const [value, setValue] = React.useState(null);
    const [url, seturl] = React.useState('');
    const [imageFile, setimageFile] = React.useState('');
    const refImage = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log('Image File', imageFile);
    const imageUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl(e.target.result);
            setimageFile(file);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        setLoading(false);
        dispatch(getSetting());
    }, []);

    const addNewUser = () => {
        const stateDetail = State.getStateByCode(state);
        const countryDetail = Country.getCountryByCode(country);

        const fields = {
            username: userName,
            password: password,
            role: role,
            fullname: userName,
            email: email,
            phone_number: phone,
            first_name: userName,
            date_of_birth: value,
            gender: gender,
            nic: idCard,
            country: countryDetail?.name,
            countryCode: countryDetail?.isoCode,
            city: city,
            state: stateDetail?.name,
            stateCode: stateDetail?.isoCode,
            address: address,
            postalCode: postalCode,
            approve: 'approved',
            description: description
            // profile: imageFile
        };
        console.log(fields);
        var formData = new FormData();
        Object.keys(fields).map((key) => {
            formData.append(key, fields[key]);
        });
        if (userName && email && password && role) {
            dispatch(addUser(fields, navigate, imageFile));
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
    return (
        <>
            <div className="add-thread settingsMain">
                <h2 className="border-0">Add User</h2>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="user-img">
                            <div className="position-relative">
                                {url ? (
                                    <>
                                        <img src={url} alt="user" />
                                        <label htmlFor="contained-button-file">
                                            <Input
                                                accept="image/*"
                                                id="contained-button-file"
                                                className="d-none"
                                                type="file"
                                                ref={refImage}
                                                name="image"
                                                onChange={(e) => imageUpload(e)}
                                            />
                                            <img src={upload} className="uploadImg" alt="" />
                                        </label>{' '}
                                    </>
                                ) : (
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            accept="image/*"
                                            id="contained-button-file"
                                            className="d-none"
                                            type="file"
                                            ref={refImage}
                                            name="image"
                                            onChange={(e) => imageUpload(e)}
                                        />
                                        <img
                                            src={'https://remapconsulting.com/wp-content/uploads/2018/03/Image-placeholder-man.jpg'}
                                            alt="user"
                                        />
                                        <img src={upload} className="uploadImg" alt="" />
                                    </label>
                                )}

                                {/* <img
                                    src={user?.user?.profile?.includes('http') ? user?.user?.profile : base_url + user?.user?.profile}
                                    alt="user"
                                />
                                <img src={upload} className="uploadImg" alt="" /> */}
                            </div>

                            <div className="text-start d-flex align-items-center">
                                <div className="h5 mb-0">{userName}</div>
                                <img src={edit} className="editPencil mb-0" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6"></div>
                    <div className="col-md-5 mt-1">
                        <div className="input-field">
                            <label className="label" htmlFor="user-name">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                value={userName}
                                name="user-name"
                                onChange={(e) => setuserName(e.target.value)}
                            />
                        </div>
                        <div className="input-field search-fields">
                            <label className="label" htmlFor="user-name">
                                Date of Birth
                            </label>
                            <br />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    maxDate={new Date()}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="first-name">
                                National ID
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                value={idCard}
                                name="first-name"
                                onChange={(e) => setidCard(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="first-name">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control "
                                value={email}
                                name="first-name"
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>

                        <div className="search-fields input-field">
                            <label className="label" htmlFor="first-name">
                                Gender
                            </label>
                            <div>
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
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="phone-number">
                                Contact Number
                            </label>
                            <input
                                type="number"
                                className="form-control "
                                value={phone}
                                name="phone-number"
                                onChange={(e) => setphone(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="first-name">
                                Description
                            </label>
                            <textarea
                                name=""
                                id=""
                                placeholder="Description"
                                cols="30"
                                rows="5"
                                className="form-control"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                            ></textarea>
                        </div>
                        {/* <div className="input-field">
                                <label className="label" htmlFor="first-name">
                                    Banner Image
                                </label>
                                <div className="upload-btn">
                                    <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                        <div className="plus-icon">
                                            <AddIcon />
                                        </div>
                                        {url2 ? (
                                            <img
                                                src={url2}
                                                alt=""
                                                style={{ height: 145, width: 145, objectFit: 'cover', borderRadius: '10px' }}
                                            />
                                        ) : (
                                            <input
                                                type="file"
                                                id="file-input"
                                                name="image"
                                                accept="image/x-png,image/gif,image/jpeg"
                                                onChange={(e) => imageUpload(e, 2)}
                                            />
                                        )}
                                    </label>
                                </div>
                            </div> */}
                    </div>
                    <div className="col-md-2 d-md-block d-none">
                        <div className="seperator mx-auto"></div>
                    </div>
                    <div className="col-md-5 mt-1">
                        {/* <div className="input-field">
                            <label className="label" htmlFor="first-name">
                                Country
                            </label>
                            <CountryDropdown
                                id="UNIQUE_ID"
                                className="YOUR_CSS_CLASS"
                                preferredCountries={['gb', 'us']}
                                placeholder="Country"
                                value={country}
                                handleChange={(e) => setcountry(e.target.value)}
                            ></CountryDropdown>
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="user-name">
                                City
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                value={city}
                                name="city"
                                onChange={(e) => setcity(e.target.value)}
                            />
                        </div> */}

                        <div className="search-fields input-field">
                            <label className="label" htmlFor="first-name">
                                Select Country
                            </label>
                            <div>
                                <DropdownSelector
                                    listData={Country.getAllCountries()}
                                    placeholder={'Select Country'}
                                    setValue={(e) => setcountry(e.target.value)}
                                    showText={'name'}
                                    setText={'isoCode'}
                                    value={country}
                                />
                            </div>
                        </div>

                        <div className="search-fields input-field">
                            <label className="label" htmlFor="first-name">
                                Select State
                            </label>
                            <div>
                                <DropdownSelector
                                    listData={State.getStatesOfCountry(country)}
                                    placeholder={'Select State'}
                                    setValue={(e) => setstate(e.target.value)}
                                    showText={'name'}
                                    setText={'isoCode'}
                                    value={state}
                                />
                            </div>
                        </div>

                        <div className="search-fields input-field">
                            <label className="label" htmlFor="first-name">
                                Select City
                            </label>
                            <div>
                                <DropdownSelector
                                    listData={City.getCitiesOfState(country, state)}
                                    placeholder={'Select City'}
                                    setValue={(e) => setcity(e.target.value)}
                                    showText={'name'}
                                    setText={'name'}
                                    value={city}
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="first-name">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                value={postalCode}
                                name="postal-code"
                                onChange={(e) => setpostalCode(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="phone-number">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                value={address}
                                name="address"
                                onChange={(e) => setaddress(e.target.value)}
                            />
                        </div>
                        <div className="search-fields input-field">
                            <label className="label" htmlFor="first-name">
                                Role
                            </label>
                            <RoleSelector role={role} setrole={setrole} />
                        </div>

                        <div className="input-field">
                            <label className="label" htmlFor="first-name">
                                Password
                            </label>
                            <div className="d-lg-flex align-items-start password">
                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                />
                                {/* <button className="btn btn-primary brownBtn">Change Password</button> */}
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center my-3 mt-5 ">
                        <div className="btn btn-primary brownBtn mx-2 px-5" onClick={() => navigate(-1)}>
                            Cancel
                        </div>

                        <div className="btn btn-primary brownBtn px-5" onClick={addNewUser}>
                            Save
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUserNew;
