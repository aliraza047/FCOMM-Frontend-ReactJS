import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoriesCarouselItem from './StoriesCarouselItem';
import { isArrayCheck } from 'views/utilities/common';
import { useSelector } from 'react-redux';
import { base_url_new } from 'utils/config';
import { formatedDate } from 'utils/helper';

function StoriesCarousel() {
    const { all_home_data } = useSelector((state) => state._home);
    const { all_blogs_data } = useSelector((state) => state._homeBlog);
    const [blogLength, setBlogLength] = useState(all_blogs_data.length < 3 ? all_blogs_data.length : 3);
    console.log("all_blogs_data.length",all_blogs_data.length,blogLength)
    const settings = {
        className: 'center',
        infinite: true,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: blogLength,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: false,
                }
            }
        ]
    };
    useEffect(()=>{},[window.screen.width])
    return (
        <div className="stories-crousel">
            <div className="container">
                <h5>You may also like</h5>
                {window.screen.width < 1024 ? (
                    <Slider {...settings}>
                        {all_blogs_data.map((data, id) => (
                            <StoriesCarouselItem
                                img={
                                    data?.image
                                        ? base_url_new + data?.url
                                        : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                                }
                                text={data?.name}
                                date={formatedDate(data?.created_at)}
                                data={data}
                                type="stories"
                            />
                        ))}
                    </Slider>
                ) : (
                    <div>
                        <div className={`${isArrayCheck(all_blogs_data) && all_blogs_data.length >= 3 ? '' : 'd-none'}`}>
                            <Slider {...settings}>
                                {all_blogs_data.map((data, id) => (
                                    <StoriesCarouselItem
                                        img={
                                            data?.image
                                                ? base_url_new + data?.url
                                                : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                                        }
                                        text={data?.name}
                                        date={formatedDate(data?.created_at)}
                                        data={data}
                                        type="stories"
                                    />
                                ))}
                            </Slider>
                        </div>

                        <div
                            className={`d-flex flex-row text-center single-img justify-content-center ${
                                isArrayCheck(all_blogs_data) && all_blogs_data.length >= 3 ? 'd-none' : ''
                            }`}
                        >
                            {all_blogs_data.map((data, id) => (
                                <StoriesCarouselItem
                                    img={
                                        data?.image
                                            ? base_url_new + data?.url
                                            : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                                    }
                                    text={data?.name}
                                    date={formatedDate(data?.created_at)}
                                    data={data}
                                    type="stories"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StoriesCarousel;
