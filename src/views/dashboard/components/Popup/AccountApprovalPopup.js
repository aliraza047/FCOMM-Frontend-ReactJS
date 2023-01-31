import * as React from 'react';
import Dialog from '@mui/material/Dialog';
export default function AccountApprovalPopup({ visible, setVisible }) {
    const handleClose = () => {
        setVisible(false);
    };

    return (
        <Dialog
            open={visible}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        ></Dialog>
    );
}
