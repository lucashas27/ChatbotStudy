import React from 'react'
import style from './MessagesArea.module.scss'

const MessagesArea = ({messageReceived, roomMessageReceived}) => {
  return (
    messageReceived &&
    <div className={style.messagesAreaWrapper}>     
       <h1> Message: </h1>
      <div className={style.messageReceived}>
        <span>
            {`(Sala ${roomMessageReceived}): ${messageReceived} `}
        </span>
      </div>
      
    </div>
  )
}

export default MessagesArea