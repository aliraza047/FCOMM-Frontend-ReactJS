import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { isArrayCheck } from 'views/utilities/common';

import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import ShopCardThumbnail from '../Shop/_part/ShopCardThumbnail';
import ShopDesigner from '../Shop/_part/ShopDesigner';
import ShopRatingReview from '../Shop/_part/ShopRatingReview';
import StoriesCarousel from '../Shop/_part/StoriesCarousel';
import ProductCarousel from './_part/ProductCarousel';
import UserApprovedPopup from '../../Auth/_part/UserApprovedPopup';
import { addProductView } from 'redux/action/Product';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearProductListing,
    getAllCustomerSideCategories,
    getProductListing,
    getProductsByCategory,
    getProductsFiltered
} from 'redux/action/Customer.Action/Product';
import { AddInLocalStorage } from 'utils/helper';
function ShopCardDetail() {
    const dispatch = useDispatch();

    const { all_products_data } = useSelector((state) => state._homeProduct);
    const [state, setState] = useState('')
    // const { state } = useLocation();
    const { id } = useParams();
    console.log("useParams", id)
    console.log('Navigate Data', state);

    useEffect(() => {
        console.log('all', all_products_data)
        const filterProd = all_products_data.filter((x) => x._id == id)
        console.log('filterProd', filterProd[0])
        setState(filterProd[0])
        
    }, [all_products_data, id])

    

    useEffect(() => {
        AddInLocalStorage("shop")
        dispatch(getProductListing());

    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
        if (state) {
            addProductView({ prodId: state?._id, manufacturer: state?.manufacture?._id, designer: state?.designer?._id });
        }
    }, [state]);
    return (
       <div>
                
                {state &&
                    <> <Header />
                        <ShopCardThumbnail product={state} />
                        {/* <ShopDesigner product={state} /> */}
                        <ShopRatingReview product={state} />
                        <ProductCarousel product={state}/>
                        <Footer />
                    </>
                }
                {/* <UserApprovedPopup /> */}
                
            </div>
    );
}

export default ShopCardDetail;
