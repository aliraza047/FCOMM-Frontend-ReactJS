import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { clearProductListing, getProductsByDesigner } from 'redux/action/Customer.Action/Product';
import { useSelector } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import styled from "styled-components";

import bgproduct from "assets/images/bgproduct.png";
import bgblur from "assets/images/bgblur.png";
import bgoval from "assets/images/bgoval.png";

function ShopDesigner({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { designer_products, designer_detail } = useSelector((state) => state?._homeProduct);
    console.log('Designer', designer_products, designer_detail);
    useEffect(() => {
        dispatch(getProductsByDesigner({ id: product?.designer?._id }));
        return () => {
            dispatch(clearProductListing());
        };
    }, []);
    return (
        <>
            <div className="shop-designer" style={{backgroundImage: `url(${bgproduct})`, padding: "0px"}}>
                <div className="shop-designer" style={{backgroundImage: `url(${bgblur})`, width: "100%"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-3"></div>
                            <div className="col-lg-4 col-md-6">
                                <div className="shop-designer-content">
                                    <h5>OUR presents</h5>
                                    <h3>{designer_detail?.studio ?? ""}</h3>
                                    <p>{designer_detail?.studioDesc ?? ""}</p>
                                    <Button variant="contained" onClick={() => navigate('/favourite-designer-products', { state: designer_detail })}>More from Designer</Button>
                                    <div className="designer-images">
                                        <div className="d-flex justify-content-between">
                                            {isArrayCheck(designer_products) &&
                                                designer_products
                                                    ?.slice(0, 4)
                                                    .map((data, id) => (
                                                        <img
                                                            src={
                                                                isArrayCheck(data?.productImage)
                                                                    ? base_url_new + data?.productImage[0]?.url
                                                                    : 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c29mYXxlbnwwfHwwfHw%3D&w=1000&q=80'
                                                            }
                                                            onClick={() => navigate(`/shop-dtails/${data?._id}`, { state: data })}
                                                            alt=""
                                                        />
                                                    ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopDesigner;
