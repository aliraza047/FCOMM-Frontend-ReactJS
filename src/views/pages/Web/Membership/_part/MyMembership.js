import React, { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import Input from '@mui/material/Input';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MyOrders from './Tabs/MyOrder';
import MyAddress from './Tabs/MyAddress';
import { useDispatch, useSelector } from 'react-redux';
import { base_url, base_url_new } from 'utils/config';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { getAllMyOrders } from 'redux/action/Customer.Action/Order';
import { isArrayCheck } from 'views/utilities/common';
import membershipimage from 'assets/images/home/mymembership.svg';
import memberstar from 'assets/images/home/member-star.svg';
import silverstar from 'assets/images/home/silver-star.svg';
import goldstar from 'assets/images/home/gold-star.svg';
import platinumstar from 'assets/images/home/platinum-star.svg';
import MyWallet from './Tabs/MyWallet';
import { useLocation, useNavigate } from 'react-router';

function Profileinfo() {
    const { state } = useLocation();
    console.log('State get My Ordes', state);
    const [value, setValue] = React.useState(state ? state : '1');
    const { isAuthenticated, user } = useSelector((state) => state._auth);
    const { all_orders_data } = useSelector((state) => state._homeOrder);
    const [productToShow, setproductToShow] = useState(9);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    const [fullWidth, setFullWidth] = React.useState(true);
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
    return (
        <div className="Profileinfo">
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-8 col-md-12 col-12">
                        <div className="col-lg-12">
                            <div className="name">
                                <h1>My Membership</h1>
                            </div>
                        </div>
                        <TabContext value={value} className="feleciaTabs">
                            <TabList onChange={handleChange} defaultValue={'1'} aria-label="lab API tabs example">
                                <Tab label="Members" className="tabmyorders" value="1" />
                                <Tab label="Silver" className="tabmyaddress" value="2" />
                                <Tab label="Gold" className="tabmywallet" value="3" />
                                <Tab label="Platinum" className="tabmyvouchers" value="4" />
                            </TabList>
                            <TabPanel value="1">
                                <div className="membership-tag mt-2">
                                    <div className="star">
                                        <img src={memberstar} alt="" />
                                    </div>
                                    <h5>506</h5>
                                    <p>O.U.R. Rewards Points</p>
                                </div>
                                <div className="membership mt-2">
                                    <h5>Unlocked tier with 500 points</h5>

                                    <h3>
                                        Your <span> Member</span> Benefits
                                    </h3>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel value="2">
                                <div className="">
                                    <div className="membership-tag mt-2">
                                        <div className="star">
                                            <img src={silverstar} alt="" />
                                        </div>
                                        <h5>506</h5>
                                        <p>O.U.R. Rewards Points</p>
                                    </div>
                                </div>
                                <div className="membership mt-2">
                                    <h5>Unlocked tier with 1000 points</h5>

                                    <h3>
                                        Your <span>Silver Member</span> Benefits
                                    </h3>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel value="3">
                                <div className="membership-tag mt-2">
                                    <div className="star">
                                        <img src={goldstar} alt="" />
                                    </div>
                                    <h5>506</h5>
                                    <p>O.U.R. Rewards Points</p>
                                </div>
                                <div className="membership mt-2">
                                    <h5>Unlocked tier with 1500 points</h5>

                                    <h3>
                                        Your <span>Gold Member</span> Benefits
                                    </h3>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel value="4">
                                <div className="membership-tag mt-2">
                                    <div className="star">
                                        <img src={platinumstar} alt="" />
                                    </div>
                                    <h5>2000</h5>
                                    <p>Points to unlock</p>
                                </div>
                                <div className="membership mt-2">
                                    <h5>Unlocked tier with 2000 points</h5>

                                    <h3>
                                        Your <span> Platinum</span> Benefits
                                    </h3>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="details d-flex">
                                        <span className="dot"></span>
                                        <div className="content-details">
                                            <p className="mb-1">Lorem Ipsum</p>
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </div>
                    <div className="col-lg-4 col-md-12 mt-4">
                        <div className="profileimg">
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple className="d-none" type="file" />
                                <img
                                    class="content-image"
                                    src={user?.user?.profile?.includes('http') ? user?.user?.profile : base_url + user?.user?.profile}
                                />
                            </label>
                            <div className="col-lg-10 col-md-8 col-12 mx-auto">
                                <div className="align-items-center text-center points mt-3">
                                    <h6 className="mb-0">
                                        0 Points{' '}
                                        <span className="px-1" onClick={() => navigate('/membership')}>
                                            {' '}
                                            Golden Member
                                        </span>
                                    </h6>
                                </div>
                                <div className="col-lg-8 col-md-5 col-6 mx-auto">
                                    <div className="align-items-center text-center profile_data mt-3 text-capitalize">
                                        <div className="d-flex justify-content-center">
                                            <h6>Username:</h6>
                                            <span>{user?.user?.username || user?.user?.fullname}</span>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <h6>Email:</h6>
                                            <span>
                                                <input type="email" disabled={disabled} placeholder="Admin1@Gmail.Com" />
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <h6>Phone:</h6>
                                            <span>
                                                <input type="text" disabled={disabled} placeholder="1231321321" />
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <h6>Birthday:</h6>
                                            <span>
                                                <input type="text" disabled={disabled} placeholder="1 January 1998" />
                                            </span>
                                        </div>
                                        <div className="editbutton">
                                            <Button onClick={() => setDisabled(!disabled)} variant="outlined">
                                                {disabled === false ? 'Save' : 'Edit'}
                                            </Button>
                                        </div>
                                        <div className="reset m-auto">
                                            <span onClick={handleClickOpen}>Reset My Password</span>
                                        </div>
                                        <Dialog
                                            open={open}
                                            fullWidth={fullWidth}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                            className="customModalMain"
                                        >
                                            <DialogContent className="customModal">
                                                <div className="col-md-12 col-12 mx-auto text-center">
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="Current Password" />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <input type="text" placeholder="New Password" />
                                                    </div>

                                                    <div className="dialog-buttons">
                                                        <div className="row justify-content-center">
                                                            <div className="col-md-6 col-12">
                                                                <Button variant="contained" className="no" onClick={handleClose}>
                                                                    Update Password
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
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

export default Profileinfo;
