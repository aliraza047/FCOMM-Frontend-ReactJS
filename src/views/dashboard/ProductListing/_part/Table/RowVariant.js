import React, { useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlineOutlinedIcon from '@mui/icons-material/EditOutlined';

import Image from '../../../../../assets/images/home/card1.png';
import { base_url_new } from 'utils/config';
import { isArrayCheck } from 'views/utilities/common';

function RowVariant({ data, setVisibleModal, setsingleData, deleteStateVariant }) {
    const [open, setopen] = useState(false);
    console.log('Variant', data);
    const image = isArrayCheck(data?.varaintImage);
    return (
        <tr>
            <td>
                <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        value={open}
                        defaultChecked={open}
                        // defaultValue={open}
                        id="product"
                        onChange={(e) => setopen(!open)}
                    />
                </div>
                {/* <DeleteOutlineOutlinedIcon className="delIcon" /> */}
            </td>
            <td>
                <img src={image ? base_url_new + data?.varaintImage[0]?.url : Image} alt="" />
            </td>
            <td>{data?.name ? data?.name : 'Name'}</td>
            <td>{data?.size}</td>
            <td>{data?.color}</td>
            <td>{data?.stock}</td>
            <td>{data?.price}</td>
            <td>{data?.sku}</td>
            <td>
                {open ? (
                    <>
                        <DeleteOutlineOutlinedIcon className="delIcon" onClick={() => deleteStateVariant(data?._id)} />
                        {/* <EditOutlineOutlinedIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setsingleData(data);
                                setVisibleModal(true);
                            }}
                        /> */}
                    </>
                ) : null}
            </td>
        </tr>
    );
}

export default RowVariant;
