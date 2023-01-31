import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import img1 from '../../../assets/images/Gallery/img1.png';
import img2 from '../../../assets/images/Gallery/img2.png';
import img3 from '../../../assets/images/Gallery/img3.png';
import img4 from '../../../assets/images/Gallery/img4.png';
import img5 from '../../../assets/images/Gallery/img5.png';
import img6 from '../../../assets/images/Gallery/img6.png';
import img7 from '../../../assets/images/Gallery/img7.png';
import img8 from '../../../assets/images/Gallery/img8.png';
import img9 from '../../../assets/images/Gallery/img9.png';
import img10 from '../../../assets/images/Gallery/img10.png';
import img11 from '../../../assets/images/Gallery/img11.png';
import img12 from '../../../assets/images/Gallery/img12.png';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGalleryImages, removeImageGallery } from 'redux/action/Setting';
import { Log } from 'utils/helper';
import { isArrayCheck } from 'views/utilities/common';
import { base_url, base_url_new } from 'utils/config';
import CrossIcon from '@mui/icons-material/Cancel';

export default function Gallery() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { all_gallery_images } = useSelector((state) => state._setting);
    Log('gallery', all_gallery_images);
    useEffect(() => {
        dispatch(getAllGalleryImages());
    }, []);

    const handleImageRemove = (id) => {
        dispatch(removeImageGallery({'id' : id }))
    }
    return (
        <div className="gallery">
            <div className="heading">
                <h2>Gallery</h2>
            </div>

            <div className="row align-items-center">
                <div className="col-md-4 mb-2 ">
                    <div className="addphoto-btn">
                        <Button variant="contained" onClick={() => navigate('/dashboard/addphoto')} className="addphotobtn">
                            +Add New Photo
                        </Button>
                    </div>
                </div>
            </div>

            <div className="row align-items-center ">
                {isArrayCheck(all_gallery_images) &&
                    all_gallery_images?.map((data, id) => (
                        <div className="col-md-3 mb-4">
                            <div style={{ position: 'relative' }}>
                            <div
                                className="plus-icon"
                                onClick={() => handleImageRemove(data?._id)}
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
                            </div>
                            <div className="barryimg">
                                <img src={base_url_new + data?.url} alt="" />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
