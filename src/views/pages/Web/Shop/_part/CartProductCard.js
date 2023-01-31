import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { base_url_new } from 'utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { addItemInCart, removeItemInCart, RemoveSingleLocalCart } from 'redux/action/Customer.Action/Cart';

export default function CartProductCard({ data, qty, totalPrice, settotalPrice, settotalPriceCheck }) {
    const [counter, setcounter] = useState(qty);
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state._auth);
    console.log('Cart', data);

    return (
        <div className="cart-product">
            <div className="d-flex justify-content-between">
                <div className="cart-img">
                    <div className="d-flex">
                        <img
                            src={
                                data?.productImage
                                    ? base_url_new + data?.productImage[0]?.url
                                    : 'https://img.muji.net/img/item/4547315892464_02_400.jpg'
                            }
                            alt=""
                        />
                        <div>
                            <p>{data?.name}</p>
                            <h5>{data?.designer?.fullname}</h5>
                            <p>Color: {data?.color}</p>
                        </div>
                    </div>
                </div>
                <div className="price">
                    <p>SGD</p>
                    <p>{Number(data?.totalPrice) + Number(data?.makerPrice)}</p>
                </div>
            </div>
            <div className="cart-counter">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="see-more">
                        <Button
                            onClick={() => {
                                if (!isAuthenticated) {
                                    dispatch(RemoveSingleLocalCart({ productId: data }));
                                } else {
                                    dispatch(removeItemInCart({ id: data?._id }));
                                }
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                    <div className="counter">
                        <div className="d-flex align-items-center">
                            <Button
                                onClick={() => {
                                    if (counter > 0) {
                                        setcounter(counter - 1);
                                        settotalPriceCheck(true);
                                        console.log(totalPrice - (Number(data?.totalPrice) + Number(data?.makerPrice)));
                                        settotalPrice(totalPrice - (Number(data?.totalPrice) + Number(data?.makerPrice)));
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
                                        settotalPriceCheck(true);

                                        console.log(totalPrice + (Number(data?.totalPrice) + Number(data?.makerPrice)));

                                        settotalPrice(totalPrice + (Number(data?.totalPrice) + Number(data?.makerPrice)));
                                        dispatch(addItemInCart({ productId: data?._id }));
                                    }
                                }}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
