import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownToggle from 'react-bootstrap/DropdownToggle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import { getProductListing, getProductsFiltered, clearSearchParm } from 'redux/action/Customer.Action/Product';
import { clearUserListing, getAllUserListing } from 'redux/action/User';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { getSetting } from 'redux/action/Setting';

const StyledPriceRange = styled.div`
    padding: 10px;
    border-top: 1px solid #ddd;
    .MuiFormControl-root {
        padding: 0px 5px;
    }
    input {
        padding: 10px;
        width: 100px;
        border: 1px solid #ddd;
    }
    button {
        background-color: #8c5d2f;
        border-radius: 0px;
        font-weight: 200;
        line-height: 30px;
        color: white;
        border: none;
        padding: 5px 30px;
        font-size: 16px;
        font-family: 'FuturaPtBook' !important;
        margin-top: 10px;
    }
    .MuiInputLabel-root {
        top: -4px;
    }
    .MuiInputLabel-shrink {
        left: 5px;
        top: 0px;
    }
`;

function valuetext(value) {
    return `${value}°C`;
}

// const Price = [
//     { id: "1", value: ['500', '20000'] , text: '500 - 20000$'},
//     { id: "2", value: ['20000', '40000'] , text: '20000$ - 40000$'},
//     { id: "3", value: ['40000', '60000'] , text: '40000$ - 60000$'},
//     { id: "4", value: ['60000', '80000'] , text: '60000$ - 80000$'},
//     { id: "5", value: ['80000', '100000'] , text: '80000$ - 100000$'},
// ];

