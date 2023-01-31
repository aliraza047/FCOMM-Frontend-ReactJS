import { Dialog, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { editOrder, shippmentOrder } from 'redux/action/Order';
import { addMethodArray, formatedDate, getOrderStatusText, Log } from 'utils/helper';
import { base_url_new } from 'utils/config';
import Checkbox from '@mui/material/Checkbox';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import { isArrayCheck, dumyOptions } from 'views/utilities/common';
import TooltipShipping from 'ui-component/tooltipShipping';
import moment from 'moment';
import makeToast from 'utils/Toaster';
import Button from '@mui/material/Button';
import { editPaymentRequest, getMyRequest, getUserApprovedRequest } from 'redux/action/Payment';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function PaymenyDetailPopup({ setVisible, open, data, setPaymentFormPopupState , setData }) {
    console.log('Details data', data)
    const { role } = useSelector((state) => state._auth);
    const { user_payments } = useSelector((state) => state._payment);
    const dispatch = useDispatch();
    const [trackingId, settrackingId] = useState('');
    const [openAdd, setopenAdd] = useState(false);
    const [selectPickup, setselectPickUp] = React.useState([1]);

    const handleClose = () => {
        setVisible(false);
    };

    const [age, setAge] = useState('');

    useEffect(() => {
        dispatch(getUserApprovedRequest({ userId: isArrayCheck(data?.RequestBy) ? data?.RequestBy[0]?._id : data?.RequestBy?._id, status: 'approved' }));
    }, [isArrayCheck(data?.RequestBy) ? data?.RequestBy[0]?._id : data?.RequestBy?._id]);

    console.log('Designer details ===>', user_payments);
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
                    <div className="col-md-12">
                        <div className="d-flex justify-content-between">
                            <h5 className="mb-0 mt-2">Payment Detail</h5>
                            <CloseIcon onClick={handleClose} />
                        </div>
                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-lg-6 col-md-6">
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Name</strong>
                                <div className="margin"></div>
                                <p className="m-0">{isArrayCheck(data?.RequestBy) ? data?.RequestBy[0]?.fullname : data?.RequestBy?.fullname }</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Type</strong>
                                <div className="margin"></div>
                                <p className="m-0">{data?.RequestRole}</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Country</strong>
                                <div className="margin"></div>
                                <p className="m-0">{isArrayCheck(data?.RequestBy) ? data?.RequestBy[0]?.country : data?.RequestBy?.country}</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Email</strong>
                                <div className="margin"></div>
                                <p className="m-0">{isArrayCheck(data?.RequestBy) ? data?.RequestBy[0]?.email : data?.RequestBy?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Paid Amount</strong>
                                <div className="margin"></div>
                                <p className="m-0">${data?.debitAmount + data?.transferAmount}</p>
                            </div>
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Credit Amount</strong>
                                <div className="margin"></div>
                                <p className="m-0">${data?.creditAmount - data?.transferAmount}</p>
                            </div>
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Total Amount</strong>
                                <div className="margin"></div>
                                <p className="m-0"> ${data?.creditAmount + data?.debitAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {data?.status === 'pending' ? (
                    <div className="approval-btn my-3">
                        <div className="text-center">
                            <p>This Request needs approval from you</p>
                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    className="reject"
                                    onClick={() => {
                                        dispatch(editPaymentRequest({ id: data?._id, status: 'rejected' }));
                                        handleClose()
                                    }}
                                >
                                    Reject
                                </button>
                                <button
                                    className="approve"
                                    onClick={() => {
                                        handleClose();
                                        setTimeout(() => {
                                            setPaymentFormPopupState(true);
                                        }, [500]);
                                    }}
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Transfer Date</th>
                                    <th scope="col">Transfer Method</th>
                                    <th scope="col">Transfer Account No</th>
                                    <th scope="col">Transfer Amount</th>
                                    <th scope="col">Currency</th>
                                    <th scope="col">Remarks</th>
                                    <th scope="col">Proof</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isArrayCheck(user_payments)
                                    ? user_payments.map((payData, id) => (
                                          <tr>
                                              <td style={{ verticalAlign: 'middle' }}>
                                                  <p>{moment(payData?.transferDate).format('DD-MM-YYYY') + ' ' + moment(payData?.created_at).format('HH:MM:SS') }</p>
                                              </td>
                                              <td style={{ verticalAlign: 'middle' }}>
                                                  <p>{payData?.transferMethod}</p>
                                              </td>
                                              <td style={{ verticalAlign: 'middle' }}>
                                                  <p>{payData?.transferAccountNumber}</p>
                                              </td>
                                              <td style={{ verticalAlign: 'middle' }}>
                                                  <p>${payData?.transferAmount}</p>
                                              </td>
                                              <td style={{ verticalAlign: 'middle' }}>{payData?.currency}</td>
                                              <td style={{ verticalAlign: 'middle' }}>
                                                  <p>{payData?.remarks}</p>
                                              </td>
                                              <td style={{ verticalAlign: 'middle' }}>
                                                  <img
                                                      src={
                                                          payData?.imageProof?.includes('http')
                                                              ? payData?.imageProof
                                                              : base_url_new + payData?.imageProof
                                                      }
                                                      alt=""
                                                      style={{
                                                          objectFit: 'cover',
                                                          height: '100px',
                                                          width: '100px',
                                                          borderRadius: '8px'
                                                      }}
                                                  />
                                              </td>
                                          </tr>
                                      ))
                                    : ''}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Dialog>
    );
}

export default PaymenyDetailPopup;
