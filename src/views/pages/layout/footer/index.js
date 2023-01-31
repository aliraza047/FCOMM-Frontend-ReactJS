import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { base_url_new } from 'utils/config';
import { isArrayCheck } from 'views/utilities/common';
import { getAllSocials } from 'redux/action/Setting';
import FooterLogo from 'assets/images/OUR_White_Horizontal_Logo.png';
import { AddInLocalStorage, console_log } from 'utils/helper';

function footer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { setting, slider_image, all_socials } = useSelector((state) => state._setting);
    console.log('Settings', setting);
    console.log(all_socials);
    useEffect(() => {
        dispatch(getAllSocials());
    }, []);
    return (
        <div className="footerMain">
            <div className="container">
                <div className="col-12 mx-auto">
                    <div className="row mx-0">
                        <div className="col-lg- 4 col-md-4 col-12">
                            <div className="d-flex fotter-logo">
                                {/* <Typography variant="h3" component="h3">
                            OUR
                        </Typography>
                        <Typography variant="h4" component="h4">
                            Asian Story
                        </Typography> */}
                                <img
                                    src={FooterLogo}
                                    alt=""
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                    height="100%"
                                    width="100%"
                                />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2 col-12 mt-md-0 mt-3">
                            <div className="footer-links">
                                <ul>
                                    <li
                                        onClick={() => {
                                            navigate('/');
                                        }}
                                    >
                                        Home
                                    </li>
                                    <li
                                        onClick={() => {
                                            navigate('/about-us');
                                        }}
                                    >
                                        About Us
                                    </li>
                                    <li
                                        onClick={() => {
                                            navigate('/stories');
                                        }}
                                    >
                                        Stories
                                    </li>
                                    <li
                                        onClick={() => {
                                            navigate('/shop');
                                        }}
                                    >
                                        Shop
                                    </li>
                                    {/* <li onClick={() => {navigate('/stylist');}}>Stylist</li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-12">
                            <div className="footer-links">
                                <ul>
                                    <li>FAQ's</li>
                                    <li>Terms & Condition</li>
                                    <li>Privacy Policy</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-12 text-start text-center-big position-relative">
                            <div className="footer-links">
                                <ul className="mb-0">
                                    <li>Follow Us & Contact Us</li>
                                    <div className="d-flex flex-column align-items-start">
                                        <li>{setting?.siteEmail}</li>
                                        <li>{setting?.siteContact}</li>
                                        <li>
                                            <div className="d-flex flex-row justify-content-start">
                                                {isArrayCheck(all_socials) &&
                                                    all_socials?.map((data, id) => (
                                                        <a href={String(data?.link).includes('http') ? data?.link : 'http://' + data?.link}>
                                                            <img src={base_url_new + data?.image} className="social-icon" />
                                                        </a>
                                                    ))}
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                            <div className="copyRight">{/* <CopyrightIcon /> */}© 2022 Our Asian Story</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );
}

export default footer;
