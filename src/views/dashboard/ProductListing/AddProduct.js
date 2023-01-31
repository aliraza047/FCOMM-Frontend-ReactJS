// project imports
import React from 'react';
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addUser } from 'redux/action/User';
import { useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import AddIcon from '@mui/icons-material/Add';
import AddModalVariation from './_part/Modal/AddModalVariation';
import ManufacturerSelector from './_part/Selector/ManufacturerSelector';
import DesignerSelector from './_part/Selector/DesignerSelector';
import { addProduct } from 'redux/action/Product';
import { useSelector } from 'react-redux';

const AddProduct = () => {
    const [visible, setVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [productName, setproductName] = useState('');
    const [firstName, setfirstName] = useState('');
    const [makerPrice, setmakerPrice] = useState('');
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [designer, setdesigner] = useState([]);
    const [manufacturer, setmanufacturer] = useState([]);
    const [totalPrice, settotalPrice] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productData = useSelector((state) => state._product);
    console.log('Add Product Variant', productData);
    useEffect(() => {
        setLoading(false);
    }, []);

    const addNewUser = () => {
        if (productName && makerPrice && totalPrice && manufacturer && designer) {
            dispatch(
                addProduct(
                    {
                        name: productName,
                        totalPrice: totalPrice,
                        variant: productData.all_variant,
                        manufacture: manufacturer,
                        designer: designer,
                        makerPrice: makerPrice
                    },
                    navigate
                )
            );
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
    return (
        <>
            <div className="add-thread addProduct">
                <div className="d-flex justify-content-between mb-4 align-items-center pb-2" style={{ borderBottom: '1px solid #e2e2e2' }}>
                    <h2 className="border-0 mb-0 pb-0">Add Product</h2>
                    <button className="btn btn-primary brownBtn" onClick={() => setVisible(!visible)}>
                        Add Variation
                    </button>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <p className="label" htmlFor="user-name">
                                Name
                            </p>
                            <input
                                type="text"
                                className="form-control "
                                value={productName}
                                name="user-name"
                                onChange={(e) => setproductName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <p className="label" htmlFor="first-name">
                                Marker Price
                            </p>
                            <input
                                type="number"
                                className="form-control "
                                value={makerPrice}
                                name="first-name"
                                onChange={(e) => setmakerPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <p className="label" htmlFor="totalPrice-number">
                                Total Price
                            </p>
                            <input
                                type="number"
                                className="form-control "
                                value={totalPrice}
                                name="totalPrice-number"
                                onChange={(e) => settotalPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        {' '}
                        <div className="input-field search-fields multiselect">
                            <p className="label">Designer</p>
                            <DesignerSelector className="mt-0" designer={designer} setdesigner={setdesigner} />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        {' '}
                        <div className="input-field search-fields multiselect">
                            <p className="label">Manufacturer</p>
                            <ManufacturerSelector className="mt-0" manufacturer={manufacturer} setmanufacturer={setmanufacturer} />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary brownBtn" onClick={addNewUser}>
                        Add Product
                    </div>
                </div>
                <AddModalVariation className="modalDialog" visible={visible} setVisible={setVisible} />
            </div>
        </>
    );
};

export default AddProduct;
