import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import FavouriteCarousel from './FavouriteCarousel';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlistData, removeItemInWishlist } from 'redux/action/Customer.Action/Wishlist';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import { addItemInCart } from 'redux/action/Customer.Action/Cart';
function ProductsTab() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { wishlist_data } = useSelector((state) => state._wishlist);
    const products = [
        { productName: 'Lorem Ipsum', designerName: 'Nomi', color: 'Red', price: '250' },
        { productName: 'Lorem Ipsum', designerName: 'Nomi', color: 'Red', price: '250' },
        { productName: 'Lorem Ipsum', designerName: 'Nomi', color: 'Red', price: '250' },
        { productName: 'Lorem Ipsum', designerName: 'Nomi', color: 'Red', price: '250' },
        { productName: 'Lorem Ipsum', designerName: 'Nomi', color: 'Red', price: '250' }
    ];
    console.log('Tabd LiSting', wishlist_data);
    useEffect(() => {
        dispatch(getWishlistData());
    }, []);
    return (
        <div>
            <div className="designer-tab">
                <div className="container">
                    {isArrayCheck(wishlist_data) &&
                        wishlist_data.map((data, key) => (
                            <div key={key} className="designer">
                                <div className="row align-items-center">
                                    <div className="col-lg-3 col-md-4">
                                        <div className="product-desc">
                                            <img
                                                onClick={() => navigate(`/shop-dtails/${data?._id}`, { state: data })}
                                                src={
                                                    isArrayCheck(data?.productImage)
                                                        ? base_url_new + data?.productImage[0]?.url
                                                        : 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2Zlc3NvcnxlbnwwfHwwfHw%3D&w=1000&q=80'
                                                }
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-9 col-md-8">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-8">
                                                <div className="product-desc">
                                                    <h5>{data.name}</h5>
                                                    <p>{data?.designer?.fullname}</p>
                                                    <p>Color: {data?.color}</p>
                                                    <p className="mt-2">${Number(data?.totalPrice) + Number(data?.makerPrice)}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-4 d-grid">
                                                <div className="following-btn">
                                                    <Button
                                                        className="remove"
                                                        onClick={() => dispatch(removeItemInWishlist({ id: data?._id }))}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                                <div className="d-flex justify-content-md-end align-items-end">
                                                    <div className="following-btn">
                                                        <Button
                                                            className="f-btn"
                                                            onClick={() => {
                                                                dispatch(addItemInCart({ productId: data?._id }));
                                                                dispatch(removeItemInWishlist({ id: data?._id }));
                                                            }}
                                                        >
                                                            Add to Cart
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <FavouriteCarousel />
        </div>
    );
}

export default ProductsTab;
