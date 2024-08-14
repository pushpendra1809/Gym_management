import { useState, useEffect } from "react";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Receipt from "../../assets/Receipt.svg";

const BillCard = ({ bill }) => {
  const [userData, setUserData] = useState({});
  const [packageData, setPackageData] = useState({});
  const getUser = async () => {
    try {
      const docRef = doc(db, "Users", bill.userId);
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.log("err:", err.message);
    }
  };
  const getPackage = async () => {
    try {
      const docRef = doc(db, "Packages", bill.packageId);
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      console.log(data);
      setPackageData(data);
    } catch (err) {
      console.log("err:", err.message);
    }
  };
  useEffect(() => {
    getUser();
    getPackage();
  }, []);

  return (
    <>
      <div className="bg-blue-400 shadow-md rounded-md border-b-8  border-gray-600 p-5 grid grid-cols-2">
        <div className="text-gray-800 col-span-2">
          <span className="text-gray-600 pr-2">Name:</span>
          <span>
            {userData.firstName} {userData.lastName}
          </span>
        </div>

        <div className="text-gray-800 col-span-2">
          <span className="text-gray-600 pr-2">Email:</span>
          <span>{userData.email}</span>
        </div>
        <div className="text-gray-800 col-span-2">
          <span className="text-gray-600 pr-2">Phone Number:</span>
          <span>{userData.phoneNo}</span>
        </div>
        <div className="text-gray-800 col-span-2">
          <span className="text-gray-600 pr-2">Package Name:</span>
          <span>{packageData.name}</span>
        </div>
        <div className="text-gray-800 col-span-2">
          <span className="text-gray-600 pr-2">Starting Date:</span>
          <span>{bill.date}</span>
        </div>
        <div className="text-gray-800 col-span-2">
          <span className="text-gray-600 pr-2">Total Cost Payed:</span>
          <span>{packageData.price * bill.time}$</span>
        </div>
        <div className="text-gray-800 col-span-2">
          <span className="text-gray-600 pr-2">Paymen UPI Ref:</span>
          <span>{bill.UPIRefNo}</span>
        </div>
      </div>
    </>
  );
};

export default BillCard;
