import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { uploadImage } from 'redux/action/Product';
import { editSetting, getSetting, setImageSlider, uploadImageSlider } from 'redux/action/Setting';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isArrayCheck } from 'views/utilities/common';
import { base_url_new } from 'utils/config';
import makeToast from 'utils/Toaster';
import CrossIcon from '@mui/icons-material/Cancel';
import { removeImageProduct } from 'redux/action/Product/index';
import { removeMethodArray, removeMethodArrayForSlider } from 'utils/helper';
function DesignerManufecturerSetting() {
    const { setting, slider_image } = useSelector((state) => state._setting);
    const [contact, setcontact] = React.useState(setting?.siteContact);
    const [email, setemail] = React.useState(setting?.siteEmail);
    const [facebookUrl, setfacebookUrl] = React.useState(setting?.siteFacebookURL);
    const [instagramUrl, setinstagramUrl] = React.useState(setting?.siteInstagramURL);
    const dispatch = useDispatch();
    const [url, seturl] = React.useState('');
    const [url2, seturl2] = React.useState('');
    const [slider, setslider] = React.useState('');
    const [banner, setbanner] = React.useState('');
    const { role } = useSelector((state) => state._auth);
    console.log('slider', setting, slider_image);

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
            if (Array.isArray(slider_image) && slider_image?.length < 5) {
                dispatch(uploadImageSlider(formData, slider_image, 'slider'));
            } else {
                makeToast('error', "You can't add more slider images");
            }
        };
        reader.readAsDataURL(file);
    };

    const imageUploadBanner = (e) => {
        console.log('Banner');
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl2(e.target.result);
            setbanner(e.target.result);
            const formData = new FormData();
            formData.append('sliderImage', file);
            dispatch(uploadImageSlider(formData, banner_image, 'banner'));
        };
        reader.readAsDataURL(file);
    };

    const addSetting = () => {
        const fields = {
            id: setting?._id,
            siteContact: contact,
            siteEmail: email,
            siteFacebookURL: facebookUrl,
            siteInstagramURL: instagramUrl
        };
        const imgObj = {
            slidersImages: slider_image
        };
        const editData = isArrayCheck(slider_image) ? { ...fields, ...imgObj } : fields;
        dispatch(editSetting(editData));
    };

    const handleImageRemove = (obj) => {
        dispatch(setImageSlider(removeMethodArrayForSlider(slider_image, obj)));
    };

    return (
        <>
            {/* <div className="row">
                <div className="col-md-12">
                    <div className="input-field">
                    {role === 'designer' ? (
                       <label className="label" htmlFor="first-name">
                       Banner Image
                        </label>
                    ) : role === 'manufacturer' ? (
                        <label className="label" htmlFor="first-name">
                        Certificate Image
                         </label>
                    ) : null}
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
                                {/* {isArrayCheck(setting?.slidersImages) &&
                                    setting?.slidersImages?.map((data) => (
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
                                    ))} */}
                            {/* </div>
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
                </div> */}
            <div className="d-flex justify-content-center my-3">
                <div className="btn btn-primary brownBtn" onClick={addSetting}>
                    Save
                </div>
            </div>
        </>
    );
}

export default DesignerManufecturerSetting;
