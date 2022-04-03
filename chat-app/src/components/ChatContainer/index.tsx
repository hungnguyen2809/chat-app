import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';
import { UserInfo } from 'models';
import React from 'react';

interface ChatContainerProps {
  chatInfo?: UserInfo;
}

function ChatContainer({ chatInfo }: ChatContainerProps) {
  const handleSendMessage = (mes: string) => {
    console.log(mes);
  };

  return chatInfo ? (
    <div className="pt-4">
      <div className="flex justify-between items-center p-1">
        <div className="flex item-center gap-4">
          <div className="avatar">
            <img
              style={{ maxInlineSize: '100%' }}
              className="h-[3rem]"
              src={`data:image/svg+xml;base64,${chatInfo?.avatar}`}
              alt={`avatar-userinfo`}
            />
          </div>
          <div className="username">
            <h3 className="text-white font-bold text-base">{chatInfo?.fullname}</h3>
          </div>
        </div>
      </div>
      <ChatMessage />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  ) : null;
}

export default ChatContainer;
