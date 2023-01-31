import React, { useEffect } from 'react';
import Multicarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-bootstrap/Carousel';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import MainStory from './_part/MainStory';
import FilterBar from './_part/FilterBar';
import AllStories from './_part/AllStories';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogListing } from 'redux/action/Customer.Action/Blog';
import { AddInLocalStorage, console_log } from 'utils/helper';

export default function index() {
    const { all_home_data } = useSelector((state) => state._home);
    const { all_blogs_data } = useSelector((state) => state._homeBlog);
    console.log('Home Page', all_blogs_data);
    const [allStories, setallStories] = React.useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogListing());
    }, []);
    useEffect(() => {
        AddInLocalStorage("stories")
    }, []);

    useEffect(() => {
        if (all_blogs_data) {
            setallStories(all_blogs_data);
        }
    }, [all_blogs_data]);

    const handleSearch = (e) => {
        const data = all_blogs_data.filter((x, id) => {
            if (String(x?.name.toLowerCase()).includes(e.target.value.toLowerCase())
                // || String(x?.designer.fullname.toLowerCase()).includes(e.target.value.toLowerCase())
                // || String(x?.content.toLowerCase()).includes(e.target.value.toLowerCase())
            ) {
                return x
            }
        })
        if (data) {
            setallStories(data);
        } else {
            setallStories('');
        }
    };
    return (
        <div>
            <Header />
            <MainStory data={all_blogs_data ? all_blogs_data[0] : {}} />
            <FilterBar noOfStories={allStories?.length} handleSearch={handleSearch} />
            <AllStories blogsData={allStories} />
            <Footer />
        </div>
    );
}
