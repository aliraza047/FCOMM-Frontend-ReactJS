import React, { useEffect } from 'react';
import { base_url_new } from 'utils/config';
import Checkbox from '@mui/material/Checkbox';
import { isArrayCheck } from 'views/utilities/common';
import { addMethodArray, Log, removeMethodArray, setPriceLocally, updateMethodArray, getOrderShippingFee } from 'utils/helper';
import Button from '@mui/material/Button';
import { getProductDeliveryCharges, saveDHLResponse, setSelectedProducts } from 'redux/action/Customer.Action/Order';
import { useDispatch, useSelector } from 'react-redux';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';

export default function CheckoutProductCard({ data, selectedData, qty, setselectedData, userAddress, shippingDhl }) {
    console.log('shippingDhl', shippingDhl);
    console.log('Data checkout card', data);
    const [checked, setChecked] = React.useState(false);
    const [checkedShipping, setCheckedShipping] = React.useState('');
    const [shippingFee, setshippingFee] = React.useState({
        shippingFee: 0
    });
    const [counter, setcounter] = React.useState(qty ? qty : 1);
    const { all_selected_products, shipping_data } = useSelector((state) => state._homeOrder);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setChecked(event.target.checked);
        console.log('Checkout Box=>', event.target.checked);
        if (event.target.checked) {
            dispatch(
                setSelectedProducts(
                    addMethodArray(all_selected_products, {
                        ...data,
                        qty: counter,
                        total: (Number(data?.totalPrice) + Number(data?.makerPrice)) * Number(counter),
                        shippingCost: Number(data?.shipping) * Number(counter)
                    })
                )
            );

            setselectedData(
                addMethodArray(selectedData, {
                    ...data,
                    qty: counter,
                    total: (Number(data?.totalPrice) + Number(data?.makerPrice)) * Number(counter),
                    shippingCost: Number(data?.shipping) * Number(counter)
                })
            );
        } else {
            dispatch(
                setSelectedProducts(
                    removeMethodArray(all_selected_products, {
                        ...data,
                        qty: counter,
                        total: (Number(data?.totalPrice) + Number(data?.makerPrice)) * Number(counter)
                    })
                )
            );

            setselectedData(
                removeMethodArray(selectedData, {
                    ...data,
                    qty: counter,
                    total: (Number(data?.totalPrice) + Number(data?.makerPrice)) * Number(counter)
                })
            );
        }
    };

    console.log('checkedShipping', checkedShipping);
    const handleChangeShipping = (event, inputData, productId) => {
        console.log('inputData', inputData);
        // if (inputData?.productName !== checkedShipping?.productName) {
        const indexShipping = shipping_data.findIndex((i) => i.productId === productId);
        shipping_data[indexShipping].shippingKey = true;
        shipping_data[indexShipping].responseShipping = inputData;
        shipping_data[indexShipping].shippingFee = inputData.totalPrice[0].price;

        setCheckedShipping(inputData);
        dispatch(saveDHLResponse(JSON.parse(JSON.stringify(shipping_data))));
        // if (indexShipping >= 0 && !shipping_data[indexShipping].shippingKey) {
        //     shipping_data[indexShipping].shippingKey = true;
        //     shipping_data[indexShipping].responseShipping = inputData;
        //     shipping_data[indexShipping].shippingFee = inputData.totalPrice[0].price;

        //     setCheckedShipping(inputData);
        //     dispatch(saveDHLResponse(JSON.parse(JSON.stringify(shipping_data))));
        //     // }
        // } else {
        //     const indexShipping = shipping_data.findIndex((i) => i.productId === productId);
        //     if (indexShipping >= 0) {
        //         shipping_data[indexShipping].shippingKey = false;
        //         shipping_data[indexShipping].responseShipping = '';
        //         // shipping_data[indexShipping].shippingFee = inputData.totalPrice[0].price;

        //         setCheckedShipping('');
        //         dispatch(saveDHLResponse(JSON.parse(JSON.stringify(shipping_data))));
        //     }
        // }
    };

    const openUrl = () => {
        window.open('https://mydhl.express.dhl/sg/en/ship/delivery-services.html#/export', '_blank', 'noopener,noreferrer');
    };

    console.log('================', data?.name, shippingDhl?.responseCompleteDhl);
    return (
        <>
            <div className="products">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="product-img">
                            <div className="d-flex">
                                <div>
                                    <Checkbox
                                        checked={isArrayCheck(selectedData) && selectedData?.find((sel) => sel?._id === data?._id)}
                                        onChange={(e) => handleChange(e)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <img
                                        src={
                                            isArrayCheck(data?.productImage)
                                                ? base_url_new + data?.productImage[0]?.url
                                                : 'https://www.autechnologies.com/web/image/product.product/9564/image_1024'
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="text-capitalize position-relative">
                                    <p>
                                        {data?.name}
                                        {` (${data?.weight}kg)`}
                                    </p>
                                    <p>{data?.designer?.fullname ? data?.designer?.fullname : ''}</p>
                                    <p>{data?.color}</p>
                                    <p>{data?.color}</p>
                                    {isArrayCheck(shippingDhl?.responseCompleteDhl) &&
                                        shippingDhl?.responseCompleteDhl.map((x) => (
                                            <div className="d-flex flex-row mt-1 align-item-center">
                                                <Checkbox
                                                    checked={
                                                        isArrayCheck(shipping_data) &&
                                                        shipping_data[shipping_data.findIndex((i) => i?.productId === data._id)]
                                                            ?.shippingKey &&
                                                        shipping_data[shipping_data.findIndex((i) => i?.productId === data._id)]
                                                            ?.responseShipping?.productName == x.productName
                                                    }
                                                    // checked={String(checkedShipping?.productName) === String(x?.productName)}
                                                    onChange={(e) => handleChangeShipping(e, x, data._id)}
                                                    inputProps={{ 'aria-label': 'Checkbox demo' }}
                                                    icon={<CircleOutlinedIcon />}
                                                    checkedIcon={<CircleIcon />}
                                                />
                                                <p className="mt-1 checkWidth" onClick={openUrl}>
                                                    {x?.productName}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-4 position-relative">
                        <p>${Number(data?.totalPrice) + Number(data?.makerPrice)}</p>
                        {/* <p className="productBottomM">
                            {isArrayCheck(shippingDhl?.responseCompleteDhl) &&
                                shippingDhl?.responseCompleteDhl.map((x) => (
                                    <div className="d-flex flex-row mt-1 align-item-center">
                                        <p className="mt-1">{x?.deliveryCapabilities?.estimatedDeliveryDateAndTime}</p>
                                    </div>
                                ))}
                        </p> */}
                    </div>
                    <div className="col-lg-2 col-md-2 col-4">
                        <div className="counter">
                            <div className="d-flex align-items-center">
                                <Button
                                    onClick={() => {
                                        if (counter > 0) {
                                            setcounter(counter - 1);
                                            dispatch(
                                                setSelectedProducts(
                                                    updateMethodArray(all_selected_products, data, {
                                                        qty: counter - 1,
                                                        total: (Number(data?.totalPrice) + Number(data?.makerPrice)) * Number(counter - 1),
                                                        shippingCost: Number(data?.shipping) * Number(counter - 1)
                                                    })
                                                )
                                            );
                                            setselectedData(
                                                updateMethodArray(selectedData, data, {
                                                    qty: counter - 1,
                                                    total: (Number(data?.totalPrice) + Number(data?.makerPrice)) * Number(counter - 1),
                                                    shippingCost: Number(data?.shipping) * Number(counter - 1)
                                                })
                                            );
                                        }
                                    }}
                                >
                                    -
                                </Button>
                                <p>{counter}</p>
                                <Button
                                    onClick={() => {
                                        if (counter < Number(data?.stock)) {
                                            setcounter(counter + 1);
                                            dispatch(
                                                setSelectedProducts(
                                                    updateMethodArray(all_selected_products, data, {
                                                        qty: counter + 1,
                                                        total: (Number(data?.totalPrice) + Number(data?.makerPrice)) * Number(counter + 1),
                                                        shippingCost: Number(data?.shipping) * Number(counter + 1)
                                                    })
                                                )
                                            );

                                            setselectedData(
                                                updateMethodArray(selectedData, data, {
                                                    qty: counter + 1,
                                                    total: (Number(data?.totalPrice) + Number(data?.makerPrice)) * Number(counter + 1),
                                                    shippingCost: Number(data?.shipping) * Number(counter + 1)
                                                })
                                            );
                                        }
                                    }}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 col-4">
                        <p style={{ marginBottom: data?.color ? '66px' : '38px' }}>
                            ${(Number(data?.totalPrice) + Number(data?.makerPrice)) * Number(counter)}
                        </p>
                        {/* <h5>${Number(data?.shipping) * Number(counter)}(Shipping Fee)</h5> */}
                        {isArrayCheck(shippingDhl?.responseCompleteDhl) &&
                            shippingDhl?.responseCompleteDhl.map((x) => {
                                data.qty = counter;

                                return <p style={{ marginBottom: '13px' }}>{getOrderShippingFee(x?.totalPrice[0]?.price, [data])}</p>;
                            })}
                        {/* <p>${shippingDhl?.responseCompleteDhl[0]?.totalPrice[0]?.price}</p>
                        <p>${shippingDhl?.responseCompleteDhl[1]?.totalPrice[0]?.price}</p> */}
                    </div>
                </div>
            </div>
        </>
    );
}
