import apiCommon from 'api/apiCommon';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import loader from 'assets/images/loader.gif';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import { authActions, selectAuthLoading } from 'redux/auth/slice';
import { getLocalData } from 'services';
import { toastError } from 'utils/toastify';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loadingAuth = useAppSelector(selectAuthLoading);

  const [loading, setLoading] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [avatarSelected, setAvatarSelected] = useState<number>();

  useEffect(() => {
    if (avatars.length === 0) {
      handleInitAvatars();
    }
  }, [avatars]);

  const handleInitAvatars = async () => {
    setLoading(true);
    const data: string[] = [];

    try {
      for (let i = 1; i <= 3; i++) {
        const randomAvatar = Math.round(Math.random() * 1e5);
        const image = await apiCommon.getMultiAvatars(randomAvatar);

        const buffer = new Buffer(image);
        data.push(buffer.toString('base64'));
      }
    } catch (error) {
      // toastError(get(error, 'message', ''));
    }

    setAvatars(data);
    setLoading(false);
  };

  const handleSetProfilePicture = () => {
    if (avatarSelected === undefined) {
      toastError('Please choose avatar for profie.');
      return;
    }

    const userInfo = getLocalData('userInfo');
    dispatch(
      authActions.updateAvatar({
        id: userInfo?.id,
        image: avatars[avatarSelected],
        navigate,
      })
    );
  };

  return (
    <div className="flex justify-center items-center flex-col gap-12 bg-[#131324] h-[100vh] w-[100vw]">
      {loading ? (
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
            {avatars.length === 0 && (
              <h1 className="text-white text-2xl">Something went wrong when loading avatar</h1>
            )}
          </div>

          <button
            onClick={handleSetProfilePicture}
            className="btn-submit flex justify-center items-center"
          >
            <HashLoader color={'#fff'} loading={loadingAuth} size={20} />
            <p className="ml-[10px]">Set as Profile Picture</p>
          </button>
        </React.Fragment>
      )}
    </div>
  );
}

export default ProfilePage;
