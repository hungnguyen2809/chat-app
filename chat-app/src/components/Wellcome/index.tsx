import { UserInfo } from 'models';
import React from 'react';
import robot from 'assets/images/robot.gif';

interface WelcomeProps {
  userInfo?: UserInfo;
}

function Welcome({ userInfo }: WelcomeProps) {
  return (
    <div className="flex justify-center items-center flex-col text-white font-bold">
      <img src={robot} alt="robot-welcome" className="h-[20rem]" />
      <h1 className="text-2xl">
        Wellcome <span className="text-[#4e00ff]">{userInfo?.fullname}</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </div>
  );
}

export default Welcome;
