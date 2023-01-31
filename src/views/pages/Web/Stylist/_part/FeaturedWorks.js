import React from 'react';
import Button from "@mui/material/Button";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Search from "@mui/icons-material/Search";
import Add from "@mui/icons-material/Add";
import Carousel from "react-bootstrap/Carousel";
import Share from "@mui/icons-material/Share";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
function FeaturedWorks() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return <div>
      <>
      <div className="featured-cards">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-4">
              <Carousel variant="dark">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={'https://media.architecturaldigest.com/photos/60a6b0c95c9708ff008d248e/master/w_1600%2Cc_limit/012520Kitchen2520Elevation252025.jpeg'}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={'https://cdn.mos.cms.futurecdn.net/5x5XWmC4wEzQPrCRtydsYf-1200-80.jpg'}
                    alt="Second slide"
                  />
                </Carousel.Item>
              
              </Carousel>
              <div className="featured-cards-data">
                <h2>Lorem ipsum dolor sit amet</h2>
                <h6>Oct 2021</h6>
                <div className="d-flex align-items-center justify-content-between">
                <div className="col-md-8">
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia.
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <div className="heart">
                      <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    </div>
                    <Share className="share ms-2" />
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-4">
              <Carousel variant="dark">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={'https://cdn.mos.cms.futurecdn.net/5x5XWmC4wEzQPrCRtydsYf-1200-80.jpg'}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={'https://media.architecturaldigest.com/photos/60a6b0c95c9708ff008d248e/master/w_1600%2Cc_limit/012520Kitchen2520Elevation252025.jpeg'}
                    alt="First slide"
                  />
                </Carousel.Item>
              
              </Carousel>
              <div className="featured-cards-data">
                <h2>Lorem ipsum dolor sit amet</h2>
                <h6>Oct 2021</h6>
                <div className="d-flex align-items-center justify-content-between">
                <div className="col-md-8">
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia.
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <div className="heart">
                                                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                                </div>
                    <Share className="share ms-2" />
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-4">
              <Carousel variant="dark">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={'https://cdn.mos.cms.futurecdn.net/5x5XWmC4wEzQPrCRtydsYf-1200-80.jpg'}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={'https://media.architecturaldigest.com/photos/60a6b0c95c9708ff008d248e/master/w_1600%2Cc_limit/012520Kitchen2520Elevation252025.jpeg'}
                    alt="First slide"
                  />
                </Carousel.Item>
              
              </Carousel>
              <div className="featured-cards-data">
                <h2>Lorem ipsum dolor sit amet</h2>
                <h6>Oct 2021</h6>
                <div className="d-flex align-items-center justify-content-between">
                <div className="col-md-8">
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia.
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <div className="heart">
                                                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                                </div>
                    <Share className="share ms-2" />
                  </div>
                </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-4">
              <Carousel variant="dark">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={'https://cdn.mos.cms.futurecdn.net/5x5XWmC4wEzQPrCRtydsYf-1200-80.jpg'}
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={'https://media.architecturaldigest.com/photos/60a6b0c95c9708ff008d248e/master/w_1600%2Cc_limit/012520Kitchen2520Elevation252025.jpeg'}
                    alt="First slide"
                  />
                </Carousel.Item>
              
              </Carousel>
              <div className="featured-cards-data">
                <h2>Lorem ipsum dolor sit amet</h2>
                <h6>Oct 2021</h6>
                <div className="d-flex align-items-center justify-content-between">
                <div className="col-md-8">
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia.
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-end">
                    <div className="heart">
                                                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                                </div>
                    <Share className="share ms-2" />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  </div>;
}

export default FeaturedWorks;
