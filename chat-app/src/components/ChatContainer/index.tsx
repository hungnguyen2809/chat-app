import { useAppSelector } from 'app/hooks';
import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';
import { UserInfo } from 'models';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectUserListMessage, userActions } from 'redux/user/slice';
import SocketManager from 'socket';
import { SK_CS_SEND_MESSAGE, SK_SS_SEND_MESSAGE } from 'socket/constants';
import { v4 as uuid } from 'uuid';

interface ChatContainerProps {
  chatInfo?: UserInfo;
  userInfo?: UserInfo;
}

function ChatContainer({ chatInfo, userInfo }: ChatContainerProps) {
  const dispatch = useDispatch();

  const listMessage = useAppSelector(selectUserListMessage);

  useEffect(() => {
    SocketManager.on(SK_SS_SEND_MESSAGE, (msg: string) => {
      userActions.updateListMessages({ id: uuid(), fromSelf: false, message: msg });
    });
  }, []);

  useEffect(() => {
    if (userInfo && chatInfo) {
      dispatch(userActions.getAllMessage({ from: userInfo.id, to: chatInfo.id }));
    }
  }, [dispatch, userInfo, chatInfo]);

  const handleSendMessage = (mes: string) => {
    if (userInfo && chatInfo) {
      dispatch(
        userActions.addMessage({
          from: userInfo.id,
          to: chatInfo.id,
          message: mes,
        })
      );

      SocketManager.emit(SK_CS_SEND_MESSAGE, {
        from: userInfo.id,
        to: chatInfo.id,
        message: mes,
      });

      dispatch(userActions.updateListMessages({ id: uuid(), fromSelf: true, message: mes }));
    }
  };

  return chatInfo ? (
    <div className="pt-4 grid grid-rows-[10%_78%_12%] gap-4 overflow-hidden">
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
      <ChatMessage listMessage={listMessage} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  ) : null;
}

export default ChatContainer;
