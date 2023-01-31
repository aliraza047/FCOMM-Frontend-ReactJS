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
import { console_log, getAvgRating, getLatestDate } from 'utils/helper';
import { getAllUsers } from 'redux/action/User';
import { column_buyer_review_listing } from 'views/utilities/extra';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DataTable from 'react-data-table-component';
import { getAllOrders } from 'redux/action/Order';
import { getColorForOrderStatus } from '../../../utils/helper';
import makeToast from 'utils/Toaster';
import BuyerFeedbackPopup from './_part/BuyerFeedbackPopup';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { getAllProducts, getProductsWithReviews, getReviewsByProductId } from 'redux/action/Product';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
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
const index = () => {
    const [isLoading, setLoading] = useState(true);
    const [searchData, setsearchData] = useState('');
    const [BuyerFeedbackPopupState, setBuyerFeedbackPopupState] = useState(false);
    const [details, setdetails] = useState('');
    const { role } = useSelector((state) => state._auth);
    const dispatch = useDispatch();
    const [row, setrow] = useState([]);
    const { all_products_with_reviews } = useSelector((state) => state._product);

    console.log('REVIEW PRODUCTS', all_products_with_reviews);
    useEffect(() => {
        setLoading(false);
        dispatch(getProductsWithReviews());
    }, []);

    useEffect(() => {
        setLoading(false);
        if (all_products_with_reviews) {
            makeRow();
        } else {
            dispatch(getProductsWithReviews());
        }
    }, [all_products_with_reviews]);
    //  id: 0, designer: 'Salman', price: 100, buyer: 'Jhon', buyerAddress: 'Lahore', status: 'pending'

    const makeRow = () => {
        var data =
            Array.isArray(all_products_with_reviews) && all_products_with_reviews.length > 0
                ? all_products_with_reviews.map((data, id) => ({
                      _id: data._id,
                      product: (
                          <div className="d-flex align-items-center">
                              <div className="product-img">
                                  <img
                                      src={
                                          isArrayCheck(data?.productImage)
                                              ? base_url_new + data?.productImage[0]?.url
                                              : 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
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
                              </div>
                          </div>
                      ),
                      rating: (
                          <div>
                              <Stack spacing={1}>
                                  <Rating name="size-small" value={getAvgRating(data?.product_rating)} size="small" />
                              </Stack>
                          </div>
                      ),
                      average: <p>{getAvgRating(data?.product_rating)} / 5</p>,
                      date: <p>{getLatestDate(data?.product_rating)}</p>,
                      action: (
                          <>
                              <button
                                  className="detail-btn"
                                  onClick={() => {
                                      setBuyerFeedbackPopupState(true);
                                      dispatch(getReviewsByProductId(data?._id));
                                  }}
                              >
                                  View Details
                              </button>
                          </>
                      )
                  }))
                : [];
        console.log('Row Data', all_products_with_reviews);
        setrow(data);
    };

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

    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
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

    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="row align-item-center">
                        <div className="col-lg-8 col-md-6">
                            <div className="heading">
                                <h2>Review / Buyer Feedback</h2>
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
                                        <FormControl variant="standard" className="Search">
                                            <BootstrapInput placeholder="Search" id="bootstrap-input" />
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
                        <div className="col-lg-2 col-md-3"></div>
                    </div>
                </div>
                <div className="complete-delivery">
                    <div className="row align-item-center">
                        <div className="col-lg-5 col-md-6">
                            <div className="row tracking-nmb align-items-center">
                                <div className="col-lg-3 col-md-4">
                                    <p>Selected: 0</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <BuyerFeedbackPopup setVisible={setBuyerFeedbackPopupState} open={BuyerFeedbackPopupState} />
                        </div>
                    </div>
                </div>
                <div className="tabel">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataTable
                            columns={column_buyer_review_listing}
                            data={row}
                            // data={[
                            //     {
                            //         action: (
                            //             <button
                            //                 className="detail-btn"
                            //                 onClick={() => {
                            //                     setBuyerFeedbackPopupState(true);
                            //                 }}
                            //             >
                            //                 View Details
                            //             </button>
                            //         )
                            //     }
                            // ]}
                            defaultSortFieldId={1}
                            sortIcon={<ArrowDownwardIcon />}
                            // onSelectedRowsChange={(data) => selectedDataRow(data)}
                            pagination
                            selectableRows
                            responsive
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default index;
