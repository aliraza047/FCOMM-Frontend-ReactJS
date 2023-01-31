import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from 'react-bootstrap/Carousel';
import Banner from '../../../assets/images/home/banner.png';
import card1 from '../../../assets/images/home/card1.png';
import card2 from '../../../assets/images/home/card2.PNG';
import card3 from '../../../assets/images/home/card3.PNG';
import card4 from '../../../assets/images/home/card4.PNG';
import slider1 from '../../../assets/images/home/slider1.PNG';
import slider2 from '../../../assets/images/home/slider2.PNG';
import slider3 from '../../../assets/images/home/slider3.PNG';
import social1 from '../../../assets/images/home/social1.PNG';
import Hafiz from '../images/hafiz.png';
import Felicia from '../images/felicia.png';
import Samuel from '../images/samuel.png';
import Stacey from '../images/stacey.png';
import Shafigah from '../images/shafigah.png';
import keneth from '../images/keneth.png';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Footer from '../layout/footer/index.js';
import Header from '../layout/header';
import ProductCard from './_part/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomData, isArrayCheck } from 'views/utilities/common';
import { getAllProducts } from '../../../redux/action/Product/index';
import { getAllCategories } from 'redux/action/Category';
import CategoryCard from './_part/CategoryCard';
import ProductHoverCard from './_part/ProductHoverCard';
import { getAllBlogs } from 'redux/action/Blog';
import BlogsCard from './_part/BlogsCard';
import { getHomePageData } from 'redux/action/Customer.Action/Home/Home';
import { AddInLocalStorage, console_log } from 'utils/helper';
import { base_url_new, server_url } from 'utils/config';
import { getBlogListing } from 'redux/action/Customer.Action/Blog';
import { getProductListing } from 'redux/action/Customer.Action/Product';
import { useNavigate } from 'react-router';
import ArrivalProductCard from './_part/ArrivalProductCard';

