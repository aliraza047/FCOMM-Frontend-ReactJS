import React, { useEffect, useState } from 'react';
import Tab from '@mui/material/Tab';
import Input from '@mui/material/Input';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { base_url } from 'utils/config';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { getAllMyOrders } from 'redux/action/Customer.Action/Order';
import { isArrayCheck } from 'views/utilities/common';
import { PayWithStripe } from 'views/pages/Web/Payment/PayWithStripe';
import { editUser } from 'redux/action/User';
import { getMyProfile } from 'redux/action/Auth';
import { removeMethodArray } from 'utils/helper';

function MyWallet() {
    const [open, setOpen] = React.useState(false);
    const [paymentVisible, setpaymentVisible] = useState(false);
    const { user } = useSelector((state) => state._auth);
    const dispatch = useDispatch();
    const [values, setValues] = React.useState({
        cardHolderName: '',
        cardNumber: '',
        cvc: '',
        postalCode: '',
        expiryDate: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickOpen = () => {
        setOpen(true);
        console.log(open);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleRemove = (obj) => {
        const arr = isArrayCheck(user?.user?.myWallet) ? user?.user?.myWallet : [];
        let dataArr = removeMethodArray(arr, obj);
        console.log('Remove Array =>', dataArr);
        dispatch(editUser({ id: user?.user?._id, myWallet: dataArr }, null));
        dispatch(getMyProfile());
        dispatch(getMyProfile());
    };

    return (
        <div className="wallet">
            {isArrayCheck(user?.user?.myWallet) &&
                user?.user?.myWallet.map((data, id) => (
                    <>
                        {console.log('Wallet', data)}
                        {/* <div className="addwallet">
                            <div className=" d-flex  mt-3 align-items-center justify-content-between">
                                <h5 className="mb-0">
                                    You have <span>75</span> Dollers!
                                </h5>
                                <AddIcon />
                            </div>
                        </div> */}
                        <div className=" d-flex mt-3 align-items-center justify-content-between">
                            <h6 className="mb-0">{data?.name}</h6>
                            <div className="edit">
                                <span className="mb-0" style={{ cursor: 'pointer' }} onClick={() => handleRemove(data)}>
                                    Remove
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-12 alignitems-center justify-content-between">
                            <p className="mb-0">
                                {data?.brand} | <span>{data?.exp_month + '/' + data?.exp_year}</span>
                            </p>
                            <p className="mb-0">xxxx xxxx xxxx {data?.last4}</p>
                        </div>
                    </>
                ))}

            <div className="row wallet-button">
                <div className="col-md-3 col-7">
                    <Button variant="contained" onClick={() => setpaymentVisible(!paymentVisible)} className="newcardbutton">
                        Add New Card
                    </Button>
                </div>
            </div>

            <PayWithStripe visible={paymentVisible} setVisible={setpaymentVisible} />

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="customModalMain"
            >
                <DialogContent className="customModal">
                    <div className="col-md-12 col-10 mx-auto text-center">
                        <div className="row mb-4">
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    placeholder="Card Holder Name"
                                    value={values.cardHolderName}
                                    onChange={handleChange('cardHolderName')}
                                />
                            </div>

                            <div className="col-md-6">
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    value={values.cardNumber}
                                    onChange={handleChange('cardNumber')}
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    placeholder="Postal code"
                                    value={values.postalCode}
                                    onChange={handleChange('postalCode')}
                                />
                            </div>
                            <div className="col-md-6">
                                <input type="text" placeholder="CVC" value={values.cvc} onChange={handleChange('cvc')} />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    placeholder="Expiry Date"
                                    value={values.expiryDate}
                                    onChange={handleChange('expiryDate')}
                                />
                            </div>
                        </div>

                        <div className="dialog-buttons">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <Button variant="contained" className="no" onClick={handleClose}>
                                        No
                                    </Button>
                                </div>
                                <div className="col-md-6 col-12">
                                    <Button variant="contained" className="yes">
                                        Yes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MyWallet;
