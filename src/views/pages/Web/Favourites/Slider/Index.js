import React from 'react';
import ImageGallery from 'react-image-gallery';
const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
        thumbnailHeight: '70px',
        thumbnailClass: 'rounded'
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
        thumbnailHeight: '70px',
        thumbnailClass: 'rounded'
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        thumbnailHeight: '70px',
        thumbnailClass: 'rounded'
    }
];

export default class MyGallery extends React.Component {
    render() {
        return <ImageGallery thumbnailPosition="left" showNav={false} showPlayButton={false} items={this.props.images?this.props.images:images} />;
    }
}
