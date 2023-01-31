import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { filterBlog } from 'redux/action/Customer.Action/Blog';
import { useDispatch, useSelector } from 'react-redux';

function FilterBar({ handleSearch, noOfStories }) {
    const dispatch = useDispatch();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        console.log(event.target.value)
        setAge(event.target.value);
        dispatch(filterBlog({type: event.target.value})
        );
    };
    return (
        <div>
            <div className="filter-bar">
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
                            <p>{noOfStories} Stories</p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6 text-end">
                            {' '}
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                    <MenuItem value="">
                                        <em>All</em>
                                    </MenuItem>
                                    <MenuItem value={"all"}>A-Z</MenuItem>
                                    <MenuItem value={"desc"}>Descending</MenuItem>
                                    <MenuItem value={"asc"}>Ascending</MenuItem>
                                    {/* <MenuItem value={""}></MenuItem> */}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterBar;
