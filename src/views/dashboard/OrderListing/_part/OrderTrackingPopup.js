import { Button, Dialog, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { editOrder, shippmentOrder } from 'redux/action/Order';
import { addMethodArray, formatedDate, formatedTime, getOrderStatusText, Log, orderStatusText } from 'utils/helper';
import { base_url_new } from 'utils/config';
import Checkbox from '@mui/material/Checkbox';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { isArrayCheck, dumyOptions } from 'views/utilities/common';
import moment from 'moment';
import makeToast from 'utils/Toaster';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function OrderTrackingPopup({ setVisible, open }) {
    const { role } = useSelector((state) => state._auth);
    const { single_order_tracking: data } = useSelector((state) => state._order);
    console.log('single_order:data', data);
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState('panel1');
    console.log('expanded', expanded);
    const [age, setAge] = useState(data?.delivery?.status);

    const handleClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        setAge(data?.delivery?.status);
    }, [data]);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="approval-detail-popup trackingPopup">
                <div className="col-lg-12 col-md-12">
                    <div className="heading row justify-content-between align-item-center mx-0">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="mb-0 mt-2">Shippment Tracking</h5>
                            <CloseIcon onClick={handleClose} />
                        </div>
                    </div>
                    <h5></h5>
                    <div className="check-icons d-flex p-3 accordionSummary">
                        <div className="mt-2">
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
                                <AccordionSummary className="my-order p-0 m-0" aria-controls="panel1bh-content" id="panel1bh-header">
                                    <p className="mb-0">
                                        Tracking Status <ExpandMoreIcon />
                                    </p>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <div className="mt-2 my-order">
                                            <p className="mb-0">
                                                Shipment Tracking Number: <span>{data?.shipmentTrackingNumber}</span>
                                            </p>
                                            <p class="mb-3">
                                                Shipment Timestamp: <span>{formatedTime(data?.shipmentTimestamp)}</span>
                                            </p>
                                        </div>
                                        <Timeline className="diplayTimeline">
                                            {isArrayCheck(data?.events) &&
                                                data?.events?.map((data, id) => (
                                                    <TimelineItem>
                                                        <TimelineSeparator>
                                                            <TimelineDot />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>
                                                            <div className="row w-100">
                                                                <div className="col-sm-4 futuraMedium">
                                                                    <span>{formatedDate(data?.date)}</span>
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <p>{data?.time}</p>
                                                                </div>
                                                                <div className="col-sm-5">
                                                                    <p>{data?.description}</p>
                                                                </div>
                                                            </div>
                                                        </TimelineContent>
                                                    </TimelineItem>
                                                ))}
                                        </Timeline>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
                <div className="btn-cancel">
                    <Button variant="contained" className="btn-primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default OrderTrackingPopup;
