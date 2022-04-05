import { useAppSelector } from 'app/hooks';
import ChatContainer from 'components/ChatContainer';
import Contacts from 'components/Contacts';
import Welcome from 'components/Wellcome';
import React, { useEffect, useState } from 'react';
import { UserInfo } from 'redux/auth/type';
import { selectUserLstContact } from 'redux/user/selectors';
import { getLocalData } from 'services';
import SocketManager from 'socket';
import { SK_CS_ADD_USER } from 'socket/constants';

function ChatPage() {
  const listContact = useAppSelector(selectUserLstContact);

  const [currentUser, setCurrentUser] = useState<UserInfo>();
  const [currentChat, setCurrentChat] = useState<UserInfo>();

  useEffect(() => {
    const userInfo = getLocalData('userInfo');
    setCurrentUser(userInfo);
  }, []);

  useEffect(() => {
    if (currentUser) {
      SocketManager.emit(SK_CS_ADD_USER, currentUser.id);
    }
  }, [currentUser]);

  const handleChangeChat = (chat: UserInfo) => {
    setCurrentChat(chat);
  };

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-4 bg-[#131324]">
      <div className="h-[85vh] w-[85vw] bg-[#00000076] grid grid-cols-[25%_75%] md-2:grid-cols-[35%_65%]">
        {currentUser && <Contacts contacts={listContact} userInfo={currentUser} onChangeChat={handleChangeChat} />}
        {currentChat === undefined ? (
          <Welcome userInfo={currentUser} />
        ) : (
          <ChatContainer chatInfo={currentChat} userInfo={currentUser} />
        )}
      </div>
    </div>
  );
}

export default ChatPage;
