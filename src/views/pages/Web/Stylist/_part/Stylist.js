import React from 'react';
import Button from '@mui/material/Button';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Search from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import FilterBar from './FilterBar';
import { useNavigate } from 'react-router';
function Stylist() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="stylist">
            <div className="container">
                <div className="row align-items-center">
                    <div className="content">
                        <h1>Stylist</h1>
                    </div>
                </div>
            </div>
            <FilterBar />
            <div className="stylist-cards">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 stylish-card">
                            <img
                                src={
                                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                              } onClick={() => navigate('/featured-details')}
                            />
                            <div className="stylist-cards-data">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="mb-0">Lorem Ipsum</h2>
                                    <div className="Follow-button">
                                        <Button>
                                            {' '}
                                            <Add className="icon" />
                                            Follow
                                        </Button>
                                    </div>
                                </div>
                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div className="col-md-4 stylish-card">
                            <img
                                src={
                                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                                } onClick={() => navigate('/featured-details')}
                            />
                            <div className="stylist-cards-data">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="mb-0">Lorem Ipsum</h2>
                                    <div className="Follow-button">
                                        <Button>
                                            <Add className="icon" />
                                            Follow
                                        </Button>
                                    </div>
                                </div>
                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div className="col-md-4 stylish-card">
                            <img
                                src={
                                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                                } onClick={() => navigate('/featured-details')}
                            />
                            <div className="stylist-cards-data">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="mb-0">Lorem Ipsum</h2>
                                    <div className="Follow-button">
                                        <Button>
                                            {' '}
                                            <Add className="icon" />
                                            Follow
                                        </Button>
                                    </div>
                                </div>
                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div className="col-md-4 stylish-card">
                            <img
                                src={
                                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                                } onClick={() => navigate('/featured-details')}
                            />
                            <div className="stylist-cards-data">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="mb-0">Lorem Ipsum</h2>
                                    <div className="Follow-button">
                                        <Button>
                                            {' '}
                                            <Add className="icon" />
                                            Follow
                                        </Button>
                                    </div>
                                </div>
                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div className="col-md-4 stylish-card">
                            <img
                                src={
                                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                                } onClick={() => navigate('/featured-details')}
                            />
                            <div className="stylist-cards-data">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="mb-0">Lorem Ipsum</h2>
                                    <div className="Follow-button">
                                        <Button>
                                            <Add className="icon" />
                                            Follow
                                        </Button>
                                    </div>
                                </div>
                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div className="col-md-4 stylish-card">
                            <img
                                src={
                                    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGhvbWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
                                } onClick={() => navigate('/featured-details')}
                            />
                            <div className="stylist-cards-data">
                                <div className="d-flex align-items-center justify-content-between">
                                    <h2 className="mb-0">Lorem Ipsum</h2>
                                    <div className="Follow-button">
                                        <Button>
                                            {' '}
                                            <Add className="icon" />
                                            Follow
                                        </Button>
                                    </div>
                                </div>
                                <p className="mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="see-more text-center">
                        <Button>See More</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stylist;
