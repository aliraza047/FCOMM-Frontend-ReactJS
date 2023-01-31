import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { addBlog } from 'redux/action/Blog';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import makeToast from 'utils/Toaster';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MasterCard from '../../../assets/images/Mastercard.svg';
import Vissa from '../../../assets/images/Visa.svg';
import Paypal from '../../../assets/images/Paypal.svg';
function OrderDetails() {
    const [url2, seturl2] = React.useState('');
    const [name, setname] = React.useState('');
    const [imageFile, setimageFile] = React.useState('');
    const [description, setdescription] = React.useState('');
    const [content, setcontent] = React.useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const imageUpload = (e, type) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            if (type === 1) {
                seturl(e.target.result);
                setValues({ ...values, profile: file });
            } else {
                seturl2(e.target.result);
                setimageFile(file);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <div className="add-thread orderDetails">
                <h2>Order Detail</h2>
                <div className="row">
                    <div className="col-md-12">
                        <Typography className="label mt-4" variant="p" component="p">
                            Order ID
                        </Typography>
                        <p className="order-id">#21314DG3243F</p>
                    </div>
                </div>
                <div className="row">
                    <div className="order-status">
                        <div className="col-md-6">
                            <Typography className="label mt-4" variant="p" component="p">
                                Order Status
                            </Typography>
                            <FormControl className="w-100">
                                <Select
                                    className="w-100 select"
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <p>Product</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Designer</th>
                                <th scope="col">Manufacturer</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Cost Price</th>
                                <th scope="col">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img
                                        src={'https://i0.wp.com/alarusinteriors.com/wp-content/uploads/2020/04/IMG-0075.jpg'}
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
                                    <span>Wooden Table</span>
                                </td>
                                <td>
                                    <span>Mr. Jason Brown</span>
                                </td>
                                <td>
                                    <span>Mr. Jason Brown</span>
                                </td>
                                <td>
                                    <span>1</span>
                                </td>
                                <td>
                                    <span>$200</span>
                                </td>
                                <td>
                                    <span>$200</span>
                                </td>
                                <td>
                                    <span>$400</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive">
                    <p>Shipment</p>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Shipment</th>
                                <th scope="col">Shipment Fee</th>
                                <th scope="col">Track Number</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span>Wooden Table, Wooden Table 2</span>
                                </td>
                                <td>
                                    <span>$200</span>
                                </td>
                                <td>
                                    <span>#1312312312</span>
                                </td>
                                <td>
                                    <span>Street, Block, Building, City</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="total-price">
                    <p>Total Price</p>
                    <h5>$450</h5>
                </div>
                <div className="payment_method">
                    <h5>Payment</h5>
                    <Typography className="label mt-4" variant="p" component="p">
                        Payment Method
                    </Typography>
                    <div className="radio-btns">
                    <input id="mastercard" type="radio" name="snack" value="mastercard"/>
                    <label for="mastercard"><img src={MasterCard} alt=""/></label>
                    <input id="visa" type="radio" name="snack" value="visa"/>
                    <label for="visa"><img src={Vissa} alt=""/></label>
                    <input id="paypal" type="radio" name="snack" value="paypal"/>
                    <label for="paypal"><img src={Paypal} alt=""/></label>
                    </div>
                    <div className="manufecturer">
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            <strong>Card Name</strong>
                            <div className="margin"></div>
                            <p className="m-0">Bear Grills</p>
                        </div>
                    </div>
                    <div className="manufecturer">
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            <strong>Card Number</strong>
                            <div className="margin"></div>
                            <p className="m-0">*********0920</p>
                        </div>
                    </div>
                    <div className="manufecturer">
                        <div className="d-flex cost-name align-items-center justify-content-between">
                            <strong>Expiry Date</strong>
                            <div className="margin"></div>
                            <p className="m-0">02/02/2025</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Payment Amount
                                </Typography>
                                <input type="text" className="w-100 payment-input" placeholder="Write payment amount..." />
                            </div>
                        </div>
                        <div className="upload-heading">
                            <p className="label">Proof (Additional)</p>
                        </div>
                        <div className="upload-btn">
                            <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                <div className="plus-icon">
                                    <AddIcon />
                                </div>
                                {url2 ? (
                                    <img src={url2} alt="" style={{ height: 150, width: 150, objectFit: 'cover', borderRadius: '8px' }} />
                                ) : (
                                    <input
                                        type="file"
                                        id="file-input"
                                        name="image"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={(e) => imageUpload(e, 2)}
                                    />
                                )}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="btn btn-primary brownBtn my-3">Upload</div>
            </div>
        </div>
    );
}

export default OrderDetails;
