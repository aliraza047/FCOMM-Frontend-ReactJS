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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import card1 from '../../../assets/images/dashboard/card1.svg';
import card2 from '../../../assets/images/dashboard/card2.svg';
import card3 from '../../../assets/images/dashboard/card3.svg';
import card4 from '../../../assets/images/dashboard/card4.svg';
import card5 from '../../../assets/images/dashboard/card5.svg';
import card6 from '../../../assets/images/dashboard/card6.svg';
import card7 from '../../../assets/images/dashboard/card7.svg';
import card8 from '../../../assets/images/dashboard/card8.svg';
import card9 from '../../../assets/images/dashboard/card9.svg';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Divider from '@mui/material/Divider';
import UserApprovedPopup from 'views/pages/Auth/_part/UserApprovedPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardData } from 'redux/action/User';
import { getGraphSeriestotal, graphSeriesMethod, Log } from 'utils/helper';
import { isArrayCheck } from 'views/utilities/common';
import { getAllProducts } from 'redux/action/Product';
import { getProductReportById, getProductReportByIdAndStatus } from 'redux/action/Report';

const DesignerReport = () => {
    const { complete_order, cancel_order, product_report, sold_product_report } = useSelector((state) => state._report);

    Log('dashboard_data', { complete_order, cancel_order, product_report });

    const [series, setseries] = useState([
        {
            name: 'series1',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]);
    const [options, setoptions] = useState({
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    zoom: false ,
                    pan:false,
                    reset:false// <== line to add
                }
            }
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

    const [age, setAge] = useState('');
    const [completeStatus, setcompleteStatus] = useState('completed');
    const [cancelStatus, setcancelStatus] = useState('cancelled');
    const [allStatus, setallStatus] = useState('shipped');
    const [soldStatus, setsoldStatus] = useState('sold');
    const [completeOrderSeries, setcompleteOrderSeries] = useState('');

    // const handleChange = (event, value) => {
    //     let eventValue = event?.target?.value;

    //     if (value === 'completed') {
    //         setcompleteStatus(eventValue);
    //         eventValue = eventValue === 'shipped' || eventValue === 'completed' || eventValue === 'cancelled' ? null : eventValue;
    //         const inpuData = { id: eventValue, status: 'received' };
    //         dispatch(getProductReportByIdAndStatus(inpuData?.id ? inpuData : { status: inpuData.status }));
    //     } else if (value === 'shipped') {
    //         setallStatus(eventValue);
    //         eventValue = eventValue === 'shipped' || eventValue === 'completed' || eventValue === 'cancelled' ? null : eventValue;
    //         const inpuData = { id: eventValue, status: 'all' };
    //         dispatch(getProductReportByIdAndStatus(inpuData?.id ? inpuData : { status: inpuData.status }));
    //     } else if (value === 'cancelled') {
    //         setcancelStatus(eventValue);
    //         eventValue = eventValue === 'shipped' || eventValue === 'completed' || eventValue === 'cancelled' ? null : eventValue;
    //         const inpuData = { id: eventValue, status: 'cancelled' };
    //         dispatch(getProductReportByIdAndStatus(inpuData?.id ? inpuData : { status: inpuData.status }));
    //     }
    // };

    const handleChange = (event, value) => {
        Log('Cliekde', event.target.value);
        let eventValue = event?.target?.value;
        if (value === 'completed') {
            setcompleteStatus(eventValue);
            eventValue =
                eventValue === 'shipped' || eventValue === 'completed' || eventValue === 'cancelled' || eventValue === 'sold'
                    ? null
                    : eventValue;
            const inpuData = { id: eventValue, status: 'shipped' };
            dispatch(getProductReportByIdAndStatus(inpuData?.id ? inpuData : { status: 'received' }));
        } else if (value === 'shipped') {
            setallStatus(eventValue);
            eventValue =
                eventValue === 'shipped' || eventValue === 'completed' || eventValue === 'cancelled' || eventValue === 'sold'
                    ? null
                    : eventValue;
            const inpuData = { id: eventValue, status: 'all' };
            dispatch(getProductReportByIdAndStatus(inpuData?.id ? inpuData : { status: 'all' }));
        } else if (value === 'cancelled') {
            setcancelStatus(eventValue);
            eventValue =
                eventValue === 'shipped' || eventValue === 'completed' || eventValue === 'cancelled' || eventValue === 'sold'
                    ? null
                    : eventValue;
            const inpuData = { id: eventValue, status: 'cancelled' };
            dispatch(getProductReportByIdAndStatus(inpuData?.id ? inpuData : { status: 'cancelled' }));
        } else if (value === 'sold') {
            setsoldStatus(eventValue);
            eventValue =
                eventValue === 'shipped' || eventValue === 'completed' || eventValue === 'cancelled' || eventValue === 'sold'
                    ? null
                    : eventValue;
            const inpuData = { id: eventValue, status: 'sold' };

            dispatch(getProductReportByIdAndStatus(inpuData?.id ? inpuData : { status: 'sold' }));
        }
    };
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
    const theme = useTheme();
    const dispatch = useDispatch();
    const { all_products } = useSelector((state) => state._product);
    const { dashboard_data } = useSelector((state) => state._user);
    Log('dashboard_data', graphSeriesMethod(product_report?.stats, 'totalAmount'));
    useEffect(() => {
        dispatch(getDashboardData());
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        if (isArrayCheck(all_products)) {
            Log('All Product Handle Change');
            handleChange({ target: { value: 'completed' } }, 'completed');
            handleChange({ target: { value: 'shipped' } }, 'shipped');
            handleChange({ target: { value: 'cancelled' } }, 'cancelled');
            handleChange({ target: { value: 'sold' } }, 'sold');
        }
    }, [all_products]);

    useEffect(() => {
        if (complete_order) {
            setcompleteOrderSeries(graphSeriesMethod(complete_order));
        }
    }, [complete_order]);

    return (
        <div className="report">
            <div className="row">
                <div className="heading d-flex justify-content-between align-item-center">
                    <h2>Report</h2>
                </div>
                <div className="col-md-4 mb-3">
                    <Card className="dashboardCard income" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    Income
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    ${getGraphSeriestotal(graphSeriesMethod(dashboard_data?.netIncome, 'designerIncome'))}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card6} alt="Products" />
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
                                    Product Sold
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {getGraphSeriestotal(graphSeriesMethod(dashboard_data?.productSold, 'totalSale'))}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card2} alt="Products" />
                    </Card>
                </div>

                <div className="col-md-4 mb-3">
                    <Card className="dashboardCard" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                        <CardMedia component="img" image={card7} alt="Products" />
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
                                    20
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card3} alt="Products" />
                    </Card>
                </div> */}
                {/* <div className="col-md-4 mb-3">
                    <Card className="dashboardCard process" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    On Process
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    50
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card4} alt="Products" />
                    </Card>
                </div> */}
                <div className="col-md-4 mb-3">
                    <Card
                        className="dashboardCard delivery"
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    Cancelled Order
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {dashboard_data?.details?.orderCancel}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card9} alt="Products" />
                    </Card>
                </div>
            </div>
            <Divider className="my-3" />
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4">
                            <Typography component="h1" variant="h1">
                                Income
                            </Typography>
                        </div>
                        <div className="col-md-6 mb-4 ">
                            <div className="d-flex justify-content-end">
                                <div className="filter-fields">
                                    <Select
                                        value={allStatus}
                                        onChange={(e) => handleChange(e, 'shipped')}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="shipped">
                                            <em>Filter by Product</em>
                                        </MenuItem>
                                        {isArrayCheck(all_products) &&
                                            all_products.map((data, id) => (
                                                <MenuItem key={id} value={data?._id}>
                                                    {data?.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="chart">
                        <div id="chart">
                            <ReactApexChart
                                options={options}
                                series={
                                    isArrayCheck(product_report?.stats)
                                        ? [{ name: 'product', data: graphSeriesMethod(product_report?.stats, 'totalAmount') }]
                                        : series
                                }
                                type="bar"
                                height={350}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-2">
                            <Typography component="h1" variant="h1">
                                Product Sold
                            </Typography>
                        </div>
                        <div className="col-md-6 mb-2 ">
                            <div className="d-flex justify-content-end">
                                <div className="filter-fields">
                                    <Select
                                        value={soldStatus}
                                        onChange={(e) => handleChange(e, 'sold')}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="sold">
                                            <em>Filter by Product</em>
                                        </MenuItem>
                                        {isArrayCheck(all_products) &&
                                            all_products.map((data, id) => (
                                                <MenuItem key={id} value={data?._id}>
                                                    {data?.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="chart">
                        <div id="chart">
                            <ReactApexChart
                                options={options}
                                series={
                                    isArrayCheck(sold_product_report?.stats)
                                        ? [{ name: 'product', data: graphSeriesMethod(sold_product_report?.stats, 'totalSale') }]
                                        : series
                                }
                                type="bar"
                                height={350}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-2">
                            <Typography component="h1" variant="h1">
                                Completed Order
                            </Typography>
                        </div>
                        <div className="col-md-6 mb-2 ">
                            <div className="d-flex justify-content-end">
                                <div className="filter-fields">
                                    <Select
                                        value={completeStatus}
                                        onChange={(e) => handleChange(e, 'completed')}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="completed">
                                            <em>Filter by Product</em>
                                        </MenuItem>
                                        {isArrayCheck(all_products) &&
                                            all_products.map((data, id) => (
                                                <MenuItem key={id} value={data?._id}>
                                                    {data?.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="chart">
                        <Typography component="h4" variant="h4">
                            {getGraphSeriestotal(graphSeriesMethod(complete_order?.stats, 'totalOrder'))}
                        </Typography>
                        <Typography component="p" variant="p">
                            More than previous month
                        </Typography>
                        <ReactApexChart
                            options={options}
                            series={
                                isArrayCheck(complete_order?.stats)
                                    ? [{ name: 'complete order', data: graphSeriesMethod(complete_order?.stats, 'totalOrder') }]
                                    : series
                            }
                            type="area"
                            height={250}
                        />
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-2">
                            <Typography component="h1" variant="h1">
                                Cancelled Order
                            </Typography>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="d-flex justify-content-end">
                                <div className="filter-fields">
                                    <Select
                                        value={cancelStatus}
                                        onChange={(e) => handleChange(e, 'cancelled')}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="cancelled">
                                            <em>Filter by Product</em>
                                        </MenuItem>
                                        {isArrayCheck(all_products) &&
                                            all_products.map((data, id) => (
                                                <MenuItem key={id} value={data?._id}>
                                                    {data?.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="chart">
                        <Typography component="h4" variant="h4">
                            {getGraphSeriestotal(graphSeriesMethod(cancel_order?.stats, 'totalOrder'))}
                        </Typography>
                        <Typography component="p" variant="p">
                            More than previous month
                        </Typography>
                        <ReactApexChart
                            options={options}
                            series={
                                isArrayCheck(cancel_order?.stats)
                                    ? [{ name: 'complete order', data: graphSeriesMethod(cancel_order?.stats, 'totalOrder') }]
                                    : series
                            }
                            type="area"
                            height={250}
                        />
                    </div>
                </div>
            </div>
            <UserApprovedPopup />
        </div>
    );
};

export default DesignerReport;
