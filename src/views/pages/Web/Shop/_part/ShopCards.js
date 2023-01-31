import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import { getProductListing } from 'redux/action/Customer.Action/Product';
import { addWishlist, removeItemInWishlist, addItemInWishlist } from 'redux/action/Customer.Action/Wishlist/index';
import ShopProductCard from './ShopProductCard';
function ShopCards({ allProducts }) {
    const [productToShow, setproductToShow] = useState(9);
    const [selectStatus, setselectStatus] = useState(true);
    const navigate = useNavigate();
    const { all_products_data } = useSelector((state) => state._homeProduct);
    const { wishlist_data } = useSelector((state) => state._wishlist);

    // console.log('all_products_data', wishlist_data);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const dispatch = useDispatch();
    // console.log('product length', allProducts.length)
    return (
        <>
            <div className="shop-cards">
                <div className="container">
                    <div className="row">
                        {isArrayCheck(allProducts) &&
                            allProducts?.slice(0, productToShow)?.map((data, id) => <ShopProductCard data={data} key={id} />)}

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
