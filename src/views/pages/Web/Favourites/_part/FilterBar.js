import React, {useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
import { getProductListing, getProductsFiltered } from 'redux/action/Customer.Action/Product';
import { clearUserListing, getAllUserListing } from 'redux/action/User';
function valuetext(value) {
    return `${value}°C`;
}
function FilterBar({ designer , handleSearch }) {
    const dispatch = useDispatch();

    const { all_users } = useSelector((state) => state._user);
    const { all_products_data, all_categories_data } = useSelector((state) => state._homeProduct);
    const maxPrice = 100000;

    const [age, setAge] = React.useState('');
    const [show, setShow] = useState(false);
    const [allProducts, setallProducts] = React.useState('');
    const [value, setValue] = React.useState([1, maxPrice ? maxPrice : 0]);
    const [alignment, setAlignment] = React.useState('popular');
    const [selectDesigner, setselectDesignerValue] = React.useState(designer);  
    const [selectCategory, setselectCategory] = React.useState('');


    const handleChanges = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleChanged = (event, newValue) => {
        setValue(newValue);
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        if (all_products_data) {
            setallProducts(all_products_data);
        }
    }, [all_products_data]);

    useEffect(() => {
        dispatch(getAllUserListing({ isApproved: 'approved', role: 'designer' }));
        return () => {
            dispatch(clearUserListing());
        };
    }, []);

    const onClearState = () => {
        dispatch(getProductListing());
        setAlignment('popular');
        setValue([1, maxPrice]);
        setselectCategory('');
        setselectDesignerValue('');
        setShow(!show);
    };

    const applyFilterBtn = () => {
        dispatch(
            getProductsFiltered({
                minPrice: value ? String(value[0]) : 0,
                maxPrice: value ? String(value[1]) : 0,
                type: alignment ? alignment : null,
                category: selectCategory ? selectCategory : null,
                designer: designer
            })
        );
        setShow(!show);
    };

    console.log('selectCategory',selectCategory)
    return (
        <div style={{ paddingTop: '30px', backgroundColor: '#fff8f2' }}>
            <div className="shop-filter-bar">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-4">
                            <div class="search-box">
                                <button class="btn-search">
                                    <div className="d-flex align-items-center">
                                        <SearchIcon /> Search
                                    </div>
                                </button>
                                <input type="text" class="input-search" placeholder="Type to Search..." onChange={handleSearch} />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6 text-md-center text-sm-start">
                            <p>{isArrayCheck(allProducts) ? allProducts?.length : 0} Products</p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6 text-end">
                        <div className="filter-parent d-initial">
                                <p className="text-end" onClick={() => setShow(!show)}>
                                    Filter
                                </p>
                                {show ? (
                                    <div className="filter-menu">
                                        <div className="container">
                                            <div className="toggle-btn">
                                                <ToggleButtonGroup value={alignment} exclusive onChange={handleChanges}>
                                                    <ToggleButton value="popular" className="border-left">
                                                        Popular
                                                    </ToggleButton>
                                                    <ToggleButton value="desc" className="border-left">
                                                        Price Descending
                                                    </ToggleButton>
                                                    <ToggleButton value="asc" className="border-left">
                                                        Price Ascending
                                                    </ToggleButton>
                                                    <ToggleButton value="designer" className="border-0">
                                                        Designer Name
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            </div>
                                            <div>
                                                <div className="price-range">
                                                    <h5>Price Range</h5>
                                                    <Slider
                                                        valueLabelDisplay="on"
                                                        getAriaLabel={() => 'Temperature range'}
                                                        value={value}
                                                        onChange={(event, newValue) => handleChanged(event, newValue)}
                                                        getAriaValueText={valuetext}
                                                        step={'25'}
                                                        // max={'500'}
                                                        min={0}
                                                        max={maxPrice}
                                                    />
                                                </div>
                                                {/* <div className="col-md-12">
                                                            <h5>Designer</h5>
                                                            <div className="check-icons">
                                                                {isArrayCheck(all_users) &&
                                                                    all_users?.map((data, id) => {
                                                                        return (
                                                                            <div className="align-items-center check">
                                                                                <Checkbox
                                                                                    {...label}
                                                                                    icon={<CircleOutlinedIcon />}
                                                                                    checkedIcon={<CircleIcon />}
                                                                                    checked={data?._id === designer}
                                                                                    onClick={() => setselectDesignerValue(data?._id)}
                                                                                />
                                                                                <p>{data?.fullname}</p>
                                                                            </div>
                                                                        );
                                                                    })}
                                                            </div>
                                                        </div> */}
                                                <div className="list-detail">
                                                    <div className="row">
                                                        <div className="col-lg-2 col-md-4">
                                                            <div className="list">
                                                                <h5>Decorations</h5>
                                                                <div className="check-icons">
                                                                    {isArrayCheck(all_categories_data) &&
                                                                        all_categories_data?.map((data, id) => {
                                                                            if (data.parentCategory === 'decorations') {
                                                                                return (
                                                                                    <div className="d-flex align-items-center check">
                                                                                        <Checkbox
                                                                                            {...label}
                                                                                            icon={<CircleOutlinedIcon />}
                                                                                            checkedIcon={<CircleIcon />}
                                                                                            checked={selectCategory === data?._id}
                                                                                            onClick={() => {
                                                                                                console.log(data?._id)
                                                                                                if(selectCategory == data?._id){
                                                                                                    console.log('if')
                                                                                                    setselectCategory()
                                                                                                }else{
                                                                                                    console.log('else')
                                                                                                    setselectCategory(data?._id)
                                                                                                }
                                                                                                
                                                                                            }}
                                                                                        />
                                                                                        <p>{data?.name}</p>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-md-4">
                                                            <div className="list">
                                                                <h5>Seats</h5>
                                                                <div className="check-icons">
                                                                    {isArrayCheck(all_categories_data) &&
                                                                        all_categories_data?.map((data, id) => {
                                                                            if (data.parentCategory === 'seats') {
                                                                                return (
                                                                                    <div className="d-flex align-items-center check">
                                                                                        <Checkbox
                                                                                            {...label}
                                                                                            icon={<CircleOutlinedIcon />}
                                                                                            checkedIcon={<CircleIcon />}
                                                                                            checked={selectCategory === data?._id}
                                                                                            onClick={() => {
                                                                                                if(selectCategory == data?._id){
                                                                                                    setselectCategory()
                                                                                                }else{
                                                                                                    setselectCategory(data?._id)
                                                                                                }
                                                                                                
                                                                                            }}
                                                                                        />
                                                                                        <p>{data?.name}</p>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-md-4">
                                                            <div className="list">
                                                                <h5>Tabels</h5>
                                                                <div className="check-icons">
                                                                    {isArrayCheck(all_categories_data) &&
                                                                        all_categories_data?.map((data, id) => {
                                                                            if (data.parentCategory === 'tabels') {
                                                                                return (
                                                                                    <div className="d-flex align-items-center check">
                                                                                        <Checkbox
                                                                                            {...label}
                                                                                            icon={<CircleOutlinedIcon />}
                                                                                            checkedIcon={<CircleIcon />}
                                                                                            checked={selectCategory === data?._id}
                                                                                            onClick={() => {
                                                                                                if(selectCategory == data?._id){
                                                                                                    setselectCategory()
                                                                                                }else{
                                                                                                    setselectCategory(data?._id)
                                                                                                }
                                                                                                
                                                                                            }}
                                                                                        />
                                                                                        <p>{data?.name}</p>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-md-4">
                                                            <div className="list">
                                                                <h5>Storage & Oragnisation</h5>
                                                                <div className="check-icons">
                                                                    {isArrayCheck(all_categories_data) &&
                                                                        all_categories_data?.map((data, id) => {
                                                                            if (data.parentCategory === 'storageOrganisation') {
                                                                                return (
                                                                                    <div className="d-flex align-items-center check">
                                                                                        <Checkbox
                                                                                            {...label}
                                                                                            icon={<CircleOutlinedIcon />}
                                                                                            checkedIcon={<CircleIcon />}
                                                                                            checked={selectCategory === data?._id}
                                                                                            onClick={() => {
                                                                                                if(selectCategory == data?._id){
                                                                                                    setselectCategory()
                                                                                                }else{
                                                                                                    setselectCategory(data?._id)
                                                                                                }
                                                                                                
                                                                                            }}
                                                                                        />
                                                                                        <p>{data?.name}</p>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-md-4">
                                                            <div className="list">
                                                                <h5>Kids</h5>
                                                                <div className="check-icons">
                                                                    {isArrayCheck(all_categories_data) &&
                                                                        all_categories_data?.map((data, id) => {
                                                                            if (data.parentCategory === 'kids') {
                                                                                return (
                                                                                    <div className="d-flex align-items-center check">
                                                                                        <Checkbox
                                                                                            {...label}
                                                                                            icon={<CircleOutlinedIcon />}
                                                                                            checkedIcon={<CircleIcon />}
                                                                                            checked={selectCategory === data?._id}
                                                                                            onClick={() => {
                                                                                                if(selectCategory == data?._id){
                                                                                                    setselectCategory()
                                                                                                }else{
                                                                                                    setselectCategory(data?._id)
                                                                                                }
                                                                                                
                                                                                            }}
                                                                                        />
                                                                                        <p>{data?.name}</p>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-2 col-md-4">
                                                            <div className="list">
                                                                <h5>Lighting</h5>
                                                                <div className="check-icons">
                                                                    {isArrayCheck(all_categories_data) &&
                                                                        all_categories_data?.map((data, id) => {
                                                                            if (data.parentCategory === 'lighting') {
                                                                                return (
                                                                                    <div className="d-flex align-items-center check">
                                                                                        <Checkbox
                                                                                            {...label}
                                                                                            icon={<CircleOutlinedIcon />}
                                                                                            checkedIcon={<CircleIcon />}
                                                                                            checked={selectCategory === data?._id}
                                                                                            onClick={() => {
                                                                                                if(selectCategory == data?._id){
                                                                                                    setselectCategory()
                                                                                                }else{
                                                                                                    setselectCategory(data?._id)
                                                                                                }
                                                                                                
                                                                                            }}
                                                                                        />
                                                                                        <p>{data?.name}</p>
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="d-flex flex-row justify-content-center">
                                                        <div className="apply-btn mx-2" onClick={onClearState}>
                                                            <button>Clear</button>
                                                        </div>
                                                        <div className="apply-btn" onClick={applyFilterBtn}>
                                                            <button>Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterBar;
