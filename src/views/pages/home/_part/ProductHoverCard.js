import React from 'react';
import { useNavigate } from 'react-router';
import { base_url_new } from 'utils/config';
import { isArrayCheck } from 'views/utilities/common';
import CardImage from '../../../../assets/images/home/card1.png';
import User from '../../../../assets/images/not_found.png';

function ProductHoverCard({ data }) {
    console.log('Data', data);
    const navigate = useNavigate();
    return (
        <div className="col-md-6 mb-3">
            <div className="content">
                <div className="content-overlay"></div>
                <img className="content-image" src={isArrayCheck(data?.productImage) ? base_url_new + data?.productImage[0]?.url : User} />
                <div className="content-details fadeIn-bottom">
                    <h3 className="content-title">{data?.name}</h3>
                    {/* <h3 className="content-title">Floating Rock</h3> */}
                    <p className="content-text">
                        {data?.designer?.username ?? ''}
                        <br />${Number(data?.totalPrice) + Number(data?.makerPrice)}
                    </p>
                    <button onClick={() => navigate(`/shop-dtails/${data._id}`, { state: data })}>Shop</button>
                </div>
            </div>
        </div>
    );
}

export default ProductHoverCard;
