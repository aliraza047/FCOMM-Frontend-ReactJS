import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { addBlog } from 'redux/action/Blog';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import makeToast from 'utils/Toaster';
import { sendPaymentRequest } from 'redux/action/Payment';

const AddBlog = () => {
    const { role, user } = useSelector((state) => state._auth);

    const [amount, setAmount] = React.useState('');
    const [transferAccountNumber, setTransferAccountNumber] = React.useState(user?.user?.accNo);
    const [remarks, setRemarks] = useState('');
    const [transferMethod, setTransferMethod] = useState(user?.user?.paymentMethod);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addPaymentRequest = () => {
        if (amount && transferAccountNumber && amount > 0 && transferMethod) {
            const formdata = new FormData();
            formdata.append('remarks', remarks);
            formdata.append('transferMethod', transferMethod);
            formdata.append('amount', amount);
            formdata.append('currency', 'dollar');
            formdata.append('role', role);
            formdata.append('transferAccountNumber', transferAccountNumber);
            // const data = { amount: amount, currency: 'dollar', role: role }
            dispatch(sendPaymentRequest(formdata, navigate));
        } else {
            makeToast('error', 'Kindly fill all the inputs');
        }
    };

    return (
        <>
            <div className="add-thread addBlog">
                <h2>Add Payment Request</h2>
                <div className="row">
                    <div className="col-lg-12 col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Amount
                                </Typography>
                                <input
                                    type="number"
                                    className="form-control "
                                    value={amount}
                                    name="phone-number"
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Account No
                                </Typography>
                                <input
                                    type="number"
                                    className="form-control "
                                    value={transferAccountNumber}
                                    name="phone-number"
                                    onChange={(e) => setTransferAccountNumber(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Payment Method
                                </Typography>
                                <input
                                    type="text"
                                    className="form-control "
                                    value={transferMethod}
                                    name="phone-number"
                                    onChange={(e) => setTransferMethod(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Remarks
                                </Typography>
                                <input
                                    type="text"
                                    className="form-control "
                                    value={remarks}
                                    name="phone-number"
                                    onChange={(e) => setRemarks(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary brownBtn px-5 mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </div>

                    <div className="btn btn-primary brownBtn px-5" onClick={addPaymentRequest}>
                        Send Request
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBlog;
