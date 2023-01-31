// project imports
import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser, removeUser } from 'redux/action/User';
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import RoleSelector from '../UserListing/_part/RoleSelector';
import ManufacturerSelector from './_part/Selector/ManufacturerSelector';
import { editProduct } from 'redux/action/Product';
import { isArrayCheck } from '../../utilities/common';
import VariationCard from './_part/card/VariationCard';
import AddModalVariation from './_part/Modal/AddModalVariation';
import UpdateModalVariaton from './_part/Modal/UpdateModalVariaton';

const ProductDetail = () => {
    const { state } = useLocation();
    console.log('Manufacture', state.variant);
    const [visible, setVisible] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [userName, setuserName] = useState(state.name);
    const [manufacturer, setmanufacturer] = useState([state?.manufacture?._id]);
    const [lastName, setlastName] = useState(state.makerPrice);
    const [role, setrole] = useState('state.role');
    const [phone, setphone] = useState(state.totalPrice);
    const [singleData, setsingleData] = useState(0);
    const productData = useSelector((state) => state._product);
    const { role: userRole } = useSelector((state) => state._auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(false);
    }, []);

    const updateProduct = () => {
        const variantArr = state.variant;
        if (manufacturer && userName && lastName && phone) {
            dispatch(
                editProduct(
                    {
                        id: state._id,
                        manufacture: manufacturer,
                        name: userName,
                        makerPrice: lastName,
                        totalPrice: phone,
                        variant: [...variantArr, ...productData.all_variant]
                    },
                    navigate,
                    true
                )
            );
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };

    const deleteUser = () => {
        // dispatch(removeUser({ id: state._id }, navigate));
    };

    const [devices, setDevices] = React.useState(() => ['phone']);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleDevices = (event, newDevices) => {
    if (newDevices.length) {
      setDevices(newDevices);
    }
  };

    return (
        <>
            <div className="add-thread">
                <div className="d-flex justify-content-between mb-4 align-items-center pb-2" style={{ borderBottom: '1px solid #e2e2e2' }}>
                    <h2 className="border-0 mb-0 pb-0">Product Details</h2>
                    {userRole === 'admin' || userRole === 'designer' ? (
                        <button className="btn btn-primary brownBtn" onClick={() => setVisible(!visible)}>
                            Add Variation
                        </button>
                    ) : null}
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="user-name">Product Name</label>
                            <input
                                type="text"
                                className="form-control "
                                value={userName}
                                name="user-name"
                                onChange={(e) => setuserName(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                className="form-control "
                                value={firstName}
                                name="first-name"
                                onChange={(e) => setfirstName(e.target.value)}
                            />
                        </div>
                    </div> */}
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="first-name">Maker Price</label>
                            <input
                                type="text"
                                className="form-control "
                                value={lastName}
                                name="first-name"
                                onChange={(e) => setlastName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="phone-number">Total Price</label>
                            <input
                                type="text"
                                className="form-control "
                                value={phone}
                                name="phone-number"
                                onChange={(e) => setphone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field search-fields">
                            <span>Manufacturer</span>
                            <ManufacturerSelector className="mt-0" manufacturer={manufacturer} setmanufacturer={setmanufacturer} />
                        </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6">
                        <div className="approved">
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>Approved</h3>
                                <div className="toggle">
                                    <ToggleButtonGroup color="primary" value={alignment} exclusive  onChange={handleAlignment}
        aria-label="text alignment">
                                        <ToggleButton value={1}>Yes</ToggleButton>
                                        <ToggleButton value={0}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="variationMain">
                    {isArrayCheck(state?.variant) &&
                        state?.variant?.map((data, id) => (
                            <VariationCard key={id} data={data} setVisibleModal={setVisibleModal} setsingleData={setsingleData} />
                        ))}
                </div>

                {userRole === 'admin' || userRole === 'designer' ? (
                    <div className="d-flex justify-content-center my-5">
                        <div className="btn btn-primary brownBtn" onClick={updateProduct}>
                            Update Product
                        </div>
                        <div className="btn btn-primary brownBtn" onClick={deleteUser}>
                            Remove Product
                        </div>
                    </div>
                ) : null}
                <AddModalVariation className="modalDialog" visible={visible} setVisible={setVisible} />
                <UpdateModalVariaton className="modalDialog" visible={visibleModal} data={singleData} setVisible={setVisibleModal} />
            </div>
        </>
    );
};

export default ProductDetail;
