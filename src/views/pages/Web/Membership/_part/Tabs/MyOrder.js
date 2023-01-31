import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
import { useDispatch } from 'react-redux';
import { editOrder } from 'redux/action/Order';
import { getAllMyOrders } from 'redux/action/Customer.Action/Order';
import { isArrayCheck } from 'views/utilities/common';
import { addMethodArray, formatedDate, formatedTime, orderStatusText } from 'utils/helper';
import moment from 'moment';
function MyOrder({ order }) {
    const [value, setValue] = React.useState(0);
    // console.log('Order Product', order?.products[0]?.productId?.name);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        dispatch(getAllMyOrders());
    }, []);

    const handleClose = () => {
        setOpen(false);
    };
    const [expanded, setExpanded] = React.useState(false);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const confirmOrder = () => {
        var inputData = {
            id: order?._id,
            'delivery.status': 'received',
            statusDetail: addMethodArray(order?.statusDetail, { status: 'received', createdAt: moment().format() })
        };
        dispatch(editOrder(inputData));
        dispatch(getAllMyOrders());
        handleClose();
    };

    return (
        <div className="col-lg-9 col-md-9 col-12 align-items-center justify-content-between">
            <div className=" row col-lg-12">
                <div className="col-lg-10 col-md-10 col-12">
                    <h5 className="mb-0">{order?.products[0]?.productId?.name}</h5>
                    <p className="mb-0">{order?.products[0]?.productId?.description}</p>
                    <div className="mt-2">
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
                            <AccordionSummary className="my-order" aria-controls="panel1bh-content" id="panel1bh-header" className="p-0">
                                <p>
                                    Delivery Status <ExpandMoreIcon />
                                </p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <div className="mt-2 my-order">
                                        <p className="mb-0">
                                            Order Number: <span>{order?._id.substring(0, 15)}</span>
                                        </p>
                                        <p className="mb-0">
                                            Delivery Status: <span>{orderStatusText(order?.delivery?.status)}</span>
                                        </p>
                                        <p className="mb-0">
                                            Payment Status: <span>{order?.payment?.isPaid ? 'Paid' : 'Not Paid'}</span>
                                        </p>
                                    </div>
                                    <Timeline>
                                        {isArrayCheck(order?.statusDetail) &&
                                            order?.statusDetail?.map((data, id) => (
                                                <TimelineItem>
                                                    <TimelineSeparator>
                                                        <TimelineDot />
                                                        <TimelineConnector />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <div className="row w-100">
                                                            <div className="col-sm-4 futuraMedium">
                                                                <span>{formatedDate(data?.createdAt)}</span>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <p>{formatedTime(data?.createdAt)}</p>
                                                            </div>
                                                            <div className="col-sm-5">
                                                                <p>{orderStatusText(data?.status)}</p>
                                                            </div>
                                                        </div>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            ))}

                                        {/* <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <div className="row w-100">
                                                    <div className="col-sm-4 futuraMedium"></div>
                                                    <div className="col-sm-3">
                                                        <p>11:46:07</p>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <p>Warehouse Notified</p>
                                                    </div>
                                                </div>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <div className="row w-100">
                                                    <div className="col-sm-4 futuraMedium">
                                                        <span>2021- Nov-04</span>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <p>11:46:07</p>
                                                    </div>
                                                    <div className="col-sm-5">
                                                        <p>Order Placed</p>
                                                    </div>
                                                </div>
                                            </TimelineContent>
                                        </TimelineItem> */}
                                    </Timeline>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 col-12 position-relative">
                    <p className="mb-0">${order?.totalAmount}</p>
                    {order?.delivery?.status === 'shipped' ? (
                        <Button variant="outlined" onClick={handleClickOpen} className="order-button">
                            Order Received
                        </Button>
                    ) : null}
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="customModalMain"
            >
                <DialogContent className="customModal">
                    <div className="col-md-12 col-10 mx-auto text-center">
                        <p className="mb-0">
                            Would you like to confirm that you have received your order? A total of US ${order?.totalAmount} would be
                            released to the seller upon confirmation.
                        </p>

                        <div className="dialog-buttons">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <Button variant="contained" className="no" onClick={handleClose}>
                                        No
                                    </Button>
                                </div>
                                <div className="col-md-6 col-12">
                                    <Button variant="contained" className="yes" onClick={confirmOrder}>
                                        Yes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MyOrder;
