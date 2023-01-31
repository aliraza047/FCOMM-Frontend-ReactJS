import { useEffect, useState } from 'react';

// material-ui
import AddIcon from '@mui/icons-material/Add';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import CircularColor from 'react-circular-color';
import { console_log, Log } from 'utils/helper';
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
import { column_variation_listing } from 'views/utilities/extra';
import CloseIcon from '@mui/icons-material/Close';
import SizeSelector from '../Selector/sizeSelector';
import { addVariant, uploadImageVariant } from 'redux/action/Product';
import { isArrayCheck } from 'views/utilities/common';
const AddProductVariation = ({ handleClose }) => {
    const [size, setsize] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setcolor] = useState('');
    const [stoke, setstoke] = useState('');
    const [price, setprice] = useState('');
    const [Toatlprice, setTotalprice] = useState('');
    const [Costprice, setCostprice] = useState('');
    const [sku, setsku] = useState('');

    const productData = useSelector((state) => state._product);
    console.log('add Product Variant =>', productData);

    useEffect(() => {
        setLoading(false);
        // dispatch(getAllUsers());
    }, []);
    const [url, seturl] = React.useState('');
    const [url2, seturl2] = React.useState('');
    const imageUploadVar = (e) => {
        console.log('slider', e);
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            const formData = new FormData();
            formData.append('variantImage', file);
            dispatch(uploadImageVariant(formData, productData.variant_image));
            seturl2(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const addVariantFunc = () => {
        if (sku && size && color && stoke && price) {
            const obj = {
                sku: sku,
                size: size,
                color: color,
                stock: stoke,
                price: price,
                varaintImage: productData.variant_image
            };
            dispatch(addVariant(obj, handleClose, productData.all_variant));
        } else {
            makeToast('error', 'Kindly fill all the inputs');
        }
    };
    return (
        <>
            <div className="variation-list-orders addProductModal">
                <div className="row">
                    <div className="col-12">
                        <div className="col-md-6">
                            <div className="input-field search-fields multiselect">
                                <p className="label">Size</p>
                                <input
                                    type="text"
                                    onChange={(e) => setsize(e.target.value)}
                                    className="form-control "
                                    name="size"
                                    value={size}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="col-lg-6 col-md-6">
                            <div className="col-md-12">
                                <p className="label" htmlFor="user-name">
                                    Color
                                </p>
                                <div className="d-flex flex-row flex-wrap align-items-center">
                                    <CircularColor size={50} onChange={(e) => setcolor(e)} />
                                    {color ? (
                                        <div
                                            style={{
                                                height: 45,
                                                width: 45,
                                                borderRadius: 100,
                                                backgroundColor: color,
                                                borderWidth: 1,
                                                borderColor: '#a4a4a4',
                                                marginLeft: 10
                                            }}
                                        ></div>
                                    ) : null}
                                    <div className="btn btn-primary brownBtn ms-3">Add</div>
                                </div>
                            </div>
                            {/* <div className="input-field">
                                <p className="label" htmlFor="color">
                                    Color
                                </p>
                                <input
                                    type="color"
                                    onChange={(e) => setcolor(e.target.value)}
                                    style={{ height: '35px' }}
                                    className="form-control "
                                    name="stoker"
                                />
                            </div> */}
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="col-lg-6 col-md-6">
                            <div className="input-field">
                                <p className="label" htmlFor="stoker">
                                    Stock
                                </p>
                                <input type="text" onChange={(e) => setstoke(e.target.value)} className="form-control " name="stoker" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="col-lg-6 col-md-6">
                            <div className="input-field">
                                <p className="label" htmlFor="price">
                                    Price
                                </p>
                                <input type="number" onChange={(e) => setprice(e.target.value)} className="form-control" name="price" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="col-lg-6 col-md-6">
                            <div className="input-field">
                                <p className="label" htmlFor="cost-price">
                                    Cost Price
                                </p>
                                <input type="number" onChange={(e) => setCostprice(e.target.value)} className="form-control" name="price" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="col-lg-6 col-md-6">
                            <div className="input-field">
                                <p className="label" htmlFor="total-price">
                                    Total Price
                                </p>
                                <input
                                    type="number"
                                    onChange={(e) => setTotalprice(e.target.value)}
                                    className="form-control"
                                    name="price"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="col-lg-6 col-md-6">
                            <div className="input-field">
                                <p className="label" htmlFor="sku">
                                    SkU
                                </p>
                                <input type="text" onChange={(e) => setsku(e.target.value)} className="form-control" name="sku" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="upload-heading">
                            <p className="label">Image Upload</p>
                        </div>
                        <div className="d-flex flex-row flex-wrap">
                            <div className="d-flex flex-row flex-wrap m-1">
                                {isArrayCheck(productData?.variant_image) &&
                                    productData?.variant_image?.map((data, id) => (
                                        <img
                                            src={base_url_new + data?.url}
                                            alt=""
                                            style={{
                                                height: 150,
                                                width: 150,
                                                objectFit: 'cover',
                                                borderRadius: '10px',
                                                marginRight: '10px',
                                                marginTop: '10px'

                                            }}
                                        />
                                    ))}
                            </div>
                            <div className="">
                                <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                    <div className="plus-icon">
                                        <AddIcon />
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            id="file-input"
                                            name="image"
                                            accept="image/x-png,image/gif,image/jpeg"
                                            onChange={(e) => imageUploadVar(e)}
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center my-5">
                            <div className="btn btn-primary brownBtn" onClick={addVariantFunc}>
                                Add Variant
                            </div>
                            <div className="btn btn-primary brownBtn" onClick={handleClose}>
                                Close
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProductVariation;