function ShopFilterBar({ count, designer, handleSearch, keySearch }) {
    const { all_products_data, all_categories_data } = useSelector((state) => state._homeProduct);
    const { setting } = useSelector((state) => state._setting);

    // const Price = setting?.priceRange?.map((x, index) => {
    //     return {
    //         id: index + 1,
    //         value: [x.min, x.max],
    //         text: `${x.min} - ${x.max}$`
    //     }
    // })

    console.log('setselectCategory', all_categories_data);
    // const maxPrice = all_products_data.length > 0 ?
    //     Math.max(...all_products_data.filter(x => x.totalPrice !== null && x.totalPrice !== "").map(x => Number(x.totalPrice))) :
    //     0;
    const maxPrice = 100000;
    const [searchKey, setsearchKey] = React.useState('');
    const [allProducts, setallProducts] = React.useState('');
    const [selectCategory, setselectCategoryValue] = React.useState([]);
    const [Price, setPrice] = React.useState([]);
    const [selectDesigner, setselectDesignerValue] = React.useState(designer ? [designer] : []);
    const [value, setValue] = React.useState([1, maxPrice ? maxPrice : 0]);
    const [minValue, setMinValue] = React.useState(0);
    const [maxValue, setMaxValue] = React.useState(0);
    const [openOption, setOpenOption] = React.useState(false);

    const dispatch = useDispatch();
    const [alignment, setAlignment] = React.useState('popular');

    const { all_users } = useSelector((state) => state._user);

    useEffect(() => {
        dispatch(getSetting());
        dispatch(getAllUserListing({ isApproved: 'approved', role: 'designer' }));
        return () => {
            dispatch(clearUserListing());
        };
    }, []);

    useEffect(() => {
        const priceValue = setting?.priceRange?.map((x, index) => {
            return {
                id: index + 1,
                value: [x.min, x.max],
                text: `$${x.min} - $${x.max}`
            };
        });

        if (setting?.priceRange && setting?.priceRange.length > 0) {
            const lastPrice = setting?.priceRange[setting?.priceRange.length - 1].max;
            priceValue.push({
                id: 99,
                value: [lastPrice, 9999999999],
                text: `> $${lastPrice}`
            });
        }

        setPrice(priceValue);
    }, [setting]);

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
        setOpenOption(!openOption);
    };

    useEffect(() => {
        if (all_products_data) {
            setallProducts(all_products_data);
        }
    }, [all_products_data]);
    const setselectCategory = (data) => {
        console.log(data);
        setselectCategoryValue(data);
        // dispatch(getProductsFiltered({ type: alignment ? alignment : null, category: data }));
        // setShow(!show);
    };

    const handleChanges = (event, newAlignment) => {
        setAlignment(newAlignment);
        // dispatch(getProductsFiltered({ type: newAlignment }));
        // setShow(!show);
    };

    const [alignments, setAlignments] = React.useState('mono');

    const handleChangeds = (event, newAlignments) => {
        setAlignments(newAlignments);
    };

    const handleChanged = (event, newValue) => {
        setValue(newValue);
    };

    const label = { inputProps: { 'aria-label': 'controlled' } };

    const [show, setShow] = useState(false);

    const applyFilterBtn = () => {
        console.log('age', age);
        let aa;
        if (age) {
            aa = isArrayCheck(Price) && Price.filter((data) => data?.id == age);
            console.log('aa', aa);
        }
        const field = {
            minPrice: age !== 'custom' ? (isArrayCheck(aa) ? String(aa[0]?.value[0]) : 0) : String(minValue),
            maxPrice: age !== 'custom' ? (isArrayCheck(aa) ? String(aa[0]?.value[1]) : 0) : String(maxValue),
            type: alignment ? alignment : null,
            category: selectCategory && selectCategory.length > 0 ? selectCategory : null,
            designer: selectDesigner && selectDesigner.length > 0 ? selectDesigner : null
        };
        console.log('field', field);
        dispatch(
            getProductsFiltered(field)
            // getProductsFiltered({
            //     minPrice: isArrayCheck(age) ? String(age[0]) : 0,
            //     maxPrice: isArrayCheck(age) ? String(age[1]) : 0,
            //     type: alignment ? alignment : null,
            //     category: selectCategory ? selectCategory : null,
            //     designer: selectDesigner ? selectDesigner : null
            // })
        );
        setShow(!show);
    };

    const onClearState = () => {
        dispatch(clearSearchParm());
        dispatch(getProductListing());
        setAlignment('popular');
        setValue([1, maxPrice]);
        setAge('');
        setselectCategoryValue([]);
        setselectDesignerValue([]);
        setMinValue(0);
        setMaxValue(0);
        setShow(!show);
    };

    return (
        <div>
            <div className="shop-filter-head">
                <h5>Our Shop</h5>
            </div>
            <div className="shop-filter-bar">
                <div className="container mx-auto">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4">
                            <div class="search-box">
                                <button class="btn-search">
                                    <div className="d-flex align-items-center">
                                        <SearchIcon /> Search
                                    </div>
                                </button>
                                <input
                                    type="text"
                                    value={keySearch}
                                    class="input-search"
                                    placeholder="Type to Search..."
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6 text-md-center text-sm-start">
                            <p>{count} Products</p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6">
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
                                                {/* <Slider
                                                        valueLabelDisplay="on"
                                                        getAriaLabel={() => 'Temperature range'}
                                                        value={value}
                                                        onChange={(event, newValue) => handleChanged(event, newValue)}
                                                        getAriaValueText={valuetext}
                                                        step={'25'}
                                                        // max={'500'}
                                                        min={0}
                                                        max={maxPrice}
                                                    /> */}
                                                <div className="col-lg-12 col-md-12 col-12 text-end">
                                                    <div className="price-range d-flex justify-content-between">
                                                        <FormControl
                                                            sx={{ m: 1, minWidth: 120 }}
                                                            onClick={(e) => {
                                                                console.log(e.target.className);
                                                                if (
                                                                    !e.target.className.includes('MuiOutlinedInput-input') &&
                                                                    !e.target.className.includes('customInput')
                                                                ) {
                                                                    setOpenOption(!openOption);
                                                                }
                                                                if (e.target.className.includes('select')) {
                                                                    setOpenOption(!openOption);
                                                                }
                                                            }}
                                                        >
                                                            <Select
                                                                value={age}
                                                                onChange={handleChange}
                                                                open={openOption}
                                                                displayEmpty
                                                                inputProps={{ 'aria-label': 'Without label' }}
                                                            >
                                                                <MenuItem value="">
                                                                    <em>Select Price Range</em>
                                                                </MenuItem>
                                                                <MenuItem value="custom" style={{ display: 'none' }}>
                                                                    {`${minValue} - ${maxValue}$`}
                                                                </MenuItem>
                                                                {isArrayCheck(Price) &&
                                                                    Price.map((data, id) => (
                                                                        <MenuItem key={id} value={data?.id}>
                                                                            {data?.text}
                                                                        </MenuItem>
                                                                    ))}
                                                                <StyledPriceRange className="customInput">
                                                                    <TextField
                                                                        variant="outlined"
                                                                        label="Min"
                                                                        type="number"
                                                                        value={minValue}
                                                                        onClick={(e) => e.preventDefault()}
                                                                        onChange={(e) => setMinValue(e.target.value)}
                                                                    />
                                                                    <TextField
                                                                        variant="outlined"
                                                                        label="Max"
                                                                        type="number"
                                                                        value={maxValue}
                                                                        onChange={(e) => setMaxValue(e.target.value)}
                                                                    />

                                                                    <div className="text-center customInput">
                                                                        <button
                                                                            onClick={() => {
                                                                                setAge('custom');
                                                                                setOpenOption(!openOption);
                                                                            }}
                                                                        >
                                                                            Apply
                                                                        </button>
                                                                    </div>
                                                                </StyledPriceRange>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="color-designer">
                                                    <div className="row">
                                                        {/* <div className="col-md-6">
                                                            <h5>Colours</h5>
                                                            <div className="toggle-btn">
                                                                <ToggleButtonGroup value={alignments} exclusive onChange={handleChangeds}>
                                                                    <ToggleButton value="mono" className="border-left">
                                                                        Mono
                                                                    </ToggleButton>
                                                                    <ToggleButton value="neutrals" className="border-left">
                                                                        Neutrals
                                                                    </ToggleButton>
                                                                    <ToggleButton value="muted" className="border-left">
                                                                        Meuted
                                                                    </ToggleButton>
                                                                    <ToggleButton value="bright" className="border-left">
                                                                        Bright
                                                                    </ToggleButton>
                                                                    <ToggleButton value="pastel" className="border-0">
                                                                        Pastel
                                                                    </ToggleButton>
                                                                </ToggleButtonGroup>
                                                            </div>
                                                        </div> */}
                                                        <div className="col-md-12">
                                                            <h5>Category</h5>
                                                            <div className="check-icons">
                                                                {isArrayCheck(all_categories_data) &&
                                                                    all_categories_data?.map((data, id) => {
                                                                        return (
                                                                            <div
                                                                                className="align-items-center check"
                                                                                onClick={() => {
                                                                                    if (selectCategory.includes(data?._id)) {
                                                                                        setselectCategory(
                                                                                            selectCategory.filter((x) => x !== data?._id)
                                                                                        );
                                                                                    } else {
                                                                                        setselectCategory([...selectCategory, data?._id]);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <Checkbox
                                                                                    {...label}
                                                                                    // icon={<CircleOutlinedIcon />}
                                                                                    // checkedIcon={<CircleIcon />}
                                                                                    checked={selectCategory.includes(data?._id)}
                                                                                />
                                                                                <p>{data?.name}</p>
                                                                            </div>
                                                                        );
                                                                    })}
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12" style={{ marginTop: '30px' }}>
                                                            <h5>Designer</h5>
                                                            <div className="check-icons">
                                                                {isArrayCheck(all_users) &&
                                                                    all_users?.map((data, id) => {
                                                                        return (
                                                                            <div
                                                                                className="align-items-center check"
                                                                                onClick={() => {
                                                                                    if (selectDesigner.includes(data?._id)) {
                                                                                        setselectDesignerValue(
                                                                                            selectDesigner.filter((x) => x !== data?._id)
                                                                                        );
                                                                                    } else {
                                                                                        setselectDesignerValue([
                                                                                            ...selectDesigner,
                                                                                            data?._id
                                                                                        ]);
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <Checkbox
                                                                                    {...label}
                                                                                    // icon={<CircleOutlinedIcon />}
                                                                                    // checkedIcon={<CircleIcon />}
                                                                                    checked={selectDesigner.includes(data?._id)}
                                                                                />
                                                                                <p>{data?.fullname}</p>
                                                                            </div>
                                                                        );
                                                                    })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="list-detail">
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
                                                </div> */}

                                                {/* <div className="see-more text-center">
                                                    <Button>See More</Button>
                                                </div> */}

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

export default ShopFilterBar;
