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
import { columns, column_category_listing } from 'views/utilities/extra';
import { getAllCategories, editCategory } from 'redux/action/Category';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const CategoryListing = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    const [searchData, setsearchData] = useState('');
    const { all_categories } = useSelector((state) => state._category);
    console.log(all_categories);
    useEffect(() => {
        setLoading(false);
        dispatch(getAllCategories());
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_categories) {
            makeRow();
        } else {
            dispatch(getAllCategories());
        }
    }, [all_categories]);

    const makeRow = () => {
        var data =
            Array.isArray(all_categories) && all_categories.length > 0
                ? all_categories.map((data, id) => ({
                      _id: data._id,
                      id: id,
                      image: (
                          <img
                              src={base_url_new + data?.url}
                              style={{
                                  objectFit: 'cover',
                                  height: '30px',
                                  width: '30px',
                                  borderRadius: '50px'
                              }}
                          />
                      ),
                      name: data?.name,
                      description: data?.description,
                      featured: <Switch {...label} checked={data?.isFeatured} onChange={(x) => updateCategoryStatus(data)} />,
                      action: (
                          <button className="detail-btn" onClick={() => navigate('/dashboard/category-details', { state: data })}>
                              Details
                          </button>
                      )
                  }))
                : [];
        setrow(data);
    };

    const updateCategoryStatus = (data) => {
        dispatch(editCategory({ id: data?._id, isFeatured: !data.isFeatured }, navigate));
    };
    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>List Categories</h2>
                        <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/add-category')}>
                           + Add
                        </div>
                    </div>
                    {/* <div className="search-id">
                        <div className="row justify-content-between">
                            <div className="col-lg-4 col-md-4">
                                <div className="search-fields">
                                    <FormControl variant="standard" className="input-field">
                                        <BootstrapInput placeholder="Search by Name" id="bootstrap-input" onChange={handleSearch} />
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="search-fields">
                                    <Select
                                        value={ApproveSelector}
                                        onChange={handleChangeApprove}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">
                                            <em>Select</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Approved</MenuItem>
                                        <MenuItem value={0}>Not Approved</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="search-fields">
                                    <Select
                                        value={roleSelector}
                                        onChange={handleChangeRole}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="">
                                            <em>Select</em>
                                        </MenuItem>
                                        <MenuItem value="user">User</MenuItem>
                                        <MenuItem value={'admin'}>Admin</MenuItem>
                                        <MenuItem value={'designer'}>Designer</MenuItem>
                                        <MenuItem value={'manufacturer'}>Manufacturer</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 text-end">
                                <div
                                    className="btn btn-primary brownBtn"
                                    onClick={() => {
                                        setsearchData('');
                                        setApproveSelector('');
                                        setroleSelector('');
                                    }}
                                >
                                    Reset
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <DataTable
                    columns={column_category_listing}
                    data={row}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    selectableRows
                />
            </div>
        </>
    );
};

export default CategoryListing;
