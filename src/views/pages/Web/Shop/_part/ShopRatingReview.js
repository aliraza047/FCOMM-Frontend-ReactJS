import React, { useEffect , useState} from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import Rating from '@mui/material/Rating';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShopFilterBar from '../_detailPart/ShopFilterBar';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShopRatingReviewPopup from './Popup/ShopRatingReviewPopup';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsByProductId } from 'redux/action/Product/index';
import { isArrayCheck } from 'views/utilities/common';
import { base_url } from 'utils/config';
import { formatedDate } from 'utils/helper';
function ShopRatingReview({ product }) {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(2);
    const { all_products_reviews } = useSelector((state) => state._product);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [open, setOpen] = React.useState(false);
    const [notifyToShow, setNotifyToShow] = useState(1);

    console.log('<=== Check Review Product data', all_products_reviews);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
    };
    const [fullWidth, setFullWidth] = React.useState(true);
    const [selectedUser, setselectedUser] = React.useState('');

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    useEffect(() => {
        dispatch(getReviewsByProductId(product?._id));
    }, [product]);
    return (
        <>
            <div className="shop-rating-review">
                <div className="container">
                    <div className="reviews">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <div className="review-section">
                                    <div className="d-flex align-items-center">
                                        <h6>Reviews</h6>
                                        <small>
                                            |{isArrayCheck(all_products_reviews?.reviews) ? all_products_reviews?.reviews?.length : 0}|
                                        </small>
                                    </div>
                                    <div className="star">
                                        <Rating name="simple-controlled" value={Number(all_products_reviews?.rating?.average)} />
                                    </div>
                                    <p>{all_products_reviews?.rating?.average} out of 5</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="rating-checkbox">
                                    <div className="d-flex align-items-center">
                                        <Checkbox {...label} />
                                        <p>5 stars</p>
                                        <div className="progressbar">
                                            <ProgressBar now={all_products_reviews?.rating?.five} />
                                        </div>
                                        <p>{all_products_reviews?.rating?.five}%</p>
                                    </div>
                                </div>
                                <div className="rating-checkbox">
                                    <div className="d-flex align-items-center">
                                        <Checkbox {...label} />
                                        <p>4 stars</p>
                                        <div className="progressbar">
                                            <ProgressBar now={all_products_reviews?.rating?.four} />
                                        </div>
                                        <p>{all_products_reviews?.rating?.four}%</p>
                                    </div>
                                </div>
                                <div className="rating-checkbox">
                                    <div className="d-flex align-items-center">
                                        <Checkbox {...label} />
                                        <p>3 stars</p>
                                        <div className="progressbar">
                                            <ProgressBar now={all_products_reviews?.rating?.three} />
                                        </div>
                                        <p>{all_products_reviews?.rating?.three}%</p>
                                    </div>
                                </div>
                                <div className="rating-checkbox">
                                    <div className="d-flex align-items-center">
                                        <Checkbox {...label} />
                                        <p>2 stars</p>
                                        <div className="progressbar">
                                            <ProgressBar now={all_products_reviews?.rating?.two} />
                                        </div>
                                        <p>{all_products_reviews?.rating?.two}%</p>
                                    </div>
                                </div>
                                <div className="rating-checkbox">
                                    <div className="d-flex align-items-center">
                                        <Checkbox {...label} />
                                        <p>1 stars</p>
                                        <div className="progressbar">
                                            <ProgressBar now={all_products_reviews?.rating?.two} />
                                        </div>
                                        <p>{all_products_reviews?.rating?.two}%</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-4 col-md-2">
                                <div className="review-secti">
                                    <Button variant="contained" className="brownBtn" onClick={handleClickOpen}>
                                        Rate Us
                                    </Button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <ShopFilterBar
                        total={isArrayCheck(all_products_reviews?.reviews) ? all_products_reviews?.reviews?.length : 0}
                        type={'Reviews'}
                    /> */}
                    <div className="feedbacks">
                        {isArrayCheck(all_products_reviews?.reviews) &&
                            all_products_reviews?.reviews?.slice(0, notifyToShow).map((review, id) => (
                                <div className="customer-feedback">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4">
                                            <div className="img-name">
                                                <div className="d-flex">
                                                    <img
                                                        src={
                                                            review?.createdBy?.profile?.includes('http')
                                                                ? review?.createdBy?.profile
                                                                : base_url + review?.createdBy?.profile
                                                        }
                                                        alt=""
                                                    />
                                                    <h5>{review?.createdBy?.fullname}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-8">
                                            <div className="feedback">
                                                <div className="d-flex star-date">
                                                    <div className="star">
                                                        <div className="d-flex align-items-center">
                                                            <Rating name="simple-controlled" value={review?.rating} />
                                                            <p>{formatedDate(review?.created_at)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <h5>Lorem ipsum dolor sit</h5> */}
                                                <p className="description">{review?.review}</p>
                                                {isArrayCheck(all_products_reviews?.reviews) && all_products_reviews?.reviews.length > Number(notifyToShow) &&
                                                    <div className="d-flex justify-content-between">
                                                        <div className="see-more">
                                                            <Button
                                                                onClick={() => {
                                                                    if (isArrayCheck(all_products_reviews?.reviews) && all_products_reviews?.reviews.length < notifyToShow) {
                                                                        setNotifyToShow(
                                                                            notifyToShow + ((all_products_reviews?.reviews.length - notifyToShow) % 0 ? 1 : notifyToShow - all_products_reviews?.reviews.length)
                                                                        );
                                                                    } else {
                                                                        setNotifyToShow(notifyToShow + 1);
                                                                    }
                                                                }}>Read More</Button>
                                                        </div>
                                                        {/* <div className="thumb">
                                                        <div className="d-flex align-items-center">
                                                            <Checkbox
                                                                {...label}
                                                                icon={<ThumbUpOffAltIcon />}
                                                                checkedIcon={<ThumbUpAltIcon />}
                                                            />
                                                            <h5>5</h5>
                                                            <p>Found this helpful</p>
                                                        </div>
                                                    </div> */}
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {/* <ShopRatingReviewPopup open={open} handleClose={handleClose} /> */}
        </>
    );
}

export default ShopRatingReview;
