import React from 'react';
import Button from '@mui/material/Button';
import FollowingCarousel from '../_part/FollowingCarousel';
import { useNavigate } from 'react-router';
import { isArrayCheck } from 'views/utilities/common';
import { base_url } from 'utils/config';
import { useDispatch, useSelector } from 'react-redux';
import { followAndUnFollowDesigner } from 'redux/action/Auth/index';
function DesignerTab({ users }) {
    const { user } = useSelector((state) => state._auth);
    const { user: UserData } = user;
    console.log('Tab', users);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div>
            <div className="designer-tab">
                <div className="container">
                    {isArrayCheck(users) &&
                        users?.map((data, id) => (
                            <div key={id} className="designer">
                                <div className="row align-items-center">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="fixed-designer-content">
                                            <div className="designer-img fixed-designer-img">
                                                {console.log(data)}
                                                <img
                                                    onClick={() => navigate('/favourite-designer-products', { state: data })}
                                                    src={
                                                        data?.profile?.includes('http')
                                                            ? data?.profile
                                                            : data?.profile
                                                            ? base_url + data?.profile
                                                            : 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2Zlc3NvcnxlbnwwfHwwfHw%3D&w=1000&q=80'
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="wrapper-content">
                                                <div className="designer-img description-box">
                                                    <h5 style={{cursor: "pointer"}} onClick={() => navigate('/favourite-designer-products', { state: data })}>{data?.fullname}</h5>
                                                    <p>{data?.description}</p>
                                                </div>
                                                {
                                                    UserData && (
                                                        <div className="following-btn">
                                                            <Button
                                                                className="f-btn"
                                                                onClick={() =>
                                                                    dispatch(
                                                                        followAndUnFollowDesigner({
                                                                            id: data?._id
                                                                        })
                                                                    )
                                                                }
                                                            >
                                                                {isArrayCheck(data?.followers) && data?.followers?.includes(UserData?._id)
                                                                    ? 'Unfollow'
                                                                    : 'Follow'}
                                                            </Button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <FollowingCarousel />
        </div>
    );
}

export default DesignerTab;
