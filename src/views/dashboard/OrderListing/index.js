import React, { useEffect, useState } from 'react';

// material-ui

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Pending from '../../../../src/assets/images/Pending.svg';
import Payment from '../../../../src/assets/images/Payment.svg';
import Dispatch from '../../../../src/assets/images/Dispatch.svg';
import Recived from '../../../../src/assets/images/Recived.svg';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { console_log, downloadCSV, getOrderExportdata, getOrderStatusText } from 'utils/helper';
import { getAllUsers } from 'redux/action/User';
import {
    column_orders_listing,
    column_orders_listing_Designer,
    column_orders_listing_manufacture,
    column_orders_listing_logistic
} from 'views/utilities/extra';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DataTable from 'react-data-table-component';
import { getAllOrders, getSingleOrders, getSingleOrderTracking } from 'redux/action/Order';
import { getColorForOrderStatus } from '../../../utils/helper';
import makeToast from 'utils/Toaster';
import OrderDetailPopup from './_part/OrderDetailPopup';
import DesignerOrderDetailPopup from './_part/DesignerOrderDetailPopup';
import OrderAssignPopup from './_part/OrderAssignPopup';
import OrderTrackingPopup from './_part/OrderTrackingPopup';
import { isArrayCheck } from 'views/utilities/common';
import OrderInvoicePopup from './_part/OrderInvoicePopup';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

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

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};
const OrderListing = () => {
    const [isLoading, setLoading] = useState(true);
    const [searchData, setsearchData] = useState('');
    const [OrderDetailPopupState, setOrderDetailPopupState] = useState(false);
    const [DesignerOrderDetailPopupState, setDesignerOrderDetailPopupState] = useState(false);
    const [orderAssignPopupState, setOrderAssignPopupState] = useState(false);
    const [orderTrackingPopupState, setOrderTrackingPopupState] = useState(false);

    const [details, setdetails] = useState('');
    const [InvoicePopup, setInvoicePopup] = useState(false);

    const { role } = useSelector((state) => state._auth);
    const dispatch = useDispatch();
    const [row, setrow] = useState([]);
    const { all_orders, single_order_tracking } = useSelector((state) => state._order);
    useEffect(() => {
        setLoading(false);
        dispatch(getAllOrders());
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_orders) {
            makeRow();
        } else {
            dispatch(getAllOrders());
        }
    }, [all_orders]);
    //  id: 0, designer: 'Salman', price: 100, buyer: 'Jhon', buyerAddress: 'Lahore', status: 'pending'

    console.log('ali all_order', all_orders[0]);

    const downloadPDF = (pdf) => {
        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement('a');
        const fileName = 'DhlShipment.pdf';
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };
    const makeRow = () => {
        var data =
            Array.isArray(all_orders) && all_orders.length > 0
                ? all_orders.map((data, id) => ({
                      _id: data._id,
                      id: id + 1,
                      manufacturer: data?.products[0]?.manufacturer?.fullname,
                      manufacturerAddress: (
                          <div>
                              <div>{data?.products[0]?.manufacturer?.myAddresses[0]?.country}</div>
                              <div>{data?.products[0]?.manufacturer?.myAddresses[0]?.state}</div>
                              <div>{data?.products[0]?.manufacturer?.myAddresses[0]?.city}</div>
                              <div>{data?.products[0]?.manufacturer?.address}</div>
                          </div>
                      ),
                      costPrice: data?.products[0]?.costPrice,
                      shipping: data?.shippingCost,
                      // price: '$' + data?.totalAmount,
                      designer: data?.designer?.fullname,
                      designerPrice: data?.products[0]?.designerPrice,
                      price: Number(data?.totalAmount).toFixed(2),
                      buyer: data?.createdBy?.fullname,
                      buyerAddress: (
                          <div>
                              <div>{data?.billingAddress?.houseNo}</div>
                              <div>{data?.billingAddress?.poBoxNo}</div>
                              <div>{data?.billingAddress?.state}</div>
                              <div>{data?.billingAddress?.streetNo}</div>
                          </div>
                      ),
                      trackingId: data?.delivery?.trackingId,
                      orderStatus: data?.delivery?.status,
                      created_at: data?.created_at,
                      status: (
                          <div
                              style={{
                                  fontWeight: 'bold',
                                  textTransform: 'capitalize',
                                  color: getColorForOrderStatus(data?.delivery?.status)
                              }}
                          >
                              {getOrderStatusText(data?.delivery?.status)}
                          </div>
                      ),
                      action: (
                          <div>
                              {role === 'admin' ? (
                                  <button
                                      className="detail-btn mx-2"
                                      onClick={() => {
                                          dispatch(getSingleOrders(data));
                                          setdetails(data);
                                          setOrderDetailPopupState(true);
                                      }}
                                  >
                                      Details
                                  </button>
                              ) : role === 'designer' ? (
                                  <button
                                      className="detail-btn mx-2"
                                      onClick={() => {
                                          setDesignerOrderDetailPopupState(true);
                                          setdetails(data);
                                      }}
                                  >
                                      Details
                                  </button>
                              ) : role === 'manufacturer' ? (
                                  <button
                                      className="detail-btn mx-2"
                                      onClick={() => {
                                          dispatch(getSingleOrders(data));
                                          setOrderDetailPopupState(true);
                                          setdetails(data);
                                      }}
                                  >
                                      Details
                                  </button>
                              ) : role === 'logistic' ? (
                                  <>
                                      <button
                                          className="detail-btn mx-2"
                                          onClick={() => {
                                              dispatch(getSingleOrders(data));
                                              setOrderDetailPopupState(true);
                                              setdetails(data);
                                          }}
                                      >
                                          Details
                                      </button>
                                      <button
                                          className="detail-btn mx-2"
                                          onClick={() => {
                                              dispatch(getSingleOrders(data));
                                              setInvoicePopup(true);
                                              setdetails(data);
                                          }}
                                      >
                                          invoice
                                      </button>
                                      {!data?.delivery?.shipmentTrackingNumber ? (
                                          <button
                                              className="detail-btn mx-2"
                                              onClick={() => {
                                                  dispatch(getSingleOrders(data));
                                                  setOrderAssignPopupState(true);
                                                  setdetails(data);
                                              }}
                                          >
                                              Shipment
                                          </button>
                                      ) : (
                                          <>
                                              <button
                                                  className="detail-btn mx-2"
                                                  onClick={() => {
                                                      downloadPDF(data?.delivery?.trackingDocument);
                                                  }}
                                              >
                                                  Print
                                              </button>
                                              {/* <button
                                                className="detail-btn mx-2"
                                                onClick={() => {
                                                    dispatch(getSingleOrderTracking({ id: data?.delivery?.shipmentTrackingNumber }));
                                                    setOrderTrackingPopupState(true);
                                                    setdetails(data);
                                                }}
                                            >
                                                Tracking
                                            </button> */}
                                          </>
                                      )}
                                  </>
                              ) : null}
                          </div>
                      )
                  }))
                : [];
        // console.log('Row Data', all_orders);
        setrow(data);
    };

    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        const data = row.filter((x, id) => String(x.orderStatus).includes(event.target.value));
        console.log('Seacrhed Dta', data);
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

    const handleSearch = (event) => {
        const data = row.filter(
            (x, id) =>
                String(x.buyer).includes(event.target.value) ||
                String(x.trackingId).includes(event.target.value) ||
                String(x.manufacturer).includes(event.target.value) ||
                String(x._id).includes(event.target.value)
        );
        console.log('Seacrhed Dta', data);
        if (data) {
            setsearchData(data);
        } else {
            setsearchData('');
        }
    };

    // pending payment 2nd Dialog Box
    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                background: '#B16846'
            }
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                background: '#B16846'
            }
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1
        }
    }));

    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            background: '#B16846',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
        }),
        ...(ownerState.completed && {
            background: '#B16846'
        })
    }));

    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;

        const icons = {
            1: <StickyNote2OutlinedIcon />,
            2: <LocalShippingOutlinedIcon />,
            3: <AccountBalanceWalletOutlinedIcon />,
            4: <CheckOutlinedIcon />
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    ColorlibStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
        /**
         * The label displayed in the step icon.
         */
        icon: PropTypes.node
    };

    const steps = ['Order Placed', 'Order Paid', 'Shipment', 'Order Complete'];

    const handleExport = () => {
        const data = getOrderExportdata(all_orders, role);
        console.log('handleExport', data);
        if (isArrayCheck(data)) {
            downloadCSV(data);
        } else {
            makeToast('error', 'There is no data to export');
        }
    };
    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="row align-item-center">
                        <div className="col-lg-8 col-md-6">
                            <div className="heading">
                                {role === 'admin' ? (
                                    <h2>List orders</h2>
                                ) : role === 'designer' ? (
                                    <h2>Orders</h2>
                                ) : role === 'manufacturer' ? (
                                    <h2>List orders</h2>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-id">
                    <div className="row">
                        <div className="col-lg-10 col-md-9">
                            <div className="row">
                                <div className="col-lg-3 col-md-4">
                                    <div className="search-fields">
                                        <FormControl variant="standard" className="input-field">
                                            <BootstrapInput placeholder="Search" id="bootstrap-input" onChange={(e) => handleSearch(e)} />
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-3">
                                    <div className="search-fields">
                                        <div className="btn btn-primary brownBtn">Search</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-3">
                            <div className="search-fields">
                                <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                    <MenuItem value="">
                                        <em>Status</em>
                                    </MenuItem>
                                    <MenuItem value={'unapproved'}>Placed</MenuItem>
                                    <MenuItem value={'processToManufacture'}>ProcessToManufacture</MenuItem>
                                    <MenuItem value={'orderMakingDone'}>OrderMakingDone</MenuItem>
                                    <MenuItem value={'shipped'}>Shipped</MenuItem>
                                    <MenuItem value={'received'}>Received</MenuItem>
                                    <MenuItem value={''}>All</MenuItem>
                                </Select>
                            </div>
                            <div className="text-end">
                                <div className="btn btn-primary brownBtn" onClick={() => handleExport()}>
                                    Export
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="complete-delivery">
                    <div className="row align-item-center">
                        <div className="col-lg-5 col-md-6"></div>
                        <div>
                            <OrderDetailPopup setVisible={setOrderDetailPopupState} open={OrderDetailPopupState} />
                            <DesignerOrderDetailPopup
                                setVisible={setDesignerOrderDetailPopupState}
                                open={DesignerOrderDetailPopupState}
                                data={details}
                            />
                            <OrderAssignPopup
                                setVisible={setOrderAssignPopupState}
                                open={orderAssignPopupState}
                                // data={details}
                            />

                            <OrderTrackingPopup
                                setVisible={setOrderTrackingPopupState}
                                open={orderTrackingPopupState}
                                // data={details}
                            />
                            <OrderInvoicePopup
                                setVisible={setInvoicePopup}
                                open={InvoicePopup}
                                // data={details}
                            />
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                maxWidth="xl"
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <div className="approval-detail-popup pending-payment-stepper">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h1>Pending Paymnet</h1>
                                        </div>
                                        <div className="payment-stepper">
                                            <Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />}>
                                                {steps.map((label) => (
                                                    <Step key={label}>
                                                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                            {/* <Dialog
                                open={open}
                                onClose={handleClose}
                                maxWidth="xl"
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <div className="approval-detail-popup">
                                    <div className="heading row justify-content-between align-item-center mx-0">
                                        <div className="col-md-6">
                                            <h5 className="mb-0 mt-2">Order Detail</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex justify-content-between">
                                                <h5 className="mb-0 mt-2">Shipping Address</h5>
                                                <CloseIcon onClick={handleClose} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mx-0">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="manufecturer">
                                                <div className="d-flex cost-name align-items-center justify-content-between">
                                                    <strong>Order ID</strong>
                                                    <div className="margin"></div>
                                                    <p className="m-0">#rq2e421312</p>
                                                </div>
                                            </div>
                                            <div className="manufecturer">
                                                <div className="d-flex cost-name align-items-center justify-content-between">
                                                    <strong>Order Status</strong>
                                                    <div className="margin"></div>
                                                    <p className="m-0 text-success">Completed</p>
                                                </div>
                                            </div>
                                            <div className="manufecturer">
                                                <div className="d-flex cost-name align-items-center justify-content-between">
                                                    <strong>Designer</strong>
                                                    <div className="margin"></div>
                                                    <p className="m-0">#rq2e421312</p>
                                                </div>
                                            </div>
                                            <div className="manufecturer">
                                                <div className="d-flex cost-name align-items-center justify-content-between">
                                                    <strong>Designer Contact Number</strong>
                                                    <div className="margin"></div>
                                                    <p className="m-0">+23 23144124</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="manufecturer">
                                                <div className="d-flex cost-name align-items-center justify-content-between">
                                                    <strong>Shipment</strong>
                                                    <div className="margin"></div>
                                                    <p className="m-0">Wooden Table, Wooden Table 2</p>
                                                </div>
                                                <div className="d-flex cost-name align-items-center justify-content-between">
                                                    <strong>Shipment Fee</strong>
                                                    <div className="margin"></div>
                                                    <p className="m-0">$20</p>
                                                </div>
                                                <div className="d-flex cost-name align-items-center justify-content-between">
                                                    <strong>Track Number</strong>
                                                    <div className="margin"></div>
                                                    <p className="m-0">#1312312312</p>
                                                </div>
                                                <div className="d-flex cost-name align-items-center justify-content-between">
                                                    <strong>Address</strong>
                                                    <div className="margin"></div>
                                                    <p className="m-0">Street, Block, Building, City</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Size</th>
                                                    <th scope="col">Color</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Cost Price</th>
                                                    <th scope="col">Total Price</th>
                                                    <th scope="col">SKU</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img
                                                            src={
                                                                'https://i0.wp.com/alarusinteriors.com/wp-content/uploads/2020/04/IMG-0075.jpg'
                                                            }
                                                            alt=""
                                                            style={{
                                                                objectFit: 'cover',
                                                                height: '50px',
                                                                width: '50px',
                                                                borderRadius: '8px'
                                                            }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <p>Skin Wooden Table</p>
                                                    </td>
                                                    <td>
                                                        <p>1</p>
                                                    </td>
                                                    <td>
                                                        <p>1ft</p>
                                                    </td>
                                                    <td>
                                                        <p>Skin</p>
                                                    </td>
                                                    <td>
                                                        <p>$200</p>
                                                    </td>
                                                    <td>
                                                        <p>$200</p>
                                                    </td>
                                                    <td>
                                                        <p>$400</p>
                                                    </td>
                                                    <td>
                                                        <p>#121F4R15</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="price pb-3 px-4">
                                        <div className="d-flex cost-name align-items-center justify-content-between">
                                            <h5 className="m-0">
                                                Total
                                            </h5>
                                            <div className="margin"></div>
                                            <h5 className="m-0">
                                                $420
                                            </h5>
                                        </div>
                                    </div>                      
                                </div>
                            </Dialog> */}

                            {/* <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                fullWidth={fullWidth}
                                maxWidth={maxWidth}
                                open={open}
                            >
                                    <div className="pending-payment">
                                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                        <div className="text-center">
                                            <h4>Pending Payment</h4>
                                        </div>
                                </BootstrapDialogTitle>
                                    </div>
                               <div className="timeline">
                               <Timeline >
                                    <TimelineItem>
                                        <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                                        <Typography variant="h4" component="span" sx={{color:'#B16846'}}>
                                        Aug 02, 2019
                                            </Typography>
                                            <Typography>03:55 pm</Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector sx={{ bgcolor: '#B16846' }} />
                                            <TimelineDot className='timeline-img-back'>
                                            <img src={Pending} alt="Pending" />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h4" component="span">
                                            Out for Delivery
                                            </Typography>
                                            <br />
                                            <Typography variant="h4" component="span">
                                            <span>Area</span> <Chip label="Professional Couriers" className='px-2' />
                                            </Typography>
                                            <Typography>Johdapur, India</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                    <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                                        <Typography variant="h4" component="span">
                                        Aug 02, 2019
                                            </Typography>
                                            <Typography>08:15 pm</Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot>
                                                <img src={Payment} alt="Payment" />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h4" component="span">
                                            Received at Jodhpur
                                            </Typography>
                                            <br />
                                            <Typography variant="h4" component="span">
                                            <span>Area</span> <Chip label="Professional Couriers" className='px-2' />
                                            </Typography>
                                            <Typography>Johdapur, India</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                    <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                                        <Typography variant="h4" component="span">
                                        Aug 01, 2019
                                            </Typography>
                                            <Typography>11:55 am</Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot>
                                                <img src={Dispatch} alt="Dispatch" />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h4" component="span">
                                            Dispatched to Jodhpur
                                            </Typography>
                                            <br />
                                            <Typography variant="h4" component="span">
                                            <span>Area</span> <Chip label="Professional Couriers" className='px-2' />
                                            </Typography>
                                            <Typography>Johdapur, India</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                    <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                                        <Typography variant="h4" component="span">
                                        Aug 01, 2019
                                            </Typography>
                                            <Typography>01:55 pm</Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot>
                                                <img src={Recived} alt="Recived" />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h4" component="span">
                                            Received at Jodhpur
                                            </Typography>
                                            <br />
                                            <Typography variant="h4" component="span">
                                            <span>Area</span> <Chip label="Professional Couriers" className='px-2' />
                                            </Typography>
                                            <Typography>Johdapur, India</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                               </div>
                            </BootstrapDialog> */}
                        </div>
                    </div>
                </div>
                <div className="tabel">
                    <div style={{ height: 400, width: '100%' }}>
                        {role === 'admin' ? (
                            <DataTable
                                columns={column_orders_listing}
                                data={searchData ? searchData : row}
                                defaultSortFieldId={1}
                                sortIcon={<ArrowDownwardIcon />}
                                // onSelectedRowsChange={(data) => selectedDataRow(data)}
                                pagination
                                selectableRows
                                responsive
                            />
                        ) : role === 'designer' ? (
                            <DataTable
                                columns={column_orders_listing_Designer}
                                data={searchData ? searchData : row}
                                defaultSortFieldId={1}
                                sortIcon={<ArrowDownwardIcon />}
                                // onSelectedRowsChange={(data) => selectedDataRow(data)}
                                pagination
                                selectableRows
                                responsive
                            />
                        ) : role === 'manufacturer' ? (
                            <DataTable
                                columns={column_orders_listing_manufacture}
                                data={searchData ? searchData : row}
                                defaultSortFieldId={1}
                                sortIcon={<ArrowDownwardIcon />}
                                // onSelectedRowsChange={(data) => selectedDataRow(data)}
                                pagination
                                selectableRows
                                responsive
                            />
                        ) : role === 'logistic' ? (
                            <DataTable
                                columns={column_orders_listing_logistic}
                                data={searchData ? searchData : row}
                                defaultSortFieldId={1}
                                sortIcon={<ArrowDownwardIcon />}
                                // onSelectedRowsChange={(data) => selectedDataRow(data)}
                                pagination
                                selectableRows
                                responsive
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderListing;
