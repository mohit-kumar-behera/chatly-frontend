import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { updateMessageContainer } from '../../redux/Message/action';

import ChatScreenUser from '../../components/ChatScreenUser/ChatScreenUser';
import ChatScreenMessageDisplay from '../../components/ChatScreenMessageDisplay/ChatScreenMessageDisplay';
import ChatScreenMessageCreate from '../../components/ChatScreenMessaegCreate/ChatScreenMessageCreate';
import './ChatScreen.css';

import { ENDPOINT_URL } from '../../utils';

const ChatScreen = ({ loggedInUser, msgContainer, updateMessageContainer }) => {
  const { id } = useParams();
  const [chatWithUser, setChatWithUser] = useState('');
  const [room, setRoom] = useState('');
  const [chatConnectionEstablished, setChatConnectionEstablished] =
    useState(false);
  /*
   // Structues of msgContainers
    {
      'room1': [{<messageObj>}. {<messageObj>}],
      'room2': [{<messageObj>}, {<messageObj>}, {<messageObj>}]
    }
    
  */

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(ENDPOINT_URL);
    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    socketRef.current.emit('getOpponentUser', id, opponentUser => {
      if (!opponentUser) return alert('Something went wrong');

      setChatWithUser(opponentUser);

      if (loggedInUser) {
        let roomStr =
          loggedInUser.mobileNumber +
          opponentUser.mobileNumber +
          loggedInUser.name +
          opponentUser.name;
        roomStr = roomStr.split('').sort().join('').replace(/ /g, '');

        setRoom(roomStr);
      }
    });

    socketRef.current.emit('joinChat', room, connectionStatus => {
      setChatConnectionEstablished(connectionStatus);

      if (!connectionStatus) {
        return alert('Connection not established successfully');
      }
      // console.log('connection established');
    });
  }, [id, loggedInUser, room]);

  useEffect(() => {
    socketRef.current.on('message', messageObj => {
      /*
       // Structure of messageObj
        {
          id: '<id>',
          message: '<message>',
          sentByUser: { name: '<name>', mobileNumber: '<number>' },
          toRoom: '<room>',
        }
      */
      updateMessageContainer(messageObj);
    });
  }, [msgContainer, updateMessageContainer]);

  const onSendMessage = message => {
    if (!message.length) return;

    const messageObj = { message, sentByUser: loggedInUser, toRoom: room };

    if (!chatConnectionEstablished)
      return alert('Connection not established successfully');

    socketRef.current.emit('sendMessage', messageObj, () => {});
  };

  return (
    <div className="chat-screen-wrapper">
      <ChatScreenUser chatWithUser={chatWithUser} />
      <ChatScreenMessageDisplay
        messages={msgContainer?.[room] ?? {}}
        me={loggedInUser}
      />
      <ChatScreenMessageCreate onSendMessageHandler={onSendMessage} />
    </div>
  );
};

const mapStateToProps = state => {
  const { user: loggedInUser } = state.user;
  const { msgContainer } = state;

  return { loggedInUser, msgContainer };
};

export default connect(mapStateToProps, { updateMessageContainer })(ChatScreen);
