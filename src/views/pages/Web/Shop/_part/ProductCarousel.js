import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoriesCarouselItem from './StoriesCarouselItem';
import { isArrayCheck } from 'views/utilities/common';
import { useSelector , useDispatch} from 'react-redux';
import { base_url_new } from 'utils/config';
import { formatedDate } from 'utils/helper';
import { getProductsByCategory } from 'redux/action/Customer.Action/Product';

function ProductCarousel({product}) {
   console.log('gg',product)
    const dispatch = useDispatch();
    const { all_home_data } = useSelector((state) => state._home);
    const { all_blogs_data } = useSelector((state) => state._homeBlog);
    const { all_products_data } = useSelector((state) => state._homeProduct);
    const [productLength, setProductLength] = useState(all_products_data.length < 3 ? all_products_data.length : 3);

    useEffect(() => {
        setProductLength(all_products_data.length < 3 ? all_products_data.length : 3)
    }, [all_products_data])

    useEffect(() => {
        if(product){
            dispatch( getProductsByCategory({id: product?.category})); 
        }
    },[])

    const settings = {
        className: 'center',
        infinite: true,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: productLength,
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

    
    // useEffect(() => {
    //     dispatch( getProductsByCategory({category: product[0]?.category})); 
    // }, [product]);
    useEffect(() => {}, [window.screen.width]);
    return (
        <div className="stories-crousel">
            <div className="container">
                <h5>You may also like</h5>
                {window.screen.width < 1024 ? (
                    <Slider {...settings}>
                        {all_products_data.map((data, id) => (
                            <StoriesCarouselItem
                                img={
                                    isArrayCheck(data?.productImage)
                                        ? base_url_new + data?.productImage[0]?.url
                                        : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                                }
                                text={data?.name}
                                date={data?.totalPrice ? '$' + (Number(data?.totalPrice) + Number(data?.makerPrice)) : '0'}
                                data={data}
                            />
                        ))}
                    </Slider>
                ) : (
                    <div>
                        <div className={`${isArrayCheck(all_products_data) && all_products_data.length > 3 ? '' : 'd-none'}`}>
                            <Slider {...settings}>
                                {all_products_data.map((data, id) => (
                                    <StoriesCarouselItem
                                        img={
                                            isArrayCheck(data?.productImage)
                                                ? base_url_new + data?.productImage[0]?.url
                                                : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                                        }
                                        text={data?.name}
                                        date={data?.totalPrice ? '$' + (Number(data?.totalPrice) + Number(data?.makerPrice)) : '0'}
                                        data={data}
                                    />
                                ))}
                            </Slider>
                        </div>

                        <div
                            className={`d-flex flex-row text-center single-img justify-content-center ${
                                isArrayCheck(all_products_data) && all_products_data.length > 3 ? 'd-none' : ''
                            }`}
                        >
                            {all_products_data.map((data, id) => (
                                <StoriesCarouselItem
                                    img={
                                        isArrayCheck(data?.productImage)
                                            ? base_url_new + data?.productImage[0]?.url
                                            : 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'
                                    }
                                    text={data?.name}
                                    date={data?.totalPrice ? '$' + (Number(data?.totalPrice) + Number(data?.makerPrice)) : '0'}
                                    data={data}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductCarousel;
