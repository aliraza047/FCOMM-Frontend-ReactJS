import { Dialog, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import makeToast from 'utils/Toaster';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddIcon from '@mui/icons-material/Add';
import { editPaymentRequest, sendPaymentRequest } from 'redux/action/Payment';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { clearUserListing, getUserListingManuDes } from 'redux/action/User';
import { isArrayCheck } from 'views/utilities/common';

function PaymentFormPopup({ setVisible, open, data , setData }) {
    console.log('data ali', data);
    const { role } = useSelector((state) => state._auth);
    const { all_users } = useSelector((state) => state._user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [transferDate, setTransferDate] = useState('');
    const [transferMethod, setTransferMethod] = useState('');
    const [transferAccountNumber, setTransferAccountNumber] = useState('');
    console.log('data?.transferAccountNumber' ,transferAccountNumber ,  data?.transferAccountNumber)
    const [transferAmount, setTransferAmount] = useState('');
    const [currency, setCurrency] = useState('dollar');
    const [remarks, setRemarks] = useState('');
    const [url, setUrl] = useState('');
    const [imageProof, setImageProof] = useState('');
    const [requestBy, setRequestBy] = useState('');
    console.log('requestBy',transferDate)

    useEffect(() => {
        console.log('data123', data);
        if ((data == 'designer' || data == 'manufacturer')) {
            console.log('admin run');
            dispatch(getUserListingManuDes({ isApproved: 'approved', role: [data] }));
        }else if(typeof data === 'object'){
            console.log('admin run else');
            setTransferAccountNumber(data?.transferAccountNumber)
            setTransferMethod(data?.transferMethod)
            setCurrency(data?.currency)
            setTransferAmount(data?.RequestAmount)
        }
        return () => {
            dispatch(clearUserListing());
        };
    }, [data]);

    const handleClose = () => {
        setVisible(false);
        setTransferAccountNumber('')
        setTransferMethod('')
        setCurrency('')
        setTransferAmount('')
        setData('')
        setRequestBy('')
        setImageProof('')
        setUrl('')
        setTransferDate('')
        setRemarks('')
    };

    const imageUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            setUrl(e.target.result);
            setImageProof(file);
        };
        reader.readAsDataURL(file);
    };
    const handlePaymentAccept = () => {
        if (transferDate && transferMethod && transferAccountNumber && transferAmount && currency && remarks) {
            const formdata = new FormData();
            if(data?._id && (data != 'manufacturer' || data != 'designer')){
                formdata.append('id', data?._id);
            }
            formdata.append('transferDate', transferDate);
            formdata.append('transferMethod', transferMethod);
            formdata.append('transferAccountNumber', transferAccountNumber);
            formdata.append('transferAmount', transferAmount);
            formdata.append('currency', currency);
            formdata.append('imageProof', imageProof);
            formdata.append('status', 'approved');
            formdata.append('remarks', remarks);
            if(data == 'manufacturer' || data == 'designer'){
                const reqRole = isArrayCheck(all_users) && all_users.find((x) => x._id == requestBy);
                formdata.append('role', 'admin');
                formdata.append('RequestRole', reqRole?.role[0]);
                formdata.append('RequestBy', requestBy);
                formdata.append('type', 'direct');
                formdata.append('chkCall', data);
                dispatch(sendPaymentRequest(formdata, '', false, handleClose));
            }else{
                dispatch(editPaymentRequest(formdata, handleClose));
            }
        } else {
            makeToast('error', 'Kindly fill all the inputs');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xl"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="approval-detail-popup">
                <div className="heading row justify-content-between align-item-center mx-0">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-between">
                            <h5 className="mb-0 mt-2">Payment</h5>
                            <CloseIcon onClick={handleClose} />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-1">
                            <div className="input-field">
                                <div className="upload-btn">
                                    <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                        <div className="plus-icon">
                                            <AddIcon />
                                        </div>
                                        {url ? (
                                            <img
                                                src={url}
                                                alt=""
                                                style={{ height: 148, width: 148, objectFit: 'cover', borderRadius: '7px' }}
                                            />
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
                        <div className="col-md-6 mt-1"></div>
                        <div className="col-md-6 mt-1">
                            <div className="input-field paymentDatePicker">
                                <label className="label" htmlFor="user-name">
                                    Transfer Date
                                </label>
                                <DatePicker
                                    placeholderText="Select Date..."
                                    // showTimeSelect
                                    dateFormat="MMMM d, yyyy"
                                    selected={transferDate}
                                    onChange={(date) => setTransferDate(date)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-1">
                            <div className="input-field">
                                <label className="label" htmlFor="user-name">
                                    Transfer Method
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    name="transferMethod"
                                    value={transferMethod}
                                    onChange={(e) => setTransferMethod(e.target.value)}
                                />
                            </div>
                        </div>
                        { (data == 'manufacturer' || data == 'designer') && (
                            <div className="col-md-6 mt-1">
                                <div className="input-field paymentSelect">
                                    <label className="label" htmlFor="user-name">
                                        Select User
                                    </label>
                                    <select id="cars" onChange={(e) => setRequestBy(e.target.value)} value={requestBy}>
                                        <option value={''}>{'Select User'}</option>
                                        {isArrayCheck(all_users) &&
                                            all_users?.map((data, id) => <option value={data?._id}>{data?.fullname}</option>)}
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="col-md-6 mt-1">
                            <div className="input-field">
                                <label className="label" htmlFor="user-name">
                                    Transfer Account No
                                </label>
                                <input
                                    type="number"
                                    className="form-control "
                                    name="accountNumber"
                                    value={transferAccountNumber}
                                    onChange={(e) => setTransferAccountNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-1">
                            <div className="input-field">
                                <label className="label" htmlFor="user-name">
                                    Transfer Amount
                                </label>
                                <input
                                    type="number"
                                    className="form-control "
                                    name="transferAmount"
                                    value={transferAmount}
                                    onChange={(e) => setTransferAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-1">
                            <div className="input-field">
                                <label className="label" htmlFor="user-name">
                                    Currency
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    name="currency"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mt-1">
                            <div className="input-field">
                                <label className="label" htmlFor="user-name">
                                    Remarks
                                </label>
                                <input
                                    type="text"
                                    className="form-control "
                                    name="remarks"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center my-3 mt-5 add-thread" onClick={handlePaymentAccept}>
                    <button className="btn text-light brownBtn px-5">Save</button>
                </div>
            </div>
        </Dialog>
    );
}

export default PaymentFormPopup;


// let inputData = {
            //     id: data?._id,
            //     transferDate,
            //     transferMethod,
            //     transferAccountNumber,
            //     transferAmount,
            //     currency,
            //     remarks,
            //     status: 'approved'
            // };