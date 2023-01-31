import React, { useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlineOutlinedIcon from '@mui/icons-material/EditOutlined';

import Image from '../../../../../assets/images/home/card1.png';
import { base_url_new } from 'utils/config';
import { isArrayCheck } from 'views/utilities/common';
import { editProduct, editVariant } from 'redux/action/Product';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function RowApprovalPopup({ data, setVisibleModal, setsingleData, product, variant }) {
    const [open, setopen] = useState(false);
    const [openShipping, setopenShipping] = useState(false);
    const [costPrice, setcostPrice] = useState(product?.makerPrice);
    const [shippingFee, setshippingFee] = useState(product?.shipping);
    const dispatch = useDispatch();
    const image = isArrayCheck(data?.varaintImage);
    const imageProduct = isArrayCheck(product?.productImage);
    const navigate = useNavigate();
    const { role } = useSelector((state) => state._auth);

    const updateVariant = () => {
        const obj = {
            id: product._id,
            makerPrice: costPrice,
            shipping: shippingFee
        };
        console.log({ obj });
        dispatch(editProduct(obj, navigate, false));
        setopen(false);
        setopenShipping(false);
    };

    console.log(data?.costPrice);
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
            <td>
                <p>{variant ? data?.stock : product?.stock}</p>
            </td>
            <td>
                {product.length || product.height || product.breadth ? (
                    <p>({product?.length + ',' + product?.breadth + ',' + product?.height})</p>
                ) : (
                    <p></p>
                )}
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
                <div className="d-flex">
                    {role === 'admin' ? (
                        <>
                            <input
                                type="number"
                                placeholder="Enter price"
                                style={{ width: 100 }}
                                value={costPrice}
                                onChange={(e) => {
                                    setcostPrice(e.target.value);
                                    setopen(true);
                                }}
                            />
                            {open ? (
                                <div
                                    className="btn btn-primary btn-sm mx-1"
                                    style={{ backgroundColor: '#c3724e', border: 'none' }}
                                    onClick={updateVariant}
                                >
                                    Update
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <p>${product?.makerPrice}</p>
                    )}
                </div>
            </td>
            {role === 'admin' && (
                <td>
                    <div className="d-flex">
                        <>
                            <input
                                type="number"
                                placeholder="Enter Shipping Fee"
                                style={{ width: 100 }}
                                value={shippingFee}
                                onChange={(e) => {
                                    setshippingFee(e.target.value);
                                    setopenShipping(true);
                                }}
                            />
                            {openShipping ? (
                                <div
                                    className="btn btn-primary btn-sm mx-1"
                                    style={{ backgroundColor: '#c3724e', border: 'none' }}
                                    onClick={updateVariant}
                                >
                                    Update
                                </div>
                            ) : null}
                        </>
                    </div>
                </td>
            )}
            <td>
                <p>${Number(product?.totalPrice) + Number(product?.makerPrice)}</p>
            </td>
            <td>
                <p>#{variant ? data?.sku : product?.sku}</p>
            </td>
        </tr>
    );
}

export default RowApprovalPopup;
