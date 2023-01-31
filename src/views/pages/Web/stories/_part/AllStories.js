import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Stories } from 'utils/data/stories/Index';
import { useNavigate } from 'react-router';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import { formatedDate } from 'utils/helper';

function AllStories({ blogsData }) {
    const [productToShow, setproductToShow] = useState(9);
    const navigate = useNavigate();
    return (
        <div>
            <div className="all-stories">
                <div className="container">
                    <div className="row">
                        {isArrayCheck(blogsData) &&
                            blogsData?.slice(0, productToShow)?.map((data, id) => (
                                <div className="col-lg-4 col-md-4">
                                    <div className="story-content">
                                        <img
                                            src={
                                                data?.image
                                                    ? base_url_new + data?.url
                                                    : 'https://i0.wp.com/www.itl.cat/pngfile/big/30-303191_background-images-for-editing-editing-pictures-background-background.jpg'
                                            }
                                            alt=""
                                            style={{cursor: "pointer"}}
                                            onClick={() => navigate(`/stories-details/${data?._id}`)}
                                        />
                                        <h5 style={{cursor: "pointer"}} onClick={() => navigate(`/stories-details/${data?._id}`)}>{data.name}</h5>
                                        <p className="date">{formatedDate(data?.created_at)}</p>
                                        <p className="description">{data.description?.substring(0, 100)}</p>
                                        <p className="read-more">
                                            <Button onClick={() => navigate(`/stories-details/${data?._id}`)}>Read More</Button>
                                        </p>
                                    </div>
                                </div>
                            ))}
                             {isArrayCheck(blogsData) && blogsData.length > Number(productToShow) &&
                        <div className="see-more text-center">
                            <Button
                                onClick={() => {
                                    if (isArrayCheck(blogsData) && blogsData.length < productToShow) {
                                        setproductToShow(
                                            productToShow + ((blogsData.length - productToShow) % 0 ? 9 : productToShow - blogsData.length)
                                        );
                                    } else {
                                        setproductToShow(productToShow + 9);
                                    }
                                }}
                            >
                                See More
                            </Button>
                        </div>}{' '}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllStories;
