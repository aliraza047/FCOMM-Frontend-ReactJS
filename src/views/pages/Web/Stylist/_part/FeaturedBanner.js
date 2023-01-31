import React from "react";
import Button from "@mui/material/Button";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Search from "@mui/icons-material/Search";
import Add from "@mui/icons-material/Add";
import FeaturedWorks from "./FeaturedWorks";

function FeaturedBanner() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="">
      <div className="banner d-flex align-items-center">
        <div className="container">
            <div className="col-lg-4 col-md-7 col-10 mx-auto">
              <h2>House Of Chairs</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam.
              </p>
                <div className="Follow-button">
                  <Button>
                    <Add className="icon" />
                    Follow
                  </Button>
                </div>
                <div className="d-lg-flex d-md-flex d-sm-block justify-content-between mt-2">
                  <div className="Book-button">
                    <Button>Book Now</Button>
                  </div>
                  <div className="Cart-button">
                    <Button>Add to Cart</Button>
                  </div>
                </div>
          </div>
        </div>
      </div>
        <div className="featured">
      <div className="container">
          <div className="row align-items-center">
            <div className="content">
              <h1>Featured Works</h1>
            </div>
          </div>
        <FeaturedWorks />
        </div>
      </div>
    </div>
  );
}

export default FeaturedBanner;
