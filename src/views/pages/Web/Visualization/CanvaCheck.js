import React, { useState } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

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

const CanvaCheck = () => {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);
    const [size, setsize] = useState(100);
    return (
        <div
            style={{
                backgroundImage: `url(
                    https://img.freepik.com/free-photo/wood-floor-cement-wall-empty-room-background-big-empty-room-grange-style-with-wooden-floor_99266-398.jpg?size=626&ext=jpg
                )`
            }}
        >
            Try to trag and image into the stage:
            <br />
            <div className="btn btn-info" onClick={() => setsize(size + 1)}>
                Increase Image Size
            </div>
            <img
                alt="lion"
                src="https://www.pngall.com/wp-content/uploads/2016/04/Sofa-Download-PNG.png"
                draggable="true"
                height={size}
                onDragStart={(e) => {
                    dragUrl.current = e.target.src;
                }}
            />
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
                                src: dragUrl.current
                            }
                        ])
                    );
                }}
                onDragOver={(e) => e.preventDefault()}
            >
                <Stage width={window.innerWidth} height={600} style={{ border: '1px solid grey' }} ref={stageRef}>
                    <Layer>
                        {images.map((image) => {
                            return <URLImage image={image} size={size} />;
                        })}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
};

export default CanvaCheck;
