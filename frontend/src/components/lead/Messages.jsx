import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { FaAngleDown } from "react-icons/fa";

const Messages = ({ messages = [] }) => {
  const endOfMessagesRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

 

  return (
    <div className='relative h-[calc(100%-144px)] px-4 overflow-auto flex flex-col gap-y-2'>
      <div className='mb-auto' />
      {messages.map((message, key) => (
        <Message message={message} key={key} />
      ))}
      <div ref={endOfMessagesRef} />
      {showScrollButton && (
        <button
          className='fixed bottom-[100px] right-10 p-2 bg-blue-500 text-white rounded-full shadow-lg'
          onClick={scrollToBottom}
        >
          <FaAngleDown />
        </button>
      )}
    </div>
  );
};

export default Messages;
