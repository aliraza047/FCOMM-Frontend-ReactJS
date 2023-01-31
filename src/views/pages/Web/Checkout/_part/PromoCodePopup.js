import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import '../../../../../assets/scss/style.scss';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import makeToast from 'utils/Toaster';
import { base_url } from 'utils/config';
import { approveUser, editUser } from 'redux/action/User';
import { useNavigate } from 'react-router';
import DialogContent from '@mui/material/DialogContent';
export default function PromoCodePopup({ visible, setVisible, couponCode, setCouponCode, applyCoupon }) {
    const { all_users } = useSelector((state) => state._user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClose = () => {
        setVisible(false);
        setCouponCode('');
    };

    return (
        <Dialog
            open={visible}
            onClose={handleClose}
            maxWidth="xl"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="customModalMain"
        >
            <DialogContent className="customModal promotional-code-popup">
                <div className="text-end closeIcon">
                    <CloseIcon onClick={handleClose} />
                </div>
                <div className="col-md-12 col-10 mx-auto text-center">
                    <div className="row mb-4">
                        <h1 className="text-start mb-3">Apply a Promotional Code.</h1>
                        <div className="col-md-12">
                            <input
                                type="text"
                                placeholder="Promotional code "
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="dialog-buttons">
                        <div className="row">
                            <div className="col-md-12 mx-auto d-flex flex-row">
                                <Button variant="contained" className="yes mx-2 px-5" onClick={handleClose}>
                                    Cancel
                                </Button>

                                <Button variant="contained" className="yes px-5" onClick={() => applyCoupon()}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
