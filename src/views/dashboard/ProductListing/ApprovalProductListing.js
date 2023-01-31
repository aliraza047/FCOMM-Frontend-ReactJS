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
import { columns, column_product_listing } from 'views/utilities/extra';
import { getAllNotApprovedProduct, getAllProducts } from 'redux/action/Product';
import ModalVariation from './_part/Modal/ModalVariation';
import { isArrayCheck } from 'views/utilities/common';
import ApprovalPopup from '../components/Popup/ApprovalPopup';
import ViewDetails from '../components/Popup/ViewDetails';
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
const ApprovalProductListing = () => {
    const [isLoading, setLoading] = useState(true);
    const [viewPopup, setviewPopup] = useState(false);
    const [approvalPopup, setapprovalPopup] = useState(false);
    const [ProductDetails, setProductDetails] = useState('');
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
                              <div className="product-detail">
                                  <p>{data?.name}</p>
                                  <p>| color: {data?.color}</p>
                                  <p>
                                      | size: ({data?.length},{data?.breadth},{data?.height})
                                  </p>
                              </div>
                          </div>
                      ),
                      name: data?.name,
                      designer: data?.designer ? data?.designer.username : '',
                      manufacture: data?.manufacture ? data?.manufacture.username : '',
                      makerPrice: data?.makerPrice,
                      sku: data?.sku,
                      stock: data?.stock,
                      totalPrice: data?.totalPrice,
                      action: (
                          <>
                              {/* <button className="detail-btn" onClick={() => navigate('/dashboard/products-details', { state: data })}>
                                  Edit
                              </button> */}
                              <button
                                  className="detail-btn mx-2"
                                  onClick={() => {
                                      setsingleProduct(data);
                                      setapprovalPopup(true);
                                  }}
                              >
                                  View Details
                              </button>

                              {/* <button className="detail-btn mx-2" onClick={() => handleVariationModal(data)}>
                                  Expand Variation
                              </button> */}
                          </>
                      )
                  }))
                : [];
        setrow(data);
    };

    const makeRowVariation = (details) => {
        var data =
            Array.isArray(details) && details.length > 0
                ? details.map((data, id) => ({
                      _id: data._id,
                      image: (
                          <div className="product-img">
                              <img
                                  src={base_url_new + data?.varaintImage[0]?.url}
                                  style={{
                                      objectFit: 'cover',
                                      height: '55px',
                                      width: '55px',
                                      borderRadius: '10px'
                                  }}
                              />
                          </div>
                      ),
                      stock: data?.stock,
                      size: data?.size,
                      price: data?.price,
                      color: data?.color,
                      sku: data?.sku

                      //   action: (
                      //       <>
                      //           <button className="detail-btn">Details</button>

                      //           <button className="detail-btn mx-2">variation</button>
                      //       </>
                      //   )
                  }))
                : [];
        console.log('Row Variation', data);
        setProductDetails(data);
        setVisible(true);
    };

    const handleVariationModal = (data) => {
        makeRowVariation(data?.variant);
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
                        <h2>Approval Products</h2>
                    </div>

                    <div className="search-id">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="search-fields">
                                    <FormControl variant="standard" className="input-field">
                                        <BootstrapInput placeholder="Search" id="bootstrap-input" onChange={(e) => handleSearch(e)} />
                                    </FormControl>
                                </div>
                            </div>
                            {/* <div className="col-lg-2 col-md-2">
                                <div className="search-fields">
                                    <FormControl variant="standard" className="input-field">
                                        <BootstrapInput placeholder="Manufaturer Name" id="bootstrap-input" />
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2">
                                <div className="search-fields">
                                    <FormControl variant="standard" className="input-field">
                                        <BootstrapInput placeholder="Cost Price" id="bootstrap-input" />
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2">
                                <div className="search-fields">
                                    <FormControl variant="standard" className="input-field">
                                        <BootstrapInput placeholder="Total Price" id="bootstrap-input" />
                                    </FormControl>
                                </div>
                            </div> */}
                            <div className="col-lg-2 col-md-2">
                                <div className="search-fields">
                                    <div className="btn btn-primary brownBtn">Search</div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-2 text-end"></div>
                        </div>
                    </div>
                    <div className="selected mt-0">
                        <p className="mb-0">Selected : 0</p>
                    </div>
                </div>
                <DataTable
                    columns={column_product_listing}
                    data={searchData ? searchData : row}
                    defaultSortFieldId={1}
                    sortIcon={<ArrowDownwardIcon />}
                    pagination
                    selectableRows
                    responsive
                />
            </div>
            <ModalVariation visible={visible} setVisible={setVisible} data={ProductDetails} />
            <ViewDetails visible={viewPopup} setVisible={setviewPopup} data={singleProduct} />
            <ApprovalPopup visible={approvalPopup} setVisible={setapprovalPopup} data={singleProduct} />
        </>
    );
};

export default ApprovalProductListing;
