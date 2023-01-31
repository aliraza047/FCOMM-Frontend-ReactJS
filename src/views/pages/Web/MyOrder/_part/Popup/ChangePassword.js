import { Dialog, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changePassword } from 'redux/action/Auth';

function ChangePassword({ open, handleClose, fullWidth }) {
    const [cpassword, setcpassword] = useState('');
    const [password, setpassword] = useState('');
    const dispatch = useDispatch();
    const handleUpdatePassword = () => {
        dispatch(changePassword({ password: cpassword, newPassword: password }, handleClose));
        setcpassword('')
        setpassword('')
    };
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
                <div className="col-md-12 col-12 mx-auto text-center">
                    <div className="col-md-12">
                        <input
                            type="text"
                            placeholder="Current Password"
                            value={cpassword}
                            onChange={(e) => setcpassword(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <input type="text" placeholder="New Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                    </div>

                    <div className="dialog-buttons">
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-12">
                                <Button variant="contained" className="no" onClick={handleUpdatePassword}>
                                    Update Password
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ChangePassword;
