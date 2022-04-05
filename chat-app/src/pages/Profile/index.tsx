import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/hooks';
import loader from 'assets/images/loader.gif';
import { Buffer } from 'buffer';
import routesMaps from 'layouts/routesMaps';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { actionGetMultiAvatar, actionUserUpdAvatar } from 'redux/user/actions';
import { getLocalData } from 'services';
import { getMessageError } from 'utils/commom';
import { toastError, toastSuccess } from 'utils/toastify';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [avatars, setAvatars] = useState<string[]>([]);
  const [avatarSelected, setAvatarSelected] = useState<number>();
  const [loadingAvatar, setLoadingAvatar] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);

  const handleInitAvatars = useCallback(async () => {
    setLoadingAvatar(true);
    const data: string[] = [];

    try {
      for (let i = 1; i <= 3; i++) {
        const randomAvatar = Math.round(Math.random() * 1e5);
        const response = await dispatch(actionGetMultiAvatar(randomAvatar));
        const image = unwrapResult(response);

        const buffer = new Buffer(image);
        data.push(buffer.toString('base64'));
      }
    } catch (error) {
      // toastError(get(error, 'message', ''));
    }

    setAvatars(data);
    setLoadingAvatar(false);
  }, [dispatch]);

  useEffect(() => {
    if (avatars.length === 0) {
      handleInitAvatars();
    }
  }, [avatars, handleInitAvatars]);

  const handleSetProfilePicture = async () => {
    if (avatarSelected === undefined) {
      toastError('Please choose avatar for profie.');
      return;
    }

    const userInfo = getLocalData('userInfo');
    try {
      setLoadingUpdate(true);
      await dispatch(actionUserUpdAvatar({ id: userInfo?.id, image: avatars[avatarSelected] }));
      setLoadingUpdate(false);
      toastSuccess('Update avatar successfully!');
      navigate(routesMaps.HOME);
    } catch (error) {
      setLoadingUpdate(false);
      toastError(getMessageError(error));
    }
  };

  return (
    <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-[100vh] w-[100vw]">
      {loadingAvatar ? (
        <img src={loader} alt="loader-avatar" />
      ) : (
        <React.Fragment>
          <h1 className="text-white text-3xl font-bold">Pick an avatar as your profile picture</h1>
          <div className="flex gap-8">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`profile-choose-avatar cursor-pointer ${
                  avatarSelected === index ? 'border-[0.4rem] border-solid border-[#4e0eff]' : ''
                }`}
              >
                <img
                  className="h-[6rem]"
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar-${index + 1}`}
                  onClick={() => setAvatarSelected(index)}
                />
              </div>
            ))}
            {avatars.length === 0 && <h1 className="text-white text-2xl">Something went wrong when loading avatar</h1>}
          </div>

          <button onClick={handleSetProfilePicture} className="btn-submit flex justify-center items-center">
            <HashLoader color={'#fff'} loading={loadingUpdate} size={20} />
            <p className="ml-[10px]">Set as Profile Picture</p>
          </button>
        </React.Fragment>
      )}
    </div>
  );
}

export default ProfilePage;
