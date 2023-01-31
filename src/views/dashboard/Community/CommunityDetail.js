import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import rectimg from '../../../assets/images/home/Rectangle.png';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import {  useSelector } from 'react-redux';
function CommunityDetail() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const { role } = useSelector((state) => state._auth);

    const radios = [
        { name: 'All', value: '1' },
        { name: 'My Thread', value: '2' }
    ];

    return (
        <div className="community">
            <div className="heading">
                <h2>Community</h2>
            </div>

            <div className="row align-items-center">
                <div className="col-md-4 mb-2">
                    <div className="addthread-btn">
                        <Button variant="contained" onClick={() => navigate('/dashboard/addthread')} className="addthreadbtn">
                            +Add New Thread
                        </Button>
                    </div>
                </div>
                <div className="col-md-8 mb-2 ">
                    <div className="tabs-btn">
                        <ButtonGroup>
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radio-${idx}`}
                                    type="radio"
                                    variant="secondary"
                                    name="radio"
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <div className="lecture-rescheduling">
                <div className="heading d-flex justify-content-between align-item-center">
                    <h2>Lecture Rescheduling</h2>
                </div>

                <div className="row align-items-center">
                    <div className="col-md-8 mb-2">
                        <div className="">
                            <h5 className="mb-0">Barry Allen</h5>
                        </div>
                        <div className="date">
                            <Typography component="p" variant="p">
                                02/02/2021
                            </Typography>
                        </div>
                    </div>
                    <div className="col-md-4 mb-2 ">
                        <div className="designer-btn">
                            <Button variant="contained" className="designerbtn">
                            Designer
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-2">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, lectus non tristique cursus. A feugiat libero
                            fusce mollis proin. Sed tincidunt velit in laoreet in sed. Nibh eu netus duis semper. Dictum enim tincidunt et
                            eu, interdum. Lorem ultrices egestas malesuada pellentesque amet. Enim, habitant maecenas congue lectus
                            scelerisque id vulputate platea.
                        </p>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-md-8">
                        <div className="row align-items-center">
                            <div className="col-md-4 mb-2">
                                <div className="barryimg">
                                    <img src={rectimg} alt="" />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="barryimg">
                                    <img src={rectimg} alt="" />
                                </div>
                            </div>
                            <div className="col-md-4 mb-2">
                                <div className="barryimg">
                                    <img src={rectimg} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="seeMore-btn">
                            <Button variant="contained" className="seeMorerbtn">
                                See More+
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <div className="responses">
                        <h2>Responses (2)</h2>
                    </div>
                    {role === 'designer' ? (
                        <div className="addthread-btn">
                        <Button variant="contained" onClick={() => navigate('/dashboard/addthread')} className="addthreadbtn">
                            <ForwardToInboxOutlinedIcon /> Add a Response
                        </Button>
                    </div>
                    ) : role === 'manufacturer' ? (
                        <div className="addthread-btn">
                        <Button variant="contained" onClick={() => navigate('/dashboard/addthread')} className="addthreadbtn">
                            <ForwardToInboxOutlinedIcon /> Add a Response
                        </Button>
                    </div>
                    ) : null}
                </div>

                <div className="row align-items-center">
                    <div className="mb-2">
                        <h5 className="mb-0">Barry Allen</h5>
                        <div className="date">
                            <Typography component="p" variant="p">
                                02/02/2021
                            </Typography>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, lectus non tristique cursus. A feugiat
                                    libero fusce mollis proin. Sed tincidunt velit in laoreet in sed. Nibh eu netus duis semper. Dictum enim
                                    tincidunt et eu, interdum. Lorem ultrices egestas malesuada pellentesque amet. Enim, habitant maecenas
                                    congue lectus scelerisque id vulputate platea.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="mb-2">
                        <h5 className="mb-0">Barry Allen</h5>
                        <div className="date">
                            <Typography component="p" variant="p">
                                02/02/2021
                            </Typography>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, lectus non tristique cursus. A feugiat
                                    libero fusce mollis proin. Sed tincidunt velit in laoreet in sed. Nibh eu netus duis semper. Dictum enim
                                    tincidunt et eu, interdum. Lorem ultrices egestas malesuada pellentesque amet. Enim, habitant maecenas
                                    congue lectus scelerisque id vulputate platea.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="response">
                    <input type="text" placeholder="Write a response..." />
                    <div className="send-btn text">
                        <Button variant="contained" className="sendbtn">
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityDetail;
