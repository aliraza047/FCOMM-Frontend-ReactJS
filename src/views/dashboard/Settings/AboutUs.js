// project imports
import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import AddIcon from '@mui/icons-material/Add';
import CrossIcon from '@mui/icons-material/Cancel';
import { getAboutUs, addAboutUs } from 'redux/action/AboutUs';
import { useSelector } from 'react-redux';

import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';

const AboutUs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state) => state._auth);
    const { about_us } = useSelector((state) => state._aboutUs);

    const [open, setOpen] = React.useState(false);
    const [about, setAbout] = React.useState('');
    const [approach, setApproach] = React.useState('');
    const [statement, setStatement] = React.useState('');
    const [id, setId] = React.useState('');

    const [url, seturl] = React.useState('');
    const [file, setFile] = React.useState('');
    const imageUpload = (e) => {
        console.log('imageUploadProduct');
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl(e.target.result);
            setFile(file);
        };
        reader.readAsDataURL(file);
    };

    //
    const addAbout = () => {
        if (approach && statement && about) {
            const formdata = new FormData();
            formdata.append('ourApproach', approach);
            formdata.append('ourStatement', statement);
            formdata.append('aboutUs', about);
            formdata.append('image', about_us?.image);
            formdata.append('url', about_us?.url);
            if (role === 'admin' && id) {
                formdata.append('id', about_us?._id);
            }
            if (file) {
                formdata.append('aboutUsImage', file);
            }
            dispatch(addAboutUs(formdata, navigate));
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };

    useEffect(() => {
        dispatch(getAboutUs());
    }, []);

    useEffect(() => {
        if (about_us && about_us?._id) {
            setStatement(about_us?.ourStatement);
            setApproach(about_us?.ourApproach);
            setAbout(about_us?.aboutUs);
            seturl(base_url_new + about_us?.url);
            setId(about_us?._id);
        }
    }, [about_us]);
    return (
        <>
            <div className="add-thread addProduct">
                <div className="d-flex justify-content-between mb-4 align-items-center pb-2" style={{ borderBottom: '1px solid #e2e2e2' }}>
                    <h2 className="border-0 mb-0 pb-0">Settings - About Us</h2>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="upload-heading">
                                    <p className="label mb-0">Image</p>
                                </div>

                                <div className="d-flex flex-row flex-wrap">
                                    <div className="d-flex flex-row flex-wrap"></div>
                                    <div className="upload-btn">
                                        <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                            <div className="plus-icon">
                                                <AddIcon />
                                            </div>
                                            {url ? (
                                                <>
                                                    <img
                                                        src={url}
                                                        alt=""
                                                        style={{ height: 148, width: 148, objectFit: 'cover', borderRadius: '7px' }}
                                                    />
                                                    <input
                                                        type="file"
                                                        id="file-input"
                                                        name="image"
                                                        accept="image/x-png,image/gif,image/jpeg"
                                                        onChange={(e) => imageUpload(e)}
                                                    />
                                                </>
                                            ) : (
                                                <input
                                                    type="file"
                                                    id="file-input"
                                                    name="image"
                                                    accept="image/x-png,image/gif,image/jpeg"
                                                    onChange={(e) => imageUpload(e)}
                                                />
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label" htmlFor="totalPrice-number">
                                        About Us
                                    </p>
                                    <textarea
                                        className="form-control"
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="5"
                                        placeholder="Write About US..."
                                        onChange={(e) => setAbout(e.target.value)}
                                        value={about}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label" htmlFor="totalPrice-number">
                                        Our Approach
                                    </p>
                                    <textarea
                                        className="form-control"
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="5"
                                        placeholder="Write a Approach..."
                                        onChange={(e) => setApproach(e.target.value)}
                                        value={approach}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label" htmlFor="totalPrice-number">
                                        Our Statement
                                    </p>
                                    <textarea
                                        className="form-control"
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="5"
                                        placeholder="Write a Statement..."
                                        onChange={(e) => setStatement(e.target.value)}
                                        value={statement}
                                    ></textarea>
                                </div>
                            </div>
                            <hr className="my-3" />
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary saveBtn mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </div>
                    <div className="btn btn-primary saveBtn" onClick={addAbout}>
                        Save
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;
