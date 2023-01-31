import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { addBlog } from 'redux/action/Blog';
import { useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import makeToast from 'utils/Toaster';
import { useLocation } from 'react-router-dom';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
//
// import ReactSummernote from 'react-summernote';
// import 'react-summernote/dist/react-summernote.css'; // import styles
// import 'react-summernote/lang/summernote-ru-RU';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { addMethodArray, makeid, removeMethodArray2 } from 'utils/helper';
import { isArrayCheck } from 'views/utilities/common';
import { addRewards, editRewards } from 'redux/action/RewardsAndPromotions';
import { useEffect } from 'react';
import { getAllProducts } from 'redux/action/Product';
import { Checkbox } from '@mui/material';
const usePlaceholderStyles = styled((theme) => ({
    placeholder: {
        color: '#9f9e9e'
    }
}));

const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
};
const editorConfiguration = {
    fontSize: {
        optoins: [9, 11]
    }
};
const EditReward = () => {
    const { state } = useLocation();
    console.log('state reward', state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { all_products } = useSelector((state) => state._product);

    const [code, setcode] = React.useState(state?.code);
    const [discountValue, setdiscountValue] = React.useState(state?.discountValue);
    const [discountType, setdiscountType] = React.useState(state?.discountType);
    const [description, setdescription] = React.useState(state?.description);
    const [minSpending, setminSpending] = React.useState(state?.minSpending);
    const [maxSpending, setmaxSpending] = React.useState(state?.maxSpending);
    const [usageTotalLimit, setusageTotalLimit] = React.useState(state?.usageTotalLimit);
    const [usageTotalLimitProduct, setusageTotalLimitProduct] = React.useState(state?.usageTotalLimitForProducts);
    const [usageTotalLimitUser, setusageTotalLimitUser] = React.useState(state?.usageTotalLimitForUsers);
    const [emails, setEmails] = useState(state?.emails);
    const [allUser, setAllUser] = useState(state?.allUser);

    // const [excludedProducts, setexcludedProducts] = useState('');
    // const [product, setproduct] = useState('');
    const handleChangeChecked = (event) => {
        setAllUser(event.target.checked);
        if (event.target.checked) {
            setEmails('');
        }
    };

    const editAction = () => {
        if (code && discountType && discountValue && minSpending && maxSpending && usageTotalLimit) {
            dispatch(
                editRewards(
                    {
                        id: state?._id,
                        code,
                        discountType,
                        discountValue,
                        description,
                        minSpending,
                        maxSpending,
                        usageTotalLimit,
                        usageTotalLimitForProducts: usageTotalLimitProduct,
                        usageTotalLimitForUsers: usageTotalLimitUser,
                        allUser,
                        emails
                        // excludedProducts: excludedProducts
                    },
                    navigate
                )
            );
        } else {
            makeToast('error', 'Kindly fill all the inputs');
        }
    };

    // useEffect(() => {
    //     if (isArrayCheck(state?.excludedProducts)) {
    //         const excludedId = state?.excludedProducts.map((data) => data?._id)
    //         setexcludedProducts(excludedId)
    //     }
    // }, [])

    // useEffect(() => {
    //     dispatch(getAllProducts());
    // }, [])

    // console.log('Add Product', product);

    return (
        <>
            <div className="add-thread addBlog">
                <h2>Edit Reward</h2>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Code
                                </Typography>
                                <div className="d-flex gap-2">
                                    <TextField
                                        className="w-100 input"
                                        placeholder="Generate Code..."
                                        onChange={(e) => setcode(e.target.value)}
                                        value={code}
                                    />

                                    <div
                                        className="btn btn-primary generateBtn"
                                        onClick={() => {
                                            const dat = makeid(6);
                                            setcode(dat);
                                        }}
                                    >
                                        Generate Code
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="search-fields input-field">
                                    <label className="label" htmlFor="first-name">
                                        Discount Type
                                    </label>
                                    <div>
                                        <Select
                                            value={discountType}
                                            displayEmpty
                                            onChange={(event) => setdiscountType(event.target.value)}
                                            renderValue={discountType !== '' ? undefined : () => <Placeholder>Discount</Placeholder>}
                                        >
                                            <MenuItem value="fixed">Fixed</MenuItem>
                                            <MenuItem value="percentage">Percentage</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Discount Value
                                </Typography>
                                <TextField
                                    className="w-100 input"
                                    placeholder="Discount Value..."
                                    onChange={(e) => setdiscountValue(e.target.value)}
                                    type="number"
                                    value={discountValue}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Min Spending
                                </Typography>
                                <TextField
                                    className="w-100 input"
                                    placeholder="Min Spending..."
                                    onChange={(e) => setminSpending(e.target.value)}
                                    type="number"
                                    value={minSpending}
                                />
                            </div>
                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Max Spending
                                </Typography>
                                <TextField
                                    className="w-100 input"
                                    placeholder="Max Spending..."
                                    onChange={(e) => setmaxSpending(e.target.value)}
                                    type="number"
                                    value={maxSpending}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Usage Total Limit
                                </Typography>
                                <TextField
                                    className="w-100 input"
                                    placeholder="Usage Total Limit..."
                                    onChange={(e) => setusageTotalLimit(e.target.value)}
                                    type="number"
                                    value={usageTotalLimit}
                                />
                            </div>
                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Usage Total Limit Product (Optional)
                                </Typography>
                                <TextField
                                    className="w-100 input"
                                    placeholder="Usage Total Limit Product..."
                                    onChange={(e) => setusageTotalLimitProduct(e.target.value)}
                                    type="number"
                                    value={usageTotalLimitProduct}
                                />
                            </div>
                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Usage Total Limit Users (Optional)
                                </Typography>
                                <TextField
                                    className="w-100 input"
                                    placeholder="Usage Total Limit Users..."
                                    onChange={(e) => setusageTotalLimitUser(e.target.value)}
                                    value={usageTotalLimitUser}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Description
                                </Typography>
                                <TextareaAutosize
                                    className="w-100 form-control"
                                    aria-label="minimum height"
                                    minRows={4}
                                    placeholder="Write description..."
                                    onChange={(e) => setdescription(e.target.value)}
                                    value={description}
                                />
                            </div>
                            {/* <div className="col-md-6">
                                <div className="search-fields input-field">
                                    <label className="label" htmlFor="first-name">
                                        Excluded Products
                                    </label>
                                    <div>
                                        <select
                                            id="cars"
                                            onChange={(e) => {
                                                // if (Array.isArray(product) && product.find((dat) => dat?._id !== e.target.value)) {
                                                setexcludedProducts(addMethodArray(excludedProducts, e.target.value));
                                                setproduct(e.target.value);
                                                // }
                                            }}
                                            value={product}
                                        >
                                            <option value={''}>{'Select Products'}</option>
                                            {isArrayCheck(all_products) &&
                                                all_products?.map((data, id) => <option value={data?._id}>{data?.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-md-12">
                                <Typography className="label mt-4" variant="p" component="p">
                                    All User
                                </Typography>
                                <Checkbox checked={allUser} onChange={handleChangeChecked} inputProps={{ 'aria-label': 'controlled' }} />
                            </div>

                            <div className="col-md-6">
                                <Typography className="label mt-4" variant="p" component="p">
                                    Emails
                                </Typography>
                                <textarea
                                    disabled={allUser}
                                    name=""
                                    id=""
                                    placeholder="Emails"
                                    cols="5"
                                    rows="4"
                                    className="form-control bg-white text-black"
                                    value={emails}
                                    onChange={(e) => {
                                        setEmails(e.target.value);
                                    }}
                                ></textarea>
                            </div>

                            {/* <div className="col-md-6 d-flex flex-wrap">
                                {isArrayCheck(excludedProducts) &&
                                    excludedProducts?.map((data, id) => (
                                        <div className="allProducts">
                                            <div className="tag">
                                                <div
                                                    className="d-flex justify-content-between align-item-center"
                                                    onClick={() => {
                                                        setexcludedProducts(removeMethodArray2(excludedProducts, { _id: data }));
                                                    }}
                                                >
                                                    <p>{isArrayCheck(all_products) && all_products.find((dat) => dat._id === data)?.name}</p>
                                                    <CloseIcon />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary brownBtn px-5 mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </div>
                    <div className="btn btn-primary brownBtn px-5" onClick={editAction}>
                        Edit Reward
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditReward;
