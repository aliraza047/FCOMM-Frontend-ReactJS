import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addSetting, editSetting, getSetting } from 'redux/action/Setting';
import { isArrayCheck } from 'views/utilities/common';
import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import { column_delivery_status } from 'views/utilities/extra';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { addMethodArray, removeMethodArray } from 'utils/helper';
import { useLocation, useNavigate } from 'react-router';
import { makeStyles } from '@mui/material';

const StyledRange = styled.div`
    margin-bottom: 20px;
    input {
        display: inline-block;
        width 200px;
        margin-right: 10px;
    }
`;

const DeliveryStatus = () => {
    const { setting } = useSelector((state) => state._setting);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [statusAdd, setStatusAdd] = useState(state?.status);

    const handleAdd = () => {
        if (statusAdd) {
            const allData = setting?.logisticStatusOrder;
            const statusObj = { status: statusAdd, _id: state?._id };
            const index = allData.findIndex((x) => x._id == state?._id);
            console.log('index', index);
            if (index && isArrayCheck(allData)) {
                allData[index] = statusObj;
            }
            const fields = {
                logisticStatusOrder: allData,
                id: setting?._id
            };
            console.log('fields edit', fields);
            setting ? dispatch(editSetting(fields)) : dispatch(addSetting(fields));
            navigate('/dashboard/statusDelivery');
            setStatusAdd('');
        } else {
            makeToast('error', 'plz type status');
        }
    };
    useEffect(() => {
        dispatch(getSetting());
    }, []);

    return (
        <div className="list-orders">
            <div className="row">
                <div className="contactussettings">
                    <div className="heading">
                        <h2>Settings - Status Delivery</h2>
                    </div>
                    <div className="col-md-6">
                        <div className="socialaccount">
                            <p> Status</p>
                            <div className="row">
                                <div className="col-12 d-flex flex-row flex-wrap">
                                    <input
                                        type="text"
                                        className="form-control "
                                        placeholder="Add Delivery Status"
                                        value={statusAdd}
                                        onChange={(e) => setStatusAdd(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="addsocial-btn">
                                <Button variant="contained" className="addsocialbtn px-5 mx-2" onClick={() => navigate(-1)}>
                                    Cancel
                                </Button>

                                <Button variant="contained" className="addsocialbtn" onClick={() => handleAdd()}>
                                    +Edit Delivery Status
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryStatus;
