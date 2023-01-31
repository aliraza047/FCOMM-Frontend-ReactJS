import React, { useRef, useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import { DayInNumber, isArrayCheck, MonthInNumber, YearInNumber } from 'views/utilities/common';
import { validateEmail } from 'utils/helper';
import makeToast from 'utils/Toaster';

const usePlaceholderStyles = styled((theme) => ({
    placeholderClass: {
        color: '#9f9e9e'
    }
}));

const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholderClass}>{children}</div>;
};
function DropdownSelector({ placeholder, value, setValue, listData, showText, setText }) {
    console.log('Dropdiwn Value', value);
    return (
        <Select
            value={value}
            displayEmpty
            onChange={(event) => setValue(event)}
            renderValue={value !== '' ? undefined : () => <Placeholder>{placeholder}</Placeholder>}
        >
            {isArrayCheck(listData) && listData.map((data) => <MenuItem value={data[setText]}>{data[showText]}</MenuItem>)}
        </Select>
    );
}

export default DropdownSelector;
