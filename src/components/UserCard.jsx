import React from "react";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { toast } from "react-toastify";

const UserCard = ({ user, getUsers }) => {
  const currId = auth.currentUser.uid;
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "Users", id));
      toast.success("data deleted successfully!!", {
        position: "top-center",
      });
      getUsers();
    } catch (err) {
      toast.error("my:" + err.message, { position: "top-center" });
    }
  };
  const updateUser = async () => {
    try {
      const value = user.role == "admin" ? "user" : "admin";
      await updateDoc(doc(db, "Users", user.id), { role: value });
      toast.success("info updated successfully!!", {
        position: "top-center",
      });
      getUsers();
    } catch (err) {
      toast.error("my:" + err.message, { position: "top-center" });
    }
  };

  return (
    <>
      <div className="bg-slate-100 grid grid-cols-2 border-2 h-60 rounded-2xl pb-1 shadow-md hover:shadow-lg">
        <div className="flex justify-center items-center p-2  ">
          <img
            src={user.photoUrl}
            alt="no photo available"
            className="w-36 h-36 rounded-full object-cover overflow-hidden"
          />
        </div>
        <div className="p-2 h-48 text-sm text-gray-700 grid grid-cols-1 overflow-x-auto">
          <div className="mb-3 bg-slate-100 rounded px-2 ">
            <span className="block text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <div className="mb-3 bg-slate-100 rounded px-2 ">
            <span className="text-gray-600 block">Email:</span>
            <span className="block ">{user?.email}</span>
          </div>
          <div className="mb-3 bg-slate-100 rounded px-2 ">
            <span className="text-gray-600 block">Role:</span>
            <span className="block ">{user?.role}</span>
          </div>
          <div className="mb-3 bg-slate-100 rounded px-2 ">
            <span className="text-gray-600 block">Phone Number:</span>
            <span className="block1">{user?.phoneNo}</span>
            <span className="block  text-red-600">
              {!user.phoneNo ? "~ Not Available" : null}
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          {user.role == "user" && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md w-[95%] disabled:bg-blue-300"
              onClick={updateUser}
            >
              Make Admin
            </button>
          )}
          {user.role == "admin" && (
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md w-[95%] disabled:bg-green-400"
              onClick={updateUser}
              disabled={currId == user.id}
            >
              Make User
            </button>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md w-[95%] disabled:bg-red-400"
            onClick={() => {
              deleteUser(user.id);
            }}
            disabled={currId == user.id}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCard;
