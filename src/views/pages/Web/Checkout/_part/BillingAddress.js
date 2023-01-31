import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DropdownSelector from 'ui-component/dropdown';
import { City, Country, State } from 'country-state-city';
function BillingAddress({ values, handleChange, handleSave }) {
    const [editType, seteditType] = useState(true);
    console.log('BillingAddress ', values);
    return (
        <div>
            <div className="billing-address">
                <div className="container">
                    <div className="text-center">
                        <h5>Check Out</h5>
                    </div>
                    <div className="billing-box">
                        <div className="row">
                            {editType ? (
                                <div className="col-lg-6 col-md-8">
                                    <h6>Billing Address</h6>
                                    <p>{values.houseNo}</p>
                                    <p>{values.streetNo}</p>
                                    <p>{values.poBoxNo}</p>
                                    <p>{values.country}</p>
                                    <p>{values.city}</p>
                                    <p>{values.state}</p>
                                </div>
                            ) : (
                                <div className="col-lg-6 col-md-8">
                                    <h6>Billing Address</h6>
                                    <div className="input-field">
                                        <label htmlFor="user-name">House No.</label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={values.houseNo}
                                            name="user-name"
                                            onChange={handleChange('houseNo')}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="user-name">Street</label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={values.streetNo}
                                            name="user-name"
                                            onChange={handleChange('streetNo')}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="user-name">Pobox No.</label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={values.poBoxNo}
                                            name="user-name"
                                            onChange={handleChange('poBoxNo')}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="user-name">Country</label>
                                        <DropdownSelector
                                            listData={Country.getAllCountries()}
                                            placeholder={'Select Country'}
                                            setValue={handleChange('countryCode')}
                                            showText={'name'}
                                            setText={'isoCode'}
                                            value={values.countryCode}
                                        />
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="user-name">State</label>
                                        <DropdownSelector
                                            listData={State.getStatesOfCountry(values.countryCode)}
                                            placeholder={'Select State'}
                                            setValue={handleChange('stateCode')}
                                            showText={'name'}
                                            setText={'isoCode'}
                                            value={values.stateCode}
                                        />
                                        {/* <input
                                            type="text"
                                            className="form-control "
                                            value={values.state}
                                            name="user-name"
                                            onChange={handleChange('state')}
                                        /> */}
                                    </div>

                                    <div className="input-field">
                                        <label htmlFor="user-name">City</label>
                                        <DropdownSelector
                                            listData={City.getCitiesOfState(values.countryCode, values.stateCode)}
                                            placeholder={'Select City'}
                                            setValue={handleChange('city')}
                                            showText={'name'}
                                            setText={'name'}
                                            value={values.city}
                                        />
                                        {/* <input
                                            type="text"
                                            className="form-control "
                                            value={values.city}
                                            name="user-name"
                                            onChange={handleChange('state')}
                                        /> */}
                                    </div>
                                </div>
                            )}
                            <div className="col-lg-6 col-md-4 d-grid align-items-end">
                                <div className="edit-btn">
                                    {!editType && (
                                        <Button
                                            className="brownBtn mx-2"
                                            onClick={() => {
                                                seteditType(!editType);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    )}

                                    <Button
                                        className="brownBtn"
                                        onClick={() => {
                                            if (!editType) {
                                                handleSave();
                                                seteditType(true);
                                            }
                                            seteditType(!editType);
                                        }}
                                    >
                                        {editType ? 'Select Address' : 'Confirm Address'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillingAddress;
