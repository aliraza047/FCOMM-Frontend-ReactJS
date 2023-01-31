import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AsianFirst from '../../images/asian-first.png';
import Quality from '../../images/quality.png';
import Sustain from '../../images/sustain.png';
import { base_url, base_url_new } from 'utils/config';
import { useNavigate } from 'react-router';

function ProductCard({ data }) {
    const navigate = useNavigate();
    return (
        <>
        {/* <div className="col-md-4 my-3 text-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/shop-dtails', { state: data })}>
            <Avatar alt="Icon" src={data?.productImage ? base_url_new + data?.productImage[0]?.url : User} />
            <Typography variant="h1" component="h1" gutterBottom>
                {data?.name}
            </Typography>
            <Typography variant="p" component="p" gutterBottom>
                {data?.notes ? data?.notes : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quasi!'}
            </Typography>
        </div> */}
         <div className="col-md-4 my-3 text-center" style={{ cursor: 'pointer' }} >
         <Avatar alt="Icon" src={AsianFirst} />
         <Typography variant="h1" component="h1" gutterBottom>
         Asian First
         </Typography>
         <Typography variant="p" component="p" gutterBottom>
         We believe in the potential of Asian
        Designers. Given the right patrons and
        platform, Asian designs can push the
        boundaries of what is possible akin to their
            global peers.
         </Typography>
     </div>
     <div className="col-md-4 my-3 text-center" style={{ cursor: 'pointer' }} >
         <Avatar alt="Icon" src={Quality} />
         <Typography variant="h1" component="h1" gutterBottom>
         Quality Craftmanship
         </Typography>
         <Typography variant="p" component="p" gutterBottom>
         Asia has a rich history of artisanal craftsmanship. Our large network of factories and robust logistics network
         ensures that you receive quality products, each time, every time.
         </Typography>
     </div>
     <div className="col-md-4 my-3 text-center" style={{ cursor: 'pointer' }} >
         <Avatar alt="Icon" src={Sustain} />
         <Typography variant="h1" component="h1" gutterBottom>
         Sustainability
         </Typography>
         <Typography variant="p" component="p" gutterBottom>
         From processes to products, OUR is
  committed to championing the
sustainability movement. We curate
designers and manufacturers who share
    our philosophy regularly.
         </Typography>
     </div>
        </>
    );
}

export default ProductCard;