function Home() {
    const { all_products } = useSelector((state) => state._product);
    const { all_categories } = useSelector((state) => state._category);
    const { all_blogs } = useSelector((state) => state._blog);
    const { all_home_data } = useSelector((state) => state._home);
    const [featuresLength, setFeatureslength] = useState(
        all_home_data?.featuredCategories.length < 5 ? all_home_data?.featuredCategories.length : 5
    );
    console_log('Homepage', all_home_data);

    const [arrivalsLength, setArrrialsLength] = useState(all_home_data?.newArivals.length < 4 ? all_home_data?.newArivals.length : 4);

    const settings = {
        className: 'center',
        infinite: true,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: featuresLength,
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
    const setting = {
        className: 'center',
        infinite: true,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: arrivalsLength,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    centerMode: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: false,
                    centerMode: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    centerMode: false,
                }
            }
        ]
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getHomePageData());
        dispatch(getBlogListing());
        dispatch(getProductListing());
        // socket_connect();
    }, []);

    // const socket_connect = async () => {
    //     const token = await localStorage.getItem('jwtToken');
    //     window._socket = await io.connect(server_url, {
    //         query: `token=${token.split('Bearer ')[1]}`
    //     });

    //     window._socket.on('connect', () => {
    //         console.log('Connected to Socket');
    //         window._socket.on('message.received', (data) => {
    //             console.log('Message', data);
    //         });
    //     });
    // };
    useEffect(() => {
        AddInLocalStorage("home")
    }, [window.screen.width]);
    return (
        <div className="homeMain">
            <Header />
            <Carousel controls={false}>
                {isArrayCheck(all_home_data?.slider[0]?.slidersImages) &&
                    all_home_data?.slider[0]?.slidersImages.map((data, id) => (
                        <Carousel.Item>
                            <img className="d-block w-100" src={base_url_new + data?.url} alt="First slide" />
                            <Carousel.Caption>
                                <Typography variant="h1" component="h1">
                                    Complete your Space with <br /> Asian Design
                                </Typography>
                                <Typography variant="p" component="p">
                                    From the minds of inspired designers to perfected <br />
                                    products, OUR allows you to be a part of the Asian <br />
                                    Design Story.
                                </Typography>
                                <Button variant="contained" className="mx-3" onClick={() => navigate('/shop')}>
                                    Shop Now
                                </Button>
                                <Button variant="outlined" className="transparent-btn mx-3" onClick={() => navigate('/about-us')}>
                                    About OUR
                                </Button>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                {/* <Carousel.Item>
                    <img className="d-block w-100" src={Banner} alt="First slide" />
                    <Carousel.Caption>
                        <Typography variant="h1" component="h1">
                            lorem ipsum sit Amet
                        </Typography>
                        <Typography variant="p" component="p">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </Typography>
                        <Button variant="contained">Shop Our Creations</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={Banner} alt="First slide" />
                    <Carousel.Caption>
                        <Typography variant="h1" component="h1">
                            lorem ipsum sit Amet
                        </Typography>
                        <Typography variant="p" component="p">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </Typography>
                        <Button variant="contained">Shop Our Creations</Button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block w-100" src={Banner} alt="First slide" />
                    <Carousel.Caption>
                        <Typography variant="h1" component="h1">
                            lorem ipsum sit Amet
                        </Typography>
                        <Typography variant="p" component="p">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </Typography>
                        <Button variant="contained">Shop Our Creations</Button>
                    </Carousel.Caption>
                </Carousel.Item> */}
            </Carousel>
            <section className="secondSection">
                <div className="container">
                    <div className="row gx-sm-5">
                        {/* {isArrayCheck(all_home_data?.featuredProduct) &&
                            all_home_data?.featuredProduct.slice(0, 3).map((data, id) => <ProductCard data={data} />)} */}
                        <ProductCard />
                    </div>
                </div>
            </section>
            <section className="AsianTalentSection">
                <div className="floatingBox">
                    <Typography variant="h1" component="h1">
                        Help OUR be a place where <br />
                        dreams come true.
                    </Typography>
                    <Typography variant="p" component="p">
                        Any designer with a laptop can take on the world <br />
                        and we will take care of the rest.
                    </Typography>
                    <Button variant="contained" onClick={() => navigate('/following')}>
                        Shop By Designers
                    </Button>
                </div>
            </section>
            <section className="ourStories">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Typography variant="h1" component="h1" gutterBottom>
                                Our Stories
                            </Typography>
                            <Typography variant="p" component="p" gutterBottom>
                                Our minds can expand, but it's our hearts that need inspiration.
                            </Typography>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 cardRights">
                                    <BlogsCard data={all_home_data?.fBlog ? all_home_data?.fBlog[0] : {}} />
                                </div>
                                <div className="col-lg-6 col-md-12 cardRight">
                                    {isArrayCheck(all_home_data?.fBlog) &&
                                        all_home_data?.fBlog.slice(1, 4).map((data, id) => <BlogsCard data={data} />)}
                                </div>
                                <div className="col-md-4 mx-auto mt-sm-5 text-center mt-3">
                                    <Button className="storiesBtn" variant="contained" onClick={() => navigate('/stories')}>
                                        Read Our Stories
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ourStories pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Typography variant="h1" component="h1" gutterBottom>
                                Holiday Gifting
                            </Typography>
                            <Typography variant="p" component="p" gutterBottom>
                                Give two gifts with each gift this year. Support your designer and delight your receiver with the same gift!
                            </Typography>
                        </div>
                        <div className="col-md-12">
                            <div className="row imgGallery gx-3">
                                <div className="col-lg-5 mb-3 leftSection">
                                    <div className="content">
                                        <div className="content-overlay"></div>
                                        <img
                                            className="content-image"
                                            src={
                                                isArrayCheck(all_home_data?.featuredProduct) &&
                                                all_home_data?.featuredProduct[0]?.productImage
                                                    ? base_url_new + all_home_data?.featuredProduct[0]?.productImage[0].url
                                                    : card1
                                            }
                                        />
                                        <div className="content-details fadeIn-bottom">
                                            <h3 className="content-title">{all_home_data?.featuredProduct[0]?.name}</h3>
                                            {/* <h3 className="content-title">Floating Rock</h3> */}
                                            <p className="content-text">
                                                {all_home_data?.featuredProduct[0]?.designer?.username ?? ''}
                                                <br />$
                                                {Number(all_home_data?.featuredProduct[0]?.totalPrice) +
                                                    Number(all_home_data?.featuredProduct[0]?.makerPrice)}
                                            </p>
                                            <button onClick={() => navigate(`/shop-dtails/${all_home_data?.featuredProduct[0]._id}`, { state: all_home_data?.featuredProduct[0] })}>
                                                Shop
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 rightSection">
                                    <div className="row gx-3">
                                        {isArrayCheck(all_home_data?.featuredProduct) &&
                                            all_home_data?.featuredProduct
                                                .slice(1, 5)
                                                .map((data, id) => <ProductHoverCard key={id} data={data} />)}
                                    </div>
                                </div>
                                <div className="col-md-4 mx-auto mt-sm-5 text-center mt-3">
                                    <Button className="storiesBtn" variant="contained" onClick={() => navigate('/shop')}>
                                        Shop Gifts
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ourCategory pt-0">
                <div className="row mx-0">
                    <div className="col-md-12 text-center">
                        <Typography variant="h1" component="h1" gutterBottom>
                            Our Categories
                        </Typography>
                        <Typography variant="p" component="p" gutterBottom>
                            Are you looking for something specific? Shop by Category.
                        </Typography>
                    </div>
                    <div className="col-md-11 mx-auto">
                        {window.screen.width < 1024 ? (
                            <Slider {...settings}>
                                {isArrayCheck(all_home_data?.featuredCategories) &&
                                    all_home_data?.featuredCategories.map((data, id) => <CategoryCard data={data} />)}
                            </Slider>
                        ) : (
                            <div>

                                <div
                                    className={`d-flex flex-row text-center single-img justify-content-center ${
                                        isArrayCheck(all_home_data?.featuredCategories) && all_home_data?.featuredCategories.length > 5
                                            ? 'd-none'
                                            : ''
                                    }`}
                                >
                                    {isArrayCheck(all_home_data?.featuredCategories) &&
                                        all_home_data?.featuredCategories.map((data, id) => <CategoryCard data={data} />)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="ourCategory pt-0">
            <div className="">
                <div className="row mx-0">
                    <div className="col-md-12 text-center">
                        <Typography variant="h1" component="h1" gutterBottom>
                            Our New Arrivals
                        </Typography>
                        <Typography variant="p" component="p" gutterBottom>
                            Our curators have selected these new creations just for you.
                        </Typography>
                    </div>
                    <div className="col-md-12 px-5">
                        {window.screen.width < 1024 ? (
                            <Slider {...settings}>
                                {isArrayCheck(all_home_data?.newArivals) &&
                                    all_home_data?.newArivals.map((data, id) => <ArrivalProductCard data={data} arrival={true} />)}
                            </Slider>
                        ) : (
                            <div>
                                <div
                                    className={`${
                                        isArrayCheck(all_home_data?.newArivals) && all_home_data?.newArivals.length > 5 ? '' : 'd-none'
                                    }`}
                                >
                                    <Slider {...settings}>
                                        {isArrayCheck(all_home_data?.newArivals) &&
                                            all_home_data?.newArivals.map((data, id) => <ArrivalProductCard data={data} arrival={true} />)}
                                    </Slider>
                                </div>

                                <div
                                    className={`d-flex flex-row text-center single-img justify-content-center ${
                                        isArrayCheck(all_home_data?.newArivals) && all_home_data?.newArivals.length > 5 ? 'd-none' : ''
                                    }`}
                                >
                                    {isArrayCheck(all_home_data?.newArivals) &&
                                        all_home_data?.newArivals.map((data, id) => <ArrivalProductCard data={data} arrival={true} />)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row mx-0">
                    <div className="col-md-4 mx-auto mt-sm-3 text-center mt-3">
                        <Button className="storiesBtn" variant="contained" onClick={() => navigate('/shop')}>
                            Shop Our Arrivals
                        </Button>
                    </div>
                </div>
                </div>
            </section>

            <section className="ourReviews">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Typography variant="h1" component="h1" gutterBottom>
                                Our Reviews
                            </Typography>
                        </div>
                    </div>
                    <div className="row gx-sm-5">
                        <div className="col-md-4 mb-3 text-center reviewCard">
                            <Avatar alt="Icon" src={Hafiz} />
                            <Typography variant="p" component="p" gutterBottom>
                            "For our first home 5 years ago, we were on a budget and went for what we could afford. 
                            Now, we want something that expresses our identity as Asians and through OUR, we found amazing designers whose work we love!"
                            </Typography>
                            <Typography variant="h1" component="h1" gutterBottom>
                                - Hafiz
                            </Typography>
                        </div>
                        <div className="col-md-4 mb-3 text-center reviewCard">
                            <Avatar alt="Icon" src={Felicia} />
                            <Typography variant="p" component="p" gutterBottom>
                            "As a designer, we are passionate about bringing our inspirations to those who appreciate our creations. 
                            OUR allows us to focus on what we do best, which is to create. They take care of everything else, even ensuring that we get paid."
                            </Typography>
                            <Typography variant="h1" component="h1" gutterBottom>
                                - Felicia Tan
                            </Typography>
                        </div>
                        <div className="col-md-4 mb-3 text-center reviewCard">
                            <Avatar alt="Icon" src={Samuel} />
                            <Typography variant="p" component="p" gutterBottom>
                                "I love Bali and before the pandemic I would fly over every few months just to unwind. Now, thanks to OUR, I
                                can create my own little piece of Bali, while contributing to the community."
                            </Typography>
                            <Typography variant="h1" component="h1" gutterBottom>
                                - Samuel
                            </Typography>
                        </div>
                        <div className="col-md-4 mb-3 text-center reviewCard">
                            <Avatar alt="Icon" src={Stacey} />
                            <Typography variant="p" component="p" gutterBottom>
                            "My husband and I loved backpacking around, and we could never get enough of the Philippines, 
                            the people, the culture and the breathtaking scenery were just amazing. We were surprised to discover and own equally amazing furniture."
                            </Typography>
                            <Typography variant="h1" component="h1" gutterBottom>
                                - Stacey Tan
                            </Typography>
                        </div>
                        <div className="col-md-4 mb-3 text-center reviewCard">
                            <Avatar alt="Icon" src={Shafigah} />
                            <Typography variant="p" component="p" gutterBottom>
                                "We love the culture of Thailand, the people, the smells and the taste of their food, I even learnt how to
                                cook Thai food. When I discovered that I could easily purchase and ship Thai dining tables and chairs on
                                OUR, I did not hesitate."
                            </Typography>
                            <Typography variant="h1" component="h1" gutterBottom>
                                - Shafiqak
                            </Typography>
                        </div>
                        <div className="col-md-4 mb-3 text-center reviewCard">
                            <Avatar alt="Icon" src={keneth} />
                            <Typography variant="p" component="p" gutterBottom>
                            "We didn't want to spend tens of thousands of dollars on European furniture that would not fit in our home and climate. 
                            OUR offered us an easy, cosy way not only to shop for a piece of furniture but support the entire philosophy of Asian design. I Love it."
                            </Typography>
                            <Typography variant="h1" component="h1" gutterBottom>
                                - Kenneth Lam
                            </Typography>
                        </div>
                    </div>
                </div>
            </section>
            <section className="socialMedia">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Typography variant="h1" component="h1" gutterBottom>
                                Be Part Of Our Socials
                            </Typography>
                        </div>
                    </div>
                    <div className="row gx-sm-4">
                        {isArrayCheck(all_home_data?.social) &&
                            all_home_data?.social?.map((data, id) => (
                                <div className="col-md-4">
                                    {/* <a onClick={() => window.location.replace(data?.link)}> */}
                                    <img src={base_url_new + data?.url} alt="" />
                                    {/* </a> */}
                                </div>
                            ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Home;
