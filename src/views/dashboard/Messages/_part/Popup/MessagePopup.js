import { Dialog, DialogContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import profile from 'assets/images/home/Rectangle.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserListing, getAllUserListing, getAllUsers } from 'redux/action/User';
import { isArrayCheck } from 'views/utilities/common';
import { base_url } from 'utils/config';
import { createConversation } from 'redux/action/Message/index';
function MessagePopup({ open, handleClose, setselectedUser }) {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [searchInput, setsearchInput] = React.useState('');

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
    const [searchData, setsearchData] = useState('');
    const dispatch = useDispatch();
    const { all_users } = useSelector((state) => state._user);
    console.log('All USers', all_users);
    useEffect(() => {
        dispatch(getAllUsers({ isActive: true }));
        return () => {
            dispatch(clearUserListing());
        };
    }, []);

    const handleSearch = (event) => {
        setsearchInput(event.target.value);
        const data = all_users?.filter((x, id) => String(x.fullname).includes(event.target.value));
        if (data) {
            setsearchData(data);
        } else {
            setsearchData('');
        }
    };

    return (
        <Dialog
            open={open}
            fullWidth={fullWidth}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="message-dialog"
        >
            <DialogContent className="">
                <div className="d-flex align-items-center justify-content-between">
                    <h2 className="mb-2">Find User</h2>
                    <CloseIcon className="mb-2" onClick={handleClose} />
                </div>
                <div className="col-md-12 col-12 mx-auto text-center">
                    <div className="d-flex align-items-center justify-content-between">
                        <input type="text" className="form-control" placeholder="Search User" onChange={handleSearch} value={searchInput} />
                    </div>
                    <div className="user-list">
                        {/* <div className="d-flex align-items-center inbox">
                            <img src={profile} alt="" />
                            <div className="content">
                                <h2>Ahmad Stanton</h2>
                            </div>
                        </div> */}
                        {isArrayCheck(searchData) &&
                            searchData?.map((data, id) => (
                                <div
                                    className="d-flex align-items-center inbox"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        console.log('data', data);

                                        dispatch(createConversation(data?._id, handleClose));
                                    }}
                                >
                                    <img src={data?.profile?.includes('http') ? data.profile : base_url + data.profile} alt="" />
                                    <div className="content">
                                        <h2>{data?.fullname}</h2>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MessagePopup;
