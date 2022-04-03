import { useAppDispatch, useAppSelector } from 'app/hooks';
import ChatContainer from 'components/ChatContainer';
import Contacts from 'components/Contacts';
import Welcome from 'components/Wellcome';
import routesMaps from 'layouts/routesMaps';
import { UserInfo } from 'models';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectUserListContact, userActions } from 'redux/user/slice';
import { getLocalData } from 'services';
import SocketManager from 'socket';
import { SK_CS_ADD_USER } from 'socket/constants';

function ChatPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const listContact = useAppSelector(selectUserListContact);

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

  useEffect(() => {
    if (!currentUser) return;

    if (!currentUser.avatar) {
      navigate(routesMaps.PROFILE_PAGE);
    }

    dispatch(userActions.loadUserList(currentUser.id));
  }, [navigate, dispatch, currentUser]);

  const handleChangeChat = (chat: UserInfo) => {
    setCurrentChat(chat);
  };

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-4 bg-[#131324]">
      <div className="h-[85vh] w-[85vw] bg-[#00000076] grid grid-cols-[25%_75%] md-2:grid-cols-[35%_65%]">
        {currentUser && (
          <Contacts contacts={listContact} userInfo={currentUser} onChangeChat={handleChangeChat} />
        )}
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
