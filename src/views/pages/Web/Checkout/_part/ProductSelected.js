import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import Checkbox from '@mui/material/Checkbox';
import CheckoutProductCard from './CheckoutProductCard';
import { getProductShippingFee, Log } from 'utils/helper';
import { useDispatch } from 'react-redux';
import { setSelectedProducts } from 'redux/action/Customer.Action/Order';
function ProductSelected({ product, selectedData, setselectedData, counter, setcounter, userAddress, productShipping }) {
    const [checked, setChecked] = React.useState(false);
    console.log("================", productShipping)
    Log('Product Selected =>',product, productShipping);
    const dispatch = useDispatch();

    const [count, setcount] = React.useState(0);
    useEffect(() => {
        dispatch(setSelectedProducts([]));

        return () => {
            dispatch(setSelectedProducts([]));
            Log('Clear');
        };
    }, []);
    return (
        <div>
            <div className="product-selected">
                <div className="container">
                <h5 className='mb-1'>Products Selected</h5>
                <p className='mb-0'>We Use DHL shipping method, please select a shipping before place order</p>
                    {isArrayCheck(product) &&
                        product?.map((data, id) => (
                            <CheckoutProductCard
                                key={id}
                                data={data?.productId || data}
                                qty={product[id]?.quantity}
                                selectedData={selectedData}
                                setselectedData={setselectedData}
                                userAddress={userAddress}
                                shippingDhl={getProductShippingFee(productShipping, data?.productId?._id || data?._id )}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ProductSelected;
