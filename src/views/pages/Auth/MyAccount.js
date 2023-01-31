// project imports
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import UserImg from '../../../assets/images/users/user-round.svg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser, removeUser } from 'redux/action/User';
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import { RMIUploader } from 'react-multiple-image-uploader';
import edit from '../../../assets/images/icons/edit-pencil.svg';
import upload from '../../../assets/images/icons/upload-image.svg';
import flag from '../../../assets/images/icons/flag-icon.svg';
import AddIcon from '@mui/icons-material/Add';
import AdminSetting from './_part/AdminSetting';
import DesignerManufecturerSetting from './_part/DesignerManufecturerSetting';
import { getSetting } from 'redux/action/Setting';
import { base_url, base_url_new } from 'utils/config';
import Input from '@mui/material/Input';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { updateProfile } from 'redux/action/Auth';
import { City, Country, State } from 'country-state-city';
import DropdownSelector from 'ui-component/dropdown';
import { removeMethodArray } from 'utils/helper';
import { isArrayCheck } from 'views/utilities/common';
import ChangePassword from '../Web/MyOrder/_part/Popup/ChangePassword';
const MyAccount = () => {
    const [url, seturl] = React.useState('');
    const [url2, seturl2] = React.useState('');
    const imageUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl(e.target.result);
            ['1234567', '567890'];
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('profile', file);
        dispatch(updateProfile(formData));
    };
    const { state } = useLocation();
    const { isAuthenticated, user, role: userRole } = useSelector((state) => state._auth);
    console.log('State', user);

    const [isLoading, setLoading] = useState(true);
    const [userName, setuserName] = useState(user.user.fullname);
    const [email, setemail] = useState(user.user.email);
    const [phone, setphone] = useState(user.user.phone_number);
    const [description, setdescription] = useState(user.user.description);
    const [studio, setstudio] = useState(user.user.studio);
    const [studioDesc, setstudioDesc] = useState(user.user.studioDesc);
    const [paymentMethod, setPaymentMethod] = useState(user.user.paymentMethod);
    const [accNo, setAccNo] = useState(user.user.accNo);

    // const [country, setcountry] = useState(user.user.country);
    // const [city, setcity] = useState(user.user.city);
    // const [stateData, setstateData] = useState(user.user.stateCode);
    // const [postalCode, setpostalCode] = useState(user.user.postalCode);

    const [address, setaddress] = useState(user.user.address);

    const [firstName, setfirstName] = useState(user.user.first_name);
    const [lastName, setlastName] = useState(user.user.last_name);
    const [role, setrole] = useState('user');
    const [alignment, setAlignment] = useState(0);
    const refImage = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);

    const [values, setValues] = React.useState({
        houseNo: user?.user?.myAddresses[0]?.houseNo,
        streetNo: user?.user?.myAddresses[0]?.streetNo,
        poBoxNo: user?.user?.myAddresses[0]?.poBoxNo,
        state: user?.user?.myAddresses[0]?.state,
        stateCode: user?.user?.myAddresses[0]?.stateCode,
        _id: user?.user?.myAddresses[0]?._id,
        city: user?.user?.myAddresses[0]?.city,
        country: user?.user?.myAddresses[0]?.country,
        countryCode: user?.user?.myAddresses[0]?.countryCode
    });

    const handleChange = (prop) => (event) => {
        if (prop == 'countryCode') {
            const countryDetail = Country.getCountryByCode(event.target.value);
            setValues({ ...values, [prop]: event.target.value, country: countryDetail?.name, state: '', stateCode: '', city: '' });
        } else if (prop == 'stateCode') {
            const stateDetail = State.getStateByCode(event.target.value);
            setValues({ ...values, [prop]: event.target.value, state: stateDetail?.name });
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
        dispatch(getSetting());
    }, []);

    // const handleChange = (event) => {
    //     setrole(event.target.value);
    // };

    const handleChanges = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const updateUser = () => {
        const arr = isArrayCheck(user?.user?.myAddresses) ? user?.user?.myAddresses : [];
        let dataArr = removeMethodArray(arr, {
            ...values
        });
        console.log('Add Array =>', dataArr);
        const compArr = isArrayCheck(dataArr) ? dataArr : [];
        compArr.unshift({
            ...values
        });
        dispatch(
            editUser(
                {
                    id: state ? state?._id : user?.user?._id,
                    phone_number: phone ? phone : '',
                    description: description ? description : '',
                    city: values.city,
                    country: values.country,
                    countryCode: values.countryCode,
                    state: values.state,
                    stateCode: values.stateCode,
                    postalCode: values?.poBoxNo,
                    address: address ? address : '',
                    fullname: userName ? userName : '',
                    username: userName ? userName : '',
                    studio: studio ? studio : '',
                    studioDesc: studioDesc ? studioDesc : '',
                    myAddresses: compArr,
                    paymentMethod: paymentMethod,
                    accNo: accNo
                },
                ''
            )
        );
    };

    return (
        <>
            <div className="add-thread settingsMain">
                <h2 className="border-0">Settings</h2>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="user-img">
                            <div className="position-relative">
                                {/* {url ? (
                                    <img src={url} alt="" style={{ height: 146, width: 146, objectFit: 'contain', borderRadius: '8px' }} />
                                ) : (
                                    <input
                                        ref={refImage}
                                        type="file"
                                        name="image"
                                        id="file-input"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={(e) => imageUpload(e, 1)}
                                    />
                                )} */}
                                {url ? (
                                    <>
                                        Size: 250 x 210
                                        <img src={url} alt="user" />
                                        <label htmlFor="contained-button-file">
                                            <Input
                                                id="contained-button-file"
                                                className="d-none"
                                                type="file"
                                                ref={refImage}
                                                name="image"
                                                accept="image/x-png,image/gif,image/jpeg"
                                                onChange={(e) => imageUpload(e)}
                                            />
                                            <img src={upload} className="uploadImg" alt="" />
                                        </label>{' '}
                                    </>
                                ) : (
                                    <label htmlFor="contained-button-file">
                                        <Input
                                            id="contained-button-file"
                                            className="d-none"
                                            type="file"
                                            ref={refImage}
                                            name="image"
                                            accept="image/x-png,image/gif,image/jpeg"
                                            onChange={(e) => imageUpload(e)}
                                        />
                                        <img
                                            src={
                                                user?.user?.profile?.includes('http') ? user?.user?.profile : base_url + user?.user?.profile
                                            }
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
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control "
                                value={email}
                                name="first-name"
                                onChange={(e) => setemail(e.target.value)}
                                disabled={true}
                            />
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
                        <div className="input-field">
                            <label className="label" htmlFor="phone-number">
                                Payment Method
                            </label>
                            <input
                                type="text"
                                className="form-control "
                                value={paymentMethod}
                                name="phone-number"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="phone-number">
                                Account No
                            </label>
                            <input
                                type="number"
                                className="form-control "
                                value={accNo}
                                name="phone-number"
                                onChange={(e) => setAccNo(e.target.value)}
                            />
                        </div>
                        {/* {userRole === 'designer' || userRole === 'manufacturer' ? (
                            <React.Fragment>
                                <div className="input-field">
                                    <label className="label" htmlFor="studio">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control "
                                        value={studio}
                                        name="studio"
                                        placeholder="Company Name"
                                        onChange={(e) => setstudio(e.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label className="label" htmlFor="studioDesc">
                                        Company Description
                                    </label>
                                    <textarea
                                        name=""
                                        id=""
                                        placeholder="Company Description"
                                        cols="30"
                                        rows="5"
                                        className="form-control"
                                        value={studioDesc}
                                        onChange={(e) => setstudioDesc(e.target.value)}
                                    ></textarea>
                                </div>
                            </React.Fragment>
                        ) : null} */}
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
                        <div className="search-fields input-field">
                            <label className="label" htmlFor="first-name">
                                Select Country
                            </label>
                            <div>
                                <DropdownSelector
                                    listData={Country.getAllCountries()}
                                    placeholder={'Select Country'}
                                    setValue={handleChange('countryCode')}
                                    showText={'name'}
                                    setText={'isoCode'}
                                    value={values.countryCode}
                                />
                            </div>
                        </div>
                        <div className="search-fields input-field">
                            <label className="label" htmlFor="user-name">
                                State
                            </label>
                            <DropdownSelector
                                listData={State.getStatesOfCountry(values.countryCode)}
                                placeholder={'Select State'}
                                setValue={handleChange('stateCode')}
                                showText={'name'}
                                setText={'isoCode'}
                                value={values.stateCode}
                            />
                        </div>
                        <div className="search-fields input-field">
                            <label className="label" htmlFor="user-name">
                                City
                            </label>
                            <DropdownSelector
                                listData={City.getCitiesOfState(values.countryCode, values.stateCode)}
                                placeholder={'Select City'}
                                setValue={handleChange('city')}
                                showText={'name'}
                                setText={'name'}
                                value={values.city}
                            />
                        </div>
                        <div className="input-field">
                            <label className="label" htmlFor="first-name">
                                Postal Code
                            </label>
                            <input
                                type="email"
                                className="form-control "
                                value={values.poBoxNo}
                                name="postal-code"
                                onChange={handleChange('poBoxNo')}
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
                        <ChangePassword open={open} handleClose={handleClose} fullWidth={fullWidth} />

                        <div className="input-field">
                            <div className="btn btn-primary brownBtn" onClick={handleClickOpen}>
                                ChangePassword
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center my-3 mt-5 ">
                        <div className="btn btn-primary brownBtn px-5 mx-2" onClick={() => navigate(-1)}>
                            Cancel
                        </div>

                        <div className="btn btn-primary brownBtn px-5 " onClick={updateUser}>
                            Save
                        </div>
                    </div>
                </div>
                {/* {userRole === 'admin' ? <AdminSetting /> : null} */}
                {/* {userRole === 'designer' ? (
                    <DesignerManufecturerSetting />
                ) : userRole === 'manufacturer' ? (
                    <DesignerManufecturerSetting />
                ) : null} */}
            </div>
        </>
    );
};

export default MyAccount;
