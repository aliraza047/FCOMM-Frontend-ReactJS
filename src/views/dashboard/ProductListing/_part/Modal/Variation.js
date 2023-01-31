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
import { column_variation_listing,column_variation_manufecturer_listing } from 'views/utilities/extra';
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
const variation = ({ data, handleClose }) => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchData, setsearchData] = useState('');
    const { all_users } = useSelector((state) => state._user);
    const { role } = useSelector((state) => state._auth);
    console.log('Variation Data', data);

    return (
        <>
            <div className="variation-list-orders">
                <div className="heading d-flex justify-content-between align-item-center">
                    <h2>Variation</h2>
                    <CloseIcon onClick={handleClose} />
                </div>
                {role==="manufacturer"?
                <DataTable
                    columns={column_variation_manufecturer_listing}
                    data={data}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    selectableRows
                    responsive
                />:
                <DataTable
                    columns={column_variation_listing}
                    data={data}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    selectableRows
                    responsive
                />
    }
            </div>
        </>
    );
};

export default variation;
