import React, { useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlineOutlinedIcon from '@mui/icons-material/EditOutlined';

import Image from '../../../../../assets/images/home/card1.png';
import { base_url_new } from 'utils/config';
import { isArrayCheck } from 'views/utilities/common';

function RowDetailPopup({ data, setVisibleModal, product, variant }) {
    const [open, setopen] = useState(false);
    console.log('Row detail Popup=>', data, product);
    const image = isArrayCheck(data?.varaintImage);
    const imageProduct = isArrayCheck(product?.productImage);

    return (
        <tr>
            <td>
                {variant ? (
                    <img src={image ? base_url_new + data?.varaintImage[0]?.url : Image} alt="" />
                ) : (
                    <img src={imageProduct ? base_url_new + data?.productImage[0]?.url : Image} alt="" />
                )}
            </td>
            <td>
                <p>{product?.name}</p>
            </td>
            {/* <td>
                <p>{product?.description}</p>
            </td> */}
            {/* <td>
                <p>{product?.description}</p>
            </td> */}
            {/* <td>
                <p>{product?.designer?.fullname}</p>
            </td> */}
            <td>
                <p>{variant ? data?.stock : product?.stock}</p>
            </td>
            <td>
                <p>({product?.length + ',' + product?.breadth + ',' + product?.height})</p>
            </td>
            <td>
                <p>{product?.weight}</p>
            </td>
            <td>
                <p>
                    <div
                        style={{
                            height: 25,
                            width: 25,
                            borderRadius: 100,
                            backgroundColor: data?.color ? data?.color : '#000',
                            borderWidth: 1,
                            borderColor: '#a4a4a4'
                        }}
                    ></div>
                </p>
            </td>
            <td>
                <p>${variant ? data?.makerPrice : product?.makerPrice}</p>
            </td>
            <td>
                <p>${variant ? data?.totalPrice : product?.totalPrice}</p>
            </td>
            <td>
                <p>${!variant ? Number(data?.makerPrice) + Number(data?.totalPrice) : product?.totalPrice}</p>
            </td>
            <td>
                <p>#{variant ? data?.sku : product?.sku}</p>
            </td>
        </tr>
    );
}

export default RowDetailPopup;
