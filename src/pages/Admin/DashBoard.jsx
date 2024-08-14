import { useState } from "react";
import Navbar from "../../components/AdminNav";
import Bills from "./Bills";
import AllUsers from "./AllUsers";
import Announcements from "./Announcements";
import ManagePackage from "./ManagePackage";
import Profile from "../User/Profile";

export const AdminDashBoard = () => {
  const [active, setActive] = useState("allUsers");

  return (
    <>
      <div className="bg-gradient-to-r from-green-300 to-green-200 w-full min-h-screen">
        <Navbar setActive={setActive} active={active} />
        {active === "allUsers" && <AllUsers />}
        {active === "announcements" && <Announcements />}
        {active === "bills" && <Bills />}
        {active === "managePackage" && <ManagePackage />}
        {active === "profile" && <Profile />}
      </div>
    </>
  );
};
