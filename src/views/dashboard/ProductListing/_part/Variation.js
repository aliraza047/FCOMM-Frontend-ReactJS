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
import { base_url } from 'utils/config';
import { column_variation_listing } from 'views/utilities/extra';
import CloseIcon from '@mui/icons-material/Close';
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
const variation = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchData, setsearchData] = useState('');
    const { all_users } = useSelector((state) => state._user);

    useEffect(() => {
        setLoading(false);
        // dispatch(getAllUsers());
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_users) {
            makeRow();
        } else {
            // dispatch(getAllUsers());
        }
    }, [all_users]);

    const makeRow = () => {
        var data =
            Array.isArray(all_users) && all_users.length > 0
                ? all_users.map((data, id) => ({
                      id: id,
                      image: (
                          <img
                              src={data?.profile?.includes('http') ? data.profile : base_url + data.profile}
                              style={{
                                  objectFit: 'contain',
                                  height: '30px',
                                  width: '30px',
                                  borderRadius: '50px'
                              }}
                          />
                      ),
                      firstName: data?.username,
                      email: data?.email,
                      fullName: data?.full_name,
                      role: data?.role.toString(),
                      approve: <Switch {...label} checked={data?.approve} onChange={(x) => dispatch(approveUser({ id: data._id }))} />,
                      action: (
                          <>
                              <button className="detail-btn" onClick={() => navigate('/admin/users-details', { state: data })}>
                                  Details
                              </button>

                              <button className="detail-btn mx-2" onClick={() => setVisible(!visible)}>
                                  variation
                              </button>
                          </>
                      )
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

    const handleSearch = (event) => {
        const data = row.filter((x, id) => String(x.firstName).includes(event.target.value));
        if (data) {
            setsearchData(data);
        } else {
            setsearchData('');
        }
    };

    return (
        <>
            <div className="variation-list-orders">
                <div className="heading d-flex justify-content-between align-item-center">
                    <h2>Variation</h2>
                    <CloseIcon />
                </div>
                <DataTable
                    columns={column_variation_listing}
                    data={searchData ? searchData : row}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    selectableRows
                    responsive
                />
            </div>
        </>
    );
};

export default variation;
