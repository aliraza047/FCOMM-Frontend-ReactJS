import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import DataTable from 'react-data-table-component';
// import Card from '@material-ui/core/Card';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import { RewardsTrackingColumn } from 'views/utilities/extra';
import { getAllRewardTracking } from 'redux/action/RewardsAndPromotions';
import { getSingleOrders } from 'redux/action/Order';
import OrderDetailPopup from '../OrderListing/_part/OrderDetailPopup';
import { downloadCSV } from 'utils/helper';
import { Button } from '@mui/material';
import { isArrayCheck } from 'views/utilities/common';

const index = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    console.log('row tracking', row)
    const [searchData, setsearchData] = useState('');
    const [OrderDetailPopupState, setOrderDetailPopupState] = useState(false);
    const { rewards_tracking } = useSelector((state) => state._rewardsAndPromotions);
   
    useEffect(() => {
        setLoading(false);
        dispatch(getAllRewardTracking());
    }, []);

    useEffect(() => {
        setLoading(false);
        if (rewards_tracking) {
            makeRow();
        } else {
            dispatch(getAllRewardTracking());
        }
    }, [rewards_tracking]);

    const makeRow = () => {
        var data =
            Array.isArray(rewards_tracking) && rewards_tracking.length > 0
                ? rewards_tracking.map((data, id) => ({
                    _id: data._id,
                    id: id,
                    code: data?.couponId?.code,
                    discountType: data?.couponId?.discountType,
                    discountValue: data?.couponId?.discountValue,
                    useBy: data?.userId?.fullname,
                    useDate: data?.created_at,
                    orderId: data?.orderId?._id ? data?.orderId?._id : 'no' ,
                    action: (
                        <div>
                            <button className="detail-btn mx-1"
                                onClick={() => {
                                    dispatch(getSingleOrders(data?.orderId));
                                    setOrderDetailPopupState(true);
                                }}>
                                Detail
                            </button>
                        </div>
                    )
                }))
                : [];
        setrow(data);
    };
    const handleExport = () => {
        const data = isArrayCheck(rewards_tracking)
            ? rewards_tracking?.map((data, id) => ({
                id: id,
                Code: data?.couponId?.code,
                Discount_Type: data?.couponId?.discountType,
                Discount_Value: data?.couponId?.discountValue,
                Used_By: data?.userId?.fullname,
                Used_Date: data?.created_at,
                Order_Id: data?.orderId?._id ? data?.orderId?._id : 'no' ,
            }))
            : [];
            if(isArrayCheck(data)){
                downloadCSV(data);
            }else{
                makeToast('error',"There is no data to export")
            }
    };
    // const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;
    // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(row)} />, [row]);
    
    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Tracking Promo Codes</h2>
                        {/* <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/blog-post')}>
                            + Blog Post
                        </div> */}
                        <div className="btn btn-primary brownBtn" onClick={() => handleExport()}>
                            Export
                        </div>
                    </div>
                </div>
                <OrderDetailPopup setVisible={setOrderDetailPopupState} open={OrderDetailPopupState} reward={'reward'} />

                <DataTable
                    columns={RewardsTrackingColumn}
                    data={searchData ? searchData : row}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    selectableRows
                    // actions={actionsMemo}
                />
                {/* <CouponSendPopup open={open} handleClose={handleClose} fullWidth={fullWidth} counponId={counponId} /> */}
            </div>
        </>
    );
};

export default index;
