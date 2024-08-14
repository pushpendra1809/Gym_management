import React from "react";
import Bin from "../../assets/Bin.svg";

function AnnouncementCard({ announcement, deleteAnnouncement }) {
  return (
    <>
      <div
        key={announcement.id}
        className="bg-blue-100 mx-4 rounded-lg my-2 px-3 py-1"
      >
        <div className="grid grid-cols-4 border-b-2 border-blue-200 mb-3 px-2 py-2 ">
          <h1 className="text-2xl text-gray-700 col-span-3 my-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5875/5875271.png"
              alt=""
              className="w-8 inline"
            />{" "}
            {announcement.title}
          </h1>
          <span className="text-[12px] text-gray-500 col-span-1">
            {announcement.date}
          </span>
          <h3 className="text-[10px] text-gray-500 col-span-4">
            {announcement.time}
          </h3>
        </div>
        <div className="text-gray-600 mb-3">
          <p>{announcement.content}</p>
        </div>
        <div className=" my-3 ">
          <button
            className="bg-red-500 text-white  px-4 py-1 rounded hover:bg-red-600 "
            onClick={() => deleteAnnouncement(announcement.id)}
          >
            <img src={Bin} alt="" className="w-4 inline  " /> Remove
          </button>
        </div>
      </div>
    </>
  );
}

export default AnnouncementCard;
