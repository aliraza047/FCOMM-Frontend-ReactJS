// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import DataTable from 'react-data-table-component';
// import FormControl from '@mui/material/FormControl';
// import Button from '@mui/material/Button';
// import InputBase from '@mui/material/InputBase';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import { useNavigate } from 'react-router';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import { alpha, styled } from '@mui/material/styles';
// import { column_user_orders_listing } from 'views/utilities/extra';
// import OrderListing from '../OrderListing';
// import { useSelector } from 'react-redux';
// function index() {
//     const BootstrapInput = styled(InputBase)(({ theme }) => ({
//         'label + &': {
//             marginTop: theme.spacing(3)
//         },
//         '& .MuiInputBase-input': {
//             borderRadius: 4,
//             position: 'relative',
//             backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
//             border: '1px solid #ced4da',
//             fontSize: 16,
//             width: 'auto',
//             padding: '10px 12px',
//             transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
//             // Use the system font instead of the default Roboto font.
//             fontFamily: [
//                 '-apple-system',
//                 'BlinkMacSystemFont',
//                 '"Segoe UI"',
//                 'Roboto',
//                 '"Helvetica Neue"',
//                 'Arial',
//                 'sans-serif',
//                 '"Apple Color Emoji"',
//                 '"Segoe UI Emoji"',
//                 '"Segoe UI Symbol"'
//             ].join(','),
//             '&:focus': {
//                 boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
//                 borderColor: theme.palette.primary.main
//             }
//         }
//     }));
//     const [age, setAge] = useState('');
//     const [isLoading, setLoading] = useState(true);

//     const [searchData, setsearchData] = useState('');
//     const navigate = useNavigate();
//     const [OrderDetailPopupState, setOrderDetailPopupState] = useState(false);
//     const [details, setdetails] = useState('');

//     const dispatch = useDispatch();
//     const [row, setrow] = useState([]);
//     const { all_orders } = useSelector((state) => state._order);
//     useEffect(() => {
//         setLoading(false);
//         dispatch(getAllOrders());
//     }, []);

//     useEffect(() => {
//         setLoading(false);
//         if (all_orders) {
//             makeRow();
//         } else {
//             dispatch(getAllOrders());
//         }
//     }, [all_orders]);
//     //  id: 0, designer: 'Salman', price: 100, buyer: 'Jhon', buyerAddress: 'Lahore', status: 'pending'

//     const handleChange = (event) => {
//         setAge(event.target.value);
//     };
//     const makeRow = () => {
//         var data =
//             Array.isArray(all_orders) && all_orders.length > 0
//                 ? all_orders.map((data, id) => ({
//                       _id: data._id,
//                       id: id,
//                       designer: data?.designer?.fullname,
//                       price: data?.totalAmount,
//                       buyer: data?.createdBy?.fullname,
//                       buyerAddress: data?.createdBy?.address,
//                       status: (
//                           <div
//                               style={{
//                                   fontWeight: 'bold',
//                                   textTransform: 'capitalize',
//                                   color: getColorForOrderStatus(data?.delivery?.status)
//                               }}
//                           >
//                               {data?.delivery?.status}
//                           </div>
//                       ),
//                       action: (
//                           <button
//                               className="detail-btn mx-2"
//                               onClick={() => {
//                                   setOrderDetailPopupState(true);
//                                   setdetails(data);
//                               }}
//                           >
//                               Details
//                           </button>
//                       )
//                   }))
//                 : [];
//         setrow(data);
//     };

//     return (
//         <div>
//             <div className="list-orders">
//                 <div className="order-tracking">
//                     <div className="heading d-flex justify-content-between align-item-center">
//                         <h2>Orders</h2>
//                     </div>
//                     <div className="search-id">
//                         <div className="row">
//                             <div className="col-lg-10 col-md-9">
//                                 <div className="row">
//                                     <div className="col-lg-3 col-md-4">
//                                         <div className="search-fields">
//                                             <FormControl variant="standard" className="Search">
//                                                 <BootstrapInput placeholder="Search" id="bootstrap-input" />
//                                             </FormControl>
//                                         </div>
//                                     </div>
//                                     <div className="col-lg-2 col-md-3">
//                                         <div className="search-fields">
//                                             <div className="btn btn-primary brownBtn">Search</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-2 col-md-3">
//                                 <div className="search-fields">
//                                     <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
//                                         <MenuItem value="">
//                                             <em>Status</em>
//                                         </MenuItem>
//                                         <MenuItem value={10}>Ten</MenuItem>
//                                         <MenuItem value={20}>Twenty</MenuItem>
//                                         <MenuItem value={30}>Thirty</MenuItem>
//                                     </Select>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="d-flex selected mt-0">
//                         <p className="mb-0">Selected : 0</p>
//                     </div>
//                 </div>
//                 <div className="tabel">
//                     <div style={{ height: 400, width: '100%' }}>
//                         <DataTable
//                             columns={column_user_orders_listing}
//                             // data={searchData ? searchData : row}
//                             data={[
//                                 {
//                                     id: '123',
//                                     action: (
//                                         <button onClick={() => navigate('/dashboard/orders-details')} className="detail-btn mx-2">
//                                             Details
//                                         </button>
//                                     )
//                                 }
//                             ]}
//                             defaultSortFieldId={1}
//                             sortIcon={<ArrowDownwardIcon />}
//                             // onSelectedRowsChange={(data) => selectedDataRow(data)}
//                             pagination
//                             selectableRows
//                             responsive
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default index;
