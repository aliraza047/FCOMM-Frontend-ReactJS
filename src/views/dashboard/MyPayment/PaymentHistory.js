import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import DataTable from 'react-data-table-component';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import { base_url, base_url_new } from 'utils/config';
import { BlogColumns2, columns, HistoryPaymentColumn, RequestPaymentColumn } from 'views/utilities/extra';
import { BlogColumns } from 'views/utilities/extra';
import { clearPaymentListing, getAllPayment, getMyRequest, getPaymentBalance } from 'redux/action/Payment';
import card1 from '../../../assets/images/dashboard/card-4.svg';
import card2 from '../../../assets/images/dashboard/card2.svg';
import card3 from '../../../assets/images/dashboard/card3.svg';
import card4 from '../../../assets/images/dashboard/card4.svg';
import card5 from '../../../assets/images/dashboard/card5.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const index = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [row, setrow] = useState([]);
    const [searchData, setsearchData] = useState('');
    const { all_payments, user_balance } = useSelector((state) => state._payment);
    const { role } = useSelector((state) => state._auth);
    useEffect(() => {
        dispatch(getPaymentBalance());
        dispatch(getMyRequest({ status: 'approved' }));
        return () => {
            dispatch(clearPaymentListing());
        };
    }, []);

    useEffect(() => {
        if (all_payments) {
            makeRow();
        } else {
            dispatch(getMyRequest({ status: 'approved' }));
        }
    }, [all_payments]);

    const makeRow = () => {
        var data =
            Array.isArray(all_payments) && all_payments.length > 0
                ? all_payments.map((data, id) => ({
                      id: id,
                      RequestAmount: `$${data?.RequestAmount}`,
                      transferDate: data?.transferDate,
                      created_at: data?.created_at,
                      transferAccountNo: data?.transferAccountNumber,
                      transferAmount: `$${data?.transferAmount}`,
                      currency: data?.currency,
                      remarks: data?.remarks,
                      status: data?.status,
                      role: data?.RequestRole,
                      proof: (
                          <img
                              src={base_url_new + data?.imageProof}
                              alt=""
                              style={{
                                  objectFit: 'cover',
                                  height: '60px',
                                  width: '60px',
                                  borderRadius: '100%'
                              }}
                          />
                      ),
                      action: (
                          <div>
                              {/* <button className="detail-btn mx-1" onClick={() => navigate('/dashboard/blogs-details', { state: data })}>
                                  Edit
                              </button>
                              
                              <button className="delete-btn" onClick={() => dispatch(removeBlog({ id: data?._id }, navigate))}>
                                  Delete
                              </button> */}
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
            <div className="list-orders designer-dashboard">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <Card className="dashboardCard" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="p">
                                        Paid Amount
                                    </Typography>
                                    <Typography variant="h3" color="text.secondary" component="div">
                                        {user_balance.debitBalance ? user_balance.debitBalance : '0'}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardMedia component="img" image={card1} alt="Products" />
                        </Card>
                    </div>
                    <div className="col-md-4 mb-3">
                        <Card
                            className="dashboardCard orders"
                            sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="p">
                                        Credit Amount
                                    </Typography>
                                    <Typography variant="h3" color="text.secondary" component="div">
                                        {user_balance.creditBalance ? user_balance.creditBalance : '0'}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardMedia component="img" image={card2} alt="Products" />
                        </Card>
                    </div>

                    <div className="col-md-4 mb-3">
                        <Card
                            className="dashboardCard process"
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="p">
                                        Total Amount
                                    </Typography>
                                    <Typography variant="h3" color="text.secondary" component="div">
                                        {user_balance.totalBalance ? user_balance.totalBalance : '0'}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardMedia component="img" image={card4} alt="Products" />
                        </Card>
                    </div>
                </div>
                <Divider className="my-3" />

                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center mb-5">
                        <h2>Payment History</h2>
                    </div>
                </div>
                <DataTable
                    columns={HistoryPaymentColumn}
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
