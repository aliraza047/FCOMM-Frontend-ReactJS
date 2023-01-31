import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { Player } from 'video-react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Favorite from '@mui/icons-material/Favorite';
import { ShareSocial } from 'react-share-social';
import ShareIcon from '@mui/icons-material/Share';
import { brown } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import MyGallery from '../Slider/Index';
import { base_url_new } from 'utils/config';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TextField from '@mui/material/TextField';

import { isArrayCheck, getTypeEnvText, getDimension } from 'views/utilities/common';
import { Log } from 'utils/helper';
import { useDispatch } from 'react-redux';
import { addItemInCart, setLocalCart } from 'redux/action/Customer.Action/Cart';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCart from './ShoppingCart';
import { closeDrawer, openDrawer } from 'redux/action/Customer.Action/Drawer';
import { addWishlist, removeItemInWishlist, addItemInWishlist } from 'redux/action/Customer.Action/Wishlist/index';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
function ShopCardThumbnail({ product }) {
    const navigate = useNavigate();

    const [selectStatus, setselectStatus] = useState(true);
    const [open, setOpen] = React.useState(false);

    const [url, setUrl] = useState(true);
    const [copyValue, setCopyValue] = useState(false);
    const [imageList, setimageList] = useState([]);
    const { isAuthenticated, user, role } = useSelector((state) => state._auth);
    const { wishlist_data } = useSelector((state) => state._wishlist);

    const { drawer_state } = useSelector((state) => state._drawer);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [selectedValue, setSelectedValue] = React.useState('a');
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseDailog = () => {
        setOpen(false);
        setCopyValue(false);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        makeProductImage();
    }, [product]);

    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item }
    });

    const makeProductImage = () => {
        var data =
            Array.isArray(product?.productImage) && product?.productImage.length > 0
                ? product?.productImage.map((data, id) => ({
                      original: base_url_new + data?.url,
                      thumbnail: base_url_new + data?.url,
                      thumbnailHeight: '70px',
                      thumbnailClass: 'rounded'
                  }))
                : [];
        Log('image list', data);
        setimageList(data);
    };

    const addToCart = () => {
        if (isAuthenticated) {
            dispatch(addItemInCart({ productId: product?._id }));
            dispatch(openDrawer());
        } else {
            dispatch(setLocalCart({ productId: product, quantity: 1 }));
            dispatch(openDrawer());
        }
    };
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });
    const handleClose = () => {
        setState(false);
    };
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const handleStatus = (data) => {
        const aa = wishlist_data.filter((x) => x?._id == data?._id);
        // setselectStatus(!selectStatus);
        if (!isArrayCheck(aa)) {
            console.log('iff');
            isArrayCheck(wishlist_data) ? dispatch(addItemInWishlist({ id: data?._id })) : dispatch(addWishlist({ products: [data?._id] }));
        } else {
            console.log('else');
            dispatch(removeItemInWishlist({ id: data?._id }));
        }
    };

    const style = {
        background: '#e5d1c1 ',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0px'
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    };
    useEffect(() => {
        const ddd = window.location.href;
        setUrl(ddd);
    }, []);

    console.log('url', url);

    return (
        <>
            <div>
                <div className="shop-card-thumbnail">
                    <div className="container">
                        <div className="back-btn">
                            <Button onClick={() => navigate(-1)}>
                                <ArrowBackIosIcon /> Back
                            </Button>
                        </div>
                        <div className="cart-images">
                            <div className="row">
                                <div className="col-lg-7 col-md-12">
                                    <div className="thumbnail-imgs">
                                        <MyGallery images={isArrayCheck(imageList) ? imageList : null} />
                                    </div>
                                    {product?.video && product?.video !== 'null' && product?.video !== null && (
                                        <div className="video-player">
                                            <Player
                                                poster={isArrayCheck(imageList) && imageList.length > 0 ? imageList[0].original : ''}
                                                src={`${base_url_new}${product?.video}`}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-5 col-md-12">
                                    <div className="cart-details">
                                        <h5 className="text-capitalize">{product?.designer?.fullname}</h5>
                                        <h4>{product?.name}</h4>
                                        <p className="price">$ {Number(product?.totalPrice) + Number(product?.makerPrice)}</p>
                                        <p className="description">{product?.description}</p>
                                        {/* <div className="other-detail mb-2">
                                            Color :
                                            <div
                                                style={{
                                                    height: 25,
                                                    width: 25,
                                                    borderRadius: 100,
                                                    backgroundColor: product?.color ? product?.color : '#000',
                                                    borderWidth: 1,
                                                    borderColor: '#a4a4a4',
                                                    position: 'relative',
                                                    top: '7px',
                                                    marginLeft: '10px',
                                                    display: 'inline-block'
                                                }}
                                            ></div>
                                        </div> */}
                                        <div className="share-like">
                                            <div className="d-flex align-items-center">
                                                <ShareIcon className="share" onClick={handleClickOpen} />

                                                <div onClick={() => handleStatus(product)}>
                                                    <Checkbox
                                                        checked={
                                                            isArrayCheck(wishlist_data) &&
                                                            wishlist_data?.find((x) => x._id === product?._id)
                                                                ? true
                                                                : false
                                                        }
                                                        {...label}
                                                        icon={<FavoriteBorder />}
                                                        checkedIcon={<Favorite />}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="other-detail fw-bold align-items-center">
                                                <AccessTimeOutlinedIcon />
                                                {product?.stock ? `${product?.stock} Items Left` : 'Not Available'}
                                            </p>
                                        </div>
                                        {/* <p className="other-detail mb-1">
                                            Length, Breadth & Height: ({product?.length + ',' + product?.breadth + ',' + product?.height})
                                        </p> */}
                                        <div className="buy-cart-btn">
                                            <div className="d-flex">
                                                {isAuthenticated ? (
                                                    <Button
                                                        className="buy-now"
                                                        disabled={Number(product?.stock) <= 0}
                                                        onClick={() => navigate('/checkout', { state: { ...product, type: 'direct' } })}
                                                    >
                                                        Buy Now
                                                    </Button>
                                                ) : (
                                                    <Button className="buy-now" onClick={() => navigate('/auth/')}>
                                                        Buy Now
                                                    </Button>
                                                )}
                                                <Button className="add-cart" disabled={Number(product?.stock) <= 0} onClick={addToCart}>
                                                    Add to Cart
                                                </Button>
                                                {isAuthenticated ? (
                                                    <Button
                                                        className="buy-now"
                                                        disabled={Number(product?.stock) <= 0}
                                                        onClick={() => navigate('/visualization', { state: product })}
                                                    >
                                                        Visualization
                                                    </Button>
                                                ) : null}
                                                {/* <Button className="add-cart" onClick={toggleDrawer('right', true)}>
                                                    Add to Cart
                                                </Button> */}
                                                {/* {['right'].map((anchor) => (
                                                    <React.Fragment key={anchor}>
                                                        <Button className="add-cart" onClick={toggleDrawer(anchor, true)}>
                                                            Add to Cart
                                                        </Button>
                                                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                                            <ShoppingCart />
                                                        </Drawer>
                                                    </React.Fragment>
                                                ))} */}
                                                <Drawer
                                                    anchor={'right'}
                                                    open={drawer_state}
                                                    onBackdropClick={() => dispatch(closeDrawer())}
                                                    onClose={toggleDrawer('right', false)}
                                                >
                                                    <ShoppingCart />
                                                </Drawer>
                                            </div>
                                        </div>

                                        {/* Other Detail */}
                                        <div className="other-product-detail other-detail">
                                            <div>
                                                <span>Best for:</span>
                                                <span>{getTypeEnvText(product?.typeEnv)}</span>
                                            </div>
                                            <div>
                                                <span>Dimensions:</span>
                                                <span>{getDimension(product)}</span>
                                            </div>
                                            <div>
                                                <span>Weight:</span>
                                                <span>{product?.weight} (kg)</span>
                                            </div>
                                            <div>
                                                <span>How to Care:</span>
                                                <span>{product?.care || product?.care !== '' ? product?.care : '-'}</span>
                                            </div>

                                            {product?.faqs?.length > 0 && (
                                                <React.Fragment>
                                                    {product?.faqs?.length > 0 && (
                                                        <React.Fragment>
                                                            <hr className="my-3" />
                                                        </React.Fragment>
                                                    )}
                                                    {product?.faqs.map((faq, index) => (
                                                        <div key={index} className="faq-style">
                                                            <span>{faq.name}</span>
                                                            <span>{faq.description}</span>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Dialog
                            open={open}
                            onClose={handleCloseDailog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            className="customModalMain"
                        >
                            <DialogContent className="">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2
                                        className="mb-2"
                                        style={{
                                            color: '#8c5d2f',
                                            fontSize: '22px'
                                        }}
                                    >
                                        Share this product
                                    </h2>
                                    <CloseIcon className="mb-2" onClick={handleCloseDailog} />
                                </div>
                                <div className="col-md-12 col-12 mx-auto text-center shareMain">
                                    <ShareSocial style={style} url={url} socialTypes={['facebook', 'twitter', 'linkedin']} />

                                    <div className="col-md-12">
                                        <div className="input-popup d-flex justify-content-between">
                                            <TextField fullWidth className="url-input" label="" variant="standard" value={url} />
                                            <CopyToClipboard text={url} onCopy={() => setCopyValue(true)}>
                                                <button>{copyValue ? 'Copied' : 'Copy'}</button>
                                            </CopyToClipboard>
                                        </div>
                                        {/* <div contenteditable="true" class="editorNew editorNew_scroll">{url}</div>
                                            <input value={url} type="text" size="45" />
                                            <button>Copy</button>
                                        </div> */}
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopCardThumbnail;
