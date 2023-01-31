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
import { columns, column_information_display } from 'views/utilities/extra';
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
const InformationDisplaySettings = () => {
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
                      _id: data._id,

                      image: (
                          <div className="d-flex align-items-center">
                              <div className="product-img">
                                  <img
                                      src={
                                          isArrayCheck(data?.productImage)
                                              ? base_url_new + data?.productImage[0]?.url
                                              : 'https://www.w3schools.com/w3images/avatar2.png'
                                      }
                                      style={{
                                          objectFit: 'cover',
                                          height: '55px',
                                          width: '55px',
                                          borderRadius: '10px'
                                      }}
                                  />
                              </div>
                          </div>
                      ),
                      name: data?.name,
                      gender: data?.gender,
                      action: (
                          <>
                              <button className="detail-btn">View Details</button>
                              <button className="detail-btn mx-2">Edit</button>

                              <button className="delete-btn">Delete</button>
                          </>
                      )
                  }))
                : [];
        setrow(data);
    };

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Users', value: '1' },
        { name: 'Approval Users', value: '2' },
        { name: 'Products', value: '3' },
        { name: 'Approval Products', value: '4' },
        { name: 'Orders', value: '5' },
        { name: 'Blogs', value: '6' }
    ];

    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value }
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    const names = ['Oliver Hansen', 'Van Henry', 'April Tucker'];
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    return (
        <>
            <div className="list-orders add-thread">
                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Information Display</h2>
                    </div>
                    <div className="tabs-btn">
                        <ButtonGroup>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
                    <div className="col-md-3">
                        <div className="search-fields input-field">
                            <FormControl sx={{ m: 1, width: 300 }}>
                                {/* <InputLabel id="demo-multiple-checkbox-label">Role</InputLabel> */}
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    displayEmpty
                                    value={personName}
                                    input={<OutlinedInput />}
                                    onChange={handleChange}
                                    renderValue={(selected) => {
                                        if (selected.length === 0) {
                                            return <em>Placeholder</em>;
                                        }

                                        return selected.join(', ');
                                    }}
                                    MenuProps={MenuProps}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem disabled value="">
                                        <em>Select</em>
                                    </MenuItem>
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={personName.indexOf(name) > -1} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="selected mt-0">
                        <p className="mb-0">Selected : 0</p>
                    </div>
                </div>
                <DataTable
                    columns={column_information_display}
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

export default InformationDisplaySettings;
