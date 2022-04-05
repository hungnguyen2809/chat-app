import { useAppDispatch } from 'app/hooks';
import logo from 'assets/images/logo.svg';
import Logout from 'components/Logout';
import routesMaps from 'layouts/routesMaps';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BounceLoader from 'react-spinners/BounceLoader';
import { UserInfo } from 'redux/auth/type';
import { actionUserLoadLstContact } from 'redux/user/actions';

interface ContactsProps {
  contacts?: UserInfo[];
  userInfo?: UserInfo;
  onChangeChat?: (chat: UserInfo) => void;
}

function Contacts({ contacts, userInfo, onChangeChat }: ContactsProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [contactSelected, setContactSelected] = useState<number>();

  const handleLoadLstContact = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        await dispatch(actionUserLoadLstContact({ id }));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!userInfo) return;

    if (!userInfo.avatar) {
      navigate(routesMaps.PROFILE_PAGE);
    }

    handleLoadLstContact(userInfo.id);
  }, [navigate, userInfo, handleLoadLstContact]);

  useEffect(() => {
    if (userInfo && userInfo.avatar) {
      setUserAvatar(userInfo.avatar);
    }
  }, [userInfo]);

  const hanldeChangeContact = (contact: UserInfo, index: number) => {
    if (contactSelected === index) return;

    setContactSelected(index);
    onChangeChat?.(contact);
  };

  return userInfo && userAvatar ? (
    <div className="grid grid-rows-[10%_75%_15%] overflow-hidden bg-[#080420]">
      <div className="flex items-center justify-center gap-4">
        <img src={logo} alt="logo" className="h-[2rem]" />
        <h3 className="text-white text-sm uppercase font-bold">snappy</h3>
      </div>
      <div className="flex flex-col items-center overflow-auto gap-[0.8rem]">
        {loading ? (
          <div className="h-[100%] w-[100%] flex justify-center items-center">
            <BounceLoader color="#9186f3" size={50} />
          </div>
        ) : (
          <React.Fragment>
            {contacts?.map((contact, idx) => (
              <div
                key={idx}
                className={`bg-[#ffffff39] min-h-[5rem] w-[90%] cursor-pointer rounded-[0.2rem] p-[0.4rem] gap-[1rem] flex items-center transition ease-in-out delay-100 ${
                  contactSelected === idx ? 'bg-[#9186f3]' : ''
                }`}
                onClick={() => hanldeChangeContact(contact, idx)}
              >
                <div className="avatar">
                  <img
                    className="h-[3rem]"
                    src={`data:image/svg+xml;base64,${contact.avatar}`}
                    alt={`avatar-${idx + 1}`}
                  />
                </div>
                <div className="username">
                  <h3 className="text-white text-sm font-bold">{contact.username}</h3>
                  <h4 className="text-white text-base">{contact.fullname}</h4>
                </div>
              </div>
            ))}
            {!contacts?.length && (
              <div className="h-[100%] w-[100%] flex justify-center items-center">
                <h3 className="text-white text-base font-bold">Oh no, you don't have friends</h3>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
      <div className="bg-[#0d0d30] flex justify-center items-center gap-[2rem] md-2:gap-[0.5rem]">
        <div className="avatar">
          <img
            style={{ maxInlineSize: '100%' }}
            className="h-[4rem]"
            src={`data:image/svg+xml;base64,${userAvatar}`}
            alt={`avatar-userinfo`}
          />
        </div>
        <div className="username">
          <h3 className="text-white text-sm md-2:text-xs font-bold">{userInfo.username}</h3>
          <h4 className="text-white text-base md-2:text-sm">{userInfo.fullname}</h4>
          <br />
          <Logout />
        </div>
      </div>
    </div>
  ) : null;
}

export default Contacts;
