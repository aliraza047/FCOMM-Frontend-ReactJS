import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MessageSideBar from './_part/MessageSideBar';
import MessageContent from './_part/MessageContent';
import { TabContainer } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/ImageOutlined';
import AbcIcon from '@mui/icons-material/AbcOutlined';
import io from 'socket.io-client';
import { server_url } from 'utils/config';
import { getRecieverId, Log } from 'utils/helper';
import { getMyConversations, sendMessage, getChat } from 'redux/action/Message';
import { useDispatch } from 'react-redux';

function index() {
    const [receiverId, setreceiverId] = useState('');
    const [convoId, setconvoId] = useState('');
    const [messageText, setmessageText] = useState('');
    const dispatch = useDispatch();

    const Input = styled('input')({
        display: 'none'
    });
    useEffect(() => {
        socket_connect();
    }, []);
    const socket_connect = async () => {
        const token = await localStorage.getItem('jwtToken');
        window._socket = await io.connect(server_url, {
            query: `token=${token.split('Bearer ')[1]}`
        });

        window._socket.on('connect', () => {
            dispatch(getMyConversations());
            console.log('Connected to Socket');
            window._socket.on('message.received', (data) => {
                console.log('message.received', data)
                dispatch(getChat(data?.message?.conversationId));
            });
            window._socket.on('message.offline', (data) => {
                dispatch(getMyConversations());
            });
            window._socket.on('message.online', (data) => {
                dispatch(getMyConversations());
            });
           
        });        
    };

    useEffect(() => {
        dispatch(getMyConversations());
    }, []);

    Log('ID Conversation', receiverId);
    const handleSendMessage = () => {
        dispatch(
            sendMessage({
                receiverId: receiverId,
                message: messageText,
                conID: convoId,
                type:'text'
            })
        );
        setmessageText('')
    };
    const handleClickedId = (con, participants, id) => {
        Log('Clicked', { con, participants, id });
        // setreceiverId(getRecieverId(participants, id));
        setreceiverId(participants);
        setconvoId(con);
    };
    return (
        <div>
            <div className="messages">
                <div className="heading">
                    <h2>Messages</h2>
                </div>
                <TabContainer id="left-tabs-example" defaultActiveKey="first">
                    <div className="row">
                        <div className="col-md-4">
                            <MessageSideBar setreceiverId={handleClickedId} />
                        </div>
                        <div className="col-md-8">
                            <MessageContent receiverId={convoId} />
                            {convoId &&
                                <div className="response">
                                    <AbcIcon className="abcicon" />

                                    <label htmlFor="contained-button-file">
                                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                        <ImageIcon className="imageicon" />
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Start a conversation..."
                                        value={messageText}
                                        onChange={(e) => setmessageText(e.target.value)}
                                    />
                                    <div onClick={() => handleSendMessage()}>
                                        <Button variant="contained" className="sendbtn" >
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </TabContainer>
            </div>
        </div>
    );
}

export default index;
