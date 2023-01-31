import React from 'react';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ToggleButton from '@mui/material/ToggleButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const RuleAddEdit = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [alignment, setAlignment] = React.useState(false);

    const [devices, setDevices] = React.useState(() => ['phone']);

    const handleAlignment = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const radios = [
        { name: 'All', value: '1' },
        { name: 'My Thread', value: '2' }
    ];

    return (
        <div className="row">
            <div className="ruleaddedit">
                <div className="heading">
                    <h2>Settings - Cart Rules - Add/Edit</h2>
                </div>
                <div className="col-md-6">
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Rule Name
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="Write rule name..." />
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Typography className="label mt-4" variant="p" component="p">
                                Description
                            </Typography>
                            <TextareaAutosize
                                className="w-100 form-control"
                                aria-label="minimum height"
                                minRows={4}
                                placeholder="Write description..."
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Active
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="Write rule name..." />
                    </div>
                    <div className="socialaccount">
                        <p> Add Coupan</p>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Coupan
                        </label>
                        <div className="filter-fields">
                            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">
                                    <em>Select Specific Coupan</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Coupon Code
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="#" />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Coupon Lenght
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="#" />
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Code Format
                        </label>
                        <div className="filter-fields">
                            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">
                                    <em>Alphanumeric</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="input-field">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox  />} label="Use Auto Generation" />
                            </FormGroup>
                            <div className=" seperation">
                        <p className='m-0'>If you select and save the rule you will be able to generate multiple coupon codes.</p>                        <div className="addsocial-btn">
                            <Button variant="contained" className="addsocialbtn">
                                Generate
                            </Button>
                        </div>
                    </div>
                            </div>

                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Code Prefix
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="" />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Code Suffix
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="" />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Dash Every X Characters
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="0" />
                    </div>
                    <div className=" seperation">
                        <p> If empty not seperation</p>
                        <div className="addsocial-btn">
                            <Button variant="contained" className="addsocialbtn">
                                Generate
                            </Button>
                        </div>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            FSH-DEMO1
                        </label>
                        <div className="generated-coupon">
                            <p>Generated Coupon </p>
                        </div>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Uses per Customer
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="#" />
                    </div>
                    <div className="col-md-4">
                        <div className="row date-selector">
                            <div className=" mb-2">
                                <label htmlFor="">From</label>
                                <DatePicker
                                    filterDate={(d) => {
                                        return new Date() > d;
                                    }}
                                    placeholderText="Select start date..."
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy"
                                    selected={endDate}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    onChange={(date) => setEndDate(date)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row date-selector">
                            <div className=" mb-2">
                                <label htmlFor="">To</label>
                                <DatePicker
                                    filterDate={(d) => {
                                        return new Date() > d;
                                    }}
                                    placeholderText="Select end date..."
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy"
                                    selected={endDate}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    onChange={(date) => setEndDate(date)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Priority
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="#" />
                    </div>
                    <div className="conditions">
                        <p>
                            {' '}
                            Conditions <span>(Apply the rule only following conditions is true)</span>
                        </p>
                        <div className="addsocial-btn">
                            <Button variant="contained" className="addsocialbtn">
                                +Add Condition
                            </Button>
                        </div>
                    </div>
                    <div className="input-field condition">
                        <label className="label" htmlFor="user-name">
                            Conditions
                        </label>
                        <div className="filter-fields">
                            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">
                                    <em>Category</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Total Weight
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="#" />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Payment Method
                        </label>
                        <div className="filter-fields">
                            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="socialaccount">
                        <p> If empty not seperation</p>
                        <div className="addsocial-btn">
                            <Button variant="contained" className="addsocialbtn">
                                Generate
                            </Button>
                        </div>
                    </div>
                    <div className="input-field condition">
                        <label className="label" htmlFor="user-name">
                            Conditions
                        </label>
                        <div className="filter-fields">
                            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">
                                    <em>Category</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Price on cart
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="#" />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Category
                        </label>
                        <div className="filter-fields">
                            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">
                                    <em>Category</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="socialaccount">
                        <p> Actions</p>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Apply
                        </label>
                        <div className="filter-fields">
                            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Discount Amount
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="#" />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Maximum Qty Discount is Applied To
                        </label>
                        <input type="text" className="form-control " name="user-name" placeholder="#" />
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Apply to Shipping Amount
                        </label>
                        <div className="col-lg-6 col-md-6">
                            <div className="approved">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="toggle">
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={alignment}
                                            exclusive
                                            onChange={handleAlignment}
                                            aria-label="text alignment"
                                        >
                                            <ToggleButton value={true}>ON</ToggleButton>
                                            <ToggleButton value={false}>OFF</ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="user-name">
                            Free Shipping
                        </label>
                        <div className="filter-fields">
                            <Select value={age} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RuleAddEdit;
