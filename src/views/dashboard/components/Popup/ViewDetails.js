import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import '../../../../assets/scss/style.scss';
import HeaderDetailPopup from './Table/HeaderDetailPopup';
import RowDetailPopup from './Table/RowDetailPopup';
import { isArrayCheck } from 'views/utilities/common';
import { Button } from '@mui/material';
export default function ViewDetails({ visible, setVisible, data }) {
    const handleClose = () => {
        setVisible(false);
    };
    console.log('View Details Product', data);
    return (
        <div>
            <Dialog
                open={visible}
                onClose={handleClose}
                maxWidth="xl"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="view-detail-popup">
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Product Details</h2>
                        <CloseIcon onClick={handleClose} />
                    </div>
                    <div className="manufecturer">
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            <strong>Designer Name</strong>
                            <div className="margin"></div>
                            <p className="m-0">{data?.designer?.fullname}</p>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Designer Email</strong>
                                <div className="margin"></div>
                                <p className="m-0">{data?.designer?.email}</p>
                            </div>
                        </div>
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            <strong>Manufacturer Name</strong>
                            <div className="margin"></div>
                            <p className="m-0">{data?.manufacture?.fullname}</p>
                        </div>
                        {isArrayCheck(data?.variant) ? (
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Cost Price</strong>
                                <div className="margin"></div>
                                <p className="m-0">${data?.makerPrice}</p>
                            </div>
                        ) : null}
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            <strong>Notes</strong>
                            <div className="margin"></div>
                            <p className="m-0">{data?.notes}</p>
                        </div>
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            <strong>Description</strong>
                            <div className="margin"></div>
                            <p className="m-0">{data?.description}</p>
                        </div>
                    </div>
                    {isArrayCheck(data?.variant) ? (
                        <div className="table-responsive">
                            <table class="table">
                                <HeaderDetailPopup />
                                <tbody>
                                    {isArrayCheck(data?.variant) &&
                                        data?.variant?.map((x, id) => <RowDetailPopup data={x} key={id} product={data} variant={true} />)}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table class="table">
                                <HeaderDetailPopup />
                                <tbody>
                                    <RowDetailPopup data={data} product={data} variant={false} />
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="price">
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            {isArrayCheck(data?.variant) ? (
                                <p className="m-0">
                                    Manufacturer Price:<strong> ${data?.makerPrice}</strong>
                                </p>
                            ) : null}
                            <div className="margin"></div>
                            <p className="m-0">
                                Total Price:<strong> ${Number(data?.totalPrice) + Number(data?.makerPrice)}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="btn-cancel">
                        <Button variant="contained" className="btn-primary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
