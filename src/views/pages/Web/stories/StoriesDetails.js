import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useLocation, useParams } from 'react-router';
import Footer from '../../layout/footer/index';
import Header from '../../layout/header/index';
import StoriesCarousel from './_part/StoriesCarousel';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { base_url_new } from '../../../../utils/config';
import { AddInLocalStorage, formatedDate } from 'utils/helper';
import ProductCarousel from '../Shop/_part/ProductCarousel';
import { getBlogListing } from 'redux/action/Customer.Action/Blog';
import { useDispatch, useSelector } from 'react-redux';
import { ShareSocial } from 'react-share-social';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CopyToClipboard } from "react-copy-to-clipboard";
import TextField from '@mui/material/TextField';


function StoriesDetails() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { id } = useParams();
    // const { state } = useLocation();
    const [state, setState] = useState('')
    const [open, setOpen] = React.useState(false);
    const [url, setUrl] = useState(true);
    const [copyValue, setCopyValue] = useState(false)

    const { all_blogs_data } = useSelector((state) => state._homeBlog);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseDailog = () => {
        setOpen(false);
        setCopyValue(false)
    };

    const style = {
        background: '#e5d1c1 ',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0px'
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [state]);

    useEffect(() => {
        const ddd = window.location.href;
        setUrl(ddd);
    }, []);

    useEffect(() => {
        console.log('all', all_blogs_data)
        const filterBlog = all_blogs_data.filter((x) => x._id == id)
        console.log('filterProd', filterBlog[0])
        setState(filterBlog[0])

    }, [all_blogs_data, id])

    useEffect(() => {
        dispatch(getBlogListing());
        AddInLocalStorage("stories")

    }, []);
    return (
        <div>
            {state &&
                <>
                    <Header />
                    <div className="stories-details">
                        <div className="container">
                            <div className="back-btn">
                                <Button onClick={() => navigate(-1)}>
                                    <ArrowBackIosIcon /> Back
                                </Button>
                            </div>
                            <h5>{state?.name}</h5>
                            <img
                                src={
                                    state?.image
                                        ? base_url_new + state?.url
                                        : 'https://media.istockphoto.com/photos/pakistan-monument-islamabad-picture-id535695503?k=20&m=535695503&s=612x612&w=0&h=S16wHXc-b3AkL7YMrcFkR2pDGFJA1bRsPmAfQlfrwkc='
                                }
                                alt=""
                            />
                            {/* <p className="small">{state?.name}</p> */}
                            <div className="description" style={{marginTop: "30px"}}>
                                {/* <p className="main-heading">{state?.name}</p>
                                <p>{state?.description}</p> */}
                                <p dangerouslySetInnerHTML={{ __html: state?.content }}></p>
                            </div>
                            <div className="share">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <p className="share-heading">Credits:</p>
                                        <p className="share-heading">
                                            {formatedDate(state?.created_at)} | {state?.createdBy?.fullname}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="share-heading">Share it!</p>
                                        <div className="social" style={{cursor: "pointer"}}>
                                            {/* <FacebookIcon /> */}
                                            <ShareIcon  onClick={handleClickOpen}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <StoriesCarousel />
                    {/* <ProductCarousel /> */}
                    <Footer />
                </>
            }

            <Dialog
                open={open}
                onClose={handleCloseDailog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="customModalMain"
            >
                <DialogContent className="">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2 className="mb-2" style={{
                            color: "#8c5d2f",
                            fontSize: "22px"
                        }}>Share this story</h2>
                        <CloseIcon className="mb-2" onClick={handleCloseDailog} />
                    </div>
                    <div className="col-md-12 col-12 mx-auto text-center shareMain">
                        <ShareSocial style={style} url={url} socialTypes={['facebook', 'twitter', 'linkedin']} />

                        <div className="col-md-12">
                            <div className="input-popup d-flex justify-content-between">
                                <TextField fullWidth className="url-input" label="" variant="standard" value={url} />
                                <CopyToClipboard  text={url} onCopy={() => setCopyValue(true)}>
                                    <button>{copyValue ? "Copied" : "Copy"}</button>
                                </CopyToClipboard>
                            </div>
                            {/* <div contenteditable="true" class="editorNew editorNew_scroll">{url}</div>
                                <input value={url} type="text" size="45" />
                                <button>Copy</button>
                            </div> */}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default StoriesDetails;
