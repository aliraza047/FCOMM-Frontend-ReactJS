import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import { base_url_new } from 'utils/config';
import card2 from '../../../../assets/images/home/card2.PNG';

function BlogsCard({ data }) {
    console.log('Blogs data', data);
    const navigate = useNavigate();

    return (
        <Card className="cardMain" onClick={() => navigate(`/stories-details/${data?._id}`)}>
            <CardMedia component="img" height="140" image={data?.image ? base_url_new + data?.url : card2} alt="card1" />
            <CardContent>
               <div>
               <Typography gutterBottom variant="h3" component="h3">
                    {data?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data?.description?.substring(0, 200)}
                </Typography>
               </div>
                <Button size="small">Read More</Button>
            </CardContent>
        </Card>
    );
}

export default BlogsCard;
