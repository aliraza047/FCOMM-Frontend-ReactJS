import { Dialog, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { couponEmail } from 'redux/action/RewardsAndPromotions';
import makeToast from 'utils/Toaster';

function CouponSendPopup({ open, handleClose, fullWidth, counponId }) {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = () => {
        if (counponId && email.trim()) {
            const emailArr = email.split(',').map(s => s.trim());
            console.log('email split 2', emailArr)
            const data = { couponId: counponId, email: emailArr }
            dispatch(couponEmail(data))
            setEmail('')
        }
        else {
            const data = { couponId: counponId, email: 'all' }
            dispatch(couponEmail(data))
            setEmail('')
        }
    }
    return (
        <Dialog
            open={open}
            fullWidth={fullWidth}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="customModalMain"
        >
            <DialogContent className="customModal">
                <div className="col-md-12 col-12">
                    <div className="col-md-12">
                        <label className='mb-1'>Enter Emails Here</label>
                        <textarea
                            name=""
                            id=""
                            placeholder="Emails"
                            cols="5"
                            rows="4"
                            className="form-control bg-white text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="dialog-buttons">
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-12 text-center">
                                <Button variant="contained" className="px-5" onClick={handleSubmit}>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CouponSendPopup;
