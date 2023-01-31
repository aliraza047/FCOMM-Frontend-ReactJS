import React, { useEffect } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProductsTab from './ProductsTab';
import StylistsTab from './StylistsTab';
import { clearUserListing, getAllUserListing } from 'redux/action/User';
import { useDispatch, useSelector } from 'react-redux';
function FavouriteTabs() {
    const [value, setValue] = React.useState('1');
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { all_users } = useSelector((state) => state._user);

    useEffect(() => {
        dispatch(getAllUserListing({ isApproved: 'approved', role: 'designer' }));
        return () => {
            dispatch(clearUserListing());
        };
    }, []);
    return (
        <div>
            <div className="following">
                <div className="container">
                    <div className="following-heading">
                        <h5>Favourite</h5>
                    </div>
                    <div className="tabs">
                        <TabContext value={value}>
                            <TabList
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="transparent"
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Products" className="border-right" value="1" />
                                <Tab label="Stylist" value="2" />
                            </TabList>
                            <TabPanel value="1" className="p-0">
                                <ProductsTab users={all_users} />
                            </TabPanel>
                            {/* <TabPanel value="2" className="p-0">
                                <StylistsTab />
                            </TabPanel> */}
                        </TabContext>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FavouriteTabs;
