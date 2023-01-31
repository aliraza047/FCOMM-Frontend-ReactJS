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
import { column_variation_listing } from 'views/utilities/extra';
import CloseIcon from '@mui/icons-material/Close';
import SizeSelector from '../Selector/sizeSelector';
import { addVariant, uploadImage, editVariant, uploadImageVariant } from 'redux/action/Product';
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
const ModalUpdateVariation = ({ handleClose, data }) => {
    console.log({ data });
    const [size, setsize] = useState([data?.size]);
    const [isLoading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setcolor] = useState(data?.color);
    const [stoke, setstoke] = useState(data?.stock);
    const [price, setprice] = useState(data?.price);
    const [sku, setsku] = useState(data?.sku);

    const productData = useSelector((state) => state._product);
    console.log('add Product =>', productData);

    useEffect(() => {
        setLoading(false);
        // dispatch(getAllUsers());
    }, []);
    const [url, seturl] = React.useState('');
    const [url2, seturl2] = React.useState(base_url_new + data?.varaintImage[0]?.url);
    const imageUpload = (e, type) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            if (type === 1) {
                seturl(e.target.result);
                // setValues({ ...values, profile: file });
            } else {
                seturl2(e.target.result);
                // setValues({ ...values, certificate: file });
            }
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('variantImage', file);
        dispatch(uploadImageVariant(formData, productData.variant_image));
    };

    const updateVariant = () => {
        const obj = {
            id: data._id,
            sku: sku,
            size: size[0],
            color: color,
            stock: stoke,
            price: price
            // varaintImage: productData.variant_image
        };
        console.log({ obj });
        dispatch(editVariant(obj, navigate, handleClose));
    };
    return (
        <>
            <div className="variation-list-orders addProductModal">
                <div className="heading d-flex justify-content-between align-item-center">
                    <h2>Variation</h2>
                    <CloseIcon onClick={handleClose} />
                </div>
                <div className="row my-4">
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
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <p className="label" htmlFor="user-name">
                                Color
                            </p>
                            <input
                                type="color"
                                onChange={(e) => setcolor(e.target.value)}
                                style={{ height: '35px' }}
                                className="form-control "
                                name="stoker"
                                value={color}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <p className="label" htmlFor="user-name">
                                Stock
                            </p>
                            <input
                                type="text"
                                onChange={(e) => setstoke(e.target.value)}
                                className="form-control "
                                value={stoke}
                                name="stoker"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <p className="label" htmlFor="first-name">
                                Price
                            </p>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setprice(e.target.value)}
                                className="form-control"
                                name="price"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <p className="label" htmlFor="phone-number">
                                SkU
                            </p>
                            <input type="number" value={sku} onChange={(e) => setsku(e.target.value)} className="form-control" name="sku" />
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="upload-heading">
                            <p className="label">Image Upload</p>
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

                        <div className="d-flex justify-content-center my-5">
                            <div className="btn btn-primary brownBtn mx-1" onClick={updateVariant}>
                                Remove
                            </div>
                            <div className="btn btn-primary brownBtn">Update</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalUpdateVariation;
