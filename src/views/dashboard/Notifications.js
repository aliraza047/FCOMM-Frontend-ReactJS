import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { isArrayCheck } from 'views/utilities/common';
import { getAllNotifications, addMarkAsRead } from 'redux/action/Notification';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Button from '@mui/material/Button';

export const Notifications = () => {
    const dispatch = useDispatch();
    const { all_notifications } = useSelector((state) => state._notification);
    const [notifyToShow, setNotifyToShow] = useState(9);

    console.log('Notifications =>', all_notifications);

    useEffect(() => {
        dispatch(getAllNotifications());
    }, []);

    useEffect(() => {
        if (all_notifications) {
            localStorage.setItem('notifyCount', JSON.stringify(all_notifications.length));
            // localStorage.setItem("notifyCount" , JSON.stringify(11))
        }
    }, [all_notifications]);

    return (
        <div className="notifications">
            <div className="heading">
                <h2>Notifications</h2>
            </div>

            {isArrayCheck(all_notifications) &&
                all_notifications?.slice(0, notifyToShow).map((data, index) => (
                    <div className="list mt-3" key={index}>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="heading">
                                <h2>{data?.actionType}</h2>
                            </div>
                            <div>
                                <CloseIcon className="closeicon" onClick={() => dispatch(addMarkAsRead({ id: data?._id }))} />
                            </div>
                        </div>
                        <p>{data?.description}</p>
                        <h5>{moment(data?.created_at).format('DD MMM YYYY h:mm a')}</h5>
                        {data?.action && <h6>Details</h6>}
                        {data?.action === 'user-created' ? (
                            <>
                                <p> Name {data?.userId?.fullname}</p>
                                <p> Email {data?.userId?.email}</p>
                                <p> Role {data?.userId?.role}</p>
                            </>
                        ) : data?.action === 'order-created' || data?.action === 'order-updated' ? (
                            <>
                                <p>Order Id {data?.orderId?._id}</p>
                                {/* <p>Customer {data?.orderId?.createdBy?.fullname}</p> */}
                                <p>Total {data?.orderId?.totalAmount}$</p>
                            </>
                        ) : data?.action === 'product-created' || data?.action === 'product-updated' ? (
                            <>
                                <p>Product Id {data?.productId?._id}</p>
                                <p>Name {data?.productId?.name}</p>
                                <p>Total Price {data?.productId?.totalPrice}$</p>
                            </>
                        ) : null}
                    </div>
                ))}

            {isArrayCheck(all_notifications) && all_notifications.length > Number(notifyToShow) && (
                <div className="see-more text-center">
                    <Button
                        onClick={() => {
                            if (isArrayCheck(all_notifications) && all_notifications.length < notifyToShow) {
                                setNotifyToShow(
                                    notifyToShow +
                                        ((all_notifications.length - notifyToShow) % 0 ? 9 : notifyToShow - all_notifications.length)
                                );
                            } else {
                                setNotifyToShow(notifyToShow + 9);
                            }
                        }}
                    >
                        See More
                    </Button>
                </div>
            )}
        </div>
    );
};
export default Notifications;
