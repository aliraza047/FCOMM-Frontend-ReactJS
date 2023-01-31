// project imports
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { addUser } from 'redux/action/User';
import { useNavigate } from 'react-router';
import makeToast from 'utils/Toaster';
import AddIcon from '@mui/icons-material/Add';
import { addCategories } from 'redux/action/Category';
const AddCategory = () => {
    const [isLoading, setLoading] = useState(true);
    const [name, setname] = useState('');
    const [url2, seturl2] = React.useState('');
    const [imageFile, setimageFile] = React.useState('');
    const [description, setdescription] = useState('');
    const [parentCategory, setparentCategory] = useState('decorations');
    const [email, setemail] = useState('');
    const [role, setrole] = useState([]);
    const [phone, setphone] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(false);
    }, []);

    const [alignment, setAlignment] = useState(false);

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
            if (type === 1) {
                seturl(e.target.result);
                setValues({ ...values, profile: file });
            } else {
                seturl2(e.target.result);
                setimageFile(file);
            }
        };
        reader.readAsDataURL(file);
    };

    const addCategory = () => {
        const fields = {
            name: name,
            description: description,
            isFeatured: alignment,
            catImage: imageFile,
            parentCategory: parentCategory
        };
        console.log(fields);
        var formData = new FormData();
        Object.keys(fields).map((key) => {
            formData.append(key, fields[key]);
        });

        if (name && description) {
            dispatch(addCategories(formData, navigate));
        } else {
            makeToast('error', 'Kindly Fill All The Inputs');
        }
    };
    return (
        <>
            <div className="add-thread">
                <h2>Add Category</h2>
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
                    {/* <div className="col-lg-6 col-md-6">
                        <div className="approved">
                            <div className="d-flex align-items-center justify-content-between">
                                <h3>Parent Category</h3>
                                <Select
                                    value={parentCategory}
                                    onChange={(e) => setparentCategory(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    placeholder="Select Parent Category"
                                >
                                    <MenuItem value={'decorations'}>{'Decorations'}</MenuItem>
                                    <MenuItem value={'seats'}>{'Seats'}</MenuItem>
                                    <MenuItem value={'tables'}>{'Tables'}</MenuItem>
                                    <MenuItem value={'storageOrganisation'}>{'Storage & Organisation'}</MenuItem>
                                    <MenuItem value={'kids'}>{'Kids'}</MenuItem>
                                    <MenuItem value={'lighting'}>{'Lighting'}</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div> */}
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
                        <div className="upload-btn">
                            <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                <div className="plus-icon">
                                    <AddIcon />
                                </div>
                                {url2 ? (
                                    <img src={url2} alt="" style={{ height: 150, width: 150, objectFit: 'contain', borderRadius: '8px' }} />
                                ) : (
                                    <input
                                        type="file"
                                        id="file-input"
                                        name="image"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={(e) => imageUpload(e, 2)}
                                    />
                                )}
                            </label>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center my-5">
                    <div className="btn btn-primary brownBtn px-5 mx-2" onClick={() => navigate(-1)}>
                        Cancel
                    </div>

                    <div className="btn btn-primary brownBtn px-5" onClick={addCategory}>
                        Add Category
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCategory;
