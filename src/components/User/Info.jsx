import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const Info = ({ userData, active }) => {
  const navigate = useNavigate();
  const Logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      <div className="mb-3 bg-slate-100 rounded px-3 py-2">
        <span className="text-gray-600 block">Name:</span>
        <span className="block text-lg">
          {userData?.firstName} {userData?.lastName}
        </span>
        <span className="block text-red-600">
          {!userData.firstName ? "~ Not Available" : null}
        </span>
      </div>
      <div className="mb-3 bg-slate-100 rounded px-3 py-2">
        <span className="text-gray-600 block">Email:</span>
        <span className="block text-lg">{userData?.email}</span>
      </div>
      <div className="mb-3 bg-slate-100 rounded px-3 py-2">
        <span className="text-gray-600 block">Phone Number:</span>
        <span className="block text-lg">{userData?.phoneNo}</span>
        <span className="block  text-red-600">
          {!userData.phoneNo ? "~ Not Available" : null}
        </span>
      </div>
      <div className="mb-3 bg-slate-100 rounded px-3 py-2">
        <span className="text-gray-600 block">Address:</span>
        <span className="block text-lg">{userData?.address}</span>
        <span className="block text-red-600">
          {!userData.address ? "~ Not Available" : null}
        </span>
      </div>
      <div className="flex justify-between mt-5">
        <button
          className="bg-transparent border-2 border-blue-500 px-3 py-1 lg:px-8 lg:py-2 rounded-md text-blue-500 hover:border-blue-600 hover:text-blue-600 text-sm"
          onClick={active}
        >
          Edit Profile
        </button>
        <button
          onClick={Logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 lg:px-8 lg:py-2 rounded-md  text-white "
        >
          LogOut
        </button>
      </div>
    </>
  );
};

export default Info;
