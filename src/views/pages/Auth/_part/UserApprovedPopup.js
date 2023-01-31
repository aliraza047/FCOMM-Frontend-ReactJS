import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import logo from '../../../../assets/images/logo.png';
import centerimg from '../../../../assets/images/centerimg.png';
import CloseIcon from '@mui/icons-material/Close';
function UserApprovedPopup({ visible, setVisible }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setVisible(false);
    };

    const handleClose = () => {
        setVisible(false);
    };
    return (
        <Dialog
            open={visible}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="model"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                        <div className="cross">
                            <CloseIcon onClick={handleClose} />
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="centerimg">
                            <img src={centerimg} alt="" />
                            <p className="mb-0">Please wait for the approval. You will receive an email. it can take upto 48 hours.</p>
                        </div>
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
        //   <Modal
        //     {...props}
        //     size="lg"
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
        //     className="model"
        //   >
        //     <Modal.Header closeButton>
        //       <Modal.Title id="contained-modal-title-vcenter">
        //       <img src={logo} alt="" />
        //       </Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //     <div className="col-md-6 col-6 mx-auto text-center">
        //     <img src={centerimg} alt="" />
        //       <p className='mb-0'>
        //       Please wait for the approval. You will receive an email. it can take upto 48 hours.
        //       </p>
        //       </div>
        //     </Modal.Body>
        //   </Modal>
    );
}

export default UserApprovedPopup;
