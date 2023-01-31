import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { base_url_new } from 'utils/config';
import { isArrayCheck } from 'views/utilities/common';
import { addWishlist, removeItemInWishlist, addItemInWishlist } from 'redux/action/Customer.Action/Wishlist/index';
import { useNavigate } from 'react-router';
function ShopProductCard({ data }) {
    const [productToShow, setproductToShow] = useState(9);
    const [selectStatus, setselectStatus] = useState(true);
    const navigate = useNavigate();
    const { all_products_data } = useSelector((state) => state._homeProduct);
    const { wishlist_data } = useSelector((state) => state._wishlist);

    console.log('wishlist data', wishlist_data);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const dispatch = useDispatch();
    const handleStatus = (data) => {
        const aa = wishlist_data.filter((x) => x?._id == data?._id)
        if (!isArrayCheck(aa)) {
            console.log('if part')
            isArrayCheck(wishlist_data) ? dispatch(addItemInWishlist({ id: data?._id })) : dispatch(addWishlist({ products: [data?._id] }));
        }
         else {
            console.log('else part')
            dispatch(removeItemInWishlist({ id: data?._id }));
        }
    };


    // useEffect(() => {
    //     if(isArrayCheck(wishlist_data)){
    //         const aa = wishlist_data.filter((x) => x?._id == data?._id)
    //         if(isArrayCheck(aa)){
    //             setselectStatus(false)
    //         }
    //     }
    // },[data, wishlist_data])

    console.log('selectStatus',selectStatus)
    return (
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
                            <h5 style={{cursor: "pointer"}} onClick={() => navigate(`/shop-dtails/${data?._id}`, { state: data })}>{data?.name}</h5>
                            {/* <span className="description">{data?.description?.substring(0, 100)}</span> */}
                            <span className="description">{data?.designer?.fullname ?? "Designer"}</span>
                            <p className="price">${Number(data?.totalPrice) + Number(data?.makerPrice)}</p>
                        </div>
                        <div className="heart" onClick={() => handleStatus(data)}>
                            <Checkbox
                                checked={isArrayCheck(wishlist_data) && wishlist_data?.find((x) => x._id === data?._id) ? true : false}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopProductCard;
