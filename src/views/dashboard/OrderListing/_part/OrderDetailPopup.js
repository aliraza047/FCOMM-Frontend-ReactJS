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

function OrderDetailPopup({ setVisible, open, reward }) {
    const { role } = useSelector((state) => state._auth);
    const { single_order: data } = useSelector((state) => state._order);
    const { setting } = useSelector((state) => state._setting);

    console.log('single_order:data', data?._id, reward);
    const dispatch = useDispatch();
    const [trackingId, settrackingId] = useState('');
    const [openAdd, setopenAdd] = useState(false);
    const [remark, setRemark] = useState('');
    const handleClose = () => {
        setVisible(false);
        setopenAdd(false);
    };

    const [age, setAge] = useState(data?.delivery?.status);
    console.log('data?.delivery?.status', data?.delivery?.status);
    console.log('ageage', age);

    const handleOrderStatus = () => {
        console.log('event.target.value', age);
        if (age == 'Placed') {
            makeToast('error', 'This status is already update');
        }
        setAge(age);
        if (age) {
            var inputData = {
                id: data?._id,
                'delivery.status': age,
                'delivery.trackingStatus': data?.delivery?.trackingStatus ? age : '',
                statusDetail: addMethodArray(data?.statusDetail, { status: age, createdAt: moment().format() })
            };
            // }
        }
        Log('Details input', inputData);
        dispatch(editOrder(inputData));
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const addTracking = () => {
        var inputData = { id: data?._id, 'delivery.status': event.target.value, 'delivery.trackingId': trackingId };
        dispatch(editOrder(inputData));
    };

    const addRemarks = () => {
        console.log('data?._id', data?._id);
        if (remark) {
            var inputData = { id: data?._id, remarks: addMethodArray(data?.remarks, remark) };
            dispatch(editOrder(inputData));
            setRemark('');
            setopenAdd(false);
        } else {
            makeToast('error', 'Enter remarks');
        }
    };

    Log('Detail popup Order', data);
    useEffect(() => {
        console.log('ali', age);
        setAge(data?.delivery?.status);
    }, [data]);

    useEffect(() => {
        dispatch(getSetting());
    }, []);

    // useEffect(() => {
    //     if(isArrayCheck(setting?.logisticStatusOrder)){
    //         let indexArr = setting?.logisticStatusOrder.findIndex((item) => item === data?.delivery?.status)
    //         console.log('indexArr',indexArr)
    //         console.log('indexArr 1', setting?.logisticStatusOrder)
    //         console.log('indexArr 2', data?.delivery?.status)

    //     }
    // }, [setting])

    const showDeliveryStatus = (status) => {
        console.log('Delivery Status ========>', status);
        if (isArrayCheck(setting?.logisticStatusOrder)) {
            let data = setting?.logisticStatusOrder;
            data = data.findIndex((x) => {
                return String(x.status).toLowerCase() === String(status).toLowerCase();
            });

            console.log('Delivery Status Result========>', data);
            if (isNaN(data)) {
                return 0;
            } else {
                return data;
            }
        }
        return 0;
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
                        <div className="manufecturer list-orders">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Order Status</strong>
                                <div className="margin"></div>
                                {data?.delivery?.status === 'received' || data?.delivery?.status === 'shipped' ? (
                                    <p className="m-0 text-success">{getOrderStatusText(data?.delivery?.status)}</p>
                                ) : role === 'admin' &&
                                  reward != 'reward' &&
                                  (data?.delivery?.status === '' || data?.delivery?.status === 'unapproved') ? (
                                    <div className="search-id m-0">
                                        <div className="search-fields dropdown-width m-0">
                                            <Select
                                                value={age}
                                                onChange={handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value={'unapproved'}>
                                                    <em>{getOrderStatusText(data?.delivery?.status)}</em>
                                                </MenuItem>
                                                <MenuItem value={'processToManufacture'}>Process To Manufacture</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                ) : role === 'manufacturer' && data?.delivery?.status == 'processToManufacture' ? (
                                    <div className="search-id m-0">
                                        <div className="search-fields dropdown-width m-0">
                                            <Select
                                                value={age}
                                                onChange={handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                {data?.delivery?.status == 'processToManufacture' && (
                                                    <MenuItem value={'processToManufacture'}>
                                                        <em>Process To Manufacture</em>
                                                    </MenuItem>
                                                )}
                                                {(data?.delivery?.status == 'processToManufacture' ||
                                                    data?.delivery?.status == 'orderMakingDone') && (
                                                    <MenuItem value={'orderMakingDone'}>Order Making Done</MenuItem>
                                                )}
                                                {/* {(data?.delivery?.status == 'processToManufacture' || data?.delivery?.status == 'orderMakingDone') &&
                                                <MenuItem value={'shipped'}>Shipped</MenuItem>} */}
                                            </Select>
                                        </div>
                                    </div>
                                ) : (role === 'logistic' && data?.delivery?.status == 'orderMakingDone') ||
                                  data?.delivery?.status == 'received' ? (
                                    <p className="m-0 text-success">{getOrderStatusText(data?.delivery?.status)}</p>
                                ) : role === 'logistic' &&
                                  data?.delivery?.shipmentTrackingNumber &&
                                  isArrayCheck(setting?.logisticStatusOrder) ? (
                                    <div className="search-id m-0">
                                        <div className="search-fields dropdown-width1 m-0">
                                            <Select
                                                value={age}
                                                onChange={handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem
                                                    value={setting?.logisticStatusOrder[showDeliveryStatus(data?.delivery?.status)]?.status}
                                                >
                                                    {setting?.logisticStatusOrder[showDeliveryStatus(data?.delivery?.status)]?.status}
                                                </MenuItem>

                                                <MenuItem
                                                    value={
                                                        setting?.logisticStatusOrder[showDeliveryStatus(data?.delivery?.status) + 1]?.status
                                                    }
                                                >
                                                    {setting?.logisticStatusOrder[showDeliveryStatus(data?.delivery?.status) + 1]?.status}
                                                </MenuItem>

                                                <MenuItem value={'shipped'}>{'shipped'}</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="m-0 text-success">{getOrderStatusText(data?.delivery?.status)}</p>
                                )}
                            </div>
                        </div>
                        {role === 'logistic' && isArrayCheck(data.remarks) && (
                            <div className="manufecturer">
                                <div className="cost-name">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <strong>Order Remarks</strong>
                                        <div className="margin"></div>
                                        <div>
                                            {data?.remarks.map((dat) => (
                                                <p className="m-0">{dat}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* {age === 'shipped' && !data?.delivery?.trackingId ? (
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
                        ) : null} */}

                        <div className="manufecturer">
                            {role === 'logistic' && (
                                <div className="d-flex cost-name align-items-center justify-content-between">
                                    <strong>Remarks</strong>
                                    <div className="margin"></div>
                                    <p className="m-0 d-flex">
                                        <textarea
                                            name=""
                                            id=""
                                            placeholder="Add Order Remarks"
                                            cols="30"
                                            rows="1.5"
                                            className="form-control"
                                            value={remark}
                                            onChange={(e) => {
                                                setopenAdd(true);
                                                setRemark(e.target.value);
                                            }}
                                        ></textarea>
                                        {openAdd ? (
                                            <div className="btn btn-primary mx-1" onClick={addRemarks}>
                                                Add
                                            </div>
                                        ) : null}
                                    </p>
                                </div>
                            )}
                        </div>
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
                                <strong>Manufacturer Name</strong>
                                <div className="margin"></div>
                                <p className="m-0">{isArrayCheck(data?.products) && data?.products[0]?.manufacturer?.fullname}</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Manufacturer Address</strong>
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
                            {(role === 'logistic' || role === 'admin') && (
                                <React.Fragment>
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
                                        <p className="m-0">#{data?.delivery?.shipmentTrackingNumber}</p>
                                    </div>
                                </React.Fragment>
                            )}
                            {role === 'admin' && (
                                <div className="d-flex cost-name align-items-center justify-content-between">
                                    <strong>Discount</strong>
                                    <div className="margin"></div>
                                    <p className="m-0">{data?.discount ? '$' + data?.discount : '$0'}</p>
                                </div>
                            )}
                            {/* <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Address</strong>
                                <div className="margin"></div>
                                <p className="m-0">
                                    {data?.billingAddress?.houseNo},{data?.billingAddress?.poBoxNo},{data?.billingAddress?.state},
                                    {data?.billingAddress?.streetNo}
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Size(l,b,h) cm</th>
                                <th scope="col">Weight (kg)</th>
                                <th scope="col">Color</th>
                                {role !== 'logistic' && (
                                    <React.Fragment>
                                        <th scope="col">Price</th>
                                        <th scope="col">Cost Price</th>
                                        <th scope="col">Total Price</th>
                                    </React.Fragment>
                                )}
                                <th scope="col">SKU</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Log('Products', data)}
                            {isArrayCheck(data?.products) &&
                                data?.products?.map((prod) => (
                                    <tr>
                                        <td>
                                            <img
                                                src={
                                                    isArrayCheck(prod?.productId?.productImage)
                                                        ? base_url_new + prod?.productId?.productImage[0]?.url
                                                        : 'https://i0.wp.com/alarusinteriors.com/wp-content/uploads/2020/04/IMG-0075.jpg'
                                                }
                                                alt=""
                                                style={{
                                                    objectFit: 'cover',
                                                    height: '50px',
                                                    width: '50px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </td>
                                        <td style={{ width: '220px' }}>
                                            <p>{prod?.productId?.name}</p>
                                        </td>
                                        <td>
                                            <p>{prod?.quantity}</p>
                                        </td>
                                        <td>
                                            <p>
                                                ({prod?.productId?.length + ',' + prod?.productId?.breadth + ',' + prod?.productId?.height})
                                            </p>
                                        </td>
                                        <td>
                                            <p>{prod?.productId?.weight}</p>
                                        </td>
                                        <td>
                                            {/* <p>{prod?.productId?.color}</p> */}
                                            <div
                                                style={{
                                                    height: 25,
                                                    width: 25,
                                                    borderRadius: 100,
                                                    backgroundColor: prod?.productId?.color ? prod?.productId?.color : '#000',
                                                    borderWidth: 1,
                                                    borderColor: '#a4a4a4'
                                                }}
                                            ></div>
                                        </td>
                                        {role !== 'logistic' && (
                                            <React.Fragment>
                                                <td>
                                                    <p>${prod?.productId?.totalPrice}</p>
                                                </td>
                                                <td>
                                                    <p>${prod?.productId?.makerPrice}</p>
                                                </td>
                                                <td>
                                                    <p>${Number(prod?.productId?.makerPrice) + Number(prod?.productId?.totalPrice)}</p>
                                                </td>
                                            </React.Fragment>
                                        )}
                                        <td>
                                            <p>#{prod?.productId?.sku}</p>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                {role === 'admin' && (
                    <div className="price pb-3 px-4">
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            <h5 className="m-0">Total</h5>
                            <div className="margin"></div>
                            <h5 className="m-0">${Number(data?.totalAmount).toFixed(2)}</h5>
                        </div>
                    </div>
                )}

                <div className="d-flex flex-row justify-content-center">
                    {String(data?.delivery?.status) != String(age) && (
                        <div className="btn-cancel mx-2">
                            <Button variant="contained" className="btn-primary" onClick={handleOrderStatus}>
                                Confirm
                            </Button>
                        </div>
                    )}

                    <div className="btn-cancel">
                        <Button variant="contained" className="btn-primary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default OrderDetailPopup;
