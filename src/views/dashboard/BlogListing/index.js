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
import { columns } from 'views/utilities/extra';
import { BlogColumns } from 'views/utilities/extra';
import { getAllBlogs, removeBlog } from 'redux/action/Blog';
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
const Blog = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    const [searchData, setsearchData] = useState('');
    const { all_users } = useSelector((state) => state._user);
    const { all_blogs } = useSelector((state) => state._blog);

    useEffect(() => {
        setLoading(false);
        dispatch(getAllBlogs());
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_blogs) {
            makeRow();
        } else {
            dispatch(getAllBlogs());
        }
    }, [all_blogs]);

    const makeRow = () => {
        var data =
            Array.isArray(all_blogs) && all_blogs.length > 0
                ? all_blogs.map((data, id) => ({
                      _id: data._id,
                      id: id,
                      image: (
                          <img
                              src={data?.profile?.includes('http') ? data.profile : base_url_new + data.url}
                              style={{
                                  objectFit: 'cover',
                                  height: '30px',
                                  width: '30px',
                                  borderRadius: '50px'
                              }}
                          />
                      ),
                      name: data?.name,
                      content: data?.content,
                      description: data?.description,
                      addedBy: 'User Name',
                      action: (
                          <div>
                              <button className="detail-btn mx-1" onClick={() => navigate('/dashboard/blogs-details', { state: data })}>
                                  Edit
                              </button>
                              <button className="delete-btn" onClick={() => dispatch(removeBlog({ id: data?._id }, navigate))}>
                                  Delete
                              </button>
                          </div>
                      )
                  }))
                : [];
        setrow(data);
    };

    const [ApproveSelector, setApproveSelector] = useState('');
    const [roleSelector, setroleSelector] = useState('');

    const handleChangeApprove = (event) => {
        // setApproveSelector(event.target.value);
        // if (event.target.value === '') {
        //     setsearchData('');
        // } else {
        //     const check = event.target.value === 1 ? true : false;
        //     console.log('Data Row', row[0].approve.props.checked);
        //     const data = row.filter((x, id) => x.approve.props.checked === check);
        //     if (data) {
        //         setsearchData(data);
        //         console.log('IFFF', data);
        //     } else {
        //         setsearchData(null);
        //         console.log('ELSE');
        //     }
        // }
    };
    const handleChangeRole = (event) => {
        // setroleSelector(event.target.value);
        // if (event.target.value === '') {
        //     setsearchData('');
        // } else {
        //     const data = row.filter((x, id) => String(x.role).includes(event.target.value));
        //     if (data) {
        //         setsearchData(data);
        //     } else {
        //         setsearchData(null);
        //     }
        // }
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
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Blogs</h2>
                        {/* <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/blog-post')}>
                            + Blog Post
                        </div> */}
                        <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/add-blog')}>
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
                                                <BootstrapInput placeholder="Blog Name" id="bootstrap-input" onChange={handleSearch} />
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
                        <div className="row selected">
                            <div className="col-md-12 d-flex vertical-align-middle">
                                <p className="mb-0">Selected : 0</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DataTable
                    columns={BlogColumns}
                    data={searchData ? searchData : row}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    selectableRows
                />
            </div>
        </>
    );
};

export default Blog;
