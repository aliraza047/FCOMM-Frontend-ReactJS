import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import { addWishlist, removeItemInWishlist, addItemInWishlist } from 'redux/action/Customer.Action/Wishlist/index';
import { getProductListing } from 'redux/action/Customer.Action/Product';
function ShopCards({ allProducts }) {
    const navigate = useNavigate();
    // const { all_products_data } = useSelector((state) => state._homeProduct);
    const { wishlist_data } = useSelector((state) => state._wishlist);
    const [productToShow, setproductToShow] = useState(9);
    const [selectStatus, setselectStatus] = useState(true);
    // console.log('all_products_data', all_products_data);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const ShopCardData = [
        { title: 'Lorem Ipsum', description: 'Lorem ipsum awja sawa sjsjs', price: '$250.00' },
        { title: 'Lorem Ipsum', description: 'Lorem ipsum awja sawa sjsjs', price: '$250.00' },
        { title: 'Lorem Ipsum', description: 'Lorem ipsum awja sawa sjsjs', price: '$250.00' },
        { title: 'Lorem Ipsum', description: 'Lorem ipsum awja sawa sjsjs', price: '$250.00' },
        { title: 'Lorem Ipsum', description: 'Lorem ipsum awja sawa sjsjs', price: '$250.00' },
        { title: 'Lorem Ipsum', description: 'Lorem ipsum awja sawa sjsjs', price: '$250.00' },
        { title: 'Lorem Ipsum', description: 'Lorem ipsum awja sawa sjsjs', price: '$250.00' },
        { title: 'Lorem Ipsum', description: 'Lorem ipsum awja sawa sjsjs', price: '$250.00' },
        { title: 'Lorem Ipsum', description: 'Lorem ipsum awja sawa sjsjs', price: '$250.00' }
    ];
    const dispatch = useDispatch();

    const handleStatus = (data) => {
        const aa = wishlist_data.filter((x) => x?._id == data?._id)

        // console.log(selectStatus)
        // setselectStatus(!selectStatus);
        if (!isArrayCheck(aa)) {
            console.log('if part')
            isArrayCheck(wishlist_data) ? dispatch(addItemInWishlist({ id: data?._id })) : dispatch(addWishlist({ products: [data?._id] }));
        }
         else {
            console.log('else part')
            dispatch(removeItemInWishlist({ id: data?._id }));
        }
    };

    return (
        <>
            <div className="shop-cards">
                <div className="container">
                    <div className="row">
                        {isArrayCheck(allProducts) &&
                            allProducts?.slice(0, productToShow)?.map((data, id) => (
                                <div className="col-lg-4 col-md-4">
                                    <div className="shop-card">
                                        <img
                                            onClick={() => navigate(`/shop-dtails/${data?._id}`, { state: data })}
                                            src={
                                                isArrayCheck(data?.productImage)
                                                    ? base_url_new + data?.productImage[0]?.url
                                                    : 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNoYWlyfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
                                            }
                                            alt=""
                                        />
                                        <div className="shop-card-content">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h5>{data?.name}</h5>
                                                    <span className="description">{data?.description?.substring(0, 100)}</span>
                                                    <p className="price">${Number(data?.totalPrice) + Number(data?.makerPrice)}</p>
                                                </div>
                                                <div className="heart" onClick={() => handleStatus(data)}>
                                                    <Checkbox
                                                        checked={isArrayCheck(wishlist_data) && wishlist_data?.find((x) => x._id === data?._id) ? true : false}
                                                        {...label}
                                                        icon={<FavoriteBorder />}
                                                        checkedIcon={<Favorite />}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                       {isArrayCheck(allProducts) && allProducts.length > Number(productToShow) &&
                            <div className="see-more text-center">
                                <Button
                                    onClick={() => {
                                        if (isArrayCheck(allProducts) && allProducts.length < productToShow) {
                                            setproductToShow(
                                                productToShow +
                                                ((allProducts.length - productToShow) % 0 ? 9 : productToShow - allProducts.length)
                                            );
                                        } else {
                                            setproductToShow(productToShow + 9);
                                        }
                                    }}
                                >
                                    See More
                                </Button>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopCards;
