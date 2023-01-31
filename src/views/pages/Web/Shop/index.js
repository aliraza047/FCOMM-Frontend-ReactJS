import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import ShopFilterBar from '../Shop/_part/ShopFilterBar';
import ShopCards from '../Shop/_part/ShopCards';
import { useLocation } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearProductListing,
    getAllCustomerSideCategories,
    getProductListing,
    getProductsByCategory,
    clearSearchParm
} from 'redux/action/Customer.Action/Product';
import { getWishlistData } from 'redux/action/Customer.Action/Wishlist';
import { AddInLocalStorage, console_log } from 'utils/helper';

function index() {
    const dispatch = useDispatch();
    // const { paramSearch } = useParams();
    const { state } = useLocation();
    const [searchKey, setsearchKey] = React.useState('');
    const [allProducts, setallProducts] = React.useState('');
    const { all_products_data, all_categories_data, searchData } = useSelector((state) => state._homeProduct);

    // console.log('all_products_data all_products_data', all_products_data)
    useEffect(async () => {
        if (all_products_data) {
            if (searchData && searchData !== '') {
                setsearchKey('');
                console.log('searchData part');
                const filterData = all_products_data.filter((x, id) => {
                    if (
                        String(x.name.toLowerCase()).includes(searchData.toLowerCase()) ||
                        String(x.designer.fullname.toLowerCase()).includes(searchData.toLowerCase()) ||
                        String(x.description.toLowerCase()).includes(searchData.toLowerCase())
                        //    || String(x.designer.fullname.toLowerCase()).includes(paramSearch.toLowerCase())
                    ) {
                        return x;
                    }
                });

                setallProducts(filterData ? filterData : '');
            } else {
                console.log('searchData else');
                setallProducts(all_products_data);
            }
        }
    }, [searchData, all_products_data]);

    useEffect(() => {
        AddInLocalStorage('shop');
    }, []);

    useEffect(() => {
        dispatch(getWishlistData());
        dispatch(getAllCustomerSideCategories());
        if (state) {
            dispatch(getProductsByCategory({ id: state }));
        } else {
            dispatch(getProductListing());
        }
        return () => {
            dispatch(clearProductListing());
            dispatch(clearSearchParm());
        };
    }, []);

    const handleSearch = (e) => {
        dispatch(clearSearchParm());
        const data = all_products_data.filter((x, id) => {
            if (
                String(x?.name.toLowerCase()).includes(e.target.value.toLowerCase()) ||
                String(x?.designer.fullname.toLowerCase()).includes(e.target.value.toLowerCase())
            ) {
                return x;
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
            <ShopFilterBar count={allProducts.length} handleSearch={handleSearch} keySearch={searchKey} />
            <ShopCards allProducts={allProducts} />
            <Footer />
        </div>
    );
}

export default index;
