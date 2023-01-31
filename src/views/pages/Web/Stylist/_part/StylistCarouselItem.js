import { Typography } from '@mui/material';
import React from 'react';
import { base_url_new } from 'utils/config';

function StylistCarouselItem({ img, text}) {
    return (
        <div className="stories-crousel">
            <img src={img} alt="" />
            <Typography variant="h6" component="h6" style={{ marginBottom: 5 }}>
                {text}
            </Typography>
        </div>
    );
}

export default StylistCarouselItem;
