import React, { useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { column_payment_designer } from 'views/utilities/extra';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DataTable from 'react-data-table-component';
import makeToast from 'utils/Toaster';
import PaymentFormPopup from './_part/PaymentFormPopup';
import PaymenyDetailPopup from './_part/PaymentDetailPopup';
import { clearPaymentListing, getAllPayment } from 'redux/action/Payment';
import { isArrayCheck } from 'views/utilities/common';

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
const PaymentManufacture = () => {
    const [searchData, setsearchData] = useState('');
    const [paymentDetailPopupState, setPaymentDetailPopupState] = useState(false);
    const [paymentFormPopupState, setPaymentFormPopupState] = useState(false);

    const [details, setdetails] = useState('');
    const [searchInput, setsearchInput] = useState('');

    const { role } = useSelector((state) => state._auth);
    const dispatch = useDispatch();
    const [row, setrow] = useState([]);
    const { all_payments } = useSelector((state) => state._payment);
    console.log('all_payments manufacture', all_payments);

    useEffect(() => {
        dispatch(getAllPayment({ role: 'manufacturer', status: 'approved' }));
        return () => {
            dispatch(clearPaymentListing());
        };
    }, []);

    useEffect(() => {
        if(all_payments){
            makeRow();
        }else {
            dispatch(getAllPayment({ role: 'manufacturer', status: 'approved' }));
        }
    }, [all_payments]);

    const makeRow = () => {
        var data =
            Array.isArray(all_payments) && all_payments.length > 0
                ? all_payments.map((data, id) => ({
                      _id: data._id,
                      id: id + 1,
                      name: isArrayCheck(data?.RequestBy) ? data?.RequestBy[0]?.fullname : '',
                      country: isArrayCheck(data?.RequestBy) ? data?.RequestBy[0]?.country : '',
                      contact: isArrayCheck(data?.RequestBy) ? data?.RequestBy[0]?.phone_number : '',
                      email: isArrayCheck(data?.RequestBy) ? data?.RequestBy[0]?.email : '',
                      creditAmount: `$${data?.creditAmount - data?.transferAmount}`,
                      paidAmount: `$${data?.debitAmount + data?.transferAmount}`,
                      totalAmount: `$${data?.creditAmount + data?.debitAmount}`,
                      // creditAmount: (data?.creditAmount - data?.debitAmount - data?.transferAmount) - data?.transferAmount,
                      // paidAmount: data?.transferAmount,
                      // totalAmount: (data?.creditAmount - data?.debitAmount - data?.transferAmount),
                      action: (
                          <div>
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
                                  {/* <button
                                    className="detail-btn mx-2"
                                    onClick={() => {
                                        setPaymentFormPopupState(true);
                                        setdetails(data);
                                    }}
                                >
                                    Payment
                                </button> */}
                              </>
                          </div>
                      )
                  }))
                : [];
        setrow(data);
    };

    const handleSearch = (event) => {
        const data = row.filter(
            (x, id) =>
                String(x?.name).includes(event.target.value) ||
                String(x?.email).includes(event.target.value) ||
                String(x._id).includes(event.target.value)
        );
        console.log('Seacrhed Dta', data);
        if (data) {
            setsearchData(data);
        } else {
            setsearchData('');
        }
    };

    console.log('get all payments Manufacturer', all_payments);

    return (
        <>
            <div className="list-orders">
                <div className="order-tracking">
                    <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Payments</h2>
                        {/* <div className="btn btn-primary brownBtn" onClick={() => navigate('/dashboard/blog-post')}>
                            + Blog Post
                        </div> */}
                        <div
                            className="btn btn-primary brownBtn"
                            onClick={() => {
                                setdetails('manufacturer');
                                setPaymentFormPopupState(true);
                            }}
                        >
                            + Add
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
                            {paymentFormPopupState && (
                                <PaymentFormPopup setVisible={setPaymentFormPopupState} open={paymentFormPopupState} data={details} />
                            )}
                            {paymentDetailPopupState && (
                                <PaymenyDetailPopup setVisible={setPaymentDetailPopupState} open={paymentDetailPopupState} data={details} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="tabel">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataTable
                            columns={column_payment_designer}
                            data={searchData ? searchData : row}
                            defaultSortFieldId={1}
                            sortIcon={<ArrowDownwardIcon />}
                            // onSelectedRowsChange={(data) => selectedDataRow(data)}
                            pagination
                            // selectableRows
                            responsive
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentManufacture;
