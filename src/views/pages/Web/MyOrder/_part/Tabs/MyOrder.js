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
// import { isArrayCheck } from 'views/utilities/common';
import { addMethodArray, formatedDate, formatedTime, orderStatusText } from 'utils/helper';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';

import { useNavigate } from 'react-router';
import ShopRatingReviewPopup from 'views/pages/Web/Shop/_part/Popup/ShopRatingReviewPopup';
function MyOrder({ data, productIdx, lastIndex }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = React.useState(0);
    const { all_orders_data } = useSelector((state) => state._homeOrder);
    const [order, setOrder] = React.useState('')
    const [orderData, setOrderData] = React.useState(data)
    // console.log('Order Product', order?.products[0]?.productId?.name);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = React.useState(false);
    const [rate, setrate] = React.useState(false);
    // console.log('order order',order)
    // console.log('order?.delivery?.status',order?.delivery?.status)
    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        dispatch(getAllMyOrders());
    }, []);
    useEffect(() => {
        if (isArrayCheck(all_orders_data)) {
            const filterOrder = all_orders_data.find(data => data?._id == orderData?._id)
            setOrder(filterOrder)
            console.log('filterOrder', filterOrder)
        }

    }, [all_orders_data])

    const handleClose = () => {
        setOpen(false);
    };
    const [expanded, setExpanded] = React.useState(false);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const confirmOrder =async () => {
        var inputData = {
            id: order?._id,
            'delivery.status': 'received',
            'delivery.trackingStatus' : order?.delivery?.trackingStatus  ? 'received' : '',
            statusDetail: addMethodArray(order?.statusDetail, { status: 'received', createdAt: moment().format() })
        };
        await dispatch(editOrder(inputData));
        handleClose();
        await dispatch(getAllMyOrders());
        // window.location.reload()
    };

    const getProductDesc = (value) => {
        if (!value)
            return "";

        if (value.length > 250)
            return `${value.substring(0, 250)} ...`;

        return value;
    }
    return (
        order && (
            <div className="col-lg-9 col-md-9 col-12 align-items-center justify-content-between">
                <div className=" row col-lg-12">
                    <div className="col-lg-10 col-md-10 col-12" style={{
                        paddingRight: '50px',
                        textAlign: 'justify'
                    }}>
                        <h5 className="mb-0">{order?.products[0]?.productId?.name}</h5>
                        <p className="mb-0">{getProductDesc(order?.products[0]?.productId?.description)}</p>
                        {
                            lastIndex && (
                                <div className="mt-2">
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')}>
                                        <AccordionSummary className="my-order p-0" aria-controls="panel1bh-content" id="panel1bh-header">
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
                            )
                        }
                    </div>
                    {order?.delivery?.status === 'received' ? (
                        <div className="col-lg-2 col-md-2 col-12 position-relative">
                            <p className="mb-0">${order?.subTotalAmount}</p>
                            <Button variant="outlined" onClick={() => setrate(true)} className="order-button">
                                Rate Product
                            </Button>
                        </div>
                    ) : null}
                    <div className="col-lg-2 col-md-2 col-12 position-relative">
                        {
                            order?.delivery?.status !== 'received' && (
                                <p className="mb-0">${order?.subTotalAmount}</p>
                            )
                        }
                        {(order?.delivery?.status === 'shipped' && lastIndex === true) ? (
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
                <ShopRatingReviewPopup open={rate} handleClose={() => setrate(false)} data={order?.products[productIdx]} />
            </div>
        )
    );
}

export default MyOrder;
