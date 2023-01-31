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
import { Log, removeMethodArray } from 'utils/helper';
import Input from '@mui/material/Input';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { City, Country, State } from 'country-state-city';
import DropdownSelector from 'ui-component/dropdown';
import { isArrayCheck } from 'views/utilities/common';
import ToggleButtonHandler from 'ui-component/ToggleButtonHandler';
const usePlaceholderStyles = styled((theme) => ({
    placeholder: {
        color: '#9f9e9e'
    }
}));

const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
};

const UpdateUser = () => {
    const [url, seturl] = React.useState('');
    const { state } = useLocation();
    const [selected, setSelected] = React.useState(state?.receiveEmail);
    Log('User=>', state);
    const { isAuthenticated, user, role: userRole } = useSelector((state) => state._auth);
    const [isLoading, setLoading] = useState(true);
    const [userName, setuserName] = useState(state.username);
    const [idCard, setidCard] = useState(state.nic);
    const [email, setemail] = useState(state.email);
    const [phone, setphone] = useState(state.phone_number);
    const [password, setpassword] = useState(state.password);
    const [country, setcountry] = useState(state?.country);
    const [countryCode, setCountryCode] = useState(state?.countryCode);
    const [stateData, setstateData] = useState(state?.state);
    const [stateCode, setStateCode] = useState(state?.stateCode);
    const [city, setcity] = useState(state.city);
    const [postalCode, setpostalCode] = useState(state.postalCode);
    const [address, setaddress] = useState(state.address);
    const [value, setValue] = React.useState(state?.date_of_birth);
    console.log('value in', value);
    const [gender, setgender] = useState(state.gender);
    const [lastName, setlastName] = useState('');
    const [role, setrole] = useState(state.role);
    const [company, setCompany] = useState(state.studio);
    const [companyDesc, setCompanyDesc] = useState(state?.studioDesc);
    const [description, setdescription] = useState(state.description);
    const [alignment, setAlignment] = useState(0);
    const [imageFile, setimageFile] = React.useState('');

    const refImage = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(false);
        dispatch(getSetting());
    }, []);

    const updateNewUser = () => {
        console.log('admin role', role);
        const arr = isArrayCheck(state?.myAddresses) ? state?.myAddresses : [];
        let dataArr = removeMethodArray(arr, {
            _id: state?.myAddresses[0]?._id
        });
        console.log('Add Array =>', dataArr);
        const compArr = isArrayCheck(dataArr) ? dataArr : [];
        compArr.unshift({
            houseNo: state?.myAddresses[0]?.houseNo,
            streetNo: state?.myAddresses[0]?.streetNo,
            poBoxNo: postalCode,
            state: stateData,
            stateCode: stateCode,
            _id: state?.myAddresses[0]?._id,
            city: city,
            country: country,
            countryCode: countryCode
        });
        if (userName && email && password && role) {
            dispatch(
                editUser(
                    {
                        username: userName,
                        role: role,
                        fullname: userName,
                        email: email,
                        phone_number: phone,
                        first_name: userName,
                        date_of_birth: value,
                        gender: gender,
                        nic: idCard,
                        country: country,
                        countryCode: countryCode,
                        city: city,
                        state: stateData,
                        stateCode: stateCode,
                        address: address,
                        postalCode: postalCode,
                        id: state?._id,
                        studio: company,
                        studioDesc: companyDesc,
                        description: description,
                        myAddresses: compArr,
                        receiveEmail: selected
                    },
                    role,
                    navigate,
                    imageFile
                )
            );
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
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

    return (
        <>
            <div className="add-thread settingsMain">
                <h2 className="border-0">Edit User</h2>
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
                                            src={state?.profile?.includes('http') ? state?.profile : base_url + state?.profile}
                                            alt="user"
                                        />
                                        <img src={upload} className="uploadImg" alt="" />
                                    </label>
                                )}
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
                            <div className="search-fields">
                                <label className="label" htmlFor="user-name">
                                    Date of Birth
                                </label>
                                <br />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={value}
                                        onChange={(newValue) => {
                                            console.log('newValue', newValue);
                                            setValue(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
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
                        {/* {(role.includes("designer") || role.includes('manufacturer')) && role.length != 4 && <div className="input-field">
                            <label className="label" htmlFor="phone-number">
                                Company Name
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                value={company}
                                name="phone-number"
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>} */}
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
                                    setValue={(e) => {
                                        const countryDetail = Country.getCountryByCode(e.target.value);
                                        setCountryCode(e.target.value);
                                        setcountry(countryDetail?.name);
                                        setstateData('');
                                        setStateCode('');
                                        setcity('');
                                    }}
                                    showText={'name'}
                                    setText={'isoCode'}
                                    value={countryCode}
                                />
                            </div>
                        </div>

                        <div className="search-fields input-field">
                            <label className="label" htmlFor="first-name">
                                Select State
                            </label>
                            <div>
                                <DropdownSelector
                                    listData={State.getStatesOfCountry(countryCode)}
                                    placeholder={'Select State'}
                                    setValue={(e) => {
                                        const stateDetail = State.getStateByCode(e.target.value);
                                        setStateCode(e.target.value);
                                        setstateData(stateDetail?.name);
                                        setcity('');
                                    }}
                                    showText={'name'}
                                    setText={'isoCode'}
                                    value={stateCode}
                                />
                            </div>
                        </div>

                        <div className="search-fields input-field">
                            <label className="label" htmlFor="first-name">
                                Select City
                            </label>
                            <div>
                                <DropdownSelector
                                    listData={City.getCitiesOfState(countryCode, stateCode)}
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

                        {isArrayCheck(state?.role) && state?.role?.find((data) => data === 'admin') && (
                            <div className="search-fields input-field">
                                <label className="label" htmlFor="first-name">
                                    Recieve Email
                                </label>
                                <ToggleButtonHandler selected={selected} setSelected={setSelected} />
                            </div>
                        )}

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
                        {/* {(role.includes("designer") || role.includes('manufacturer')) && role.length != 4 &&
                            <div className="input-field">
                                <label className="label" htmlFor="phone-number">
                                    Company Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    value={companyDesc}
                                    name="address"
                                    onChange={(e) => setCompanyDesc(e.target.value)}
                                />
                            </div>
                        } */}
                    </div>

                    <div className="d-flex justify-content-center my-3 mt-5 ">
                        <div className="btn btn-primary brownBtn px-5" onClick={updateNewUser}>
                            Save
                        </div>
                        <div className="btn btn-primary brownBtn px-5 mx-2" onClick={() => navigate(-1)}>
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateUser;
