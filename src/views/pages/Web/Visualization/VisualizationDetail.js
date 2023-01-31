import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Stage, Layer, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { Button, Input } from '@mui/material';
import { useLocation, useParams } from 'react-router';
import { isArrayCheck } from 'views/utilities/common';
import { base_url, base_url_new } from 'utils/config';
import { getRandomIdForkanva } from 'utils/helper';
import UploadVisual from '../../../../assets/images/home/upload-visual.png';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SaveIcon from '@mui/icons-material/Save';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import html2canvas from 'html2canvas';
import * as htmlToImage from "html-to-image";
import { uploadVisualProduct, clearVisualProduct, setVisualProductImage } from 'redux/action/Product';
import { useDispatch, useSelector } from 'react-redux';
import { HeightSharp } from '@mui/icons-material';
import request from 'utils/request';
import { imageToBase64 } from 'redux/action/Customer.Action/Product';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, image }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    // console.log('imaggggggg', image)
    const [img] = useImage(image, "anonymous");

    // const { img } = useImage({
    //     srcList: image
    //   });
    React.useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Image
                image={img}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y()
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY)
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    );
};


function VisualizationDetail() {
    const dispatch = useDispatch();
    const { all_visual_image, all_visual_product_image } = useSelector((state) => state._product);
    const { state } = useLocation();
    console.log('State', state);
    const [visual, setVisual] = useState('')
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState(all_visual_product_image);
    // const [images, setImages] = React.useState([]);
    // console.log('img img', images)
    const [size, setsize] = useState(100);
    const [url, seturl] = useState('');
    const [urls, seturls] = useState([]);

    const [bgImage] = useImage(all_visual_image, "anonymous");
    // const [bgImage] = useImage("https://bluesilo-fcomm.s3.amazonaws.com/productImage/665125504pexels-photo-269063.jpeg", "anonymous");
    // console.log('bgImage', bgImage)
    //console.log('visual', visual)

    const refImage = useRef(null);
    const Imageref = useRef(null);
    const unMount = useRef(isArrayCheck(all_visual_product_image) ? false : true);
    const [heigthStage, setheigthStage] = useState(300)
    const [widthStage, setWidthStage] = useState(930)

    let autoResize = () => {
        console.log('resize', window.innerWidth);

        if (window.innerWidth == 1920) {
            setWidthStage(1080)
            setheigthStage(400)
        }
        else if (window.innerWidth == 1366) {
            setWidthStage(925)
            setheigthStage(400)
        }
        else if (window.innerWidth == 1280) {
            setWidthStage(925)
            setheigthStage(400)
        }
        else if (window.innerWidth == 992) {
            setWidthStage(776)
            setheigthStage(400)
        }
        else if (window.innerWidth == 768) {
            setWidthStage(600)
            setheigthStage(400)
        }
        else if (window.innerWidth == 575) {
            setWidthStage(550)
            setheigthStage(400)
        }
        else if (window.innerWidth == 475) {
            setWidthStage(450)
            setheigthStage(400)
        }
        else if (window.innerWidth == 425) {
            setWidthStage(400)
            setheigthStage(350)
        }
        else if (window.innerWidth == 375) {
            setWidthStage(350)
            setheigthStage(350)
        }
        else if (window.innerWidth == 360) {
            setWidthStage(335)
            setheigthStage(330)
        }
        else if (window.innerWidth == 320) {
            setWidthStage(300)
            setheigthStage(300)
        }

    }

    useEffect(() => {
        window.addEventListener('resize', autoResize)
        autoResize();
    }, [])

    const imageUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl(e.target.result);
            // const formData = new FormData();
            // formData.append('productImage', file);
            dispatch(uploadVisualProduct(e.target.result));
        };
        reader.readAsDataURL(file);
    };

    const download = (uri, name) => {
        // console.log('Download', uri);
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link
    };
    const [selectedId, selectShape] = React.useState(null);
    const [rectangles, setRectangles] = React.useState('');
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage() || e.target.getLayer()?._id == 3
        console.log('deselectdee 1', e.target, e.target.getStage())
        console.log('deselectdee 2', e.target.getLayer())
        console.log('deselectdee 3', clickedOnEmpty)
        if (clickedOnEmpty) {
            selectShape(null);

        }
    };

    const [options, setoptions] = React.useState(null);

    const handleChange = (e) => {
        const val = e.target.value;
        if (val === 'reset') {
            seturl('');
            setImages([]);
            setoptions(val);
            dispatch(clearVisualProduct())
        } else if (val === 'save') {
            unMount.current = false
            dispatch(setVisualProductImage(images))
            setoptions(val);
        } else if (val === 'download') {
            const uri = stageRef.current.toDataURL();
            download(uri, "stage.jpg")
            setoptions(val);
        } else {
            setoptions('');
        }
    };
    useEffect(() => {
        if (isArrayCheck(all_visual_image)) {
            console.log('all_visual_image if', all_visual_image)
            setVisual(all_visual_image)
        }
    }, [all_visual_image])

    useEffect(() => {
        return () => {
            if (unMount.current) {
                console.log('bool usEffcet', unMount.current.value)
                dispatch(clearVisualProduct())
            }
        };
    }, [])
    console.log('bool', unMount)
    // console.log('all_visual_image', all_visual_image)

    useEffect(async () => {
        if (isArrayCheck(state?.productTransparentImage)) {
            for (let index = 0; index < state?.productTransparentImage.length; index++) {
                const ee = await dispatch(imageToBase64({ url: base_url_new + state?.productTransparentImage[index]?.url }))
                console.log('ee', ee)
                seturls([...urls, ee])
            }
        }
    }, [])
    console.log('raza', urls)

    return (
        <div className="visualization">
            <div className="container">
                <div className="row">
                    <div className="col-md-2 mt-4" >
                        <h5>Visualization Tools</h5>
                        {isArrayCheck(urls) && (
                            <div className="tabs">
                                {urls?.map((data, id) => (
                                    <div className="tabs-content mt-2">
                                        <img
                                            src={data}
                                            onDragStart={async (e) => {
                                                dragUrl.current = e.target.src
                                            }}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {!bgImage ? (
                        <div className="col-md-10 mt-4">
                            <label htmlFor="contained-button-file" className="visual-input">
                                <Input
                                    id="contained-button-file"
                                    className="d-none"
                                    type="file"
                                    ref={refImage}
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => imageUpload(e)}
                                />
                                <div
                                    className="tab-content"
                                    style={{
                                        backgroundColor: '#E2CDBD'
                                    }}
                                >
                                    <div className="visual-upload-img">
                                        <img src={UploadVisual} alt="uploadVisual" />
                                        <p>Click to upload your floorplan image</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    ) : (
                        <div className="col-md-10 mt-4" id="mymy">
                            <div
                                // ref={Imageref}
                                className="tab-content"
                            // style={{
                            //     backgroundImage: `url(${base_url_new + all_visual_image[0].url})`,
                            //     backgroundRepeat: 'no-repeat',
                            //     backgroundSize: '100% 100%'
                            // }}
                            >
                                <div className="visual-dropdown">
                                    <DropdownButton
                                        id="dropdown-item-button"
                                        title="Helpful Options"
                                        variant="secondary"
                                        onClick={handleChange}
                                        defaultValue={options}
                                    >
                                        <Dropdown.Item as="button" value={'save'}>
                                            <SaveIcon /> Save
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button" value={'reset'}>
                                            <CompareArrowsIcon /> Reset
                                        </Dropdown.Item>
                                        <Dropdown.Item as="button" value={'download'}>
                                            <FileDownloadIcon /> Download
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </div>

                                <div
                                    className=' canvas-content'
                                    ref={Imageref}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        // register event position
                                        stageRef.current.setPointersPositions(e);

                                        // add image
                                        console.log('dragUrl.current', dragUrl.current)
                                        setImages(
                                            images.concat([
                                                {
                                                    ...stageRef.current.getPointerPosition(),
                                                    src: dragUrl.current,
                                                    width: 100,
                                                    height: 100,
                                                    id: getRandomIdForkanva()
                                                }
                                            ])
                                        );
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <Stage
                                        width={widthStage}
                                        height={heigthStage}
                                        ref={stageRef}
                                        className="konvajs-content"
                                        // className="canvas-image"
                                        onMouseDown={checkDeselect}
                                        onTouchStart={checkDeselect}
                                    >
                                        <Layer>
                                            <Image
                                                width={widthStage}
                                                height={heigthStage}
                                                // className="canvas-image"
                                                image={bgImage}
                                                style={{ position: 'relative' }}
                                                // crossorigin="anonymous"
                                                // opacity="0.8"
                                                // x={100}
                                                // y={100}
                                            />
                                        </Layer>
                                        <Layer>
                                            {images.map((image, id) => {
                                                return (
                                                    <Rectangle
                                                        key={id}
                                                        shapeProps={image}
                                                        image={image.src}
                                                        isSelected={id === selectedId}
                                                        onSelect={() => {
                                                            selectShape(id);
                                                        }}
                                                        onChange={(newAttrs) => {
                                                            // console.log('Image onChange', newAttrs);
                                                            const imag = images.slice();
                                                            imag[id] = newAttrs;
                                                            imag[id].width = newAttrs.width;
                                                            imag[id].height = newAttrs.height;

                                                            // console.log('Set images', imag);
                                                            setImages(imag);
                                                            setRectangles(imag);
                                                        }}
                                                    />
                                                );
                                            })}
                                        </Layer>
                                    </Stage>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="row">
                    <div className="col-12 mt-2">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizationDetail;
