import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import { getProductListing } from 'redux/action/Customer.Action/Product';
function ShopCards() {
    const navigate = useNavigate();
    const { all_products_data } = useSelector((state) => state._homeProduct);
    console.log('all_products_data', all_products_data);
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

    return (
        <>
            <div className="shop-cards">
                <div className="container">
                    <div className="row">
                        {isArrayCheck(all_products_data) &&
                            all_products_data?.map((data, id) => (
                                <div className="col-lg-4 col-md-4">
                                    <div className="shop-card">
                                        <img
                                            onClick={() => navigate(`/shop-dtails/${data._id}`, { state: data })}
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
                                                <div className="heart">
                                                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {isArrayCheck(all_products_data) && (
                            <div className="see-more text-center">
                                <Button>See More</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopCards;
