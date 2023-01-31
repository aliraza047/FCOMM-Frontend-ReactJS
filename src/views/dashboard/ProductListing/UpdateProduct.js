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
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import AddIcon from '@mui/icons-material/Add';
import AddModalVariation from './_part/Modal/AddModalVariation';
import ManufacturerSelector from './_part/Selector/ManufacturerSelector';
import DesignerSelector from './_part/Selector/DesignerSelector';
import {
    addProduct,
    setVisualImageProduct,
    uploadVisualImageProduct,
    removeVisualImageProduct,
    setImageProduct,
    removeImageProduct,
    clearProductImage,
    clearVariant,
    clearVariantImage,
    editProduct,
    uploadImageProduct
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
import UpdateModalVariaton from './_part/Modal/UpdateModalVariaton';
import { base_url_new } from 'utils/config';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import MyGallery from './_part/Slider/Index';
import { blueGrey, grey, brown } from '@mui/material/colors';
import { Log } from 'utils/helper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CrossIcon from '@mui/icons-material/Cancel';
import { removeMethodArray } from 'utils/helper';
const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
        thumbnailHeight: '70px',
        thumbnailClass: 'rounded'
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
        thumbnailHeight: '70px',
        thumbnailClass: 'rounded'
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        thumbnailHeight: '70px',
        thumbnailClass: 'rounded'
    }
];

