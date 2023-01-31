import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import ProductsByDesigner from './_part/ProductsByDesigner';
import ProductsCards from './_part/ProductsCards';
import FilterBar from './_part/FilterBar';
import { useLocation } from 'react-router';
import { Log } from 'utils/helper';
import { clearProductListing, getProductsByDesigner } from 'redux/action/Customer.Action/Product';
import { useDispatch, useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
function DesignerProducts() {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const { all_products_data } = useSelector((state) => state._homeProduct);
    Log('Statte', state);
    useEffect(() => {
        dispatch(getProductsByDesigner({ id: state?._id }));

        return () => {
            dispatch(clearProductListing());
        };
    }, []);

    return (
        <div>
            <Header />
            <ProductsByDesigner data={state} />
            <FilterBar count={isArrayCheck(all_products_data) ? all_products_data?.length : 0} />
            <ProductsCards />
            <Footer />
        </div>
    );
}

export default DesignerProducts;
