import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addSetting, editSetting, getSetting } from 'redux/action/Setting';
import { isArrayCheck } from 'views/utilities/common';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const StyledRange = styled.div`
    margin-bottom: 20px;
    input {
        display: inline-block;
        width 200px;
        margin-right: 10px;
    }
`;

const PriceRangeSettings = () => {
    const { setting } = useSelector((state) => state._setting);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [stateRange, setStateRange] = useState(setting?.priceRange ?? []);

    useEffect(() => {
        dispatch(getSetting());
    }, []);

    useEffect(() => {
        setStateRange(setting?.priceRange ?? []);
    }, [setting]);

    const handleChange = (field, value, index) => {
        setStateRange((prev) => {
            const prevValues = [...prev];
            if (prevValues[index]) {
                prevValues[index][field] = Number(value);
            }

            return prevValues;
        });
    };

    const handleAdd = () => {
        setStateRange([...stateRange, { min: stateRange.length === 0 ? 0 : Number(stateRange[stateRange.length - 1].max) + 1, max: 0 }]);
    };

    const handleDelete = (index) => {
        setStateRange((prev) => {
            const prevValues = [...prev];
            prevValues.splice(index, 1);

            return prevValues;
        });
    };

    const handleSave = () => {
        const fields = {
            priceRange: stateRange,
            id: setting?._id
        };
        setting ? dispatch(editSetting(fields)) : dispatch(addSetting(fields));
    };

    return (
        <div className="row">
            <div className="contactussettings">
                <div className="heading">
                    <h2>Settings - Price Range</h2>
                </div>
                <div className="col-md-6">
                    <div className="socialaccount">
                        <p> Price Range</p>
                        <div className="row">
                            <div className="col-12 d-flex flex-row flex-wrap">
                                {isArrayCheck(stateRange) &&
                                    stateRange?.map((data, index) => (
                                        <StyledRange>
                                            <input
                                                type="number"
                                                className="form-control "
                                                name={`min${index}`}
                                                placeholder="Min"
                                                value={data.min}
                                                onChange={(e) => handleChange('min', e.target.value, index)}
                                            />
                                            <input
                                                type="number"
                                                className="form-control "
                                                name={`max${index}`}
                                                placeholder="Max"
                                                value={data.max}
                                                onChange={(e) => handleChange('max', e.target.value, index)}
                                            />

                                            <DeleteIcon
                                                className="removeicon"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleDelete(index)}
                                            />
                                        </StyledRange>
                                    ))}
                            </div>
                        </div>

                        <div className="addsocial-btn">
                            <Button variant="contained" className="addsocialbtn" onClick={() => handleAdd()}>
                                +Add Range
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="save-btn">
                    <Button variant="contained" className="savebtn px-5 mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>

                    <Button variant="contained" className="savebtn" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PriceRangeSettings;
