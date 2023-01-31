import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector, useDispatch } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
import { addMethodArray, removeMethodArray } from 'utils/helper';
import { editUser } from 'redux/action/User';
import { getMyProfile } from 'redux/action/Auth';

function MyAddress() {
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        houseNo: '',
        streetNo: '',
        poBoxNo: '',
        state: ''
    });
    const { user } = useSelector((state) => state._auth);
    console.log('My addresse', user);
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
    };
    const handleAdd = () => {
        const arr = isArrayCheck(user?.user?.myAddresses) ? user?.user?.myAddresses : [];
        let dataArr = addMethodArray(arr, values);
        setOpen(false);
        console.log('Add Array =>', dataArr);
        dispatch(editUser({ id: user?.user?._id, myAddresses: dataArr }, null));
        dispatch(getMyProfile());
        dispatch(getMyProfile());
    };
    const handleRemove = (obj) => {
        const arr = isArrayCheck(user?.user?.myAddresses) ? user?.user?.myAddresses : [];
        let dataArr = removeMethodArray(arr, obj);
        console.log('Remove Array =>', dataArr);
        dispatch(editUser({ id: user?.user?._id, myAddresses: dataArr }, null));
        dispatch(getMyProfile());
        dispatch(getMyProfile());
    };

    return (
        <>
            <div className="address">
                <h5>Shipping Address</h5>
            </div>

            {isArrayCheck(user?.user?.myAddresses) &&
                user?.user?.myAddresses.map((data, id) => (
                    <div className="address mt-1">
                        {console.log('user data=>addresss', data)}
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="mb-0">{user?.user?.fullname}</p>
                            <div className="edit">
                                <span className="mb-0" style={{ cursor: 'pointer' }} onClick={() => handleRemove(data)}>
                                    Remove
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-12 alignitems-center justify-content-between">
                            <p className="mb-0">{data.houseNo}</p>
                            <p className="mb-0">{data.streetNo}</p>
                            <p className="mb-0">{data.poBoxNo}</p>
                            <p className="mb-0">{data.state}</p>
                        </div>
                    </div>
                ))}
            <div className="row address-button d-flex justify-content-end">
                <Button variant="contained" onClick={handleClickOpen} className="newaddressbutton">
                    Add New Address
                </Button>
            </div>

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
                            <div className="col-md-6">
                                <input type="text" placeholder="House No." value={values.houseNo} onChange={handleChange('houseNo')} />
                            </div>
                            <div className="col-md-6">
                                <input type="text" placeholder="Street No." value={values.streetNo} onChange={handleChange('streetNo')} />
                            </div>
                            <div className="col-md-6">
                                <input type="text" placeholder="PO Box Number" value={values.poBoxNo} onChange={handleChange('poBoxNo')} />
                            </div>
                            <div className="col-md-6">
                                <input type="text" placeholder="Country" value={values.state} onChange={handleChange('state')} />
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
                                    <Button variant="contained" className="yes" onClick={handleAdd}>
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default MyAddress;
