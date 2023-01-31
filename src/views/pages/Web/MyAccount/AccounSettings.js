import React, { useEffect, useState, useRef } from 'react';
import Tab from '@mui/material/Tab';
import Input from '@mui/material/Input';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { getAllMyOrders } from 'redux/action/Customer.Action/Order';
import { isArrayCheck } from 'views/utilities/common';
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import { RMIUploader } from 'react-multiple-image-uploader';
import edit from '../../../../assets/images/icons/edit-pencil.svg';
import upload from '../../../../assets/images/icons/upload-image.svg';
import flag from '../../../../assets/images/icons/flag-icon.svg';
import AddIcon from '@mui/icons-material/Add';
import { getSetting } from 'redux/action/Setting';
import { base_url, base_url_new } from 'utils/config';
import CountryDropdown from 'country-dropdown-with-flags-for-react';
function AccounSettings() {
    const { state } = useLocation();
    console.log('State get My Ordes', state);
    const [value, setValue] = React.useState(state ? state : '1');
    const { all_orders_data } = useSelector((state) => state._homeOrder);
    const [productToShow, setproductToShow] = useState(9);

    useEffect(() => {
        dispatch(getAllMyOrders());
    }, []);

    useEffect(() => {
        if (state) {
            setValue(state);
        }
    }, [state]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [url, seturl] = React.useState('');
    const [url2, seturl2] = React.useState('');
    const imageUpload = (e, type) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            if (type === 1) {
                seturl(e.target.result);
                // setValues({ ...values, profile: file });
            } else {
                seturl2(e.target.result);
                // setValues({ ...values, certificate: file });
            }
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('variantImage', file);
        dispatch(uploadImage(formData, productData.variant_image));
    };
    const { isAuthenticated, user, role: userRole } = useSelector((state) => state._auth);
    const [isLoading, setLoading] = useState(true);
    const [userName, setuserName] = useState(user.user.username);
    const [email, setemail] = useState(user.user.email);
    const [phone, setphone] = useState(user.user.phone_number);
    const [description, setdescription] = useState(user.user.description);
    const [country, setcountry] = useState(user.user.country);
    const [city, setcity] = useState(user.user.city);
    const [postalCode, setpostalCode] = useState(user.user.postalCode);
    const [address, setaddress] = useState(user.user.address);

    const [firstName, setfirstName] = useState(user.user.first_name);
    const [lastName, setlastName] = useState(user.user.last_name);
    const [role, setrole] = useState('user');
    const [alignment, setAlignment] = useState(0);
    const refImage = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(false);
        dispatch(getSetting());
    }, []);

    const handleChangea = (event) => {
        setrole(event.target.value);
    };

    const handleChanges = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const updateUser = () => {
        if (userName && firstName && role) {
            dispatch(
                editUser(
                    {
                        id: state._id,
                        email: email,
                        phone_number: phone,
                        description: description,
                        country: country,
                        city: city,
                        country: country,
                        postalCode: postalCode,
                        address: address
                    },
                    navigate
                )
            );
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
    return (
        <div className="Profileinfo">
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-8 col-md-12 col-12">
                        <div className="col-lg-12">
                            <div className="name">
                                <h1>My Account</h1>
                            </div>
                        </div>
                        <div className="add-thread my-account">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="user-img">
                                        <div className="position-relative">
                                            {url ? (
                                                <>
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
                                                            user?.user?.profile?.includes('http')
                                                                ? user?.user?.profile
                                                                : base_url + user?.user?.profile
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
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={userName}
                                            placeholder="Name"
                                            name="user-name"
                                            onChange={(e) => setuserName(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form-control "
                                            value={email}
                                            name="first-name"
                                            onChange={(e) => setemail(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input type="text" placeholder="Date of Birth" className="form-control " name="date-of-birth" />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="number"
                                            className="form-control "
                                            placeholder="Contact Number"
                                            value={phone}
                                            name="phone-number"
                                            onChange={(e) => setphone(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <textarea
                                            name=""
                                            id=""
                                            placeholder="Description"
                                            cols="5"
                                            rows="4"
                                            className="form-control"
                                            value={description}
                                            onChange={(e) => setdescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-md-2 d-md-block d-none">
                                    <div className="seperator mx-auto"></div>
                                </div>
                                <div className="col-md-5 mt-1">
                                    <div className="input-field">
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
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="City"
                                            value={city}
                                            name="city"
                                            onChange={(e) => setcity(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            placeholder="Postal Code"
                                            className="form-control "
                                            value={postalCode}
                                            name="postal-code"
                                            onChange={(e) => setpostalCode(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            className="form-control "
                                            value={address}
                                            name="address"
                                            onChange={(e) => setaddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <div className="d-lg-flex align-items-start password">
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="form-control mb-3"
                                                name="password"
                                                disabled
                                            />
                                            <button className="btn btn-primary brownBtn">Change Password</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 mt-4">
                        <div className="profileimg">
                            <label htmlFor="contained-button-file">
                                {/* <Input accept="image/*" id="contained-button-file" multiple className="d-none" type="file" /> */}
                                <img
                                    class="content-image"
                                    src={
                                        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80'
                                    }
                                />
                            </label>
                            <div className="col-lg-10 col-md-8 col-12 mx-auto">
                                <div className="align-items-center text-center points mt-3">
                                    <h6 className="mb-0">
                                        0 Points <span className="px-1">Golden Member</span>
                                    </h6>
                                </div>
                                <div className="col-lg-8 col-md-5 col-6 mx-auto">
                                    <div className="align-items-center text-center profile_data mt-3 text-capitalize">
                                        <h6>
                                            Username: <span>{user?.user?.username || user?.user?.fullname}</span>
                                        </h6>
                                        <h6>
                                            Email: <span>{user?.user?.email}</span>
                                        </h6>
                                        <h6>
                                            Phone No: <span>{user?.user?.phone_number}</span>
                                        </h6>
                                        <h6>
                                            Birthday: <span>1 January 1998</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccounSettings;
