import { useEffect, useState } from "react";
import ProfileCard from "../../components/User/ProfileCard";
import ProfileLogo from "../../assets/ProfileLogo.svg";

const Profile = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[96%] md:w-[80%] lg:w-[70%] h-[600px]">
          <ProfileCard />
        </div>
      </div>
    </>
  );
};

export default Profile;
