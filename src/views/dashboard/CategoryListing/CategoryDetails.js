// project imports
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from 'redux/action/User';
import { useLocation, useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import AddIcon from '@mui/icons-material/Add';
import { addCategories, editCategory, uploadImageCategory } from 'redux/action/Category';
import { base_url_new } from 'utils/config';
const CategoryDetails = () => {
    const { state } = useLocation();
    console.log('Category Details', state);
    const [isLoading, setLoading] = useState(true);
    const [name, setname] = useState(state?.name);
    const [url2, seturl2] = React.useState(base_url_new + state?.url);
    const [imageFile, setimageFile] = React.useState('');
    const [description, setdescription] = useState(state?.description);
    const [password, setpassword] = useState('');
    const [email, setemail] = useState('');
    const [role, setrole] = useState([]);
    const [phone, setphone] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { category_image } = useSelector((state) => state._category);
    console.log('Category Detail', category_image);

    useEffect(() => {
        setLoading(false);
    }, []);

    const [alignment, setAlignment] = useState(state?.isFeatured);
    const [devices, setDevices] = React.useState(() => ['phone']);

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const handleDevices = (event, newDevices) => {
        if (newDevices.length) {
            setDevices(newDevices);
        }
    };

    const imageUpload = (e, type) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl2(e.target.result);
            setimageFile(file);
            const formData = new FormData();
            formData.append('catImage', file);
            dispatch(uploadImageCategory(formData));
        };
        reader.readAsDataURL(file);
    };

    const updateCategory = () => {
        const fields = {
            name: name,
            description: description,
            isFeatured: alignment,
            id: state?._id
        };
        const imageObj = {
            ...fields,
            image: category_image?.image,
            url: category_image?.url
        };

        const updatedData = category_image ? imageObj : fields;
        if (name && description) {
            dispatch(editCategory(updatedData, navigate));
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
    return (
        <>
            <div className="add-thread">
                <h2>Edit Category</h2>
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="user-name">Name</label>
                            <input
                                type="text"
                                className="form-control "
                                value={name}
                                name="user-name"
                                onChange={(e) => setname(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                className="form-control "
                                value={firstName}
                                name="first-name"
                                onChange={(e) => setfirstName(e.target.value)}
                            />
                        </div>
                    </div> */}
                    <div className="col-lg-6 col-md-6">
                        <div className="input-field">
                            <label htmlFor="first-name">Description</label>
                            <input
                                type="text"
                                className="form-control "
                                value={description}
                                name="first-name"
                                onChange={(e) => setdescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="approved">
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>Featured</h3>
                                <div className="toggle">
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={alignment}
                                        exclusive
                                        onChange={handleAlignment}
                                        aria-label="text alignment"
                                    >
                                        <ToggleButton value={true}>Yes</ToggleButton>
                                        <ToggleButton value={false}>No</ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="upload-heading">
                            <p className="label">Image Upload</p>
                        </div>
                        <div className="d-flex flex-row flex-wrap">
                            <div className="d-flex flex-row m-1 flex-wrap">
                                {url2 ? (
                                    <img
                                        src={url2}
                                        alt=""
                                        style={{
                                            height: 150,
                                            width: 150,
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                            marginRight: '10px',
                                            marginTop: '10px'
                                        }}
                                    />
                                ) : null}
                            </div>
                            <div className="upload-btn">
                                <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                    <div className="plus-icon">
                                        <AddIcon />
                                    </div>

                                    <input
                                        type="file"
                                        id="file-input"
                                        name="image"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={(e) => imageUpload(e)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary brownBtn px-5 mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </div>
                    <div className="btn btn-primary brownBtn px-5" onClick={updateCategory}>
                        Update
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryDetails;
