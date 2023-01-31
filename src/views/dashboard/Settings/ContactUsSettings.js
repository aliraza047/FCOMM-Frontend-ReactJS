import React, { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addSetting, addSocial, editSetting, getAllSocials, getSetting, removeSocial } from 'redux/action/Setting';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import { useNavigate } from 'react-router';
const ContactUsSettings = () => {
    const navigate = useNavigate();
    const refImage = useRef(null);
    const { setting, slider_image, all_socials } = useSelector((state) => state._setting);
    console.log('Socials', all_socials);
    const [values, setValues] = React.useState({
        email: setting?.siteEmail,
        phone: setting?.siteContact,
        location: setting?.siteLocation?.location
    });
    const [valuesSocial, setValuesSocial] = React.useState({
        image: '',
        name: '',
        link: '',
        url: ''
    });
    const [socialAcc, setsocialAcc] = useState(false);
    const dispatch = useDispatch();
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleChangeSocial = (prop) => (event) => {
        setValuesSocial({ ...valuesSocial, [prop]: event.target.value });
    };

    const imageUploadSlider = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            setValuesSocial({ ...valuesSocial, ['image']: e.target.result, ['url']: file });
        };
        reader.readAsDataURL(file);
    };

    const handleContactAdd = () => {
        const fields = {
            siteEmail: values.email,
            siteContact: values.phone,
            siteLocation: { location: values.location, lat: '', lon: '' },
            id: setting?._id
        };
        setting ? dispatch(editSetting(fields)) : dispatch(addSetting(fields));
    };
    const handleSocialAdd = () => {
        const formData = new FormData();
        formData.append('socailImage', valuesSocial.url);
        formData.append('link', valuesSocial.link);
        formData.append('name', valuesSocial.name);
        dispatch(addSocial(formData, setsocialAcc));
        setValuesSocial({
            image: '',
            name: '',
            link: '',
            url: ''
        });
    };

    useEffect(() => {
        dispatch(getSetting());
        dispatch(getAllSocials());
        console.log('USEEFECT');
    }, []);
    return (
        <div className="row">
            <div className="contactussettings">
                <div className="heading">
                    <h2>Settings - Contact Us</h2>
                </div>
                <div className="col-md-6">
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control "
                            name="user-name"
                            placeholder="Write email..."
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-control "
                            name="user-name"
                            placeholder="Write phone..."
                            value={values.phone}
                            onChange={handleChange('phone')}
                        />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Location
                        </label>
                        <input
                            type="text"
                            className="form-control "
                            name="user-name"
                            placeholder="Write your location..."
                            value={values.location}
                            onChange={handleChange('location')}
                        />
                    </div>
                    {/* <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Select Location
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="Select Location" />
                    </div> */}

                    <div className="socialaccount">
                        <p> Social Account</p>
                        <div className="row">
                            <div className="col-12 d-flex flex-row flex-wrap">
                                {isArrayCheck(all_socials) &&
                                    all_socials?.map((data, id) => (
                                        <div className="social-account-info">
                                            <img src={base_url_new + data?.image} />
                                            <p>{data?.name}</p>
                                            <div className="d-flex justify-content-between">
                                                <a href={String(data?.link).includes('http') ? data?.link : 'http://' + data?.link}>
                                                    Link Here
                                                </a>
                                                <div
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => dispatch(removeSocial({ id: data?._id }))}
                                                >
                                                    <DeleteIcon className="removeicon" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="addsocial-btn">
                            <Button variant="contained" className="addsocialbtn" onClick={() => setsocialAcc(!socialAcc)}>
                                +Add Social Account
                            </Button>
                        </div>
                    </div>
                    {socialAcc ? (
                        <div>
                            <label className="label" htmlFor="first-name">
                                Image Upload
                            </label>
                            <div className="upload-btn">
                                <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                    <div className="plus-icon">
                                        <AddIcon />
                                    </div>
                                    {valuesSocial.image ? (
                                        <img
                                            src={valuesSocial.image}
                                            alt=""
                                            style={{ height: 148, width: 148, objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    ) : (
                                        <input
                                            ref={refImage}
                                            type="file"
                                            id="file-input"
                                            name="image"
                                            accept="image/x-png,image/gif,image/jpeg,image/png"
                                            onChange={(e) => imageUploadSlider(e)}
                                        />
                                    )}
                                </label>
                            </div>
                            <div className="input-field">
                                <label className="label" htmlFor="user-name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    name="user-name"
                                    placeholder="Write name"
                                    value={valuesSocial.name}
                                    onChange={handleChangeSocial('name')}
                                />
                            </div>
                            <div className="input-field">
                                <label className="label" htmlFor="user-name">
                                    Link
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    name="user-name"
                                    placeholder="Write Link"
                                    value={valuesSocial.link}
                                    onChange={handleChangeSocial('link')}
                                />
                            </div>
                            <div className="save-btn">
                                <Button variant="contained" className="savebtn" onClick={handleSocialAdd}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="save-btn btn-cancel">
                    <Button variant="contained" className="savebtn btn-primary mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>

                    <Button variant="contained" className="savebtn btn-primary" onClick={handleContactAdd}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ContactUsSettings;