const UpdateProductNew = () => {
    const { state } = useLocation();
    console.log('Product data', state);
    const [visible, setVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [productName, setproductName] = useState(state?.name);
    const [productStock, setproductStock] = useState(state?.stock);
    const [productSize, setproductSize] = useState(state?.productSize);
    const [productPrice, setproductPrice] = useState(state?.totalPrice);
    const [productCost, setproductCost] = useState(state?.makerPrice);
    const [productSku, setproductSku] = useState(state?.sku);
    const [height, setheight] = useState(state?.height);
    const [length, setlength] = useState(state?.length);
    const [beadth, setbeadth] = useState(state?.breadth);
    const [weight, setweight] = useState(state?.weight);

    // optional field
    const [typeEnv, setTypeEnv] = useState(state?.typeEnv);
    const [care, setCare] = useState(state?.care);
    const [faqs, setFaqs] = useState(state?.faqs ?? []);
    const [video, setVideo] = useState(state?.video ?? null);
    const [changedVideo, setChangedVideo] = useState(null);

    const [categoryProduct, setcategoryProduct] = useState(state?.category);
    const [description, setdescription] = useState(state?.description);
    const [notes, setnotes] = useState(state?.notes);
    const [designer, setdesigner] = useState([]);
    const [productStatus, setproductStatus] = useState(state?.isActive);
    const [variantStatus, setvariantStatus] = useState(state?.hasVariant);
    const [imageCounterVisual, setimageCounterVisual] = useState(0);

    const [imageList, setimageList] = useState([]);
    const [totalPrice, settotalPrice] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productData = useSelector((state) => state._product);
    const { all_variant } = useSelector((state) => state._product);
    const [visibleModal, setVisibleModal] = useState(false);
    const [singleData, setsingleData] = useState(0);
    const { all_categories } = useSelector((state) => state._category);
    const { role } = useSelector((state) => state._auth);

    console.log('Add Product State', productData, variantStatus);
    useEffect(() => {
        setLoading(false);
        dispatch(getAllCategories());
        if (state) {
            makeProductImage();
        }

        return () => {
            dispatch(clearVariant());
            dispatch(clearVariantImage());
            dispatch(clearProductImage());
        };
    }, []);

    const makeProductImage = () => {
        var data =
            Array.isArray(state.productImage) && state.productImage.length > 0
                ? state.productImage.map((data, id) => ({
                      original: base_url_new + data?.url,
                      thumbnail: base_url_new + data?.url,
                      thumbnailHeight: '70px',
                      thumbnailClass: 'rounded'
                  }))
                : [];
        Log('image list', data);
        setimageList(data);
    };
    const [url, seturl] = React.useState(base_url_new + state?.productImage[0]?.url);
    const [url2, seturl2] = React.useState('');

    const imageUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl2(e.target.result);
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('productImage', file);
        dispatch(uploadImageProduct(formData, productData?.product_image));
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

    const updateOldProduct = () => {
        const formData = new FormData();
        formData.append('id', state._id);
        formData.append('name', productName);
        formData.append('category', categoryProduct);
        formData.append('notes', notes);
        formData.append('description', description);
        formData.append('productSize', productSize);
        formData.append('stock', productStock);
        formData.append('sku', productSku);
        formData.append('totalPrice', productPrice);
        formData.append('isActive', productStatus);
        formData.append('typeEnv', typeEnv);
        formData.append('care', care);
        formData.append('faqs', JSON.stringify(faqs));
        formData.append('weight', weight);
        formData.append('length', length);
        formData.append('breadth', beadth);
        formData.append('height', height);
        formData.append('isApproved', 'unapproved');

        if (isArrayCheck(productData?.product_image)) {
            formData.append('productImage', JSON.stringify(productData?.product_image ?? []));
            formData.append('productTransparentImage', JSON.stringify(productData?.visual_product_image ?? []));
        }
        if (changedVideo) {
            formData.append('video', changedVideo);
        }

        if (productName) {
            dispatch(editProduct(formData, navigate, true));
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };

    const handleImageRemove = (arr, obj) => {
        dispatch(removeImageProduct(removeMethodArray(arr, obj)));
    };

    const deleteProduct = () => {
        // dispatch(removeUser({ id: state._id }, navigate));
    };
    console.log('productData?.product_image', productData);

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item }
    });
    useEffect(() => {
        dispatch(setImageProduct(state?.productImage));
        dispatch(setVisualImageProduct(state?.productTransparentImage));
    }, []);

    const videoUploadProduct = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setVideo(file);
        setChangedVideo(file);
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
            {/* Manufacture Product Details */}
            {role === 'manufacturer' ? (
                <div className="view-product-detail">
                    <div className="d-flex justify-content-between mb-4 align-items-center pb-2">
                        <h2 className="border-0 mb-0 pb-0">Product Detail</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="watch-product">
                                <MyGallery images={isArrayCheck(imageList) ? imageList : images} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="product-specs">
                                <h5 className="mb-0">{state.name}</h5>
                                <p className="sub-heading">Description</p>
                                <p>{state.description ? state.description : 'This is Description'}</p>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="grid">
                                            <p>Color</p>
                                            <div
                                                style={{
                                                    height: 25,
                                                    width: 25,
                                                    backgroundColor: state?.color,
                                                    borderRadius: 100
                                                }}
                                            >
                                                {/* <Radio
                                                    {...controlProps('b')}
                                                    sx={{
                                                        color: brown[600],
                                                        '&.Mui-checked': {
                                                            color: brown[600]
                                                        }
                                                    }}
                                                />
                                                <Radio
                                                    {...controlProps('c')}
                                                    sx={{
                                                        color: blueGrey[600],
                                                        '&.Mui-checked': {
                                                            color: blueGrey[600]
                                                        }
                                                    }}
                                                /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="grid">
                                            <p>Designer</p>
                                            <strong>{state?.designer?.fullname ? state?.designer?.fullname : 'Designer Name'}</strong>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="grid">
                                            <p>Cost Price</p>
                                            <strong>${state?.makerPrice}</strong>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="grid">
                                            <p>Total Price</p>
                                            <strong>${Number(state?.totalPrice) + Number(state?.makerPrice)}</strong>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="grid">
                                            <p>Size(l,b,h)</p>
                                            <strong>({state?.length + ',' + state?.breadth + ',' + state?.height})</strong>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="grid">
                                            <p>Weight (kg)</p>
                                            <strong>{state.weight}</strong>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="grid">
                                            <p>Stock</p>
                                            <strong>{state?.stock ? state?.stock : '0'}</strong>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="grid">
                                            <p>SKU</p>
                                            <strong className="mb-0">#{state?.sku ? state?.sku : '0000'}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="add-thread addProduct">
                    <div
                        className="d-flex justify-content-between mb-4 align-items-center pb-2"
                        style={{ borderBottom: '1px solid #e2e2e2' }}
                    >
                        <h2 className="border-0 mb-0 pb-0">Update Product</h2>
                    </div>
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
                                        <p className="label">
                                            Product Image <span className="text-danger">*</span>
                                        </p>
                                    </div>
                                    <div className="d-flex flex-row flex-wrap">
                                        <div className="d-flex flex-row m-1 flex-wrap">
                                            {/* {isArrayCheck(productData?.product_image)
                                                ?  */}
                                            {
                                                isArrayCheck(productData?.product_image) &&
                                                    productData?.product_image?.map((data, id) => (
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
                                                    ))
                                                // : isArrayCheck(state?.productImage) &&
                                                // state?.productImage?.map((data, id) => (
                                                //     <div style={{ position: 'relative' }}>
                                                //         <div
                                                //             className="plus-icon"
                                                //             onClick={() => handleImageRemove(state?.productImage, data)}
                                                //             style={{
                                                //                 position: 'absolute',
                                                //                 top: 5,
                                                //                 right: 5,
                                                //                 cursor: 'pointer',
                                                //                 backgroundColor: '#fff',
                                                //                 borderRadius: '50%'
                                                //             }}
                                                //         >
                                                //             <CrossIcon color="#fff" />
                                                //         </div>
                                                //     <img
                                                //         src={base_url_new + data?.url}
                                                //         alt=""
                                                //         style={{
                                                //             height: 150,
                                                //             width: 150,
                                                //             objectFit: 'cover',
                                                //             borderRadius: '10px',
                                                //             marginRight: '10px',
                                                //             marginTop: '10px'
                                                //         }}
                                                //     />
                                                //     </div>
                                                // ))
                                            }
                                        </div>
                                        <div className="upload-btn">
                                            <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                                <div className="plus-icon">
                                                    <AddIcon />
                                                </div>

                                                <input
                                                    type="file"
                                                    id="file-input"
                                                    name="image"
                                                    accept="image/x-png,image/gif,image/jpeg"
                                                    onChange={(e) => imageUpload(e)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="upload-heading">
                                        <p className="label mb-0">Visual Product Image</p>
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
                                                        onClick={() => {
                                                            setVideo(null);
                                                            setChangedVideo(null);
                                                        }}
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
                                        <p className="label">Manufacture Notes </p>
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
                                                    Price <span className="text-danger">*</span>
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    value={productPrice}
                                                    name="user-name"
                                                    placeholder="Write product name..."
                                                    onChange={(e) => setproductPrice(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12">
                                            <div className="input-field">
                                                <p className="label" htmlFor="user-name">
                                                    Stock <span className="text-danger">*</span>
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    value={productStock}
                                                    name="user-name"
                                                    placeholder="Write product name..."
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
                                                    placeholder="Write product name..."
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
                                                    defaultValue={productStatus}
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
                                            defaultValue={variantStatus}
                                            name="radio-buttons-group"
                                            row={true}
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Applicable" />
                                            <FormControlLabel value={false} control={<Radio />} label="Not Applicable" />
                                        </RadioGroup>
                                    </FormControl>
                                </div> */}
                                    </div>

                                    {/* {variantStatus ? (
                                        <div className="col-md-12">
                                            <div className="btn btn-primary brownBtn variantBtn my-sm-3" onClick={() => setVisible(true)}>
                                        Add Variant
                                    </div>
                                            {isArrayCheck(state.variant) ? (
                                                <>
                                                    <div className="manufacturer">Variant</div>
                                                    <div className="table-responsive">
                                                        <table class="table">
                                                            <HeaderVariant />
                                                            <tbody>
                                                                {state.variant?.map((data, id) => (
                                                                    <RowVariant
                                                                        data={data}
                                                                        key={id}
                                                                        setVisibleModal={setVisibleModal}
                                                                        setsingleData={setsingleData}
                                                                    />
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
                        {/* <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <p className="label" htmlFor="user-name">
                                Color
                            </p>
                            <CircularColor size={50} />
                            <div className="btn btn-primary brownBtn ms-3">Add</div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                            <div className="upload-heading">
                                <p className="label">Variant Image</p>
                            </div>
                            <div className="upload-btn">
                                <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                    <div className="plus-icon">
                                        <AddIcon />
                                    </div>
                                    {url2 ? (
                                        <img
                                            src={url2}
                                            alt=""
                                            style={{ height: 145, width: 145, objectFit: 'cover', borderRadius: '10px' }}
                                        />
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
                        <div className="col-lg-12 col-md-12">
                            <div className="input-field">
                                <p className="label" htmlFor="user-name">
                                    Size
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
                                <p className="label" htmlFor="user-name">
                                    Price
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
                                <p className="label" htmlFor="user-name">
                                    Stock
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
                                <p className="label" htmlFor="user-name">
                                    SKU
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
                    </div>
                </div> */}
                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <div className="btn btn-primary saveBtn mx-2 px-5" onClick={() => navigate(-1)}>
                            Cancel
                        </div>

                        <div className="btn btn-primary saveBtn px-5" onClick={updateOldProduct}>
                            Save
                        </div>
                    </div>
                    <AddModalVariation className="modalDialog" visible={visible} setVisible={setVisible} />
                    <UpdateModalVariaton className="modalDialog" visible={visibleModal} data={singleData} setVisible={setVisibleModal} />
                </div>
            )}
            {/* Manufacture Product Details */}
        </>
    );
};

export default UpdateProductNew;
