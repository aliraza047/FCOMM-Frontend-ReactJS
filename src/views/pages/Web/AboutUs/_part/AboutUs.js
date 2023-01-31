import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router';
import { base_url, base_url_new } from 'utils/config';
import { getAboutUs } from 'redux/action/AboutUs';
import AboutApproach from "assets/images/image-approach.png";
import AboutUs1 from "assets/images/bg-aboutus.png";
import AboutUs2 from "assets/images/bg-aboutus2.png";

function AboutUs() {
  const { about_us } = useSelector((state) => state._aboutUs);
  const [row, setrow] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutUs());
  }, []);

  useEffect(() => {
    if (about_us) {
      setrow(about_us)
    } else {
      dispatch(getAboutUs());
    }
  }, [about_us]);
  console.log('row', row)
  return (<>
    <section className="about-us" style={{backgroundImage: `url(${AboutUs1})`}}>
      <div className="container">
        <div className="floatingBox1">
          <h1>About Us</h1>
          {
            row?.aboutUs ? (
              <p>{row?.aboutUs}</p>
            ) : (
              <React.Fragment>
                <p>OUR Asian Story is a community of designers, manufacturers, fabricators and logistic specialists who are passionate about bringing sustainable Asian design to the world. We believe in the deep heritage and the endless creativity of Asian designers. Our community is
                  committed to showcasing the potential of our designers.</p>
                <p>The market should decide what designs are winners, and it should not be down a handful of people to decide. This is the reason why our curation process is inclusive and centered on
                  practical matters and we leave the inspiration to the market.</p>
              </React.Fragment>
            )
          }
        </div>
      </div>
    </section>
    <section className='our-approach'>
      <div className="container">
        <div className="floatingBox2">
          <div className="row">
            <div className="col-md-6">
              {
                row?.url ? (
                  <img src={base_url_new + row?.url} alt="AboutApproach" />
                ) : (
                  <img src={AboutApproach} alt="AboutApproach" />
                )
              }
            </div>
            <div className="col-md-6">
              <h1>Our Approach</h1>
              {
                row?.ourApproach ? (
                  <p>{row?.ourApproach}</p>
                ) : (
                  <React.Fragment>
                    <p>
                      Good design works, great design inspires new conversations and possibilities. OUR is here to be the bridge between global demand and Asian designers. Our guiding light keeps us focused at a vision where any inspired designer with a laptop can create for himself or herself a global following.
                    </p>
                    <p>
                      We will curate the designers based on the feasibility of deliverable, not on their design per se, and ensure that everyone gets remunerated fairly and in a timely manner.
                    </p>
                    <p>We approach our designers with the respect they deserve, and our customers with the quality they are entitled to.
                    </p>
                  </React.Fragment>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="about-us-last" style={{backgroundImage: `url(${AboutUs2})`}}>
    <div className="container">
    <div className="floatingBox3">
       <h1>Our Statement of Value</h1>
       {
         row?.ourStatement ? (
           <p><p>{row?.ourStatement}</p></p>
         ) : (
           <React.Fragment>
            <p>We help homeowners complete their spaces with inspiring furniture
              pieces acquired directly from the manufacturers and designers.</p>
            <p>We partner with designers to translate their designs into physical pieces through our network of manufacturers in Asia and ship them to
              their global customers.</p>
           </React.Fragment>
         )
       }
    </div>
    </div>
    </section>
  </>
  )
}

export default AboutUs