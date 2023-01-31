import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import card1 from '../../../assets/images/dashboard/card-1.svg';
import card2 from '../../../assets/images/dashboard/card4.svg';
import card3 from '../../../assets/images/dashboard/card-2.svg';
import card4 from '../../../assets/images/dashboard/card-3.svg';
import card5 from '../../../assets/images/dashboard/card5.svg';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Divider from '@mui/material/Divider';
import UserApprovedPopup from 'views/pages/Auth/_part/UserApprovedPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from 'redux/action/User';
import { Log } from 'utils/helper';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';

const MainDashboard = () => {
    const [series, setseries] = useState([
        {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
        }
    ]);
    const [options, setoptions] = useState({
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#F3E495', '#F3C495'],
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00.000Z',
                '2018-09-19T01:30:00.000Z',
                '2018-09-19T02:30:00.000Z',
                '2018-09-19T03:30:00.000Z',
                '2018-09-19T04:30:00.000Z',
                '2018-09-19T05:30:00.000Z',
                '2018-09-19T06:30:00.000Z'
            ]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        }
    });
    const [donutseries, setdonutseries] = useState([44, 55, 41]);
    const [donutoptions, setdonutoptions] = useState({
        chart: {
            type: 'donut'
        },
        colors: ['#F3E495', '#F3C495', '#D5BCA3'],
        responsive: [
            {
                breakpoint: 1400,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    });
    const dispatch = useDispatch();
    const { dashboard_data } = useSelector((state) => state._user);
    Log('dashboard_data', dashboard_data);
    const theme = useTheme();
    useEffect(() => {
        dispatch(getDashboardData());
    }, []);

    return (
        <div className="mainDashboardMain">
            <div className="heading">
                <h2>Dashboard</h2>
            </div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <Card className="dashboardCard" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                Pending Assigned Delivery Provider
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.pendingAssign ?  dashboard_data?.pendingAssign : 0}
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
                                   Ongoing Orders
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.onGoingOrder ? dashboard_data?.onGoingOrder : 0 }
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card2} alt="Products" />
                    </Card>
                </div>
                <div className="col-md-4 mb-3">
                    <Card className="dashboardCard chats" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                 Completed Orders
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.completedOrder ? dashboard_data?.completedOrder : 0 }
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card5} alt="Products" />
                    </Card>
                </div>
                {/* <div className="col-md-4 mb-3">
                    <Card className="dashboardCard process" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    Approval Makers
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.makers}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card4} alt="Products" />
                    </Card>
                </div>
                <div className="col-md-4 mb-3">
                    <Card
                        className="dashboardCard delivery"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    Approval Products
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.product}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card5} alt="Products" />
                    </Card>
                </div> */}
            </div>
            <Divider className="my-3" />
            {/* <div className="top-selling">
                <div className="heading">
                    <h2>Top Sellings Products</h2>
                </div>
                <div className="table-responsive">
                    <table class="table">
                        <tbody>
                            {isArrayCheck(dashboard_data?.topSales) &&
                                dashboard_data?.topSales?.slice(0, 5)?.map((data, id) => (
                                    <tr className="table-row">
                                        <td>
                                            <img
                                                src={
                                                    isArrayCheck(data?.productImage)
                                                        ? base_url_new + data?.productImage[0]?.url
                                                        : 'https://i0.wp.com/alarusinteriors.com/wp-content/uploads/2020/04/IMG-0075.jpg'
                                                }
                                                alt=""
                                                style={{
                                                    objectFit: 'cover',
                                                    height: '65px',
                                                    width: '65px',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <div className="product-detail">
                                                <p>Product Name</p>
                                                <span>{data?.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-detail">
                                                <p>Designer Name</p>
                                                <span>{data?.designer?.fullname}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-detail">
                                                <p>Manufaturer Name</p>
                                                <span>{data?.manufacture?.fullname}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="product-detail">
                                                <p>Quantity</p>
                                                <span>{data?.saleCount}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div> */}
            <UserApprovedPopup />
        </div>
    );
};

export default MainDashboard;
