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

export default function AdminEditProductPopup({ visible, setVisible, data }) {
    const { all_users } = useSelector((state) => state._user);
    const [manufacture, setmanufacture] = React.useState(data?.manufacture?._id ?? '');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { role } = useSelector((state) => state._auth);

    const handleClose = () => {
        setVisible(false);
    };

    React.useEffect(() => {
        dispatch(getAllUserListing({ isApproved: 'approved', role: 'manufacturer' }));
    }, []);

    React.useEffect(() => {
        setmanufacture(data?.manufacture?._id ?? '');
    }, [data?.manufacture]);

    const updateProductStatus = (value) => {
        dispatch(
            editProduct(
                {
                    id: data?._id,
                    isApproved: value,
                    type: 'approved',
                    manufacture: manufacture,
                    isAdminEdit: true
                },
                navigate,
                { isApproved: value, role: role }
            )
        );
        setVisible(false);
    };
    Log('Data==>', data);
    console.log('Manufacture', manufacture);
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

                    {isArrayCheck(data?.variant) ? (
                        <div className="table-responsive">
                            <table class="table">
                                <HeaderApprovalPopup isAdmin={true} />
                                <tbody>
                                    {isArrayCheck(data?.variant) &&
                                        data?.variant?.map((x, id) => <RowApprovalPopup data={x} key={id} product={data} variant={true} />)}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table class="table">
                                <HeaderApprovalPopup isAdmin={true} />
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
                        </div>
                        <div className="addProduct save-btn">
                            <div className="text-center">
                                <div className="d-flex justify-content-center mt-4 mb-2 btn-cancel">
                                    <Button variant="contained" className="btn-primary mx-2" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className="btn-primary mx-2"
                                        onClick={() => updateProductStatus('approved')}
                                    >
                                        Update
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
