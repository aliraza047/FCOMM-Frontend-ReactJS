import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TabContainer } from 'react-bootstrap';
import { TabContent } from 'react-bootstrap';
import { TabPane } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { Container } from 'react-bootstrap';
import profile from 'assets/images/home/Rectangle.png';
import CheckIcon from '@mui/icons-material/Check';
import GifBoxIcon from '@mui/icons-material/GifBoxOutlined';
import ImageIcon from '@mui/icons-material/ImageOutlined';
import AbcIcon from '@mui/icons-material/AbcOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { formatedTime, Log } from 'utils/helper';
import { isArrayCheck, image_url } from 'views/utilities/common';
import { getChat } from 'redux/action/Message';
import { base_url, base_url_new } from 'utils/config';

function MessageContent({ receiverId }) {
    const dispatch = new useDispatch();
    const { user } = useSelector((state) => state._auth);
    const { all_conversations, chat_messages } = useSelector((state) => state._message);
    const [convData, setConvData] = useState('')
    Log('Messgaes =>', chat_messages);
    useEffect(() => {
        const data = all_conversations.filter(x => x._id == receiverId)
        console.log('dataaa', data)
        setConvData(data)
        if (receiverId) {
            dispatch(getChat(receiverId));
        }
    }, [receiverId]);
    return (
        <div className="messagecontent">
            <TabContent>
                <TabPane eventKey={receiverId}>
                    <div className="d-flex align-items-center inbox">
                        <img
                            src={isArrayCheck(convData) && image_url(convData[0]?.participants[0]?.profile)} alt="" />
                        <div className="content">
                            <h2>{isArrayCheck(convData) ? convData[0]?.participants[0]?.fullname : "Ahmad Stanton"}</h2>
                        </div>
                    </div>

                    <div className="chat-list">
                        <div className="content-detail">
                            <div className="heading">
                                <h2>Yesterday</h2>
                            </div>
                        </div>
                        {/* <div className="col-md-8">
                            <div className="message-list">
                                <p>
                                    {' '}
                                    <img src={profile} alt="" />
                                    <span>Hi, Wilson. How are you?</span>
                                </p>
                                <h5>10:23 am</h5>
                            </div>
                        </div> */}

                        <div className="col-md-12">
                            {isArrayCheck(chat_messages) &&
                                chat_messages?.map((data, id) =>
                                    data?.fromId === user?.user?._id ? (
                                        <div className="message-right-list">
                                            <p>
                                                <span>{data?.text}</span>
                                            </p>
                                            <h5>
                                                {formatedTime(data?.createdAt)} <CheckIcon className="checkicon" />
                                            </h5>
                                        </div>
                                    ) : (
                                        <div className="message-list">
                                            <p>
                                                <img src={isArrayCheck(convData) && image_url(convData[0]?.participants[0]?.profile)} alt="" />

                                                <span>{data?.text}</span>
                                            </p>
                                            <h5>
                                                {formatedTime(data?.createdAt)} <CheckIcon className="checkicon" />
                                            </h5>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default MessageContent;
