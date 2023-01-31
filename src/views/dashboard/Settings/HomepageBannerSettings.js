import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { editSetting, getSetting, setImageSlider, uploadImageSlider } from 'redux/action/Setting';
import { isArrayCheck } from 'views/utilities/common';
import CrossIcon from '@mui/icons-material/Cancel';
import { removeMethodArrayForSlider } from 'utils/helper';
import { base_url_new } from 'utils/config';
import makeToast from 'utils/Toaster';

function HomepageBannerSettings() {
    const { setting, slider_image } = useSelector((state) => state._setting);
    const dispatch = useDispatch();
    const [banner, setbanner] = React.useState('');
    const [slider, setslider] = React.useState('');
    const [url, seturl] = React.useState('');
    const [url2, seturl2] = React.useState('');

    console.log('slider', setting, slider_image, slider_image ? slider_image : '');

    useEffect(() => {
        dispatch(getSetting());
    }, []);

    const imageUploadSlider = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl(e.target.result);
            setslider(e.target.result);
            const formData = new FormData();
            formData.append('sliderImage', file);
            if (!isArrayCheck(slider_image) || (isArrayCheck(slider_image) && slider_image?.length < 5)) {
                dispatch(uploadImageSlider(formData, slider_image, 'slider', true));
            } else {
                makeToast('error', "You can't add more slider images");
            }
        };
        reader.readAsDataURL(file);
    };

    const handleImageRemove = (obj) => {
        dispatch(setImageSlider(removeMethodArrayForSlider(slider_image, obj)));
        dispatch(editSetting({ id: setting?._id, slidersImages: removeMethodArrayForSlider(slider_image, obj) }));
    };
    return (
        <div className="HomepageBannerSettings">
            <div className="heading">
                <h2>Settings - Homepage Banner</h2>
            </div>
            <div className="heading">
                <h2>Image Upload</h2>
            </div>
            <div className="d-flex flex-row flex-wrap">
                <div className="d-flex flex-row flex-wrap">
                    {isArrayCheck(slider_image) &&
                        slider_image?.map((data) => (
                            <div style={{ position: 'relative' }}>
                                <div
                                    className="plus-icon"
                                    onClick={() => handleImageRemove(data)}
                                    style={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        cursor: 'pointer',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%'
                                    }}
                                >
                                    <CrossIcon color="#fff" />
                                </div>

                                <img
                                    src={base_url_new + data?.url}
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
                            </div>
                        ))}
                </div>

                {Array.isArray(slider_image) && slider_image?.length === 5 ? null : (
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
                )}
            </div>
        </div>
    );
}

export default HomepageBannerSettings;
