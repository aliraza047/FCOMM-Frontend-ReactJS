import { Button, Dialog } from '@mui/material';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import { getOrderStatusText } from 'utils/helper';

function DesignerOrderDetailPopup({ setVisible, open, data }) {
    const handleClose = () => {
        setVisible(false);
    };

    console.log('Details orders', data);
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
                        <h5 className="mb-0 mt-2">Order Detail</h5>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                            <h5 className="mb-0 mt-2 mx-3">Buyer Details</h5>
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
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Order Status</strong>
                                <div className="margin"></div>
                                <p className="m-0 text-success"> {getOrderStatusText(data?.delivery?.status)}</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Manufaturer Name</strong>
                                <div className="margin"></div>
                                <p className="m-0">
                                    {isArrayCheck(data?.products) &&
                                        isArrayCheck(data?.products) &&
                                        data?.products[0]?.manufacturer?.fullname}
                                </p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Manufaturer Contact Number</strong>
                                <div className="margin"></div>
                                <p className="m-0">
                                    +
                                    {isArrayCheck(data?.products) &&
                                        isArrayCheck(data?.products) &&
                                        data?.products[0]?.designer?.phone_number}
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
                            {/* <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Status</strong>
                                <div className="margin"></div>
                                <p className="m-0 text-success">{data?.delivery?.status}</p>
                            </div>
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Shipment Fee</strong>
                                <div className="margin"></div>
                                <p className="m-0">${data?.shippingCost ?? 0}</p>
                            </div>
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Track Number</strong>
                                <div className="margin"></div>
                                <p className="m-0">#{data?.delivery?.trackingId}</p>
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
                                <th scope="col">Size</th>
                                <th scope="col">Weight (kg)</th>
                                <th scope="col">Color</th>
                                <th scope="col">Price</th>
                                <th scope="col">Cost Price</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">SKU</th>
                            </tr>
                        </thead>
                        <tbody>
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
                                        <td>
                                            <p>${prod?.productId?.totalPrice}</p>
                                        </td>

                                        <td>
                                            <p>${prod?.productId?.makerPrice}</p>
                                        </td>
                                        <td>
                                            <p>${Number(prod?.productId?.makerPrice) + Number(prod?.productId?.totalPrice)}</p>
                                        </td>
                                        <td>
                                            <p>#{prod?.productId?.sku}</p>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="price pb-3 px-4">
                    <div className="d-flex cost-name align-items-center justify-content-between">
                        <h5 className="m-0">Total</h5>
                        <div className="margin"></div>
                        <h5 className="m-0">${data?.totalAmount}</h5>
                    </div>
                </div> */}
                <div className="btn-cancel">
                    <Button variant="contained" className="btn-primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default DesignerOrderDetailPopup;
