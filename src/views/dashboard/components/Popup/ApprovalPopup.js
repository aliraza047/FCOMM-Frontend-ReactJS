import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import '../../../../assets/scss/style.scss';
import HeaderApprovalPopup from './Table/HeaderApprovalPopup';
import RowApprovalPopup from './Table/RowApprovalPopup';
import Button from '@mui/material/Button';

import { isArrayCheck } from 'views/utilities/common';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from 'redux/action/Product';
import makeToast from 'utils/Toaster';
import { useNavigate } from 'react-router';
import { getAllUserListing } from 'redux/action/User';
import { Log } from 'utils/helper';

export default function ApprovalPopup({ visible, setVisible, data }) {
    const { all_users } = useSelector((state) => state._user);
    const [manufacture, setmanufacture] = React.useState('');
    const [comments, setcomments] = React.useState('');
    const [notes, setnotes] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state) => state._auth);

    const handleClose = () => {
        setVisible(false);
    };

    React.useEffect(() => {
        dispatch(getAllUserListing({ isApproved: 'approved', role: 'manufacturer' }));
    }, []);

    const updateProductStatus = (value) => {
        console.log('manufacture', manufacture, value);

        if (value === 'approvedByAdmin' && manufacture) {
            dispatch(
                editProduct({ id: data?._id, isApproved: value, manufacture: manufacture }, navigate, { isApproved: value, role: role })
            );
        } else if (value === 'rejected' || value === 'approved' || value === 'unapproved') {
            dispatch(editProduct({ id: data?._id, isApproved: value, type: 'approved' }, navigate, { isApproved: value, role: role }));
        } else {
            makeToast('error', 'Kindly Add Manufacture!');
        }
        setVisible(false);
    };
    Log('Data==>', data);
    return (
        <div>
            <Dialog
                open={visible}
                onClose={handleClose}
                maxWidth="xl"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="approval-detail-popup">
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
                    </div>
                    <div className="manufecturer">
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            <strong>Designer Email</strong>
                            <div className="margin"></div>
                            <p className="m-0">{data?.designer?.email}</p>
                        </div>
                    </div>
                    {role === 'designer' ? (
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Manufacture Name</strong>
                                <div className="margin"></div>
                                <p className="m-0">{data?.manufacture?.fullname}</p>
                            </div>
                        </div>
                    ) : null}

                    {isArrayCheck(data?.variant) ? (
                        <div className="table-responsive">
                            <table class="table">
                                <HeaderApprovalPopup isAdmin={role === 'admin'} />
                                <tbody>
                                    {isArrayCheck(data?.variant) &&
                                        data?.variant?.map((x, id) => <RowApprovalPopup data={x} key={id} product={data} variant={true} />)}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table class="table">
                                <HeaderApprovalPopup isAdmin={role === 'admin'} />
                                <tbody>
                                    <RowApprovalPopup data={data} variant={false} product={data} />
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="confirm-approval">
                        <div className="row">
                            {role === 'designer' ? null : (
                                <div className="col-lg-6 mb-1">
                                    <p>Link Manufacturers</p>
                                    <select id="cars" onChange={(e) => setmanufacture(e.target.value)} value={manufacture}>
                                        <option value={''}>{'Select Manufacture'}</option>
                                        {isArrayCheck(all_users) &&
                                            all_users?.map((data, id) => <option value={data?._id}>{data?.fullname}</option>)}
                                    </select>
                                </div>
                            )}
                            <div className="col-lg-12">
                                <p>Comment</p>
                                <textarea
                                    name="Write your comment..."
                                    placeholder="Write your comment..."
                                    onChange={(e) => setcomments(e.target.value)}
                                    value={comments}
                                ></textarea>
                            </div>
                            <div className="col-lg-12">
                                <p>Notes</p>
                                <textarea
                                    name="Write notes..."
                                    placeholder="Write notes..."
                                    onChange={(e) => setnotes(e.target.value)}
                                    value={notes}
                                ></textarea>
                            </div>
                        </div>
                        <div className="approval-btn">
                            <div className="text-center">
                                <p>This product needs approval from you</p>
                                <div className="d-flex justify-content-center mt-4">
                                    <Button
                                        variant="contained"
                                        className="reject"
                                        onClick={() => {
                                            if (role === 'admin') {
                                                updateProductStatus('rejected');
                                            } else {
                                                updateProductStatus('unapproved');
                                            }
                                        }}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="approve"
                                        onClick={() => {
                                            if (role === 'admin') {
                                                updateProductStatus('approvedByAdmin');
                                            } else {
                                                updateProductStatus('approved');
                                            }
                                        }}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
