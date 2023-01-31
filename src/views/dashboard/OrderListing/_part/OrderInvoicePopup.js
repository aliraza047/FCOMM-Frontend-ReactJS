import { Button, Dialog, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { editOrder } from 'redux/action/Order';
import { addMethodArray, getOrderStatusText, Log } from 'utils/helper';
import { base_url_new } from 'utils/config';
import { isArrayCheck } from 'views/utilities/common';
import TooltipShipping from 'ui-component/tooltipShipping';
import moment from 'moment';
import makeToast from 'utils/Toaster';
import { getSetting } from 'redux/action/Setting';
import InvoiceDetail from './InvoiceDetail';

function OrderInvoicePopup({ setVisible, open }) {
    const { single_order: data } = useSelector((state) => state._order);
    const handleClose = () => {
        setVisible(false);
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xl"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="approval-detail-popup">
                <div className="heading row justify-content-between align-item-center mx-0">
                    <div className="col-md-6">
                        <h5 className="mb-0 mt-2">Invoice Details</h5>
                    </div>
                    <InvoiceDetail data={data} handleClose={handleClose} />
                </div>
            </div>
        </Dialog>
    );
}

export default OrderInvoicePopup;
