import React, { useEffect } from 'react';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import FollowingTabs from './_part/FollowingTabs';
function Index() {
    return (
        <div>
            <Header />
            <FollowingTabs/>
            <Footer />
        </div>
    );
}

export default Index;
