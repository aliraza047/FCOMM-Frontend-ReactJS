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
import { console_log } from 'utils/helper';
import { approveUser, getAllUsers } from 'redux/action/User';
import { createStyles, makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';
import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from 'react-data-table-component';
// import Card from '@material-ui/core/Card';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useNavigate } from 'react-router';
import Switch from '@mui/material/Switch';
import makeToast from 'utils/Toaster';
import { base_url, base_url_new } from 'utils/config';
import { columns, RewardsPromotionsColumns } from 'views/utilities/extra';
import { BlogColumns } from 'views/utilities/extra';
import { getAllBlogs, removeBlog } from 'redux/action/Blog';
import { couponEmail, deleteRewards, getAllRewards } from 'redux/action/RewardsAndPromotions';
import CouponSendPopup from './_part/CouponSendPopup';

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
const index = () => {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [open, setOpen] = useState(false);
    const [counponId, setCouponId] = useState('');
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    const [searchData, setsearchData] = useState('');
    const { all_rewards } = useSelector((state) => state._rewardsAndPromotions);


    const handleClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        setLoading(false);
        dispatch(getAllRewards());
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_rewards) {
            makeRow();
        } else {
            dispatch(getAllRewards());
        }
    }, [all_rewards]);

    const handleSendCoupon = (couponData) => {
        if (!couponData?.allUser && couponData?.emails && couponData?.emails.trim()) {
            const emailArr = couponData?.emails.split(',').map(s => s.trim());
            const data = { couponId: couponData?._id, email: emailArr }
            dispatch(couponEmail(data))
        }else if(couponData?.allUser){
            const data = { couponId: couponData?._id, email: 'all' }
            dispatch(couponEmail(data))
        }
        else {
           makeToast('error' , 'There is email to send coupon')
        }
    }

    const makeRow = () => {
        var data =
            Array.isArray(all_rewards) && all_rewards.length > 0
                ? all_rewards.map((data, id) => ({
                    _id: data._id,
                    id: id,
                    code: data?.code,
                    discountType: data?.discountType,
                    discountValue: data?.discountValue,
                    isActive: data?.usageTotalLimit,
                    name: data?.createdBy?.fullname,
                    usageTotalLimit: data?.usageTotalLimit,
                    action: (
                        <div>
                            <button className="detail-btn mx-1" onClick={() => navigate('/dashboard/edit-reward', { state: data })}>
                                Edit
                            </button>
                            {/* <button className="detail-btn mx-1" onClick={() => navigate('/dashboard/blogs-approved', { state: data })}>
                                  Details
                              </button> */}
                            <button className="delete-btn  mx-1" onClick={() => dispatch(deleteRewards({ id: data?._id }))}>
                                Delete
                            </button>
                            <button className="delete-btn" onClick={() => {
                                handleSendCoupon(data)
                            }}>
                                Send
                            </button>
                        </div>
                    )
                }))
                : [];
        setrow(data);
    };

    const [ApproveSelector, setApproveSelector] = useState('');
    const [roleSelector, setroleSelector] = useState('');

    const handleSearch = (event) => {
        const data = row.filter((x, id) => String(x.code).includes(event.target.value));
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
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Rewards & Promotions</h2>
                        {/* <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/blog-post')}>
                            + Blog Post
                        </div> */}
                        <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/add-reward')}>
                            + Add
                        </div>
                    </div>
                    <div className="search-id">
                        <div className="row justify-content-between">
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <div className="search-fields">
                                            <FormControl variant="standard" className="input-field">
                                                <BootstrapInput placeholder=".i.e XXYYZZ" id="bootstrap-input" onChange={handleSearch} />
                                            </FormControl>
                                        </div>
                                    </div>
                                    {/* <div className="col-lg-3 col-md-3">
                                        <div className="search-fields">
                                            <FormControl variant="standard" className="input-field">
                                                <BootstrapInput placeholder="Start Time" id="bootstrap-input" />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                        <div className="search-fields">
                                            <FormControl variant="standard" className="input-field">
                                                <BootstrapInput placeholder="End Time" id="bootstrap-input" />
                                            </FormControl>
                                        </div>
                                    </div> */}
                                    <div className="col-lg-2 col-md-2">
                                        <div
                                            className="btn btn-primary brownBtn"
                                            onClick={() => {
                                                setsearchData('');
                                                setApproveSelector('');
                                                setroleSelector('');
                                            }}
                                        >
                                            Search
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row selected justify-content-between">
                            <div className="col-md-4 d-flex vertical-align-middle">
                                <p className="mb-0">Selected : 0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DataTable
                    columns={RewardsPromotionsColumns}
                    data={searchData ? searchData : row}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    selectableRows
                />
                {/* <CouponSendPopup open={open} handleClose={handleClose} fullWidth={fullWidth} counponId={counponId} /> */}
            </div>
        </>
    );
};

export default index;
