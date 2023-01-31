import React, { useEffect } from 'react';
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
import { useState } from 'react';
import { isArrayCheck } from 'views/utilities/common';
import ReactApexChart from 'react-apexcharts';
import Divider from '@mui/material/Divider';
import UserApprovedPopup from 'views/pages/Auth/_part/UserApprovedPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReport, reportByProductStatusGraph, getReportByUserId, clearUserReport } from 'redux/action/Report';
import { getAllUserListing } from 'redux/action/User';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { graphSeriesMethod, formatedReportDate, getGraphSeriestotal } from 'utils/helper';
import makeToast from 'utils/Toaster';
import { useNavigate } from 'react-router';
const ReportDesigner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user_report } = useSelector((state) => state._report);
    const { all_users } = useSelector((state) => state._user);
    const [series, setseries] = useState([
        {
            name: 'series1',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    ]);
    const [option, setoption] = useState({
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    zoom: false,
                    pan: false,
                    reset: false// <== line to add
                }
            }
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
    const [options, setoptions] = useState({
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    zoom: false,
                    pan: false,
                    reset: false// <== line to add
                }
            }
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
    const [optionsbar, setoptionsbar] = useState({
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    zoom: false,
                    pan: false,
                    reset: false// <== line to add
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

    const theme = useTheme();

    const handleChange = (event) => {
        console.log(startDate, endDate)
        if (!(startDate > endDate)) {
            setAge(event.target.value);
            dispatch(getReportByUserId({ id: event.target.value, start: formatedReportDate(startDate), end: formatedReportDate(endDate) }));
        } else {
            makeToast('error', 'Select Date Correctly');
        }
        console.log('event.target.value', event.target.value);
    };

    useEffect(() => {
        console.log('user_report', user_report);
    }, [user_report]);

    useEffect(() => {
        dispatch(getAllUserListing({ isApproved: 'approved', role: 'designer' }));

        return () => {
            dispatch(clearUserReport());
        };
    }, []);

    return (
        <div className="report">
            <div className="heading d-flex justify-content-between align-item-center">
                <h2>Report by Designer</h2>
            </div>
            <div className="row align-items-end">
                <div className="col-md-4">
                    <div className="row date-selector">
                        <div className="col-md-6 mb-2">
                            <label htmlFor="">Start Date</label>
                            <DatePicker
                                placeholderText="Select Start Date"
                                // showTimeSelect
                                dateFormat="MMMM d, yyyy"
                                selected={startDate}
                                selectsEnd
                                startDate={startDate}
                                onChange={(date) => {
                                    setStartDate(date);
                                }}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
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
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex" style={{ position: "relative", top: "-15px" }}>
                                <div className="filter-fields">
                                    <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                        <MenuItem value="">
                                            <em>Filter by Designer</em>
                                        </MenuItem>
                                        {isArrayCheck(all_users) &&
                                            all_users?.sort((a, b) => a?.fullname.localeCompare(b?.fullname)).map((data, id) => (
                                                <MenuItem key={id} value={data?._id}>
                                                    {data?.username || data?.fullname}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-md-6 mb-3">
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
                    <Card className="dashboardCard income" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent className="textContainer" sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="p">
                                    Income
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    ${getGraphSeriestotal(graphSeriesMethod(user_report?.stats?.complete, 'total'))}
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
                                    {getGraphSeriestotal(graphSeriesMethod(user_report?.stats?.sold, 'totalSale'))}
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
                                    {getGraphSeriestotal(graphSeriesMethod(user_report?.stats?.complete, 'noOfOrders'))}
                                </Typography>
                            </CardContent>
                        </Box>
                        <CardMedia component="img" image={card7} alt="Products" />
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
                                    Cancelled Order
                                </Typography>
                                <Typography variant="h3" color="text.secondary" component="div">
                                    {getGraphSeriestotal(graphSeriesMethod(user_report?.stats?.cancel, 'noOfOrders'))}
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
                        <div className="col-md-6 mb-2">
                            <Typography component="h1" variant="h1">
                                Profit
                            </Typography>
                        </div>
                        <div className="col-md-6 mb-2 ">
                            <div className="detail-btn">
                                <Button
                                    variant="contained"
                                    className="viewbtn"
                                    onClick={() => navigate('/dashboard/detail-report', { state: 'profit' })}
                                >
                                    View Detail
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div id="chart">
                        <div id="chart">
                            <ReactApexChart
                                options={optionsbar}
                                series={
                                    isArrayCheck(user_report?.stats?.complete)
                                        ? [{ name: 'complete order', data: graphSeriesMethod(user_report?.stats?.complete, 'total') }]
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
                            <div className="detail-btn">
                                <Button
                                    variant="contained"
                                    className="viewbtn"
                                    onClick={() => navigate('/dashboard/detail-report', { state: 'sold' })}
                                >
                                    View Detail
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div id="chart">
                        <div id="chart">
                            <ReactApexChart
                                options={optionsbar}
                                series={
                                    isArrayCheck(user_report?.stats?.sold)
                                        ? [{ name: 'total Sale', data: graphSeriesMethod(user_report?.stats?.sold, 'totalSale') }]
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
                            <div className="detail-btn">
                                <Button
                                    variant="contained"
                                    className="viewbtn"
                                    onClick={() => navigate('/dashboard/detail-report', { state: 'complete' })}
                                >
                                    View Detail
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div id="chart">
                        <Typography component="h4" variant="h4">
                            complete order {getGraphSeriestotal(graphSeriesMethod(user_report?.stats?.complete, 'noOfOrders'))}
                        </Typography>
                        <Typography component="p" variant="p">
                            More than previous month
                        </Typography>
                        <ReactApexChart
                            options={option}
                            series={
                                isArrayCheck(user_report?.stats?.complete)
                                    ? [{ name: 'complete order', data: graphSeriesMethod(user_report?.stats?.complete, 'noOfOrders') }]
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
                        <div className="col-md-6 mb-2 ">
                            <div className="detail-btn">
                                <Button
                                    variant="contained"
                                    className="viewbtn"
                                    onClick={() => navigate('/dashboard/detail-report', { state: 'cancel' })}
                                >
                                    View Detail
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div id="chart">
                        <Typography component="h4" variant="h4">
                            cancelled order {getGraphSeriestotal(graphSeriesMethod(user_report?.stats?.cancel, 'noOfOrders'))}
                        </Typography>
                        <Typography component="p" variant="p">
                            More than previous month
                        </Typography>
                        <ReactApexChart
                            options={options}
                            series={
                                isArrayCheck(user_report?.stats?.cancel)
                                    ? [{ name: 'cancel order', data: graphSeriesMethod(user_report?.stats?.cancel, 'noOfOrders') }]
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

export default ReportDesigner;
