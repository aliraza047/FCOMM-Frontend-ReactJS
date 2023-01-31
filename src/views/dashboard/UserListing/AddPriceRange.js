// project imports
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange} from 'redux/action/Product';
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import { styled } from '@mui/material/styles';
const usePlaceholderStyles = styled((theme) => ({
    placeholder: {
        color: '#9f9e9e'
    }
}));

const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
};

const AddUserNew = () => {
    const { isAuthenticated, user, role: userRole } = useSelector((state) => state._auth);
    const [isLoading, setLoading] = useState(true);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
  

    const dispatch = useDispatch();
    const navigate = useNavigate();
  

    useEffect(() => {
        setLoading(false);
    }, []);

    const addNewUser = () => {
        const fields = {
            minPrice: minPrice,
            maxPrice: maxPrice,
        };
        console.log(fields);
        
        if (minPrice && maxPrice) {
            dispatch(setPriceRange(fields, navigate));
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
    return (
        <>
            <div className="add-thread settingsMain">
                <h2 className="border-0">Add Price Range</h2>
                <div className="row">
                    <div className="col-md-6 mt-1">
                    <div className="input-field">
                            <label className="label" htmlFor="user-name">
                                Min Price
                            </label>
                            <input
                                type="number"
                                className="form-control "
                                value={minPrice}
                                name="minPrice"
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </div>
                        
                    </div>
                    <div className="col-md-6 mt-1">
                    <div className="input-field">
                            <label className="label" htmlFor="user-name">
                                Max Price
                            </label>
                            <input
                                type="number"
                                className="form-control "
                                value={maxPrice}
                                name="maxPrice"
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-center my-3 mt-5 ">
                        <div className="btn btn-primary brownBtn" onClick={addNewUser}>
                            Save
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUserNew;