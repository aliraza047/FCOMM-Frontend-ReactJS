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
import { console_log, downloadCSV, Log } from 'utils/helper';
import { approveUser, clearUserListing, editUser, getAllUserListing, getAllUsers } from 'redux/action/User';
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
import { columns } from 'views/utilities/extra';
import UserPopup from 'views/dashboard/components/Popup/UserPopup';
import UpdateUser from '../UpdateUser';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { isArrayCheck } from 'views/utilities/common';
import moment from 'moment';
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
const UsersBlocked = () => {
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    const [searchData, setsearchData] = useState('');
    const [singleData, setsingleData] = useState('');
    const [userPopup, setuserPopup] = useState(false);
    const [date, setdate] = useState('');
    const [searchKey, setsearchKey] = useState('');

    const { all_users } = useSelector((state) => state._user);

    useEffect(() => {
        setLoading(false);
        dispatch(getAllUserListing({ isActive: true }));

        return () => {
            dispatch(clearUserListing());
        };
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_users) {
            makeRow();
        } else {
            dispatch(getAllUserListing({ isActive: true }));
        }
    }, [all_users]);

    const makeRow = () => {
        var data =
            Array.isArray(all_users) && all_users.length > 0
                ? all_users.map((data, id) => ({
                      _id: data._id,
                      image: (
                          <img
                              src={data?.profile?.includes('http') ? data.profile : base_url + data.profile}
                              style={{
                                  objectFit: 'cover',
                                  height: '60px',
                                  width: '60px',
                                  borderRadius: '100%'
                              }}
                          />
                      ),
                      name: data?.fullname,
                      gender: data?.gender,
                      email: data?.email,
                      //   firstName: data?.username,
                      //   role: data?.role.toString(),
                      approve: <Switch {...label} checked={data?.approve} onChange={(x) => dispatch(approveUser({ id: data._id }))} />,
                      action: (
                          <div>
                              <button
                                  className="detail-btn"
                                  onClick={() => {
                                      setuserPopup(true);
                                      setsingleData(data);
                                  }}
                              >
                                  View Details
                              </button>
                              {/* <button className="detail-btn mx-1" onClick={() => navigate('/dashboard/users-details', { state: data })}>
                                  Edit
                              </button>
                              <button className="delete-btn" onClick={() => dispatch(editUser({ id: data?._id, isActive: false }))}>
                                  Block User
                              </button> */}
                          </div>
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

    const handleSearch = () => {
        Log('Date selec', moment(date).format('MM-DD-YYYY'));

        const data = row.filter(
            (x, id) =>
                (moment(x.created_at).format('MM-DD-YYYY') > moment(date).format('MM-DD-YYYY') &&
                    String(x.name).toLocaleLowerCase().includes(String(searchKey).toLocaleLowerCase())) ||
                moment(x.created_at).format('MM-DD-YYYY') > moment(date).format('MM-DD-YYYY') ||
                String(x.name).toLocaleLowerCase().includes(String(searchKey).toLocaleLowerCase())
        );
        if (data) {
            setsearchData(data);
        } else {
            setsearchData('');
        }
    };

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleExport = () => {
        const data = isArrayCheck(all_users)
            ? all_users?.map((data, id) => ({
                  name: data?.fullname,
                  gender: data?.gender,
                  email: data?.email
              }))
            : [];
        downloadCSV(data);
    };

    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Blocked Users</h2>
                        <div className="btn btn-primary brownBtn" onClick={handleExport}>
                            Export
                        </div>
                        {/* <div>
                       <Button variant="outlined"  onClick={handleClickOpen}>
                            Open alert dialog
                        </Button>
                        <Dialog
                            open={open}
                            fullWidth={fullWidth}
        maxWidth={maxWidth}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                        <div className="close-popup">
                            <div className="text-end">
                            <CloseIcon style={{cursor:'pointer'}} onClick={handleClose}/>
                            </div>
                            <div className="block-user-popup">
                                <h5>Write a reason, why you block this user?</h5>
                                <textarea name="comment" placeholder="Write your comment..." className="form-control" id="" cols="5" rows="5"></textarea>
                                    <div className="btn brownBtn" onClick={handleClose}>Send</div>
                            </div>
                            </div>
                        </Dialog>
                       </div> */}
                    </div>
                    <div className="search-id">
                        <div className="row justify-content-between">
                            {/* <div className="col-lg-4 col-md-4">
                                <div className="search-fields">
                                    <FormControl variant="standard" className="input-field">
                                        <BootstrapInput
                                            type="date"
                                            placeholder="Date"
                                            id="bootstrap-input"
                                            value={date}
                                            onChange={(e) => setdate(e.target.value)}
                                        />
                                    </FormControl>
                                </div>
                            </div> */}
                            <div className="col-lg-3 col-md-3">
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
                            <div className="col-lg-4 col-md-4"></div>
                            <div className="col-lg-2 col-md-2 text-end"></div>
                        </div>
                    </div>
                    <div className="d-flex selected mt-0">
                        <p className="mb-0">Selected : 0</p>
                        {/* <div className="btn greenbtn">Edit</div> */}
                    </div>
                </div>
                <DataTable
                    columns={columns}
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

export default UsersBlocked;
