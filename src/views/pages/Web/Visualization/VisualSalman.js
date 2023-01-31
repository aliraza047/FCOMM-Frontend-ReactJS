import React, { createRef, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Stage, Layer, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { Button, Input } from '@mui/material';
import { useLocation } from 'react-router';
import { isArrayCheck } from 'views/utilities/common';
import { base_url, base_url_new } from 'utils/config';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { getRandomIdForkanva } from 'utils/helper';
import UploadVisual from '../../../../assets/images/home/upload-visual.png';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SaveIcon from '@mui/icons-material/Save';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import html2canvas from 'html2canvas';
const sofa_data = [
    { id: 1, url: 'https://www.pngkey.com/png/full/256-2563475_diamond-single-seater-single-sofa-png-hd.png' },
    { id: 2, url: 'https://www.freeiconspng.com/thumbs/chair-png/chair-png-29.png' },
    { id: 3, url: 'https://freepngimg.com/save/43829-sofa-bed-free-transparent-image-hq/480x480' },
    { id: 4, url: 'https://clipartpngfree.com/thumbnail/objects/object_values_light_sufa_everydayphotography_thumb.png' },
    { id: 5, url: 'https://freepngimg.com/thumb/sofa/22647-2-sofa-transparent-image-thumb.png' }
];

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, image }) => {
    const shapeRef = React.useRef();
    const trRef = React.useRef();
    const [img] = useImage(image);
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
    const { state } = useLocation();
    console.log('State', state);
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);
    const [size, setsize] = useState(100);
    const [url, seturl] = useState('');
    const ref = createRef(null);
    const [image, takeScreenShot] = useScreenshot({
        type: 'image/jpeg',
        quality: 1.0
    });

    const refImage = useRef(null);
    const imageUpload = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (e) => {
            seturl(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const download = (uri, name) => {
        console.log('Download', uri);
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // delete link
    };
    console.log('State Image', images);
    const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
    const [selectedId, selectShape] = React.useState(null);
    const [rectangles, setRectangles] = React.useState('');
    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    useEffect(() => {}, [images]);
    const [options, setoptions] = React.useState(null);

    const handleChange = (e) => {
        const val = e.target.value;
        if (val === 'reset') {
            seturl('');
            setImages([]);
            setoptions(val);
        } else if (val === 'save') {
            // seturl('');
            // downloadScreenshot()'
            console.log('Stage Ref', stageRef.current);
            // html2canvas(document.body, {
            //     backgroundColor: 'none',
            //     allowTaint: true,
            //     foreignObjectRendering: true
            // })
            //     .then((canvas) => {
            //         const image = canvas.toDataURL('image/png', 1.0);
            //         // const im = new Image();
            //         console.log('Kanva =>', image);
            //         download(image, 'img.png');
            //     })
            //     .catch((err) => console.log('Kanva err', err));
            var width = window.innerWidth;
            var height = window.innerHeight;

            var stage = new Stage({
                container: 'container',
                width: width,
                height: height
            });

            var layer = new Layer();
            stage.add(layer);

            var box = new Rect({
                x: stage.width() / 2 - 50,
                y: stage.height() / 2 - 25,
                width: 100,
                height: 50,
                fill: '#00D2FF',
                stroke: 'black',
                strokeWidth: 4,
                draggable: true
            });
            layer.add(box);
            var dataURL = stage.toDataURL({ pixelRatio: 3 });
            downloadURI(dataURL, 'stage.png');

            setoptions(val);
        } else if (val === 'download') {
            const uri = stageRef.current.toDataURL('image/png', 1.0);
            download(uri, 'img.png');
            setoptions(val);
        } else {
            setoptions('');
        }
    };

    return (
        <div className="visualization">
            <div className="container">
                <div class="row">
                    <div className="col-6">
                        {/* <div>
                        <label htmlFor="contained-button-file">
                            Upload Floor Image
                            <Input
                                id="contained-button-file"
                                className="d-none"
                                type="file"
                                ref={refImage}
                                name="image"
                                accept="image/x-png,image/gif,image/jpeg"
                                onChange={(e) => imageUpload(e)}
                            />
                        </label>
                    </div> */}
                        {/* <div>
                        <button onClick={downloadScreenshot}>Download</button>
                    </div> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 mt-4">
                        <h5>Visualization Tools</h5>
                        {isArrayCheck(state?.productTransparentImage) ? (
                            <div className="tabs">
                                {state?.productTransparentImage?.map((data, id) => (
                                    <div className="tabs-content mt-2">
                                        <img
                                            src={base_url_new + data?.url}
                                            onDragStart={(e) => {
                                                dragUrl.current = e.target.src;
                                            }}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="tabs">
                                {state?.productImage.map((data, id) => (
                                    <div className="tabs-content mt-2">
                                        <img
                                            src={base_url_new + data?.url}
                                            onDragStart={(e) => {
                                                dragUrl.current = e.target.src;
                                            }}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {!url ? (
                        <div className="col-md-10 mt-4">
                            <label htmlFor="contained-button-file" className="visual-input">
                                <Input
                                    id="contained-button-file"
                                    className="d-none"
                                    type="file"
                                    ref={refImage}
                                    name="image"
                                    accept="image/x-png,image/gif,image/jpeg"
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
                        <div className="col-md-10 mt-4">
                            <div
                                className="tab-content"
                                style={{
                                    backgroundImage: `url(${url})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '100% 100%'
                                }}
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
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        // register event position
                                        stageRef.current.setPointersPositions(e);
                                        // add image
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
                                    ref={ref}
                                >
                                    <Stage
                                        width={1000}
                                        height={400}
                                        ref={stageRef}
                                        onMouseDown={checkDeselect}
                                        onTouchStart={checkDeselect}
                                    >
                                        {console.log('images', images)}
                                        <Layer>
                                            {images.map((image, id) => {
                                                return (
                                                    // <URLImage
                                                    //     image={image}
                                                    //     size={size}
                                                    // />
                                                    <Rectangle
                                                        key={id}
                                                        shapeProps={image}
                                                        image={image.src}
                                                        isSelected={id === selectedId}
                                                        onSelect={() => {
                                                            selectShape(id);
                                                        }}
                                                        onChange={(newAttrs) => {
                                                            console.log('Image onChange', newAttrs);
                                                            const imag = images.slice();
                                                            imag[id] = newAttrs;
                                                            imag[id].width = newAttrs.width;
                                                            imag[id].height = newAttrs.height;

                                                            console.log('Set images', imag);
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
                <div class="row">
                    <div className="col-12 mt-2">
                        {/* <div>
                        <label htmlFor="contained-button-file">
                            Upload Floor Image
                            <Input
                                id="contained-button-file"
                                className="d-none"
                                type="file"
                                ref={refImage}
                                name="image"
                                accept="image/x-png,image/gif,image/jpeg"
                                onChange={(e) => imageUpload(e)}
                            />
                        </label>
                    </div> */}
                        {/* <div className="d-flex justify-content-end">
                        <button onClick={downloadScreenshot}>Download</button>
                    </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizationDetail;

const URLImage = ({ image, size }) => {
    const [img] = useImage(image.src);
    const [isDraggable, setisDraggable] = useState(false);
    const [xAxis, setxAxis] = useState(50);
    const [yAxis, setyAxis] = useState(50);
    console.log('Size', img);
    return (
        <Image
            image={img}
            // I will use offset to set origin to the center of the image
            offsetX={img ? img.width / 2 : 0}
            offsetY={img ? img.height / 2 : 0}
            draggable
            x={xAxis}
            y={yAxis}
            onDragStart={() => {
                setisDraggable(true);
            }}
            onDragEnd={(e) => {
                setisDraggable(false);
                setxAxis(e.target.x());
                setyAxis(e.target.y());
            }}
        />
    );
};