import React from 'react';
import Button from '@mui/material/Button';
import FavouriteCarousel from './FavouriteCarousel';
function StylistsTab() {
    return (
        <div>
            <div className="designer-tab">
                <div className="container">
                    <div className="designer">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-4">
                                <div className="designer-img">
                                    <img src="http://assets2.ignimgs.com/2015/11/19/the-lion-guard-1280jpg-99781f.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="row">
                                    <div className="col-lg-6 col-md-8">
                                        <div className="designer-img">
                                            <h5>Lorem ipsum dolor sit amet.</h5>
                                            <p>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga error accusamus repellendus!
                                                Beatae ratione reprehenderit fuga natus officiis! Numquam omnis fugiat, dignissimos
                                                voluptates accusantium soluta rerum sunt libero praesentium eius.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-4">
                                        <div className="following-btn">
                                            <Button className="f-btn">Following</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="designer">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-4">
                                <div className="designer-img">
                                    <img src="http://assets2.ignimgs.com/2015/11/19/the-lion-guard-1280jpg-99781f.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="row">
                                    <div className="col-lg-6 col-md-8">
                                        <div className="designer-img">
                                            <h5>Lorem ipsum dolor sit amet.</h5>
                                            <p>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga error accusamus repellendus!
                                                Beatae ratione reprehenderit fuga natus officiis! Numquam omnis fugiat, dignissimos
                                                voluptates accusantium soluta rerum sunt libero praesentium eius.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-4">
                                        <div className="following-btn">
                                            <Button className="f-btn">Following</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="designer">
                        <div className="row align-items-center">
                            <div className="col-lg-3 col-md-4">
                                <div className="designer-img">
                                    <img src="http://assets2.ignimgs.com/2015/11/19/the-lion-guard-1280jpg-99781f.jpg" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="row">
                                    <div className="col-lg-6 col-md-8">
                                        <div className="designer-img">
                                            <h5>Lorem ipsum dolor sit amet.</h5>
                                            <p>
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga error accusamus repellendus!
                                                Beatae ratione reprehenderit fuga natus officiis! Numquam omnis fugiat, dignissimos
                                                voluptates accusantium soluta rerum sunt libero praesentium eius.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-4">
                                        <div className="following-btn">
                                            <Button className="f-btn">Following</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FavouriteCarousel />
        </div>
    );
}

export default StylistsTab;
