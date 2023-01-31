import React from 'react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import { base_url, base_url_new } from 'utils/config';

import bgproduct from "assets/images/bgproduct.png";
import bgblur from "assets/images/bgblur.png";

function ProductsByDesigner({ data }) {
    console.log('User Banner', data);
    return (
        <div>
            <div className="product-by-designer" style={{ backgroundImage: `url(${bgproduct})` }}>
                <div className="product-by-designer" style={{ backgroundImage: `url(${bgblur})` }}>
                    <div className="container">
                        <div className="col-lg-4 col-md-7 col-10 mx-auto">
                            <h2>{data?.fullname ?? ""}</h2>
                            <p>{data?.description ?? ""}</p>
                            {/* <div className="Follow-button">
                                <Button>
                                    <Add className="icon" />
                                    Follow
                                </Button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsByDesigner;
