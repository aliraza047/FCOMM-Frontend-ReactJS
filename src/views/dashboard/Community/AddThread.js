import React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
function AddThread() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const { setting, slider_image } = useSelector((state) => state._setting);

    const addSetting = () => {
        const fields = {
            id: setting?._id,
            siteContact: contact,
            siteEmail: email,
            siteFacebookURL: facebookUrl,
            siteInstagramURL: instagramUrl
        };
        const imgObj = {
            slidersImages: [...slider_image, ...setting?.slidersImages]
        };
        const editData = isArrayCheck(slider_image) ? { ...fields, ...imgObj } : fields;
        console.log('Slider Iamge', settingData.slider_image);
        dispatch(editSetting(editData));
    };

    return (
        <div className="addthread">
         <div className="heading d-flex justify-content-between align-item-center">
                        <h2>Add Thread</h2>
                    </div>
            <div className="col-lg-6">
                <div className="input-field">
                    <label className="label" htmlFor="user-name">
                        Title
                    </label>
                    <input type="text" placeholder='Write title of the topic...' className="form-control"  />
                </div>

                <div className="input-field">
                    <label className="label" htmlFor="first-name">
                        Description
                    </label>
                    <textarea className="form-control" name="" id="" placeholder="Write topic description..." cols="30" rows="5"></textarea>
                </div>
              

                <label className="label" htmlFor="first-name">
                    Image Upload
                </label>
                            <div className="upload-btn">
                                <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                                    <div className="plus-icon">
                                        <AddIcon />
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            id="file-input"
                                            name="image"
                                            accept="image/x-png,image/gif,image/jpeg"
                                            onChange={(e) => imageUploadSlider(e)}
                                        />
                                    </div>
                                </label>
                            </div>

                            <div className="input-field">
                    <label className="label" htmlFor="first-name">
                    Invite Member
                    </label>
                
                    <div className="filter-fields">
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                >
                                <MenuItem value="">
                                    <em>Write email of the member...</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                                </div>
        </div>


                <div className="addthread-btn">
                    <Button variant="contained" onClick={() => navigate('/dashboard/addthread')} className="addthreadbtn">
                        Send Invite
                    </Button>
                </div>
                <div className="col-md-4">
                <div className="create-btn">
                    <Button variant="contained" onClick={() => navigate('/dashboard/addthread')} className="createbtn">
                        Create Topic
                    </Button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default AddThread;
