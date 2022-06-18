import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import style from './ChatPage.module.scss';
import MessagesArea from './MessagesArea/MessagesArea';

const socket = io.connect('http://localhost:3001');

function ChatPage() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState({});
  const [room, setRoom] = useState('');
  const [userConnected, setUserConnected] = useState('');

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  const getUserRoom = () => {
    const roomFromLocalStorage = localStorage.getItem('userRoom');
    return roomFromLocalStorage;
  };

  const setUserRoom = (userRoom) => {
    if (userRoom) {
      setRoom(userRoom);
      localStorage.setItem('userRoom', userRoom);
    }
  };

  const sendMessage = () => {
    socket.emit('send_message', { message, room }); // envia um evento EMIT do tipo send_message para o backend
    // tambem envia a room que o usuario esta conectado
  };

  useEffect(() => {
    socket.on('receive_message', (data) => { // recebe o evento do tipo receive_message do backend
      setMessageReceived(
        {
          message: data.message,
          room: data.room,
        },
      );
    });

    socket.on('receive_connect_message', (data) => {
      setUserConnected(data.message);
    });
  }, [socket]);

  return (
    <div className={style.wrapper}>
      {messageReceived && (
      <MessagesArea
        messageReceived={messageReceived.message}
        roomMessageReceived={messageReceived.room}
      />
      )}
      <div className={style.buttons}>
        <input
          className={style.roomInput}
          placeholder="Room Number..."
          onChange={(event) => {
            setUserRoom(event.target.value);
          }}
        />
        <button
          className={style.roomButton}
          onClick={joinRoom}
        >
          Join Room
        </button>
        <input
          className={style.sendMessageInput}
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button
          className={style.sendMessageButton}
          onClick={sendMessage}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
