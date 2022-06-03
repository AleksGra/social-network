import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../Redux/reducers/chatReducers";


export const ChatPage = () => {
    return (
        <div>
            <Chat />
        </div>
    );
};

export const Chat = () => {
    const dispatch=useDispatch()


    useEffect(() => {
        dispatch(startMessagesListening())
        return ()=>{
            dispatch(stopMessagesListening())
        }
    },[])


    return (
        <div>
            <Messages  />
            <AddMessageForm  />
        </div>
    );
};

export const Messages = () => {
    const messages=useSelector(state=>state.chat.messages)
    const messagesAnchorRef=useRef(null)
    const[isAutoScroll,setIsAutoScroll]=useState(true)
    const scrollHandler = (e) => {
        // const element = e.currentTarget;
        // if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        // {
        //     !isAutoScroll && setIsAutoScroll(true)
        // } else {
        //     isAutoScroll && setIsAutoScroll(false)
        // }
    }
    useEffect(()=>{
        isAutoScroll &&
        messagesAnchorRef.current?.scrollIntoView({behavior:'smooth'})
    },[messages])

    return (
        <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m, index) => (
                <Message key={index} message={m} />
            ))}
            <div ref={messagesAnchorRef}></div>
        </div>
    );
};
export const Message =React.memo( ({ message }) => {
    return (
        <div>
            <img src={message.photo} alt="avatar" style={{ width: '30px' }} />
            <br />
            {message.userName}
            <br />
            {message.message}
            <hr />
        </div>
    );
});
export const AddMessageForm = () => {
    const [message, setMessage] = useState('');
    const dispatch=useDispatch()

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message))
        setMessage('');
    };
    return (
        <div>
            <div>
                <textarea onChange={e => setMessage(e.target.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessageHandler} disabled={false}>
                    Send
                </button>
            </div>
        </div>
    );
};
