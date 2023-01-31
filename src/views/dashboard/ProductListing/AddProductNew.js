// project imports
import React from 'react';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addUser } from 'redux/action/User';
import { useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import AddIcon from '@mui/icons-material/Add';
import CrossIcon from '@mui/icons-material/Cancel';
import AddModalVariation from './_part/Modal/AddModalVariation';
import ManufacturerSelector from './_part/Selector/ManufacturerSelector';
import DesignerSelector from './_part/Selector/DesignerSelector';
import {
    addProduct,
    clearProductImage,
    clearVariant,
    clearVariantImage,
    deleteVariation,
    getAllProducts,
    removeImageProduct,
    removeVisualImageProduct,
    uploadImageProduct,
    uploadVisualImageProduct
} from 'redux/action/Product';
import { useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Image from '../../../assets/images/home/card1.png';
import CircularColor from 'react-circular-color';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getAllCategories } from 'redux/action/Category';
import { isArrayCheck } from 'views/utilities/common';
import HeaderVariant from './_part/Table/HeaderVariant';
import RowVariant from './_part/Table/RowVariant';
import { base_url_new } from 'utils/config';
import AddProductVariation from './_part/Modal/AddProductVariation';
import centerimg from '../../../assets/images/centerimg.png';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { removeMethodArray } from 'utils/helper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TooltipAddProduct from 'ui-component/TooltipAddProduct';

const AddProductNew = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [visible, setVisible] = useState(false);
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [productName, setproductName] = useState('');
    const [productStock, setproductStock] = useState('');
    const [productSize, setproductSize] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [productCost, setproductCost] = useState('');
    const [productSku, setproductSku] = useState('');
    const [imageCounter, setimageCounter] = useState(0);
    const [imageCounterVisual, setimageCounterVisual] = useState(0);
    const [categoryProduct, setcategoryProduct] = useState('');
    const [color, setcolor] = useState('');
    const [height, setheight] = useState('');
    const [length, setlength] = useState('');
    const [beadth, setbeadth] = useState('');
    const [weight, setweight] = useState('');

    // optional field
    const [typeEnv, setTypeEnv] = useState('');
    const [care, setCare] = useState('');
    const [faqs, setFaqs] = useState([]);
    const [video, setVideo] = useState(null);

    const [makerPrice, setmakerPrice] = useState('');
    const [description, setdescription] = useState('');
    const [notes, setnotes] = useState('');
    const [designer, setdesigner] = useState([]);
    const [productStatus, setproductStatus] = useState('');
    const [variantStatus, setvariantStatus] = useState(false);
    const [manufacturer, setmanufacturer] = useState([]);
    const [totalPrice, settotalPrice] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productData = useSelector((state) => state._product);
    const { all_variant } = useSelector((state) => state._product);

    const { all_categories } = useSelector((state) => state._category);
    console.log('Add Product Variant', productData);
    useEffect(() => {
        setLoading(false);
        dispatch(getAllCategories());
        return () => {
            dispatch(clearVariant());
            dispatch(clearVariantImage());
            dispatch(clearProductImage());
        };
    }, []);
    const [url, seturl] = React.useState('');
    const [url2, seturl2] = React.useState('');

    const imageUploadProduct = (e, type) => {
        console.log('imageUploadProduct');
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
        formData.append('productImage', file);
        if (imageCounter < 5) {
            dispatch(uploadImageProduct(formData, productData.product_image));
            setimageCounter(imageCounter + 1);
        } else {
            makeToast('error', 'You can only upload 5 photos!Thanks');
        }
    };

    const videoUploadProduct = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setVideo(file);
    };

    const imageVisualUploadProduct = (e, type) => {
        console.log('imageVisualUploadProduct');
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
        formData.append('productTransparentImage', file);
        if (imageCounterVisual < 5) {
            dispatch(uploadVisualImageProduct(formData, productData.visual_product_image));
            setimageCounterVisual(imageCounterVisual + 1);
        } else {
            makeToast('error', 'You can only upload 5 photos!Thanks');
        }
    };
    console.log('productData.product_image', productData.product_image);
    const addNewUser = () => {
        if (productName && categoryProduct && description && productPrice && height && weight && beadth && length) {
            const formData = new FormData();
            formData.append('name', productName);
            formData.append('category', categoryProduct);
            formData.append('notes', notes);
            formData.append('description', description);
            formData.append('productSize', productSize);
            formData.append('stock', productStock);
            formData.append('sku', productSku);
            // formData.append("manufacture", null);
            formData.append('totalPrice', productPrice);
            formData.append('hasVariant', false);
            formData.append('isFeatured', false);
            formData.append('productImage', JSON.stringify(productData.product_image));
            // formData.append("variant", null);
            formData.append('color', color);
            formData.append('height', height);
            formData.append('length', length);
            formData.append('weight', weight);
            formData.append('breadth', beadth);
            formData.append('typeEnv', typeEnv);
            formData.append('care', care);
            formData.append('faqs', JSON.stringify(faqs));
            formData.append('video', video);
            formData.append('productTransparentImage', JSON.stringify(productData.visual_product_image));

            dispatch(addProduct(formData, navigate, setVisiblePopup));
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
        // dispatch(getAllProducts('unapproved'));
        // navigate('/dashboard/products', { state: { value: 'unapproved' } });
    };

    const deleteStateVariant = (id) => {
        dispatch(deleteVariation(id, all_variant));
    };

    // console.log('Status Variant', variantStatus);

    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setVisiblePopup(false);
    // };

    const handleClosePopup = () => {
        setVisiblePopup(false);
    };

    const handleImageRemove = (arr, obj) => {
        dispatch(removeImageProduct(removeMethodArray(arr, obj)));
    };

    const handleAddFaq = () => {
        setFaqs((prev) => {
            const prevValue = [...prev];
            prevValue.push({
                name: '',
                description: ''
            });

            return prevValue;
        });
    };

    const handleRemoveFaq = (index) => {
        setFaqs((prev) => {
            const prevValue = [...prev];
            prevValue.splice(index, 1);

            return prevValue;
        });
    };

    const handleChangeFaq = (value, index, field) => {
        setFaqs((prev) => {
            const prevValue = [...prev];
            prevValue[index][field] = value;

            return prevValue;
        });
    };

    return (
        <>
            <div className="add-thread addProduct">
                <div className="d-flex justify-content-between mb-4 align-items-center pb-2" style={{ borderBottom: '1px solid #e2e2e2' }}>
                    <div className="d-flex flex-row align-items-center">
                        <h2 className="border-0 mb-0 pb-0">Add Product</h2>

                        <TooltipAddProduct text={''} />
                    </div>
                    {/* <button onClick={() => setVisiblePopup(true)}>Click</button> */}
                </div>
                <Dialog
                    open={visiblePopup}
                    onClose={handleClosePopup}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="product-modal"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div className="text-center">
                                <div className="centerimg">
                                    <img src={centerimg} alt="" />
                                    <p className="mb-0">Your product has been sent for the approval of admin. </p>
                                    <button className="brownBtn" onClick={() => navigate('/dashboard/products')}>
                                        Sure
                                    </button>
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label" htmlFor="user-name">
                                        Name <span className="text-danger">*</span>
                                    </p>
                                    <input
                                        type="text"
                                        className="form-control "
                                        value={productName}
                                        name="user-name"
                                        placeholder="Write product name..."
                                        onChange={(e) => setproductName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label" htmlFor="first-name">
                                        Category <span className="text-danger">*</span>
                                    </p>
                                    <select
                                        class="form-select"
                                        value={categoryProduct}
                                        onChange={(e) => setcategoryProduct(e.target.value)}
                                    >
                                        <option value={''}>{'Select Category'}</option>
                                        {isArrayCheck(all_categories) &&
                                            all_categories?.map((data, id) => <option value={data?._id}>{data?.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label" htmlFor="totalPrice-number">
                                        Description <span className="text-danger">*</span>
                                    </p>
                                    <textarea
                                        className="form-control"
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="5"
                                        placeholder="Write a product description..."
                                        onChange={(e) => setdescription(e.target.value)}
                                        value={description}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="upload-heading">
                                    <p className="label mb-0">
                                        Product Image <span className="text-danger">*</span>
                                    </p>
                                </div>

                                <div className="d-flex flex-row flex-wrap">
                                    <div className="d-flex flex-row flex-wrap">
                                        {isArrayCheck(productData?.product_image) &&
                                            productData?.product_image?.map((data) => (
                                                <div style={{ position: 'relative' }}>
                                                    <div
                                                        className="plus-icon"
                                                        onClick={() => handleImageRemove(productData?.product_image, data)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: 5,
                                                            right: 5,
                                                            cursor: 'pointer',
                                                            backgroundColor: '#fff',
                                                            borderRadius: '50%'
                                                        }}
                                                    >
                                                        <CrossIcon color="#fff" />
                                                    </div>
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
                                                </div>
                                            ))}
                                    </div>
                                    <div className="upload-btn">
                                        <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                            <div className="plus-icon">
                                                <AddIcon />
                                            </div>

                                            <div>
                                                <input
                                                    type="file"
                                                    id="file-input"
                                                    name="image"
                                                    onChange={(e) => imageUploadProduct(e, 1)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="upload-heading">
                                    <p className="label mb-0">Visual Product Image (For Visualization)</p>
                                </div>

                                <div className="d-flex flex-row flex-wrap">
                                    <div className="d-flex flex-row flex-wrap">
                                        {isArrayCheck(productData?.visual_product_image) &&
                                            productData?.visual_product_image?.map((data) => (
                                                <div style={{ position: 'relative' }}>
                                                    <div
                                                        className="plus-icon"
                                                        onClick={() =>
                                                            dispatch(
                                                                removeVisualImageProduct(
                                                                    removeMethodArray(productData?.visual_product_image, data)
                                                                )
                                                            )
                                                        }
                                                        style={{
                                                            position: 'absolute',
                                                            top: 5,
                                                            right: 5,
                                                            cursor: 'pointer',
                                                            backgroundColor: '#fff',
                                                            borderRadius: '50%'
                                                        }}
                                                    >
                                                        <CrossIcon color="#fff" />
                                                    </div>
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
                                                </div>
                                            ))}
                                    </div>
                                    <div className="upload-btn">
                                        <label htmlFor="contained-button-file" for="file-input2" aria-controls="">
                                            <div className="plus-icon">
                                                <AddIcon />
                                            </div>

                                            <div>
                                                <input
                                                    type="file"
                                                    id="file-input2"
                                                    name="image"
                                                    onChange={(e) => imageVisualUploadProduct(e, 2)}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="upload-heading">
                                    <p className="label mb-0">Product Video (Optional)</p>
                                </div>

                                <div className="d-flex flex-row flex-wrap">
                                    <div className="d-flex flex-row flex-wrap">
                                        {video && video !== '' && (
                                            <div style={{ position: 'relative' }}>
                                                <div
                                                    className="plus-icon"
                                                    onClick={() => setVideo(null)}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 5,
                                                        right: 5,
                                                        cursor: 'pointer',
                                                        backgroundColor: '#fff',
                                                        borderRadius: '50%'
                                                    }}
                                                >
                                                    <CrossIcon color="#fff" />
                                                </div>
                                                <div className="upload-video-success">
                                                    <div>
                                                        <CheckCircleIcon />
                                                        <p>Upload Success</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {(video === null || video === '') && (
                                        <div className="upload-btn">
                                            <label htmlFor="contained-button-file" for="video-input" aria-controls="">
                                                <div className="plus-icon">
                                                    <AddIcon />
                                                </div>

                                                <div>
                                                    <input
                                                        type="file"
                                                        accept="video/*"
                                                        id="video-input"
                                                        name="video"
                                                        onChange={(e) => videoUploadProduct(e)}
                                                    />
                                                </div>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr className="my-3" />
                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label">Manufacture Notes</p>
                                    <textarea
                                        className="form-control"
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="5"
                                        placeholder="Write a note for manufacturer..."
                                        onChange={(e) => setnotes(e.target.value)}
                                        value={notes}
                                    ></textarea>
                                </div>
                            </div>
                            <hr className="my-3" />
                        </div>
                    </div>
                    {!variantStatus ? (
                        <div className="col-12">
                            <div className="col-md-6">
                                <div className="row">
                                    {/* <div className="col-lg-12 col-md-12">
                                        <div className="input-field">
                                            <p className="label" htmlFor="user-name">
                                                Product Size
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control "
                                                value={productSize}
                                                name="user-name"
                                                placeholder="Write product size..."
                                                onChange={(e) => setproductSize(e.target.value)}
                                            />
                                        </div>
                                        </div> */}
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-field">
                                            <p className="label" htmlFor="user-name">
                                                Product Length (cm) <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control "
                                                name="user-name"
                                                placeholder="Product Length"
                                                value={length}
                                                onChange={(e) => setlength(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-field">
                                            <p className="label" htmlFor="user-name">
                                                Product Height (cm) <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control "
                                                name="user-name"
                                                placeholder="Product Height"
                                                value={height}
                                                onChange={(e) => setheight(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-field">
                                            <p className="label" htmlFor="user-name">
                                                Product Breadth (cm) <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control "
                                                name="user-name"
                                                placeholder="Product Breadth"
                                                value={beadth}
                                                onChange={(e) => setbeadth(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-field">
                                            <p className="label" htmlFor="user-name">
                                                Product Weight Approx (kg) <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control "
                                                name="user-name"
                                                placeholder="Product Weight"
                                                value={weight}
                                                onChange={(e) => setweight(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-field">
                                            <p className="label" htmlFor="user-name">
                                                Price{' '}
                                                <span style={{ color: 'gray' }}>
                                                    (Designer) <span className="text-danger">*</span>
                                                </span>
                                            </p>
                                            <input
                                                type="number"
                                                className="form-control "
                                                value={productPrice}
                                                name="user-name"
                                                placeholder="Write product price..."
                                                onChange={(e) => setproductPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-field">
                                            <p className="label" htmlFor="user-name">
                                                Color <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="color"
                                                className="form-control "
                                                name="user-name"
                                                value={color}
                                                onChange={(e) => setcolor(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-field">
                                            <p className="label" htmlFor="user-name">
                                                Stock <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="number"
                                                className="form-control "
                                                value={productStock}
                                                name="user-name"
                                                placeholder="Write product Stock..."
                                                onChange={(e) => setproductStock(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="input-field">
                                            <p className="label" htmlFor="user-name">
                                                SKU <span className="text-danger">*</span>
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control "
                                                value={productSku}
                                                name="user-name"
                                                placeholder="Write product SKU..."
                                                onChange={(e) => setproductSku(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <div className="col-12">
                        <div className="col-6">
                            <div className="row">
                                <div className="d-flex flex-wrap">
                                    <div className="">
                                        <p className="label">Status</p>
                                        <FormControl className="radioMain">
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                                row={true}
                                                onChange={(e) => setproductStatus(e.target.value)}
                                            >
                                                <FormControlLabel value={true} control={<Radio />} label="Active" />
                                                <FormControlLabel value={false} control={<Radio />} label="Not Active" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    {/* <div className="ms-sm-5">
                                        <p className="label">Variant</p>
                                        <FormControl className="radioMain">
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={false}
                                                name="radio-buttons-group"
                                                row={true}
                                            >
                                                <FormControlLabel
                                                    value={true}
                                                    control={<Radio />}
                                                    label="Applicable"
                                                    onChange={(e) => setvariantStatus(true)}
                                                />
                                                <FormControlLabel
                                                    value={false}
                                                    control={<Radio />}
                                                    label="Not Applicable"
                                                    onChange={(e) => setvariantStatus(false)}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    {console.log('Status', variantStatus)} */}
                                </div>

                                {/* {variantStatus ? (
                                    <div className="col-md-12">
                                        <div className="btn btn-primary brownBtn variantBtn my-sm-3" onClick={() => setVisible(true)}>
                                            Add Variant
                                        </div>
                                        {isArrayCheck(all_variant) ? (
                                            <>
                                                <div className="manufacturer">Variant</div>
                                                <div className="table-responsive">
                                                    <table class="table">
                                                        <HeaderVariant />
                                                        <tbody>
                                                            {isArrayCheck(all_variant) &&
                                                                all_variant?.map((data, id) => (
                                                                    <RowVariant deleteStateVariant={deleteStateVariant} data={data} key={id} />
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>
                                        ) : null}
                                    </div>
                                ) : null} */}

                                <hr className="my-3" />
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="row">
                            <div className="manufacturer">Optional</div>
                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label" htmlFor="typeEnv">
                                        Best Use For
                                    </p>
                                    <select class="form-select" value={typeEnv} onChange={(e) => setTypeEnv(e.target.value)}>
                                        <option value={''}>{'Select Type'}</option>
                                        <option value={'indoor'}>Indoor</option>
                                        <option value={'outdoor'}>Outdoor</option>
                                        <option value={'both'}>{`Indoor & Outdoor`}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label" htmlFor="care">
                                        How To Care
                                    </p>
                                    <textarea
                                        className="form-control"
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="5"
                                        placeholder="How to care this product..."
                                        onChange={(e) => setCare(e.target.value)}
                                        value={care}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="input-field">
                                    <p className="label" htmlFor="care">
                                        FAQ
                                        <AddBoxOutlinedIcon
                                            style={{ cursor: 'pointer', marginLeft: '15px' }}
                                            onClick={() => handleAddFaq()}
                                        />
                                    </p>

                                    {faqs.map((faq, index) => (
                                        <div key={index} style={{ marginBottom: '20px' }}>
                                            <p>
                                                {`Faq ${index + 1}`}
                                                <DeleteOutlineOutlinedIcon
                                                    style={{ cursor: 'pointer', marginLeft: '15px' }}
                                                    onClick={() => handleRemoveFaq(index)}
                                                />
                                            </p>
                                            <input
                                                type="text"
                                                className="form-control "
                                                name="user-name"
                                                placeholder="Name"
                                                value={faq.name}
                                                style={{ marginBottom: '20px' }}
                                                onChange={(e) => handleChangeFaq(e.target.value, index, 'name')}
                                            />
                                            <textarea
                                                className="form-control"
                                                name=""
                                                id=""
                                                cols="30"
                                                rows="3"
                                                placeholder="Description"
                                                onChange={(e) => handleChangeFaq(e.target.value, index, 'description')}
                                                value={faq.description}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {visible ? (
                    <AddProductVariation handleClose={() => setVisible(false)} />
                ) : (
                    <div className="d-flex justify-content-center my-5">
                        <div className="btn btn-primary saveBtn mx-2 px-5" onClick={() => navigate(-1)}>
                            Cancel
                        </div>

                        <div className="btn btn-primary saveBtn px-5" onClick={addNewUser}>
                            Save
                        </div>
                    </div>
                )}
                {/* <AddModalVariation className="modalDialog" visible={visible} setVisible={setVisible} /> */}
            </div>
        </>
    );
};

export default AddProductNew;
