import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import BillingAddress from './_part/BillingAddress';
import ProductSelected from './_part/ProductSelected';
import PaymentMethod from './_part/PaymentMethod';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { checkCart, getCartMyData } from '../../../../redux/action/Customer.Action/Cart/index';
import {
    checkValueInArray,
    getTotalPriceForProducts,
    getTotalPriceForSelectedProducts,
    getTotalShipping,
    getTotalShippingForSelectedProducts,
    Log
} from 'utils/helper';
import { clearShippingDHL, getProductDeliveryCharges, removeDHLResponse, setSelectedProducts, saveDHLResponse } from 'redux/action/Customer.Action/Order';
import { addMethodArray, removeMethodArray } from 'utils/helper';
import { editUser } from 'redux/action/User';
import { getMyProfile } from 'redux/action/Auth';
import { isArrayCheck } from 'views/utilities/common';
import { Country, State } from 'country-state-city';
import { removeReward } from 'redux/action/RewardsAndPromotions';

function index() {
    const { state } = useLocation();
    console.log('checkout state', state)
    const dispatch = useDispatch();

    const [productShipping, setproductShipping] = React.useState([]);

    const [selectedData, setselectedData] = React.useState('');
    const [counter, setcounter] = React.useState(1);
    const { user } = useSelector((state) => state._auth);
    const { cart_data } = useSelector((state) => state._cart);
    console.log('cart_data',state, cart_data)
    const { all_selected_products, shipping_data } = useSelector((state) => state._homeOrder);
    console.log('shipping_data',shipping_data)
    Log('User Addres==>', user?.user?.myAddresses[0]);
    const [values, setValues] = React.useState({
        houseNo: user?.user?.myAddresses[0]?.houseNo,
        streetNo: user?.user?.myAddresses[0]?.streetNo,
        poBoxNo: user?.user?.myAddresses[0]?.poBoxNo,
        state: user?.user?.myAddresses[0]?.state,
        stateCode: user?.user?.myAddresses[0]?.stateCode,
        _id: user?.user?.myAddresses[0]?._id,
        city: user?.user?.myAddresses[0]?.city,
        country: user?.user?.myAddresses[0]?.country,
        countryCode: user?.user?.myAddresses[0]?.countryCode
    });

    const handleChange = (prop) => (event) => {
        if (prop == 'countryCode') {
            const countryDetail = Country.getCountryByCode(event.target.value);
            setValues({ ...values, [prop]: event.target.value, country: countryDetail?.name, state: '', stateCode: '', city: '' });
        }
        else if (prop == 'stateCode') {
            const stateDetail = State.getStateByCode(event.target.value);
            setValues({ ...values, [prop]: event.target.value, state: stateDetail?.name, });
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    console.log('values', values)
    const handleSave = async () => {
        const arr = isArrayCheck(user?.user?.myAddresses) ? user?.user?.myAddresses : [];
        const dataArr = removeMethodArray(arr, {
            ...values,
        });
        console.log('Add Array =>', dataArr);
        const compArr = isArrayCheck(dataArr) ? dataArr : [];
        compArr.unshift({
            ...values,
        });
        console.log('compArr', compArr);
        dispatch(editUser({ id: user?.user?._id, myAddresses: compArr }, null));
        dispatch(getMyProfile());
        getCharges(true);
    };

    const getCharges = async (prevData = false) => {
        const prod = state ? [state] : cart_data;
        console.log('product request rate',prod);

        let prodArr = [];
        if (isArrayCheck(prod)) {
            const arrShipping = [];
            prod.map((dat) => {
                arrShipping.push(dispatch(
                    getProductDeliveryCharges(
                        {
                            productId: state? dat?._id :dat?.productId?._id,
                            manufactureId:state ?  dat?.manufacture?._id : dat?.productId?.manufacture,
                            billingAddress: {
                                ...values
                            }
                        },
                    )
                )); 
                // dispatch(
                //     getProductDeliveryCharges(
                //         {
                //             productId: state? dat?._id :dat?.productId?._id,
                //             manufactureId:state ?  dat?.manufacture?._id : dat?.productId?.manufacture,
                //             billingAddress: {
                //                 ...values
                //             }
                //         },
                //         prevData ? true :false
                //     )
                // );
                // .then((res) => {
                //     prodArr.push(res);
                //     console.log('getProductDeliveryCharges Shipping Response', prodArr);
                // })
                // .catch((err) => {
                //     console.log('Err', err);
                // });

                // );
            });

            const resShipping = await Promise.all(arrShipping);
            dispatch(saveDHLResponse(resShipping.filter(x => x !== null)));
        }

        if (prodArr) {
            setproductShipping(prodArr);
        }
    };

    useEffect(() => { }, [all_selected_products]);

    useEffect(() => {
        getCharges();
        return () => {
            dispatch(removeDHLResponse())
        }
    }, [cart_data])

    useEffect(() => {
        dispatch(getCartMyData());
        return () => {
            dispatch(setSelectedProducts([]));
            Log('Clear Main');
            checkCheckoutProduct();
            dispatch(clearShippingDHL([]));
            dispatch(removeReward())
        };
    }, []);

    const checkCheckoutProduct = () => {
        localStorage.setItem('checkout', null);
    };

    console.log('State Shipping Resp', productShipping);

    return (
        <div>
            <Header />
            <BillingAddress handleChange={handleChange} handleSave={handleSave} values={values} user={user} />
            <ProductSelected
                counter={counter}
                setcounter={setcounter}
                product={state ? [state] : cart_data}
                selectedData={selectedData}
                setselectedData={setselectedData}
                userAddress={values}
                productShipping={shipping_data}
            />
            <PaymentMethod
                selectedData={selectedData}
                setselectedData={setselectedData}
                values={values}
                checkData={state ? state : cart_data}
                counter={counter}
                price={getTotalPriceForSelectedProducts(all_selected_products)}
                shipping={getTotalShipping(shipping_data)}
                productShipping={shipping_data}
            />
            <Footer />
        </div>
    );
}

export default index;