import React, { useEffect, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGalleryImages, uploadImageGallery } from 'redux/action/Setting';
import { useNavigate } from 'react-router-dom';

export default function AddPhoto() {
    const { setting, slider_image } = useSelector((state) => state._setting);
    const dispatch = useDispatch();
    const [banner, setbanner] = React.useState('');
    const [slider, setslider] = React.useState('');
    const [url, seturl] = React.useState('');
    const [url2, seturl2] = React.useState('');
    const refImage2 = useRef(null);
    const navigate = useNavigate();
    console.log('slider', setting, slider_image);

    useEffect(() => {
        dispatch(getAllGalleryImages());
    }, []);

    const imageUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl(e.target.result);
            setslider(e.target.result);
            const formData = new FormData();
            formData.append('galleryImage', file);
            dispatch(uploadImageGallery(formData, navigate));
        };
        reader.readAsDataURL(file);
    };

    // const handleImageRemove = (obj) => {
    //     dispatch(setImageSlider(removeMethodArrayForSlider(slider_image, obj)));
    //     dispatch(editSetting({ id: setting?._id, slidersImages: removeMethodArrayForSlider(slider_image, obj) }));
    // };
    return (
        <div className="addphoto">
            <div className="heading">
                <h2>Gallery - Add New Photo</h2>
            </div>
            <div className="heading">
                <h2>Image Upload</h2>
            </div>
            <div className="upload-btn">
                <label htmlFor="contained-button-file" for="file-input" aria-controls="">
                    <div className="plus-icon">
                        <AddIcon />
                    </div>
                    {url ? (
                        <img src={url} alt="" style={{ height: 146, width: 146, objectFit: 'cover', borderRadius: '8px' }} />
                    ) : (
                        <input
                            ref={refImage2}
                            type="file"
                            id="file-input"
                            name="image"
                            accept="image/x-png,image/gif,image/jpeg"
                            onChange={(e) => imageUpload(e)}
                        />
                    )}
                </label>
            </div>
        </div>
    );
}
