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
import { approveUser, getAllUsers } from 'redux/action/User';
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
import { base_url, base_url_new } from 'utils/config';
import {
    columns,
    column_product_listing,
    column_product_listing_admin,
    column_product_listing_unapproved,
    column_product_manufecturer_listing
} from 'views/utilities/extra';
import { editProduct, getAllProducts, removeMultiProducts } from 'redux/action/Product';
import ModalVariation from './_part/Modal/ModalVariation';
import { isArrayCheck } from 'views/utilities/common';
import ApprovalPopup from '../components/Popup/ApprovalPopup';
import ViewDetails from '../components/Popup/ViewDetails';
import AdminEditProductPopup from '../components/Popup/AdminEditProductPopup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Export = ({ onExport }) => <Button onClick={(e) => onExport(e.target.value)}>Export</Button>;

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
const ProductListing = () => {
    const data = useLocation();
    console.log('Radio Value ===>', data);
    const [isLoading, setLoading] = useState(true);
    const [viewPopup, setviewPopup] = useState(false);
    const [approvalPopup, setapprovalPopup] = useState(false);
    const [adminEditProductPopup, setAdminEditProductPopup] = useState(false);
    const [ProductDetails, setProductDetails] = useState('');
    const [singleProduct, setsingleProduct] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [row, setrow] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchData, setsearchData] = useState('');
    const { all_products } = useSelector((state) => state._product);
    console.log('all_products all_products', all_products);
    const { role } = useSelector((state) => state._auth);
    const [deleteVisible, setdeleteVisible] = useState(false);
    const [deletedArrayData, setdeletedArrayData] = useState('');
    const [selectedCount, setselectedCount] = useState(0);

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState(data?.state?.value ? data?.state?.value : '');
    useEffect(() => {
        if (data?.state) {
            setRadioValue(data?.state?.value);
        }
    }, [data?.state]);
    const radios = [
        { name: 'Listing', value: '' },
        { name: 'Admin Approval', value: 'unapproved' },
        { name: 'My Approval', value: 'approvedByAdmin' }
    ];

    useEffect(() => {
        setLoading(false);
        if (data?.state?.value !== 'unapproved') {
            dispatch(getAllProducts());
        }
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_products) {
            makeRow();
        } else {
            dispatch(getAllProducts());
        }
    }, [all_products]);

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const makeRow = () => {
        var data =
            Array.isArray(all_products) && all_products.length > 0
                ? all_products.map((data, id) => ({
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
                      designer: data?.designer ? data?.designer.username : '',
                      manufacture: data?.manufacture ? data?.manufacture.username : '',
                      makerPrice: data?.makerPrice,
                      designerPrice: data?.totalPrice,
                      sku: data?.sku,
                      stock: data?.stock,
                      totalPrice: Number(data?.totalPrice) + Number(data?.makerPrice),
                      name: data?.name,
                      status: data?.isApproved == 'unapproved' ? 'Pending' : 'Rejected',
                      isActive: <Switch {...label} checked={data?.isActive} onChange={() => updateProductStatus(data)} />,
                      action: (
                          <>
                              {(role === 'designer' && radioValue === '') ||
                              (radioValue === 'unapproved' && data?.isApproved == 'rejected') ? (
                                  <>
                                      <button
                                          className="detail-btn"
                                          onClick={() => navigate('/dashboard/products-details', { state: data })}
                                      >
                                          Edit
                                      </button>
                                  </>
                              ) : null}
                              {role === 'designer' && radioValue === 'approvedByAdmin' ? (
                                  <button
                                      className="detail-btn mx-2"
                                      onClick={() => {
                                          setsingleProduct(data);
                                          setapprovalPopup(true);
                                      }}
                                  >
                                      View Details
                                  </button>
                              ) : role === 'admin' ? (
                                  <React.Fragment>
                                      <button
                                          className="detail-btn mx-2"
                                          onClick={() => {
                                              setsingleProduct(data);
                                              setAdminEditProductPopup(true);
                                          }}
                                      >
                                          Edit
                                      </button>
                                      <button
                                          className="detail-btn mx-2"
                                          onClick={() => {
                                              setsingleProduct(data);
                                              setviewPopup(true);
                                          }}
                                      >
                                          View Details
                                      </button>
                                  </React.Fragment>
                              ) : role != 'manufacturer' ? (
                                  <button
                                      className="detail-btn mx-2"
                                      onClick={() => {
                                          setsingleProduct(data);
                                          setviewPopup(true);
                                      }}
                                  >
                                      View Details
                                  </button>
                              ) : (
                                  <button
                                      className="detail-btn mx-2"
                                      onClick={() => navigate('/dashboard/products-details', { state: data })}
                                  >
                                      View Details
                                  </button>
                              )}
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

    const selectedDataRow = (data) => {
        setselectedCount(data.selectedCount);
        setdeleteVisible(!deleteVisible);
        let result = isArrayCheck(data?.selectedRows) ? data?.selectedRows?.map((x) => x._id) : null;
        if (result) {
            setdeletedArrayData({ productIDS: result });
            // console.log('Deleted Result=>', result);
        }
    };

    const handleRadio = (e) => {
        setRadioValue(e.target.value);
        Log('Radio Value', e.target.value);
        if (e.target.value === 'unapproved') {
            dispatch(getAllProducts('unapproved'));
        } else if (e.target.value === 'approvedByAdmin') {
            dispatch(getAllProducts('approvedByAdmin'));
        } else {
            dispatch(getAllProducts());
        }
    };

    const updateProductStatus = (data) => {
        dispatch(editProduct({ id: data?._id, isActive: !data.isActive }, navigate, true));
    };

    // const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);
    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center">
                        {role === 'admin' ? (
                            <h2>Products</h2>
                        ) : role === 'designer' ? (
                            <h2>My Products</h2>
                        ) : role === 'manufacturer' ? (
                            <h2>Products</h2>
                        ) : null}
                        {role === 'designer' ? (
                            <div>
                                <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/add-product')}>
                                    + Add
                                </div>
                                {/* <Button variant="outlined" onClick={handleClickOpen}>
                            Open alert dialog
                        </Button> */}
                                {/* <Dialog
                            open={open}
                            fullWidth={fullWidth}
                            maxWidth={maxWidth}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                         <div className="remove-popup">
                            <div className="block-user-popup">
                                <h5>Are you sure you want to remove this product?</h5>
                                    <div className="btn grayBtn">Yes</div>
                                    <div className="btn brownBtn" onClick={handleClose}>No</div>
                            </div>
                            </div>
                        </Dialog> */}
                            </div>
                        ) : null}
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
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="d-flex selected mt-0">
                                <p className="mb-0">Selected : {selectedCount}</p>
                                {deleteVisible ? (
                                    <div
                                        className="btn pinkbtn"
                                        onClick={() => {
                                            dispatch(removeMultiProducts(deletedArrayData));
                                            setdeleteVisible(false);
                                            setdeletedArrayData('');
                                            setselectedCount(0);
                                        }}
                                    >
                                        Delete
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            {role === 'designer' ? (
                                <div className="tabs-btn">
                                    <ButtonGroup>
                                        {radios.map((radio, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`radio-${idx}`}
                                                type="radio"
                                                name="radio"
                                                value={radio.value}
                                                checked={radioValue === radio.value}
                                                onChange={(e) => handleRadio(e)}
                                            >
                                                {radio.name}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                {role === 'manufacturer' ? (
                    <DataTable
                        columns={column_product_manufecturer_listing}
                        data={searchData ? searchData : row}
                        defaultSortFieldId={1}
                        sortIcon={<ArrowDownwardIcon />}
                        onSelectedRowsChange={(data) => selectedDataRow(data)}
                        pagination
                        selectableRows
                        responsive
                    />
                ) : role === 'designer' && radioValue === 'unapproved' ? (
                    <DataTable
                        columns={column_product_listing_unapproved}
                        data={searchData ? searchData : row}
                        defaultSortFieldId={1}
                        sortIcon={<ArrowDownwardIcon />}
                        onSelectedRowsChange={(data) => selectedDataRow(data)}
                        pagination
                        selectableRows
                        responsive
                    />
                ) : role === 'designer' ? (
                    <DataTable
                        columns={column_product_listing}
                        data={searchData ? searchData : row}
                        defaultSortFieldId={1}
                        sortIcon={<ArrowDownwardIcon />}
                        onSelectedRowsChange={(data) => selectedDataRow(data)}
                        pagination
                        selectableRows
                        responsive
                    />
                ) : (
                    <DataTable
                        columns={column_product_listing_admin}
                        data={searchData ? searchData : row}
                        defaultSortFieldId={1}
                        sortIcon={<ArrowDownwardIcon />}
                        onSelectedRowsChange={(data) => selectedDataRow(data)}
                        pagination
                        selectableRows
                        responsive
                    />
                )}
            </div>
            <ModalVariation visible={visible} setVisible={setVisible} data={ProductDetails} />
            <ViewDetails visible={viewPopup} setVisible={setviewPopup} data={singleProduct} />
            <ApprovalPopup visible={approvalPopup} setVisible={setapprovalPopup} data={singleProduct} />
            <AdminEditProductPopup visible={adminEditProductPopup} setVisible={setAdminEditProductPopup} data={singleProduct} />
        </>
    );
};

export default ProductListing;
