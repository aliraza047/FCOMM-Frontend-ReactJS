import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function FilterBar({ count }) {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div style={{ paddingTop: '30px', backgroundColor: '#fff8f2' }}>
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
                                <input type="text" class="input-search" placeholder="Type to Search..." />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6 text-md-center text-sm-start">
                            <p>{count} Products</p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6 text-end">
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                    <MenuItem value="">
                                        <em>Filter</em>
                                    </MenuItem>
                                    <MenuItem value={10}>A-Z</MenuItem>
                                    <MenuItem value={20}>Latest</MenuItem>
                                    <MenuItem value={30}>Our Designers</MenuItem>
                                    <MenuItem value={40}>Sustainability</MenuItem>
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
