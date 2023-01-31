import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddProductVariation from './AddProductVariation';
export default function AddModalVariation({ visible, setVisible }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <Dialog open={visible} onClose={handleClose} maxWidth="xl" aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <AddProductVariation handleClickOpen={handleClickOpen} handleClose={handleClose} />
        </Dialog>
    );
}
