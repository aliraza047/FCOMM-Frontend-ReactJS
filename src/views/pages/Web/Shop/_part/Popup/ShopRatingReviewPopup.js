import { Dialog, DialogContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { Log } from 'utils/helper';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import { useDispatch } from 'react-redux';
import { addReview } from 'redux/action/Product/index';
import makeToast from 'utils/Toaster';
function ShopRatingReviewPopup({ open, handleClose, data }) {
    const [fullWidth, setFullWidth] = React.useState(true);
    const [ratingStars, setratingStars] = React.useState(0);
    const [ratingText, setratingText] = React.useState('');

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
    const dispatch = useDispatch();

    const getProductDesc = (value) => {
        if (!value)
            return "";

        if (value.length > 200) 
            return `${value.substring(0, 200)} ...`;

        return value;
    }

    Log('Orders Data=>', data);
    const handleSave = () => {
        Log('input', { ratingStars, ratingText, id: data.productId });
        if (ratingStars && ratingText) {
            addReview(
                {
                    prodId: data.productId?._id,
                    rating: ratingStars,
                    review: ratingText,
                    designer: data.productId?.designer?._id
                },
                handleClose
            );
        } else {
            makeToast('error', 'Kindly fill all the fields.');
        }
    };
    return (
        <Dialog
            open={open}
            fullWidth={fullWidth}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="customModalMain"
        >
            <DialogContent className="customModal">
                <div className="col-md-12 col-12 mx-auto text-center">
                    <div className="col-md-12">
                        <div className="product-img">
                            <div className="d-flex">
                                <img
                                    src={
                                        isArrayCheck(data.productId?.productImage)
                                            ? base_url_new + data.productId?.productImage[0]?.url
                                            : 'https://wallpapercave.com/wp/wp2577393.jpg'
                                    }
                                    alt=""
                                />
                                <div>
                                    <h5 style={{fontWeight: "bold"}}>{data.productId?.name}</h5>
                                    <p style={{textAlign: "justify"}}>{getProductDesc(data.productId?.description)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rating text-center">
                        <Rating
                            name="size-medium"
                            value={ratingStars}
                            defaultValue={0}
                            size="small"
                            onChange={(e) => setratingStars(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12">
                        <textarea
                            name=""
                            type="text"
                            placeholder="Leave your review here..."
                            id=""
                            cols="30"
                            rows="10"
                            onChange={(e) => setratingText(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="dialog-buttons">
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-12">
                                <Button variant="contained" className="no" onClick={handleSave}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ShopRatingReviewPopup;
