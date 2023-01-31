import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import DataTable from 'react-data-table-component';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import { base_url, base_url_new } from 'utils/config';
import { BlogColumns2, columns, RequestPaymentColumn } from 'views/utilities/extra';
import { BlogColumns } from 'views/utilities/extra';
import { clearPaymentListing, deletePaymentRequest, getAllPayment, getMyRequest } from 'redux/action/Payment';

const index = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [row, setrow] = useState([]);
    const [searchData, setsearchData] = useState('');
    const { all_payments } = useSelector((state) => state._payment);
    const { role } = useSelector((state) => state._auth);

    useEffect(() => {
        dispatch(getMyRequest());
        return () => {
            dispatch(clearPaymentListing());
        };
    }, []);

    useEffect(() => {
        if (all_payments) {
            makeRow();
        } else {
            dispatch(getMyRequest());
        }
    }, [all_payments]);

    const makeRow = () => {
        var data =
            Array.isArray(all_payments) && all_payments.length > 0
                ? all_payments.map((data, id) => ({
                      id: id,
                      RequestAmount: `$${data?.RequestAmount}`,
                      remarks: data?.remarks,
                      status: data?.status,
                      role: data?.RequestRole,
                      created_at: data?.created_at,
                      action: (
                          <div>
                              {(data?.status == 'pending' || data?.status == 'rejected') && (
                                  <>
                                      <button
                                          className="detail-btn mx-1"
                                          onClick={() => {
                                              // navigate('/dashboard/blogs-details', { state: data })}
                                              navigate('/dashboard/update-request-payment', { state: data });
                                          }}
                                      >
                                          Edit
                                      </button>
                                      <button
                                          className="delete-btn"
                                          onClick={() => {
                                              dispatch(deletePaymentRequest({ id: data?._id }, navigate));
                                          }}
                                      >
                                          Delete
                                      </button>
                                  </>
                              )}
                          </div>
                      )
                  }))
                : [];
        setrow(data);
    };

    const handleSearch = (event) => {
        const data = row.filter((x, id) => String(x.name).toLowerCase().includes(String(event.target.value).toLowerCase()));
        if (data) {
            setsearchData(data);
        } else {
            setsearchData('');
        }
    };

    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center mb-5">
                        <h2>Payment Request</h2>
                        {/* <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/blog-post')}>
                            + Blog Post
                        </div> */}
                        <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/add-payment-request')}>
                            + Add
                        </div>
                    </div>
                </div>
                <DataTable
                    columns={RequestPaymentColumn}
                    data={searchData ? searchData : row}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    // selectableRows
                />
            </div>
        </>
    );
};

export default index;
