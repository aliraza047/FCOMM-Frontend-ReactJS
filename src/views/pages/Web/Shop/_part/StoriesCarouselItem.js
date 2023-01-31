import { Typography } from '@mui/material';
import React from 'react';
import { base_url_new } from 'utils/config';
import { useNavigate } from 'react-router';

function StoriesCarouselItem({ img, text, date, data, type = 'product' }) {
    const navigate = useNavigate();
    return (
        <div className="stories-crousel" onClick={() => navigate(`/shop-dtails/${data._id}`, { state: data })}>
            <img src={img} alt="" />
            <Typography variant="h6" component="h6" style={{ marginBottom: 5 }}>
                {text}
            </Typography>
            <small>{date}</small>
        </div>
    );
}

export default StoriesCarouselItem;
