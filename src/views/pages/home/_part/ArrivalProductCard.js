import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { base_url_new } from 'utils/config';

function ArrivalProductCard({ data, arrival }) {
    const navigate = useNavigate();
    return (
        <div style={{ cursor: 'pointer' }} onClick={() => navigate(`/shop-dtails/${data._id}`, { state: data })}>
            {arrival ? <img src={base_url_new + data?.productImage[0]?.url} alt="" /> : <img src={base_url_new + data?.url} alt="" />}
            <Typography variant="p" component="p">
                {data?.name}
            </Typography>
        </div>
    );
}

export default ArrivalProductCard;
