import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContainer } from 'react-bootstrap';
import { NavLink } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import profile from 'assets/images/home/Rectangle.png';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import MessagePopup from './Popup/MessagePopup';
import { useDispatch, useSelector } from 'react-redux';
import { getMyConversations } from 'redux/action/Message';
import { isArrayCheck , image_url } from 'views/utilities/common';
import { base_url, base_url_new } from 'utils/config';
import { getRecieverId } from 'utils/helper';
function MessageSideBar({ setreceiverId }) {
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = React.useState(false);
    const { all_conversations, chat_messages } = useSelector((state) => state._message);
    const { user } = useSelector((state) => state._auth);

    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [fullWidth, setFullWidth] = React.useState(true);
    const [selectedUser, setselectedUser] = React.useState('');
    useEffect(() => {
            dispatch(getMyConversations());
    }, []);

    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };
    return (
        <div>
            <div className="messagesidebar">
                <div className="heading">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2>Messages</h2>
                        <SearchIcon onClick={handleClickOpen} />
                    </div>
                </div>
                <div className="chat-list">
                    <Nav variant="pills" className="flex-column">
                        {isArrayCheck(all_conversations) &&
                            all_conversations?.map((data, id) => (
                                <NavItem onClick={() => setreceiverId(data?._id, data?.participants[0]._id, user?.user?._id)}>
                                    <NavLink eventKey={data?._id}>
                                        <div className="d-flex align-items-center inbox">
                                            <div className="profile">
                                                <img
                                                    src={image_url( data?.participants[0]?.profile) }
                                                    alt=""
                                                />
                                                {data?.participants[0]?.isOnline &&  <div className="dot"></div> }
                                            </div>

                                            <div className="content">
                                                <h2>{data?.participants[0]?.fullname}</h2>
                                                <p>Hi</p>
                                            </div>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            ))}
                    </Nav>
                </div>
            </div>
            <MessagePopup open={open} handleClose={handleClose} />
        </div>
    );
}

export default MessageSideBar;
