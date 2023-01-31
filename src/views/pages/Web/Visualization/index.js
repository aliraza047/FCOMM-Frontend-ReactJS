import Header from '../../layout/header/index';
import Footer from '../../layout/footer/index';
import VisualizationDetail from './VisualizationDetail';
// function index() {
//   return (
//     <div>
//          <Header />
//         <VisualizationDetail/>
//         <Footer />
//     </div>
//   )
import React from 'react';
import CanvaCheck from './CanvaCheck';
import VisualizationDetail2 from './VisualizationDetail2';

function index() {
    return (
        <div>
            <Header />
            {/* <VisualizationDetail2 /> */}
            <VisualizationDetail />
            <Footer />
        </div>
    );
}

export default index;
