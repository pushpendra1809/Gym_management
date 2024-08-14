import React from "react";
import { useState } from "react";
import Profile from "../../assets/Profile.svg"

const Navbar = ({ active, setActive }) => {
  return (
    <div className="flex justify-center mb-3">
      <nav className="grid grid-cols-6 bg-green-100 px-2 w-full rounded-lg">
        <ul className="col-start-1 col-end-5 flex space-x-4">
          
          <li className=" px-4 py-2">
            <a
              href="#"
              onClick={() => setActive("announcements")}
              className={` ${
                active === "announcements" ? "border-b-2 border-black" : ""
              } py-2 px-3 hover:bg-green-200`}
            >
              Announcements
            </a>
          </li>
          <li className=" px-4 py-2">
            <a
              href="#"
              onClick={() => setActive("selectPackage")}
              className={` ${
                active === "selectPackage" ? "border-b-2 border-black" : ""
              } py-2 px-3 hover:bg-green-200`}
            >
              Select Package
            </a>
          </li>
          <li className=" px-4 py-2">
            <a
              href="#"
              onClick={() => setActive("myBills")}
              className={` ${
                active === "myBills" ? "border-b-2 border-black" : ""
              } py-2 px-3 hover:bg-green-200`}
            >
              My Bills
            </a>
          </li>
        </ul>
        <div className="col-end-7 flex justify-center">
          <button onClick={() => setActive("profile")} className="">
            <img src={Profile} alt="" className="w-8" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;