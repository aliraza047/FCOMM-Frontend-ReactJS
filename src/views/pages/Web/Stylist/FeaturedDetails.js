import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import FeaturedWorks from './_part/FeaturedWorks';
import FeaturedBanner from './_part/FeaturedBanner';
import StylistCarousel from './_part/StylistCarousel'
function FeaturedDetails() {
    return (
        <div>
            <Header />
            <FeaturedBanner/>
            <StylistCarousel/>
            <Footer />
        </div>
    );
}

export default FeaturedDetails;
