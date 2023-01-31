import { Dialog, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { editOrder, shippmentOrder } from 'redux/action/Order';
import { addMethodArray, getOrderStatusText, Log } from 'utils/helper';
import { base_url_new } from 'utils/config';
import Checkbox from '@mui/material/Checkbox';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { isArrayCheck, dumyOptions } from 'views/utilities/common';
import TooltipShipping from 'ui-component/tooltipShipping';
import moment from 'moment';
import makeToast from 'utils/Toaster';
import Button from '@mui/material/Button';
import { getSetting } from 'redux/action/Setting';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function OrderAssignPopup({ setVisible, open }) {
    const { role } = useSelector((state) => state._auth);
    const { single_order: data } = useSelector((state) => state._order);
    const { setting } = useSelector((state) => state._setting);
    console.log('single_order:data', data);
    const dispatch = useDispatch();
    const [trackingId, settrackingId] = useState('');
    const [openAdd, setopenAdd] = useState(false);
    const [selectPickup, setselectPickUp] = React.useState([1]);

    const handleClose = () => {
        setVisible(false);
    };

    const [age, setAge] = useState(data?.delivery?.status);
    console.log('data?.delivery?.status', data?.delivery?.status);
    console.log('ageage', age);

    const handleChange = (event) => {
        console.log('event.target.value', event.target.value);
        if (event.target.value == 'Placed') {
            makeToast('error', 'This status is already update');
        }
        setAge(event.target.value);
        let inputData;
        if (event.target.value) {
            if (event.target.value === 'shipped') {
                inputData = {
                    id: data?._id,
                    'delivery.status': event.target.value,
                    'delivery.trackingId': trackingId,
                    statusDetail: addMethodArray(data?.statusDetail, { status: event.target.value, createdAt: moment().format() })
                };
            } else {
                inputData = {
                    id: data?._id,
                    'delivery.status': event.target.value,
                    statusDetail: addMethodArray(data?.statusDetail, { status: event.target.value, createdAt: moment().format() })
                };
            }
        }
        Log('Details', inputData);
        dispatch(editOrder(inputData));
    };

    const addTracking = () => {
        var inputData = { id: data?._id, 'delivery.status': event.target.value, 'delivery.trackingId': trackingId };
        dispatch(editOrder(inputData));
    };

    const addShippment = () => {
        var inputData = {
            id: data?._id,
            statusDetail: addMethodArray(data?.statusDetail, {
                status: isArrayCheck(setting?.logisticStatusOrder) ? setting?.logisticStatusOrder[0].status : '',
                createdAt: moment().format()
            })
        };
        dispatch(shippmentOrder(inputData, setVisible));
    };

    Log('Detail popup Order', data);
    useEffect(() => {
        setAge(data?.delivery?.status);
    }, [data]);

    useEffect(() => {
        dispatch(getSetting());
    }, []);

    const getTotalShipping = (subtotal, markShipping) => {
        return (subtotal + subtotal * (markShipping / 100))?.toFixed(2);
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
                        <h5 className="mb-0 mt-2">Order Details</h5>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                            <h5 className="mb-0 mt-2">Shipping Address</h5>
                            <CloseIcon onClick={handleClose} />
                        </div>
                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-lg-6 col-md-6">
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Order ID</strong>
                                <div className="margin"></div>
                                <p className="m-0">ord{data?._id?.substring(0, 10)}</p>
                            </div>
                        </div>

                        {age === 'shipped' && !data?.delivery?.trackingId ? (
                            <div className="manufecturer">
                                <div className="d-flex cost-name align-items-center justify-content-between">
                                    <strong>Tracking Id</strong>
                                    <div className="margin"></div>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            settrackingId(e.target.value);
                                            setopenAdd(true);
                                        }}
                                        className="form-control"
                                        name="price"
                                    />
                                    {openAdd ? (
                                        <div className="btn btn-primary mx-1" onClick={addTracking}>
                                            Add
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ) : null}

                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Designer</strong>
                                <div className="margin"></div>
                                <p className="m-0">
                                    {isArrayCheck(data?.products) && isArrayCheck(data?.products) && data?.products[0]?.designer?.fullname}
                                </p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Designer Contact Number</strong>
                                <div className="margin"></div>
                                <p className="m-0">+{isArrayCheck(data?.products) && data?.products[0]?.designer?.phone_number}</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Manufacture Name</strong>
                                <div className="margin"></div>
                                <p className="m-0">{isArrayCheck(data?.products) && data?.products[0]?.manufacturer?.fullname}</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Manufacture Address</strong>
                                <div className="margin"></div>
                                <p className="m-0">
                                    {isArrayCheck(data?.products) &&
                                        data?.products[0]?.manufacturer?.myAddresses[0]?.country +
                                            ',' +
                                            data?.products[0]?.manufacturer?.myAddresses[0]?.state +
                                            ',' +
                                            data?.products[0]?.manufacturer?.myAddresses[0]?.city +
                                            ',' +
                                            data?.products[0]?.manufacturer?.address}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Buyer Name</strong>
                                <div className="margin"></div>
                                <p className="m-0">{data?.createdBy?.fullname}</p>
                            </div>
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Buyer Address</strong>
                                <div className="margin"></div>
                                <p className="m-0">
                                    {data?.billingAddress?.houseNo +
                                        ',' +
                                        data?.billingAddress?.streetNo +
                                        ',' +
                                        data?.billingAddress?.state}
                                </p>
                            </div>
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Buyer Contact Number</strong>
                                <div className="margin"></div>
                                <p className="m-0">+{data?.createdBy?.phone_number}</p>
                            </div>
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Shipment Fee</strong>
                                <div className="margin"></div>
                                <p className="m-0">
                                    <TooltipShipping
                                        text={`$${data?.shippingCost}`}
                                        qty={data?.products?.length > 0 ? data?.products[0]?.quantity : 0}
                                        markupShipping={data?.products?.length > 0 ? data?.products[0]?.productId?.shipping : 0}
                                        responseShipping={
                                            data?.products?.length > 0 && data?.products[0]?.responseDHL?.length > 0
                                                ? data?.products[0]?.responseDHL[0].responseShipping
                                                : null
                                        }
                                    />
                                </p>
                            </div>
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Track Number</strong>
                                <div className="margin"></div>
                                <p className="m-0">#{data?.delivery?.trackingId}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12 col-md-12">
                    <div className="heading row justify-content-between align-item-center mx-0">
                        <div className="col-md-6">
                            <h5 className="mb-0 mt-2">Pickup options</h5>
                        </div>
                    </div>
                    <h5></h5>
                    <div className="check-icons d-flex  p-3">
                        {isArrayCheck(data?.products) &&
                            isArrayCheck(data?.products[0]?.responseDHL[0]?.responseCompleteDhl) &&
                            data?.products[0]?.responseDHL[0]?.responseCompleteDhl?.map((dat, id) => {
                                return (
                                    <div
                                        className="d-flex flex-column check text-center"
                                        onClick={() => {
                                            // if (selectPickup.includes(data?._id)) {
                                            //     setselectPickUp(selectPickup.filter(x => x !== data?._id));
                                            // } else {
                                            //     setselectPickUp([...selectPickup, data?._id]);
                                            // }
                                        }}
                                    >
                                        <div className="border p-3 m-1" style={{ lineHeight: '24px' }}>
                                            <p className="m-0">Name: {dat?.productName}</p>
                                            {/* dat?.totalPrice[0]?.price */}
                                            <p className="m-0">
                                                Price:
                                                <TooltipShipping
                                                    style={{ marginLeft: '5px', display: 'inline-block' }}
                                                    text={`$${getTotalShipping(
                                                        dat?.totalPrice[0]?.price,
                                                        data?.products?.length > 0 ? data?.products[0]?.productId?.shipping : 0
                                                    )}`}
                                                    qty={data?.products?.length > 0 ? data?.products[0]?.quantity : 0}
                                                    markupShipping={data?.products?.length > 0 ? data?.products[0]?.productId?.shipping : 0}
                                                    responseShipping={dat}
                                                />
                                            </p>
                                            <p className="m-0">Delivery Type Code: {dat?.deliveryCapabilities?.deliveryTypeCode}</p>
                                            <p className="m-0">Est Delivery: {dat?.deliveryCapabilities?.estimatedDeliveryDateAndTime}</p>
                                        </div>
                                        <Checkbox
                                            {...label}
                                            disabled={true}
                                            icon={<CircleOutlinedIcon />}
                                            checkedIcon={<CircleIcon />}
                                            checked={
                                                String(data?.products[0]?.responseDHL[0]?.responseShipping.productName) ==
                                                String(dat?.productName)
                                            }
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className="d-flex justify-content-center my-3 mt-5 btn-cancel">
                    <Button variant="contained" className="saveBtn btn-primary mx-2" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" className="saveBtn btn-primary" onClick={addShippment}>
                        Create Shipment
                    </Button>
                    {/* <div className="btn  brownBtn px-3" >
                        Create Shipment
                    </div> */}
                </div>
            </div>
        </Dialog>
    );
}

export default OrderAssignPopup;
