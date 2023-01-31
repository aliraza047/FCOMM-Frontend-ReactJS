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
import card1 from '../../../assets/images/dashboard/card1.svg';
import card2 from '../../../assets/images/dashboard/card2.svg';
import card3 from '../../../assets/images/dashboard/card3.svg';
import card4 from '../../../assets/images/dashboard/card4.svg';
import card5 from '../../../assets/images/dashboard/card5.svg';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Divider from '@mui/material/Divider';
import UserApprovedPopup from 'views/pages/Auth/_part/UserApprovedPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from 'redux/action/User';
import { getGraphSeriestotal, graphSeriesMethod, Log } from 'utils/helper';
import { isArrayCheck } from 'views/utilities/common';

const index = () => {
    const [series, setseries] = useState([
        {
            name: 'series1',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
        colors: ['#E3E2FF', '#EEEEFF'],
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2022-01-19T00:00:00.000Z',
                '2022-02-19T01:30:00.000Z',
                '2022-03-19T02:30:00.000Z',
                '2022-04-19T03:30:00.000Z',
                '2022-05-19T04:30:00.000Z',
                '2022-06-19T05:30:00.000Z',
                '2022-07-19T06:30:00.000Z',
                '2022-08-19T01:30:00.000Z',
                '2022-09-19T02:30:00.000Z',
                '2022-10-19T03:30:00.000Z',
                '2022-11-19T04:30:00.000Z',
                '2022-12-19T05:30:00.000Z'
            ]
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        }
    });
    const [option, setoption] = useState({
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#9BFCDF', '#B9FEE9'],
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2022-01-19T00:00:00.000Z',
                '2022-02-19T01:30:00.000Z',
                '2022-03-19T02:30:00.000Z',
                '2022-04-19T03:30:00.000Z',
                '2022-05-19T04:30:00.000Z',
                '2022-06-19T05:30:00.000Z',
                '2022-07-19T06:30:00.000Z',
                '2022-08-19T01:30:00.000Z',
                '2022-09-19T02:30:00.000Z',
                '2022-10-19T03:30:00.000Z',
                '2022-11-19T04:30:00.000Z',
                '2022-12-19T05:30:00.000Z'
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
        labels: ['Complete', 'Shipped', 'Process', 'Cancel'],
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
    const theme = useTheme();
    const dispatch = useDispatch();
    const { dashboard_data } = useSelector((state) => state._user);
    Log('dashboard_data', dashboard_data);
    useEffect(() => {
        dispatch(getDashboardData());
    }, []);

    return (
        <div className="manufecturer-dashboard">
            <div className="heading">
                <h2>Dashboard</h2>
            </div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <Card className="dashboardCard" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    New Products
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.newProduct}
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
                                    New Orders
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.newOrder}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card2} alt="Products" />
                    </Card>
                </div>
                {/* <div className="col-md-4 mb-3">
                    <Card className="dashboardCard chats" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    Chats
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.chat ? dashboard_data?.chat : 0}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card3} alt="Products" />
                    </Card>
                </div> */}
                <div className="col-md-4 mb-3">
                    <Card className="dashboardCard process" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    On Delivery
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.onProcess}
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
                                    Completed Order
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.details?.orderShipped}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card5} alt="Products" />
                    </Card>
                </div>
            </div>
            <Divider className="my-3" />
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="heading">
                        <h2>Products Views</h2>
                    </div>
                    <div id="chart">
                        <Typography component="h4" variant="h4">
                            {getGraphSeriestotal(graphSeriesMethod(dashboard_data?.productViews, 'totalViews'))}
                        </Typography>
                        <Typography component="p" variant="p">
                            More than previous month
                        </Typography>
                        <ReactApexChart
                            options={options}
                            series={
                                isArrayCheck(dashboard_data?.productViews)
                                    ? [{ name: 'views', data: graphSeriesMethod(dashboard_data?.productViews, 'totalViews') }]
                                    : series
                            }
                            type="bar"
                            height={250}
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="heading">
                        <h2>Products Sold</h2>
                    </div>
                    <div id="chart">
                        <Typography component="h4" variant="h4">
                            {getGraphSeriestotal(graphSeriesMethod(dashboard_data?.productSold, 'totalSale'))}
                        </Typography>
                        <Typography component="p" variant="p">
                            More than previous month
                        </Typography>
                        <ReactApexChart
                            options={option}
                            series={
                                isArrayCheck(dashboard_data?.productSold)
                                    ? [{ name: 'total sale', data: graphSeriesMethod(dashboard_data?.productSold, 'totalSale') }]
                                    : series
                            }
                            type="area"
                            height={250}
                        />
                    </div>
                </div>
                <div className="col-md-8 mb-4">
                    <div className="heading">
                        <h2>Net Icome</h2>
                    </div>
                    <div id="chart">
                        <ReactApexChart
                            options={options}
                            series={
                                isArrayCheck(dashboard_data?.netIncome)
                                    ? [{ name: 'Income', data: graphSeriesMethod(dashboard_data?.netIncome, 'manufacturerIncome') }]
                                    : series
                            }
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="heading">
                        <h2>Product Completed</h2>
                    </div>
                    <div className="barChart" id="chart">
                        <ReactApexChart
                            options={donutoptions}
                            series={[
                                Number(dashboard_data?.details?.orderShipped),
                                Number(dashboard_data?.details?.orderDone),
                                Number(dashboard_data?.details?.orderOnProcess),
                                Number(dashboard_data?.details?.orderCancel)
                            ]}
                            type="donut"
                            height={350}
                        />
                    </div>
                </div>
            </div>
            <UserApprovedPopup />
        </div>
    );
};

export default index;
