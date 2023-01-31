import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PromoCodePopup from './PromoCodePopup';
import { useDispatch } from 'react-redux';
import { closeDrawer } from 'redux/action/Customer.Action/Drawer';
import { getCartMyData, getLocalCart, removeCart, removeLocalCart } from '../../../../../redux/action/Customer.Action/Cart/index';
import { useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import CartProductCard from './CartProductCard';
import { useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';

function ShoppingCart() {
    const { cart_data, cart_price } = useSelector((state) => state._cart);
    const [state, setState] = React.useState();
    const [popupVisible, setpopupVisible] = useState(false);
    const [totalPrice, settotalPrice] = useState(cart_price);
    const [totalPriceCheck, settotalPriceCheck] = useState(false);
    const { isAuthenticated, user, role } = useSelector((state) => state._auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log({ cart_data });
    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getCartMyData());
        } else {
            dispatch(getLocalCart());
        }
    }, []);

    useEffect(() => {
        getPrice();
    }, [cart_price]);
    const getPrice = () => {
        // let value = 0;
        // isArrayCheck(cart_data?.productId) &&
        //     cart_data?.productId?.map((x) => {
        //         value += Number(x.totalPrice);
        //         console.log('Loop', x);
        //     });
        // console.log('Price Value', value);

        settotalPrice(cart_price);
    };

    return (
        <div>
            <div className="shopping-cart">
                <div className="padding-cart">
                    <div className="cart-heading">
                        <div className="d-flex justify-content-between">
                            <p></p>
                            <h5>Shopping Cart</h5>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={() => dispatch(closeDrawer())} />
                        </div>
                    </div>
                </div>
                <div className="tabs">
                    <TabContext value={value}>
                        <TabList
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="transparent"
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Products" className="border-right" value="1" />
                            <Tab label="Stylist" value="2" />
                        </TabList>
                        <TabPanel value="1" className="p-0">
                            <div className="padding-cart">
                                <div className="products">
                                    {isArrayCheck(cart_data) &&
                                        cart_data?.map((data, id) => (
                                            <CartProductCard
                                                key={id}
                                                data={data.productId}
                                                qty={data?.quantity}
                                                totalPrice={totalPrice}
                                                settotalPrice={settotalPrice}
                                                settotalPriceCheck={settotalPriceCheck}
                                            />
                                        ))}

                                    {isArrayCheck(cart_data) && (
                                        <Button
                                            className="clear-cart"
                                            onClick={() => {
                                                if (isAuthenticated) {
                                                    dispatch(removeCart());
                                                } else {
                                                    dispatch(removeLocalCart());
                                                    dispatch(getLocalCart());
                                                }
                                            }}
                                        >
                                            Clear Cart
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="checkout">
                                {/* <div className="promotional-code">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>Apply a promotional code</h5>
                                        <AddIcon style={{ cursor: 'pointer' }} onClick={() => setpopupVisible(true)} />
                                    </div>
                                </div> */}
                                {/* <div className="discount">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>Discount</h5>
                                        <h5>SGD 0</h5>
                                    </div>
                                </div>
                                <div className="discount">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>Shipping</h5>
                                        <h5>Free</h5>
                                    </div>
                                </div> */}
                                <div className="discount">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>Subtotal</h5>
                                        <h5>SGD {totalPriceCheck ? totalPrice : cart_price}</h5>
                                    </div>
                                </div>
                                {isAuthenticated ? (
                                    <Button
                                        className="checkout-btn"
                                        onClick={() => {
                                            if (isArrayCheck(cart_data)) {
                                                dispatch(closeDrawer());
                                                navigate('/checkout');
                                            } else {
                                                makeToast('Kindly Add Products in Cart!');
                                            }
                                        }}
                                    >
                                        CheckOut
                                    </Button>
                                ) : (
                                    <Button className="checkout-btn" onClick={() => navigate('/auth/')}>
                                        Login
                                    </Button>
                                )}
                            </div>
                        </TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                    </TabContext>
                </div>
            </div>
            <PromoCodePopup visible={popupVisible} setVisible={setpopupVisible} />
        </div>
    );
}

export default ShoppingCart;
