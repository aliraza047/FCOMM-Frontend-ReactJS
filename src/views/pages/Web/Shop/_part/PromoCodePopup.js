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
export default function PromoCodePopup({ visible, setVisible, data }) {
    const { all_users } = useSelector((state) => state._user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log('User POpup', data);
    const handleClose = () => {
        setVisible(false);
    };

    return (
        <Dialog
            open={visible}
            onClose={handleClose}
            maxWidth="xl"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="promotional-code-popup">
                <div className="text-end">
                    <CloseIcon onClick={handleClose} />
                </div>
                <h1>Apply a promotional Code.</h1>
                <input type="text" placeholder="Promotional Code" />
                <div className="text-center">
                    <Button className="apply-btn" onClick={handleClose}>
                        Apply
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
