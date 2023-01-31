import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
import card10 from '../../../assets/images/dashboard/card10.svg';
import card11 from '../../../assets/images/dashboard/card11.svg';
import card12 from '../../../assets/images/dashboard/card12.svg';
import cardimg from '../../../../src/assets/images/home/card1.png';
import ReactApexChart from 'react-apexcharts';
import Divider from '@mui/material/Divider';
import UserApprovedPopup from 'views/pages/Auth/_part/UserApprovedPopup';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from 'redux/action/Product';
import { isArrayCheck } from 'views/utilities/common';
import { getProductReportById } from 'redux/action/Report';
import { getDashboardData } from 'redux/action/User';
import { base_url_new } from 'utils/config';
import moment from 'moment';
import makeToast from 'utils/Toaster';
import { formatedReportDate, getGraphSeriestotal, graphSeriesMethod } from 'utils/helper';
import { useNavigate } from 'react-router';
const ReportProduct = () => {
    const { all_report } = useSelector((state) => state._report);
    const { all_products } = useSelector((state) => state._product);
    const { dashboard_data } = useSelector((state) => state._user);
    const navigate = useNavigate();

    console.log('Report By Id ===>', all_report);
    const [series, setseries] = useState([
        {
            name: 'series1',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]);
    const [options, setoptions] = useState({
        chart: {
            height: 350,
            type: 'bar',
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
    const [avgRevenue, setavgRevenue] = useState('');
    const [avgProfit, setavgProfit] = useState(0);
    const [avgCost, setavgCost] = useState('');
    const [CostGraph, setCostGraph] = useState([
        {
            name: 'series1',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]);
    const [RevenueGraph, setRevenueGraph] = useState([
        {
            name: 'series1',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]);
    const [avgProfitGraph, setavgProfitGraph] = useState([
        {
            name: 'series1',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]);
    const [productData, setproductData] = useState('');

    const handleChange = (event) => {
        if (!(startDate > endDate)) {
            setAge(event.target.value);
            setproductData(event.target.value);
            setavgCost(0);
            setavgRevenue(0);
            setavgProfit(0);
            setavgProfitGraph([]);
            setCostGraph([]);
            setRevenueGraph([]);
            dispatch(
                getProductReportById(
                    { id: event.target.value, start: formatedReportDate(startDate), end: formatedReportDate(endDate) },
                    false
                )
            );
        } else {
            makeToast('error', 'Select Date Correctly');
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

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getDashboardData());
    }, []);

    useEffect(() => {
        getAvgProfit();
        makeSeries();
        // makeExportData();
    }, [all_report]);
    const makeSeries = () => {
        if (Array.isArray(all_report?.stats) && all_report?.stats?.length > 0) {
            let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i = 0; i < all_report?.stats?.length; i++) {
                if (all_report?.stats[i]?._id?.month) {
                    arr[all_report?.stats[i]?._id?.month - 1] = all_report?.stats[i]?.AvgAmount;
                }
            }
            setavgProfitGraph([
                {
                    name: 'Avg Profit',
                    data: arr
                }
            ]);
        }
        if (Array.isArray(all_report?.stats) && all_report?.stats?.length > 0) {
            let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i = 0; i < all_report?.stats?.length; i++) {
                if (all_report?.stats[i]?._id?.month) {
                    arr[all_report?.stats[i]?._id?.month - 1] = all_report?.stats[i]?.totalAmount;
                }
            }
            setRevenueGraph([
                {
                    name: 'Revenue',
                    data: arr
                }
            ]);
            setCostGraph([
                {
                    name: 'Cost',
                    data: arr
                }
            ]);
        }
    };
    const getAvgProfit = () => {
        let avgcost = 0;
        let avgrevenue = 0;
        let totalOrder = 0;
        if (isArrayCheck(all_report.stats)) {
            for (let i = 0; i < all_report.stats.length; i++) {
                avgcost += Number(all_report.stats[i].AvgAmount);
                totalOrder += Number(all_report.stats[i].totalOrder);
                avgrevenue += Number(all_report.stats[i].AvgAmount);
            }
            setavgCost(avgcost / totalOrder);
            setavgRevenue(avgrevenue);
        }
    };

    // const makeExportData=()=>{
    //     var data =
    //     Array.isArray(all_products) && all_products.length > 0
    //         ? all_products.map((data, id) => ({

    //         : [];
    // setrow(data);
    // }
    return (
        <div className="report">
            <div className="heading d-flex justify-content-between align-item-center">
                <h2>Report by Product</h2>
            </div>
            <div className="row align-items-center">
                <div className="col-md-4">
                    <div className="row date-selector">
                        <div className="col-md-6 mb-2">
                            <label htmlFor="">Start Date</label>
                            <DatePicker
                                placeholderText="Select End Date"
                                // showTimeSelect
                                dateFormat="MMMM d, yyyy"
                                selected={startDate}
                                selectsEnd
                                startDate={startDate}
                                onChange={(date) => {
                                    console.log('Start Date==>', moment(date).format('YYYY-MM-DD'));
                                    setStartDate(date);
                                }}
                            />
                        </div>
                        <div className="col-md-6 mb-4">
                            <label htmlFor="">End Date</label>
                            <DatePicker
                                placeholderText="Select End Date"
                                // showTimeSelect
                                dateFormat="MMMM d, yyyy"
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="d-flex">
                                <div className="filter-fields">
                                    <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                        <MenuItem value="">
                                            <em>Filter by Product</em>
                                        </MenuItem>
                                        {isArrayCheck(all_products) &&
                                            all_products?.sort((a, b) => a?.name.localeCompare(b?.name)).map((data, id) => (
                                                <MenuItem key={id} value={data?._id}>
                                                    {data?.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-6">
                            <div className="export-btn">
                                <Button variant="contained" className="exportbtn" startIcon={<FileUploadIcon />}>
                                    Export
                                </Button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card-expensive-item">
                        <div className="card-head">Most Expansive Item</div>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={
                                        isArrayCheck(dashboard_data?.maxPriceProduct) &&
                                        isArrayCheck(dashboard_data?.maxPriceProduct[0]?.productImage)
                                            ? base_url_new + dashboard_data?.maxPriceProduct[0]?.productImage[0]?.url
                                            : cardimg
                                    }
                                    alt=""
                                />
                                <div className="body-data">
                                    <h6 className="m-0">
                                        {isArrayCheck(dashboard_data?.maxPriceProduct) && dashboard_data?.maxPriceProduct[0]?.name}
                                    </h6>
                                    <p className="mb-0">
                                        By{' '}
                                        {isArrayCheck(dashboard_data?.maxPriceProduct) &&
                                            dashboard_data?.maxPriceProduct[0]?.designer?.fullname}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card-expensive-item">
                        <div className="card-head">Most Popular Item</div>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={
                                        isArrayCheck(dashboard_data?.topSales) && isArrayCheck(dashboard_data?.topSales[0]?.productImage)
                                            ? base_url_new + dashboard_data?.topSales[0]?.productImage[0]?.url
                                            : cardimg
                                    }
                                    alt=""
                                />
                                <div className="body-data">
                                    <h6 className="m-0">{isArrayCheck(dashboard_data?.topSales) && dashboard_data?.topSales[0]?.name}</h6>
                                    <p className="mb-0">
                                        By {isArrayCheck(dashboard_data?.topSales) && dashboard_data?.topSales[0]?.designer?.fullname}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card-expensive-item">
                        <div className="card-head">Lowest Cost Item</div>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={
                                        isArrayCheck(dashboard_data?.minPriceProduct) &&
                                        isArrayCheck(dashboard_data?.minPriceProduct[0]?.productImage)
                                            ? base_url_new + dashboard_data?.minPriceProduct[0]?.productImage[0]?.url
                                            : cardimg
                                    }
                                    alt=""
                                />
                                <div className="body-data">
                                    <h6 className="m-0">
                                        {isArrayCheck(dashboard_data?.minPriceProduct) && dashboard_data?.minPriceProduct[0]?.name}
                                    </h6>
                                    <p className="mb-0">
                                        By{' '}
                                        {isArrayCheck(dashboard_data?.minPriceProduct) &&
                                            dashboard_data?.minPriceProduct[0]?.designer?.fullname}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 mb-3">
                    <Card className="dashboardCard income" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    Average Profit
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    $
                                    {getGraphSeriestotal(graphSeriesMethod(all_report?.stats, 'avgProfit'))
                                        ? getGraphSeriestotal(graphSeriesMethod(all_report?.stats, 'avgProfit'))
                                        : 0}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card10} alt="Products" />
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
                                    Average Cost
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    $
                                    {getGraphSeriestotal(graphSeriesMethod(all_report?.stats, 'totalCost'))
                                        ? getGraphSeriestotal(graphSeriesMethod(all_report?.stats, 'totalCost'))
                                        : 0}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card11} alt="Products" />
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
                                    Average Revenue
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    $
                                    {getGraphSeriestotal(graphSeriesMethod(all_report?.stats, 'totalAmount'))
                                        ? getGraphSeriestotal(graphSeriesMethod(all_report?.stats, 'totalAmount'))
                                        : 0}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card12} alt="Products" />
                    </Card>
                </div>
            </div>
            <Divider className="my-3" />
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-2">
                            <Typography component="h1" variant="h1">
                                Average Profit
                            </Typography>
                        </div>
                        <div className="col-md-6 mb-2 ">
                            <div className="detail-btn">
                                <Button
                                    variant="contained"
                                    className="viewbtn"
                                    onClick={() => navigate('/dashboard/detail-report-product', { state: 'profit' })}
                                >
                                    View Detail
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div id="chart">
                        <div id="chart">
                            <ReactApexChart
                                options={options}
                                series={
                                    isArrayCheck(all_report?.stats)
                                        ? [{ name: 'profit', data: graphSeriesMethod(all_report?.stats, 'avgProfit') }]
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
                                Revenue
                            </Typography>
                        </div>
                        <div className="col-md-6 mb-2 ">
                            <div className="detail-btn">
                                <Button
                                    variant="contained"
                                    className="viewbtn"
                                    onClick={() => navigate('/dashboard/detail-report-product', { state: 'revenue' })}
                                >
                                    View Detail
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div id="chart">
                        <div id="chart">
                            <ReactApexChart
                                options={options}
                                series={
                                    isArrayCheck(all_report?.stats)
                                        ? [{ name: 'revenue', data: graphSeriesMethod(all_report?.stats, 'totalAmount') }]
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
                                Cost
                            </Typography>
                        </div>
                        <div className="col-md-6 mb-2 ">
                            <div className="detail-btn">
                                <Button
                                    variant="contained"
                                    className="viewbtn"
                                    onClick={() => navigate('/dashboard/detail-report-product', { state: 'cost' })}
                                >
                                    View Detail
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div id="chart">
                        <ReactApexChart
                            options={options}
                            series={
                                isArrayCheck(all_report?.stats)
                                    ? [{ name: 'cost', data: graphSeriesMethod(all_report?.stats, 'totalCost') }]
                                    : series
                            }
                            type="bar"
                            height={350}
                        />
                    </div>
                </div>
            </div>
            <UserApprovedPopup />
        </div>
    );
};

export default ReportProduct;
