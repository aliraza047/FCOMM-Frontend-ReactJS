import { useEffect, useState } from 'react';

// material-ui

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { console_log, downloadCSV, getAvgProfitDesigner, getOrdersByStatus, getProductSoldQuantity, getQuantity, Log } from 'utils/helper';
import { approveUser, getAllUsers, clearUserListing, getAllUserListing, editUser } from 'redux/action/User';
import { createStyles, makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from 'react-data-table-component';
// import Card from '@material-ui/core/Card';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useLocation, useNavigate } from 'react-router';
import Switch from '@mui/material/Switch';
import makeToast from 'utils/Toaster';
import UserPopup from '../../components/Popup/UserPopup';
import { base_url } from 'utils/config';
import {
    columns,
    column_designer_report,
    column_designer_report_cancel,
    column_designer_report_complete,
    column_designer_report_product_sold,
    column_designer_report_profit
} from 'views/utilities/extra';
import { isArrayCheck } from 'views/utilities/common';
import moment from 'moment';
import { getReportOfDesignerProfit } from 'redux/action/Report';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3)
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main
        }
    }
}));
const DetailReport = () => {
    const { state } = useLocation();
    console.log('State Data', state);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const [userPopup, setuserPopup] = useState(false);
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    const [searchData, setsearchData] = useState('');
    const [singleData, setsingleData] = useState('');
    const [date, setdate] = useState('');
    const [searchKey, setsearchKey] = useState('');

    const { designers_profit_report } = useSelector((state) => state._report);
    const { user } = useSelector((state) => state._auth);

    useEffect(() => {
        setLoading(false);
        dispatch(getReportOfDesignerProfit());
        return () => {
            dispatch(clearUserListing());
        };
    }, []);

    useEffect(() => {
        setLoading(false);
        if (designers_profit_report) {
            makeRow();
        } else {
            dispatch(getReportOfDesignerProfit());
        }
    }, [designers_profit_report]);

    const makeRow = () => {
        var data =
            Array.isArray(designers_profit_report) && designers_profit_report.length > 0
                ? designers_profit_report.map((data, id) => ({
                      _id: data._id,

                      name: data?.fullname,
                      country: data?.country,
                      phone: data?.phone_number,
                      email: data?.email,
                      profit: getAvgProfitDesigner(data?.profit),
                      productSold: getProductSoldQuantity(data?.profit, null),
                      complete: getOrdersByStatus(data?.profit, 'received'),
                      cancel: getOrdersByStatus(data?.profit, 'cancelled')
                  }))
                : [];
        setrow(data);
    };

    const [ApproveSelector, setApproveSelector] = useState('');
    const [roleSelector, setroleSelector] = useState('');

    const handleChangeApprove = (event) => {
        setApproveSelector(event.target.value);
        if (event.target.value === '') {
            setsearchData('');
        } else {
            const check = event.target.value === 1 ? true : false;
            console.log('Data Row', row[0].approve.props.checked);
            const data = row.filter((x, id) => x.approve.props.checked === check);
            if (data) {
                setsearchData(data);
                console.log('IFFF', data);
            } else {
                setsearchData(null);
                console.log('ELSE');
            }
        }
    };
    const handleChangeRole = (event) => {
        setroleSelector(event.target.value);
        if (event.target.value === '') {
            setsearchData('');
        } else {
            const data = row.filter((x, id) => String(x.role).includes(event.target.value));
            if (data) {
                setsearchData(data);
            } else {
                setsearchData(null);
            }
        }
    };

    const handleSearch = () => {
        Log('Date selec', moment(date).format('MM-DD-YYYY'));

        const data = row.filter(
            (x, id) =>
                (moment(x.created_at).format('MM-DD-YYYY') > moment(date).format('MM-DD-YYYY') && String(x.name).includes(searchKey)) ||
                moment(x.created_at).format('MM-DD-YYYY') > moment(date).format('MM-DD-YYYY') ||
                String(x.name).includes(searchKey)
        );
        if (data) {
            setsearchData(data);
        } else {
            setsearchData('');
        }
    };

    const handleExport = () => {
        if (state === 'sold') {
            const data = isArrayCheck(designers_profit_report)
                ? designers_profit_report?.map((data, id) => ({
                      name: data?.fullname,
                      country: data?.country,
                      phone: data?.phone_number,
                      email: data?.email,
                      productSold: getProductSoldQuantity(data?.profit, null)
                  }))
                : [];
            downloadCSV(data);
        } else if (state === 'profit') {
            const data = isArrayCheck(designers_profit_report)
                ? designers_profit_report?.map((data, id) => ({
                      name: data?.fullname,
                      country: data?.country,
                      phone: data?.phone_number,
                      email: data?.email,
                      profit: getAvgProfitDesigner(data?.profit)
                  }))
                : [];
            downloadCSV(data);
        } else if (state === 'complete') {
            const data = isArrayCheck(designers_profit_report)
                ? designers_profit_report?.map((data, id) => ({
                      name: data?.fullname,
                      country: data?.country,
                      phone: data?.phone_number,
                      email: data?.email,
                      complete: getOrdersByStatus(data?.profit, 'received')
                  }))
                : [];
            downloadCSV(data);
        } else if (state === 'cancel') {
            const data = isArrayCheck(designers_profit_report)
                ? designers_profit_report?.map((data, id) => ({
                      name: data?.fullname,
                      country: data?.country,
                      phone: data?.phone_number,
                      email: data?.email,
                      cancel: getOrdersByStatus(data?.profit, 'cancelled')
                  }))
                : [];
            downloadCSV(data);
        }
    };

    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>
                            Report Designer By{' '}
                            {state === 'sold'
                                ? 'Product Sold'
                                : state === 'profit'
                                ? 'Profit'
                                : state === 'complete'
                                ? 'Complete Orders'
                                : state === 'cancel'
                                ? 'Cancel Orders'
                                : ''}
                        </h2>
                    </div>
                    <div className="search-id">
                        <div className="row justify-content-between">
                            <div className="col-lg-4 col-md-4">
                                <div className="search-fields">
                                    <FormControl variant="standard" className="input-field">
                                        <BootstrapInput
                                            placeholder="Search"
                                            id="bootstrap-input"
                                            onChange={(e) => setsearchKey(e.target.value)}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="search-fields">
                                    <div className="btn btn-primary brownBtn" onClick={handleSearch}>
                                        Search
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                {/* <div className="search-fields">
                                    <FormControl variant="standard" className="input-field">
                                        <BootstrapInput
                                            placeholder="Filter Designer"
                                            id="bootstrap-input"
                                            onChange={(e) => setsearchKey(e.target.value)}
                                        />
                                    </FormControl>
                                </div> */}
                            </div>
                            <div className="col-lg-2 col-md-2 text-end">
                                {' '}
                                <div className="btn btn-primary brownBtn" onClick={handleExport}>
                                    Export
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="selected mt-0">
                        <p className="mb-0">Selected : 0</p>
                    </div>
                </div>
                <DataTable
                    columns={
                        state === 'sold'
                            ? column_designer_report_product_sold
                            : state === 'profit'
                            ? column_designer_report_profit
                            : state === 'complete'
                            ? column_designer_report_complete
                            : column_designer_report_cancel
                    }
                    data={searchData ? searchData : row}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    selectableRows
                />
                <UserPopup visible={userPopup} setVisible={setuserPopup} data={singleData} />
            </div>
        </>
    );
};

export default DetailReport;
