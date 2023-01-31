import React from 'react';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router';
import { formatedDate } from 'utils/helper';
import { useDispatch } from 'react-redux';
import { editBlog } from 'redux/action/Blog/index';
function index() {
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log('BlogDetails', state);
    const dispatch = useDispatch();
    const handleStatus = (status) => {
        dispatch(editBlog({ id: state?._id, isApproved: status }, navigate , false));
    };
    return (
        <div className="blogpost">
            <div className="heading">
                <h2>Blog Post</h2>
            </div>
            <div className="blog">
                <div className="getting-ahead">
                    <div className="heading">
                        <h2>{state?.name}</h2>
                    </div>
                    <p>
                        Posted on <span>{formatedDate(state?.created_at)}</span> by <span>{state?.createdBy?.fullname}</span>
                    </p>
                </div>
                <p dangerouslySetInnerHTML={{ __html: state?.content }}></p>
            </div>

            <div className="col-md-4 mx-auto">
                <div className="approval">
                    <p>This post needs approval from you</p>
                    <div className="rejected-btn d-flex ">
                        <Button variant="contained" className="rejectedbtn" onClick={() => handleStatus('rejected')}>
                            Rejected
                        </Button>
                        <Button variant="contained" className="approvebtn" onClick={() => handleStatus('approved')}>
                            Approve
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default index;
