import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PromoCodePopup from './PromoCodePopup';
import {
    getOrderShippingFee,
    getPerValue,
    getProductDilveryObj,
    getProductShippingFee,
    getTotalPriceForProducts,
    getTotalPriceForProductsCheckout,
    getTotalPriceForSelectedProducts,
    Log
} from 'utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDeliveryCharges, placeOrder } from 'redux/action/Customer.Action/Order';
import { selectClasses } from '@mui/material';
import { useNavigate } from 'react-router';
import { PayWithStripe } from '../../Payment/PayWithStripe';
import { isArrayCheck } from 'views/utilities/common';
import makeToast from 'utils/Toaster';
import moment from 'moment';
import { applyRewards, removeReward } from 'redux/action/RewardsAndPromotions';
function PaymentMethod({ selectedData, setselectedData, values, checkData, counter, price, shipping, productShipping }) {
    console.log('productShipping ali', selectedData);
    const [popupVisible, setpopupVisible] = useState(false);
    const [paymentVisible, setpaymentVisible] = useState(false);
    const { user } = useSelector((state) => state._auth);
    const { cart_data } = useSelector((state) => state._cart);
    const [value, setValue] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [couponCode, setCouponCode] = React.useState('');
    const [total, setTotal] = React.useState('');
    const [discount, setDiscount] = React.useState('');
    console.log('total discount', total, discount);
    const [priceCalculated, setpriceCalculated] = React.useState('');
    const { all_selected_products, shipping_data } = useSelector((state) => state._homeOrder);
    const { coupon_reward } = useSelector((state) => state._rewardsAndPromotions);
    console.log('coupon_reward', coupon_reward, coupon_reward?.discountType, coupon_reward?.discountValue);
    useEffect(() => {
        setpriceCalculated(getTotalPriceForSelectedProducts(selectedData));
    }, [selectedData]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleChange_ = (event) => {
        setValue2(event.target.value);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTotalShipping = (arr) => {
        let total = 0;
        if (arr) {
            arr.map((selected) => {
                const selectedShipping = productShipping.find((x) => x.productId === selected?._id);
                if (selectedShipping) {
                    if (selectedShipping.shippingKey === true) {
                        total += Number(getOrderShippingFee(selectedShipping?.shippingFee ?? 0, [selected]));
                    }
                }
            });
        }

        return total.toFixed(2);
    };

    const handleCheckout = () => {
        const checkCart = checkData ? null : cart_data?.productId;
        const prod =
            isArrayCheck(selectedData) &&
            selectedData?.map((selected) => {
                const selectedShipping = productShipping.find((x) => x.productId === selected?._id);
                return {
                    productId: selected?._id,
                    manufacturer: selected?.manufacture,
                    quantity: selected?.qty,
                    designer: selected?.designer,
                    shippingFee: Number(getOrderShippingFee(selectedShipping?.shippingFee ?? 0, [selected])).toFixed(2),
                    price: (Number(selected?.totalPrice) + Number(selected?.makerPrice)) * Number(selected?.qty),
                    costPrice: selected?.makerPrice,
                    designerPrice: selected?.totalPrice,
                    productCode: getProductShippingFee(productShipping, selected?._id)?.responseShipping?.productCode,
                    responseDHL: selectedShipping
                    // productDeliveryCapabilities: getProductDilveryObj(productShipping, selected?._id)
                };
            });

        selectedData?.map((selected) => ({
            productId: selected?._id,
            manufacturer: selected?.manufacture,
            quantity: selected?.qty,
            designer: selected?.designer,
            shippingFee: Number(getOrderShippingFee(shipping, [selected])).toFixed(2),
            price: (Number(selected?.totalPrice) + Number(selected?.makerPrice)) * Number(selected?.qty),
            costPrice: selected?.makerPrice,
            designerPrice: selected?.totalPrice,
            productCode: getProductShippingFee(productShipping, selected?._id)?.responseShipping?.productCode,
            responseDHL: shipping_data
            // productDeliveryCapabilities: getProductDilveryObj(productShipping, selected?._id)
        }));
        console.log('Checkout Data ', prod);
        setpriceCalculated(getTotalPriceForProductsCheckout(prod));
        const totalShippingCost = prod.reduce(function (acc, obj) {
            return Number(acc) + Number(obj.shippingFee);
        }, 0);
        const inputData = {
            couponId: coupon_reward ? coupon_reward._id : '',
            products: prod,
            orderFrom: checkData?.type ? 'direct' : 'cart',
            billingAddress: {
                houseNo: values.houseNo,
                streetNo: values.streetNo,
                poBoxNo: values.poBoxNo,
                state: values.state
            },
            discount: discount,
            subTotalAmount: price,
            totalAmount: discount
                ? (Number(Number(price) + totalShippingCost).toFixed(2) - Number(discount).toFixed(2)).toFixed(2)
                : Number(Number(price) + totalShippingCost).toFixed(2),
            shippingCost: totalShippingCost.toFixed(2),
            payment: {
                method: value,
                account: value2,
                isPaid: false
            },
            statusDetail: [{ status: 'unapproved', createdAt: moment().format() }]
        };
        console.log('placeorder', inputData);
        if (values.houseNo) {
            if (value2) {
                if (selectedData.length === productShipping.filter((x) => x.shippingKey === true).length) {
                    dispatch(placeOrder(inputData, navigate, selectedData?._id, checkCart, user));
                } else {
                    makeToast('error', 'Kindly select shipping');
                }
            } else {
                makeToast('error', 'Select card before placing order!');
            }
        } else {
            makeToast('error', 'Kindly Add Address!');
        }
    };

    const applyCoupon = () => {
        if (couponCode) {
            const couponData = {
                code: couponCode,
                prodId: selectedData?.map((data) => data?._id),
                price: Number(Number(price) + Number(getTotalShipping(selectedData))).toFixed(2)
            };
            dispatch(applyRewards(couponData));
            setpopupVisible(false);
            setCouponCode('');
        } else {
            makeToast('error', 'Select Product first');
        }
    };

    useEffect(() => {
        setTotal(Number(Number(price) + Number(getTotalShipping(selectedData))).toFixed(2));
    }, [price, selectedData, productShipping]);

    useEffect(() => {
        if (coupon_reward) {
            if (coupon_reward && coupon_reward?.minSpending <= total && coupon_reward?.maxSpending >= total) {
                setDiscount(
                    Number(
                        coupon_reward?.discountType == 'fixed'
                            ? Number(coupon_reward?.discountValue)
                            : getPerValue(total, coupon_reward?.discountValue)
                    ).toFixed(2)
                );
            } else {
                dispatch(removeReward());
                setDiscount('');
                makeToast('error', 'This coupon is not valid on this amount');
            }
        }
        // if (coupon_reward) {
        //     setDiscount(Number(coupon_reward?.discountType == 'fixed' ? Number(coupon_reward?.discountValue) : getPerValue(total, coupon_reward?.discountValue)).toFixed(2))
        // }
    }, [coupon_reward, total]);
    return (
        <>
            <div className="payment-method">
                <div className="container">
                    <div className="promotional-code">
                        <div className="d-flex justify-content-between">
                            <h5>Apply a promotional code</h5>
                            <AddIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    if (
                                        isArrayCheck(selectedData) &&
                                        selectedData.length === productShipping.filter((x) => x.shippingKey === true).length
                                    ) {
                                        setpopupVisible(true);
                                    } else {
                                        makeToast('error', 'plz select product & shipping first');
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="discount-total">
                        <div className="d-flex justify-content-between mb-2">
                            <h5>Discount</h5>
                            <h5>
                                {coupon_reward && (
                                    <HighlightOffIcon
                                        style={{ cursor: 'pointer', position: 'relative', top: '-1px', right: '10px' }}
                                        onClick={() => {
                                            if (coupon_reward) {
                                                dispatch(removeReward());
                                                setDiscount('');
                                            } else {
                                                makeToast('error', 'Apply Coupon then remove it');
                                            }
                                        }}
                                    />
                                )}
                                $
                                {coupon_reward
                                    ? coupon_reward?.discountType == 'fixed'
                                        ? Number(coupon_reward?.discountValue)
                                        : getPerValue(total, coupon_reward?.discountValue)
                                    : '00'}{' '}
                            </h5>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>Merchandise Total</h5>
                            <h5>${selectedData ? price : '0'}</h5>
                        </div>
                    </div>
                    <div className="discount-total">
                        <div className="d-flex align-items-baseline mb-2">
                            <div className="col-lg-3">
                                <h5>Payment Method:</h5>
                            </div>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                {/* <div className="col-lg-3">
                                    <FormControlLabel value="pay" className="disabled" disabled control={<Radio />} label="DBS PayLah!" />
                                </div>
                                <div className="col-lg-3">
                                    <FormControlLabel value="pay-now" className="disabled" disabled control={<Radio />} label="PayNow" />
                                </div> */}
                                <div className="col-lg-3">
                                    <FormControlLabel value="credit-card" control={<Radio />} label="Credit / Debit Card" />
                                </div>
                            </RadioGroup>
                        </div>
                        {value === 'credit-card' ? (
                            <div className="d-flex align-items-baseline ">
                                <div className="col-lg-3">
                                    <h5>Payment Account:</h5>
                                </div>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={value2}
                                    onChange={handleChange_}
                                >
                                    {isArrayCheck(user?.user?.myWallet) &&
                                        user?.user?.myWallet?.map((data, id) => (
                                            <div className="col-lg-3">
                                                <FormControlLabel
                                                    value={data?.source}
                                                    control={<Radio />}
                                                    label={data?.brand + ` xxxx xxxx xxxx ` + data?.last4}
                                                />
                                            </div>
                                        ))}
                                    {/* <div className="col-lg-3">
                                    <FormControlLabel value="UOB 5678 xxxx xxxx xxxx" control={<Radio />} label="UOB 5678 xxxx xxxx xxxx" />
                                </div>
                                <div className="col-lg-3"></div> */}
                                </RadioGroup>
                            </div>
                        ) : null}
                    </div>
                    <div className="discount-total">
                        <div className="d-flex justify-content-between mb-2">
                            <h5>Shipping</h5>
                            <h5>{selectedData ? getTotalShipping(selectedData) : '00'}</h5>
                        </div>
                        {/* <div className="d-flex justify-content-between">
                            <h5>Subtotal</h5>
                            <h5>${selectedData ? price : '00'}</h5>
                        </div> */}
                        <div className="d-flex justify-content-between">
                            <h5>SubTotal</h5>
                            <h5>
                                {total ? total : '00'}
                                {/* $
                                {(selectedData) ? Number(Number(price) + Number(getTotalShipping(selectedData))).toFixed(2) : '00'} */}
                            </h5>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h5>Total</h5>
                            <h5>
                                {total && discount ? (Number(total) - Number(discount)).toFixed(2) : total ? total : '00'}
                                {/* $
                                {(selectedData) ? Number(Number(price) + Number(getTotalShipping(selectedData))).toFixed(2) : '00'} */}
                            </h5>
                        </div>
                    </div>
                    <div className="place-order-btn">
                        <Button className="place-order" disabled={!selectedData} onClick={handleCheckout}>
                            Place Order
                        </Button>
                        <div className="bg-light col-6">
                            <PayWithStripe visible={paymentVisible} setVisible={setpaymentVisible} />
                        </div>
                    </div>
                </div>
            </div>
            <PromoCodePopup
                visible={popupVisible}
                setVisible={setpopupVisible}
                applyCoupon={applyCoupon}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
            />
        </>
    );
}

export default PaymentMethod;

//Z4oaVp
