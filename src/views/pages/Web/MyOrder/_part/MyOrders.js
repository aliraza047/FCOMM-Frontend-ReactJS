import React, { useEffect, useState, useRef } from 'react';
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
import { updateUser } from 'redux/action/Auth/index';
import { isArrayCheck } from 'views/utilities/common';
import MyWallet from './Tabs/MyWallet';
import { useLocation, useNavigate } from 'react-router';
import { Log, onlyUniqueArrayData } from 'utils/helper';
import OrderByInvoices from './OrderByInvoices/OrderByInvoices';
import ChangePassword from './Popup/ChangePassword';
import { updateProfile } from 'redux/action/Auth';

function Profileinfo() {
    const { state } = useLocation();
    const { isAuthenticated, user } = useSelector((state) => state._auth);

    const [value, setValue] = React.useState(state ? state : '1');
    const [email, setEmail] = React.useState(user?.user?.email);
    const [number, setNumber] = React.useState(user?.user?.phone_number);
    const [birthday, setBirthday] = React.useState(user?.user?.date_of_birth);
    const [buttonText, setButtonText] = React.useState('Edit');
    const { all_orders_data } = useSelector((state) => state._homeOrder);
    console.log('all_orders_data ali ',all_orders_data[0])
    const [uniqueInvoiceIds, setuniqueInvoiceIds] = useState([]);
    const [productToShow, setproductToShow] = useState(4);
    const [disabled, setDisabled] = useState(true);
    const refImage = useRef(null);
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
    useEffect(() => {
        if (isArrayCheck(all_orders_data)) {
            const invoiceIdData = all_orders_data.map((prod) => prod?.payment?.invoiceId);
            var unique = invoiceIdData.filter(onlyUniqueArrayData);
            Log('Unique', unique);
            setuniqueInvoiceIds(unique);
        }
    }, [all_orders_data]);
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
    const editUser = (data) => {
        if (data == 'Edit') {
            setDisabled(!disabled);
            setButtonText('Save');
        } else if (data == 'Save') {
            setDisabled(!disabled);
            dispatch(updateUser({ id: user?.user._id, phone_number: number }));
            setButtonText('Edit');
        }
    };

    const [fullWidth, setFullWidth] = React.useState(true);
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
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

    return (
        <div className="Profileinfo">
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-8 col-md-12 col-12">
                        <div className="col-lg-12">
                            <div className="name">
                                <h1>Welcome {user?.user?.fullname},</h1>
                            </div>
                        </div>
                        <TabContext value={value} className="feleciaTabs">
                            <TabList onChange={handleChange} defaultValue={'1'} aria-label="lab API tabs example">
                                <Tab label="My Orders" className="tabmyorders" value="1" />
                                <Tab label="My Address" className="tabmyaddress" value="2" />
                                <Tab label="My Wallet" className="tabmywallet" value="3" />
                                {/* <Tab label="My Vouchers" className="tabmyvouchers" value="4" disabled={true} /> */}
                                {/* <Tab label="Stylist" className="tabmystylist" value="5" disabled={true} /> */}
                            </TabList>
                            <TabPanel value="1">
                                <div className="myorders mt-2">
                                    {isArrayCheck(uniqueInvoiceIds) &&
                                        uniqueInvoiceIds
                                            ?.slice(0, uniqueInvoiceIds.length > 4 ? productToShow : uniqueInvoiceIds.length)
                                            ?.map((invoice, id) => (
                                                <OrderByInvoices key={id} invoice={invoice} all_orders_data={all_orders_data} />
                                            ))}
                                    {isArrayCheck(all_orders_data) && all_orders_data.length > Number(productToShow) &&
                                        <div className="see-more text-center">
                                            <Button
                                                onClick={() => {
                                                    if (isArrayCheck(all_orders_data) && all_orders_data.length < productToShow) {
                                                        setproductToShow(
                                                            productToShow +
                                                            ((all_orders_data.length - productToShow) % 0
                                                                ? 9
                                                                : productToShow - all_orders_data.length)
                                                        );
                                                    } else {
                                                        setproductToShow(productToShow + 9);
                                                    }
                                                }}
                                            >
                                                See More
                                            </Button>
                                        </div>}
                                </div>

                            </TabPanel>

                            <TabPanel value="2">
                                <MyAddress />
                                {/* <div className="mt-2">
                                    <MyAddress />
                                </div> */}
                            </TabPanel>

                            <TabPanel value="3">
                                <MyWallet />
                            </TabPanel>

                            <TabPanel value="4">
                                <div className="voucher borderb">
                                    <h5>Gift cards & Vouchers</h5>
                                    <div className="d-md-flex d-sm-block  align-items-center justify-content-between">
                                        <div className="col-md-9 col-12">
                                            <p className="mb-0">50% Cashback</p>
                                        </div>
                                        <div className="col-md-3 col-12">
                                            <div className="voucher-button">
                                                <Button variant="contained" className="newcardbutton">
                                                    Use
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 align-items-center justify-content-between">
                                        <p className="mb-0">minimum spend of 10$</p>
                                        <p className="mb-0">capped at $5</p>
                                    </div>
                                </div>

                                <div className="voucher mt-4">
                                    <h5>Gift cards & Vouchers</h5>
                                    <div className="d-md-flex d-sm-block  align-items-center justify-content-between">
                                        <div className="col-md-9 col-12">
                                            <p className="mb-0">50% Cashback</p>
                                        </div>
                                        <div className="col-md-3 col-12">
                                            <div className="voucher-button">
                                                <Button variant="contained" className="newcardbutton">
                                                    Use
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 align-items-center justify-content-between">
                                        <p className="mb-0">minimum spend of 10$</p>
                                        <p className="mb-0">capped at $5</p>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel value="5">
                                <div className="stylist  borderb">
                                    <h5>Appointment with:</h5>
                                    <div className="d-md-flex d-sm-block  align-items-center justify-content-between">
                                        <div className="col-md-9 col-12">
                                            <p className="mb-0">Micheal Tan</p>
                                        </div>
                                        <div className="col-md-3 col-12">
                                            <div className="stylist-button">
                                                <Button variant="contained" className="newcardbutton">
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 align-items-center justify-content-between">
                                        <div className="date">
                                            <p className="mb-0">Date: 1 Feb 2022</p>
                                            <p className="mb-0">Platform: Zoom</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="stylist  mt-4">
                                    <h5>Appointment with:</h5>
                                    <div className="d-md-flex d-sm-block  align-items-center justify-content-between">
                                        <div className="col-md-9 col-12">
                                            <p className="mb-0">Sharifah</p>
                                        </div>
                                        <div className="col-md-3 col-12">
                                            <div className="stylist-button">
                                                <Button variant="contained" className="newcardbutton">
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 align-items-center justify-content-between">
                                        <div className="date">
                                            <p className="mb-0">Date: 10 June 2022</p>
                                            <p className="mb-0">Platform: Zoom</p>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </div>
                    <div className="col-lg-4 col-md-12 mt-4">
                        <div className="profileimg">
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
                                        <div className="d-flex">
                                            <h6>Username:</h6>
                                            <span>{user?.user?.username || user?.user?.fullname}</span>
                                        </div>
                                        <div className="d-flex">
                                            <h6>Email:</h6>
                                            <span>
                                                <input type="email" disabled={disabled} value={email} />
                                            </span>
                                        </div>
                                        <div className="d-flex">
                                            <h6>Phone:</h6>
                                            <span>
                                                <input
                                                    type="text"
                                                    disabled={disabled}
                                                    value={number}
                                                    onChange={(e) => setNumber(e.target.value)}
                                                />
                                            </span>
                                        </div>
                                        {/* <div className="d-flex">
                                            <h6>Birthday:</h6>
                                            <span>
                                                <input type="text" disabled={disabled} placeholder="1 January 1998" />
                                            </span>
                                        </div> */}
                                        {/* <div className="editbutton">
                                            <Button onClick={() => editUser(buttonText)} variant="outlined">
                                                {buttonText}
                                            </Button>
                                        </div> */}
                                        <div className="reset m-auto">
                                            <span onClick={handleClickOpen}>Reset My Password</span>
                                        </div>
                                        <ChangePassword open={open} handleClose={handleClose} fullWidth={fullWidth} />
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
