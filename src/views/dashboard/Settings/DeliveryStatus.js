import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addSetting, editSetting, getSetting } from 'redux/action/Setting';
import { isArrayCheck } from 'views/utilities/common';
import styled from "styled-components";
import DataTable from 'react-data-table-component';
import { column_delivery_status } from 'views/utilities/extra';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { addMethodArray, removeMethodArray } from 'utils/helper';
import { useLocation, useNavigate } from 'react-router';

const StyledRange = styled.div`
    margin-bottom: 20px;
    input {
        display: inline-block;
        width 200px;
        margin-right: 10px;
    }
`

const DeliveryStatus = () => {
    const { setting } = useSelector((state) => state._setting);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [statusAdd, setStatusAdd] = useState('');
    const [row, setrow] = useState([]);

    useEffect(() => {
        dispatch(getSetting());
    }, []);

    useEffect(() => {
        if (isArrayCheck(setting?.logisticStatusOrder)) {
            makeRow();
        }
    }, [setting]);

    const makeRow = () => {
        var data =
            Array.isArray(setting?.logisticStatusOrder) && setting?.logisticStatusOrder.length > 0
                ? setting?.logisticStatusOrder.map((data, id) => ({
                    id: id + 1,
                    status: data?.status,
                    action: (
                        <div>
                            <button className="detail-btn mx-1" onClick={() => navigate('/dashboard/editstatusDelivery', { state: data })}>
                                  Edit
                              </button>
                            <button className="detail-btn" onClick={() => handleDelete(data)}>
                                Delete
                            </button>
                        </div>
                    )
                }))
                : [];
        setrow(data);
    };


    const handleAdd = () => {
        if (statusAdd) {
            const statusObj = {status: statusAdd}
            const allData = addMethodArray(setting?.logisticStatusOrder , statusObj )
            const fields = {
                logisticStatusOrder: allData,
                id: setting?._id
            };
            console.log('fields', fields)
            setting ? dispatch(editSetting(fields)) : dispatch(addSetting(fields));
            setStatusAdd('')
        }
    };

    const handleDelete = (obj) => {
        let arrStatus = setting?.logisticStatusOrder
        const updatedData = removeMethodArray(arrStatus , obj)
        const fields = {
            logisticStatusOrder: updatedData,
            id: setting?._id
        };
        console.log('handleDelete', fields)
        dispatch(editSetting(fields))
    }

    return (
        <div className='list-orders'>
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
                                    onChange={e => setStatusAdd(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="addsocial-btn">
                            <Button variant="contained" className="addsocialbtn" onClick={() => handleAdd()}>
                                +Add Delivery Status
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <DataTable
                        columns={column_delivery_status}
                        data={row}
                        defaultSortFieldId={1}
                        sortIcon={<ArrowDownwardIcon />}
                        // onSelectedRowsChange={(data) => selectedDataRow(data)}
                        pagination
                        selectableRows
                        responsive
                    />
                </div>
            </div>
        </div>
        </div>
    );
};

export default DeliveryStatus;
