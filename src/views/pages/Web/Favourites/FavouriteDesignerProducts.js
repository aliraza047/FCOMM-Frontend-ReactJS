import React, { useState, useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import ProductsByDesigner from './_part/ProductsByDesigner';
import ProductsCards from './_part/ProductsCards';
import ShopFilterBar from '../Shop/_part/ShopFilterBar';
import { useLocation } from 'react-router';
import { Log } from 'utils/helper';
import {
    clearProductListing,
    getAllCustomerSideCategories,
    getProductListing,
    getProductsByCategory, getProductsByDesigner
} from 'redux/action/Customer.Action/Product';
import { getWishlistData } from 'redux/action/Customer.Action/Wishlist';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
function FavouriteDesignerProducts() {
    const { paramSearch } = useParams();
    const { state } = useLocation();
    const dispatch = useDispatch();
    const { all_products_data } = useSelector((state) => state._homeProduct);
    const [allProducts, setallProducts] = React.useState('');
    const [searchKey, setsearchKey] = React.useState('');

    Log('Statte ali', state);
    useEffect(() => {
        dispatch(getWishlistData());
        dispatch(getAllCustomerSideCategories());
        if (state) {
            dispatch(getProductsByDesigner({ id: state?._id }));
        } else {
            dispatch(getProductListing());
        }

        return () => {
            dispatch(clearProductListing());
        };
    }, []);

    useEffect(() => {
        if (all_products_data) {
            if (paramSearch && paramSearch !== "") {
                const filterData = all_products_data.filter((x, id) => {
                    if (String(x?.name.toLowerCase()).includes(paramSearch.toLowerCase()) 
                    || String(x?.designer.fullname.toLowerCase()).includes(paramSearch.toLowerCase())
                     || String(x?.description.toLowerCase()).includes(paramSearch.toLowerCase())
                    //   || String(x.studio.toLowerCase()).includes(paramSearch.toLowerCase())
                      ) {
                        return x
                    }
                });
                setallProducts(filterData ? filterData : "");
            } else {
                setallProducts(all_products_data);
            }
        }
    }, [all_products_data, paramSearch]);

    const handleSearch = (e) => {
        const data = all_products_data.filter((x, id) => {
            if (String(x?.name.toLowerCase()).includes(e.target.value.toLowerCase())
                || String(x?.designer.fullname.toLowerCase()).includes(e.target.value.toLowerCase())
                || String(x?.description.toLowerCase()).includes(e.target.value.toLowerCase())
                // || String(x?.studio.toLowerCase()).includes(e.target.value.toLowerCase())
                ) {
                return x
            }
        });
        setsearchKey(e.target.value);
        if (data) {
            setallProducts(data);
        } else {
            setallProducts('');
        }
    };

    return (
        <div>
            <Header />
            <ProductsByDesigner data={state} />
            <ShopFilterBar count={allProducts.length} designer={state?._id} handleSearch={handleSearch} keySearch={searchKey} />
            {/* <ShopFilterBar designer={state?._id} handleSearch={handleSearch} /> */}
            <ProductsCards allProducts={allProducts} />
            <Footer />
        </div>
    );
}

export default FavouriteDesignerProducts;
