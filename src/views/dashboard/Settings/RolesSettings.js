import { useEffect, useState } from 'react';

// material-ui

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
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
import { columns, column_settings_roles } from 'views/utilities/extra';
import { getAllNotApprovedProduct, getAllProducts } from 'redux/action/Product';
import { isArrayCheck } from 'views/utilities/common';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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
function RolesSettings() {
    const [isLoading, setLoading] = useState(true);
    const [singleProduct, setsingleProduct] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchData, setsearchData] = useState('');
    const { all_unapproved_products } = useSelector((state) => state._product);
    const { role } = useSelector((state) => state._auth);

    console.log('All Prducts', all_unapproved_products);
    useEffect(() => {
        setLoading(false);
        dispatch(getAllNotApprovedProduct({ isApproved: 'unapproved', role: role }));
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_unapproved_products) {
            makeRow();
        } else {
            dispatch(getAllNotApprovedProduct({ isApproved: 'unapproved', role: role }));
        }
    }, [all_unapproved_products]);

    const makeRow = () => {
        var data =
            Array.isArray(all_unapproved_products) && all_unapproved_products.length > 0
                ? all_unapproved_products.map((data, id) => ({
                      name: data?.name,
                      gender: data?.gender,
                      action: (
                          <>
                              <button className="detail-btn">Edit</button>
                          </>
                      )
                  }))
                : [];
        setrow(data);
    };


    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
            <div className="list-orders add-thread">
                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Settings - Roles</h2>
                    </div>
                    <div className="search-id">
                    <div className="row">
                        <div className="col-lg-10 col-md-9 mb-2">
                            <div className="row">
                                <div className="col-lg-3 col-md-4">
                                    <div className="search-fields">
                                        <FormControl variant="standard" className="Search">
                                            <BootstrapInput placeholder="Role Name" id="bootstrap-input" />
                                        </FormControl>
                                    </div>
                                </div>
                            <div className="col-lg-2 col-md-3">
                                <div className="search-fields">
                                    <div className="btn btn-primary brownBtn" onClick={() => makeToast('success', 'Orange Party')}>
                                        Search
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                   
                    <div className="d-flex align-items-center">
                    <div className="selected m-0">
                        <p className="mb-0">Selected : 0</p>
                    </div>
                    <div className="addphoto-btn">
                    <Button variant="contained" onClick={() => navigate('/dashboard/role-add-edit')} className="addphotobtn">
                        +  Add Role
                    </Button>
                </div>
                    </div>
                </div>
                <DataTable
                    columns={column_settings_roles}
                    data={searchData ? searchData : row}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    responsive
                />
            </div>
        </>
    );
}

export default RolesSettings;
