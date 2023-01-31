import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { base_url_new } from 'utils/config';

function FollowingCarouselItem({ img, text, data}) {
    const navigate = useNavigate();

    return (
        <div className="stories-crousel" onClick={() => navigate(`/stories-details/${data?._id}`)}>
            <img src={img} alt="" />
            <Typography variant="h6" component="h6" style={{ marginBottom: 5 }}>
                {text}
            </Typography>
        </div>
    );
}

export default FollowingCarouselItem;
