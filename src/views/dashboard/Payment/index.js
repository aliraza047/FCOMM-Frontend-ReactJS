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
import { console_log, getOrderStatusText } from 'utils/helper';
import { getAllUsers } from 'redux/action/User';
import {
    column_orders_listing,
    column_orders_listing_Designer,
    column_orders_listing_manufacture,
    column_orders_listing_logistic,
    column_payment_designer
} from 'views/utilities/extra';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DataTable from 'react-data-table-component';
import { getAllOrders, getSingleOrders, getSingleOrderTracking } from 'redux/action/Order';
import { getColorForOrderStatus } from '../../../utils/helper';
import makeToast from 'utils/Toaster';
import PaymentFormPopup from './_part/PaymentFormPopup';
import PaymenyDetailPopup from './_part/PaymentDetailPopup';
import { clearPaymentListing, getAllPayment } from 'redux/action/Payment';
import { isArrayCheck } from 'views/utilities/common';
// import OrderAssignPopup from './_part/OrderAssignPopup';
// import OrderTrackingPopup from './_part/OrderTrackingPopup';
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
    const [paymentDetailPopupState, setPaymentDetailPopupState] = useState(false);
    const [paymentFormPopupState, setPaymentFormPopupState] = useState(false);
    const [DesignerOrderDetailPopupState, setDesignerOrderDetailPopupState] = useState(false);
    const [orderAssignPopupState, setOrderAssignPopupState] = useState(false);
    const [orderTrackingPopupState, setOrderTrackingPopupState] = useState(false);

    const [details, setdetails] = useState('');
    const [searchInput, setsearchInput] = useState('');

    const { role } = useSelector((state) => state._auth);
    const dispatch = useDispatch();
    const [row, setrow] = useState([]);
    const { all_payments } = useSelector((state) => state._payment);
    console.log('all_payments', all_payments);

    useEffect(() => {
        console.log('tyu');
        const url = window.location.href.split('-');
        const data = { role: url[1], status: 'approved', approvalRequest: true };
        dispatch(getAllPayment(data));
        return () => {
            dispatch(clearPaymentListing());
        };
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_payments) {
            makeRow();
        }
    }, [all_payments]);

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
            Array.isArray(all_payments) && all_payments.length > 0
                ? all_payments.map((data, id) => ({
                      _id: data._id,
                      id: id + 1,
                      name: data?.RequestBy?.fullname,
                      country: data?.RequestBy?.country,
                      contact: data?.RequestBy?.phone_number,
                      email: data?.RequestBy?.email,
                      creditAmount: data?.transferAmount,
                      paidAmount: 12,
                      totalAmount: 24,
                      action: (
                          <div>
                              {role === 'admin' ? (
                                  <>
                                      <button
                                          className="detail-btn mx-2"
                                          onClick={() => {
                                              setPaymentDetailPopupState(true);
                                              setdetails(data);
                                          }}
                                      >
                                          Details
                                      </button>
                                      <button
                                          className="detail-btn mx-2"
                                          onClick={() => {
                                              setPaymentFormPopupState(true);
                                              setdetails(data);
                                          }}
                                      >
                                          Payment
                                      </button>
                                  </>
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

    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="row align-item-center">
                        <div className="col-lg-8 col-md-6">
                            <div className="heading">
                                <h2>Payments</h2>
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
                    </div>
                </div>
                <div className="complete-delivery">
                    <div className="row align-item-center">
                        <div className="col-lg-5 col-md-6"></div>
                        <div>
                            <PaymentFormPopup setVisible={setPaymentFormPopupState} open={paymentFormPopupState} />
                            <PaymenyDetailPopup setVisible={setPaymentDetailPopupState} open={paymentDetailPopupState} />
                            {/* <DesignerOrderDetailPopup
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
                            /> */}
                        </div>
                    </div>
                </div>
                <div className="tabel">
                    <div style={{ height: 400, width: '100%' }}>
                        {role === 'admin' ? (
                            <DataTable
                                columns={column_payment_designer}
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
