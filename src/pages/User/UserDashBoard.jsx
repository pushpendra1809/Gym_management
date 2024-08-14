import { useState,useEffect } from "react";
import Navbar from "../../components/User/UserNav";
import Announcements from "./Announcements";
import Profile from "./Profile";
import SelectPackage from "./SelectPackage";
import Bills from "./Bills";

export const UserDashBoard = () => {
  const [active, setActive] = useState("announcements");


  return (
    <>
      <div className="bg-gradient-to-r from-green-300 to-green-200 w-full min-h-screen">
        <Navbar setActive={setActive} active={active} />
        {active === "announcements" && <Announcements />}
        {active === "profile" && <Profile />}
        {active === "selectPackage" && <SelectPackage />}
        {active === "myBills" && <Bills />}
        
      </div>
    </>
  );
};

