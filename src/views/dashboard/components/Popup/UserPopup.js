import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import '../../../../assets/scss/style.scss';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import makeToast from 'utils/Toaster';
import { base_url } from 'utils/config';
import { approveUser, editUser } from 'redux/action/User';
import { useNavigate } from 'react-router';
import { formatedDate } from 'utils/helper';
export default function UserPopup({ visible, setVisible, data }) {
    const { all_users } = useSelector((state) => state._user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log('User POpup', data);
    const handleClose = () => {
        setVisible(false);
    };

    return (
        <Dialog
            open={visible}
            onClose={handleClose}
            maxWidth="xl"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="approval-detail-popup">
                <div className="heading row justify-content-between align-item-center mx-0">
                    <div className="col-md-6">
                        <h5 className="my-1">Personal Details</h5>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-between">
                            <h5 className="my-1">Contact Details</h5>
                            <CloseIcon onClick={handleClose} />
                        </div>
                    </div>
                </div>
                <div className="row mx-0 gx-5">
                    <div className="col-lg-6 col-md-6 ps-0">
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>User Image</strong>
                                <div className="margin"></div>
                                <img
                                    src={data?.profile?.includes('http') ? data?.profile : base_url + data?.profile}
                                    style={{
                                        objectFit: 'cover',
                                        height: '50px',
                                        width: '50px',
                                        borderRadius: '100%'
                                    }}
                                />
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>User Name</strong>
                                <div className="margin"></div>
                                <p className="m-0">{data?.fullname}</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Date of Birth</strong>
                                <div className="margin"></div>
                                <p className="m-0">{formatedDate(data?.date_of_birth)}</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Role</strong>
                                <div className="margin"></div>
                                {data?.role && data?.role?.map((rol) => <p className="m-0">{rol}</p>)}
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Gender</strong>
                                <div className="margin"></div>
                                <p className="m-0">{data?.gender}</p>
                            </div>
                        </div>
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>National ID</strong>
                                <div className="margin"></div>
                                <p className="m-0">{data?.nic}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 pe-0">
                        <div className="manufecturer">
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Email</strong>
                                <div className="margin"></div>
                                <p className="m-0">{data?.email}</p>
                            </div>
                            <div className="d-flex cost-name align-items-center justify-content-between">
                                <strong>Contact Number</strong>
                                <div className="margin"></div>
                                <p className="m-0">+{data?.phone_number}</p>
                            </div>
                            <div className="cost-name align-items-center justify-content-between">
                                <div className="d-flex align-items-center justify-content-between">
                                    <strong>Address</strong>
                                    <div className="margin"></div>
                                    <p className="m-0">{data?.address}</p>
                                </div>
                                {/* <div className="d-flex align-items-center justify-content-between mb-3">
                                    <strong>Address 2</strong>
                                    <div className="margin"></div>
                                    <p className="m-0">{Street, Building, City}</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <strong>Address 3</strong>
                                    <div className="margin"></div>
                                    <p className="m-0">Street, Building, City</p>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {data?.approve === 'approved' ? (
                        <div className="btn-cancel">
                            <Button variant="contained" className="btn-primary" onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    ) : null}
                </div>
                {data?.approve === 'approved' ? null : (
                    <div className="confirm-approval">
                        <div className="row">
                            <div className="col-lg-12">
                                <p>Comment</p>
                                <textarea name="Write your comment..." placeholder="Write your comment..."></textarea>
                            </div>
                        </div>
                        <div className="approval-btn">
                            <div className="text-center">
                                <p>This User needs approval from you</p>
                                <div className="d-flex justify-content-center mt-4">
                                    {data?.approve === 'rejected' ? null : (
                                        <Button
                                            variant="contained"
                                            className="reject"
                                            onClick={() => {
                                                dispatch(editUser({ id: data?._id, approve: 'rejected' }, data?.role));
                                                setVisible(false);
                                            }}
                                        >
                                            Reject
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        className="approve"
                                        onClick={() => {
                                            dispatch(editUser({ id: data?._id, approve: 'approved' }, data?.role));
                                            setVisible(false);
                                        }}
                                    >
                                        Approve
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Dialog>
    );
}
