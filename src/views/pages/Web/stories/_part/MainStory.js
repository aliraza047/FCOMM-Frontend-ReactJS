import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { base_url_new } from 'utils/config';
import { formatedDate } from 'utils/helper';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ShareSocial } from 'react-share-social';
import { CopyToClipboard } from "react-copy-to-clipboard";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation, useParams } from 'react-router';

function MainStory({ data }) {
    const { id } = useParams();
    const [open, setOpen] = React.useState(false);

    const [url, setUrl] = useState(true);
    const [copyValue, setCopyValue] = useState(false)

    const navigate = useNavigate();

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
        padding: '0 30px'
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    };

    useEffect(() => {
        const ddd = window.location.href;
        setUrl(ddd);
    }, []);
    return (
        <div>
            <div className="main-story">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <img
                                src={
                                    data?.image
                                        ? base_url_new + data?.url
                                        : 'https://media.istockphoto.com/photos/pakistan-monument-islamabad-picture-id535695503?k=20&m=535695503&s=612x612&w=0&h=S16wHXc-b3AkL7YMrcFkR2pDGFJA1bRsPmAfQlfrwkc='
                                }
                                alt="image"
                            />
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="story-content">
                                <h5>{data?.name}</h5>
                                <p className="date">{formatedDate(data?.created_at)}</p>
                                <p className="description">{data?.description}</p>
                                <p className="read-more">
                                    <Button onClick={() => navigate(`/stories-details/${data?._id}`)}>Read More</Button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleCloseDailog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="customModalMain"
            >
                <DialogContent className="">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2 className="mb-2">Link</h2>
                        <CloseIcon className="mb-2" onClick={handleCloseDailog} />
                    </div>
                    <div className="col-md-12 col-12 mx-auto text-center shareMain">
                        <ShareSocial style={style} url={url} socialTypes={['facebook', 'twitter', 'linkedin']} />

                        <div className="col-md-10 mx-auto">
                            <div className="input-popup d-flex justify-content-between">
                                <div contenteditable="true" class="editorNew">{url}</div>
                                {/* <input value={url} type="text" size="45" /> */}
                                <CopyToClipboard text={url} onCopy={() => setCopyValue(true)}>
                                    <button>{copyValue ? "Copied" : "Copy"}</button>
                                </CopyToClipboard>
                                {/* <button>Copy</button> */}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MainStory;
