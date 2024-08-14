import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase-config";

export const InfoEdit = ({ userData, active, id }) => {
  
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    phoneNo: userData?.phoneNo || "",
    address: userData?.address || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await updateDoc(doc(db, "Users", id), formData);
      toast.success("data updated successfully!!", {
        position: "top-center",
      });
      active();
    } catch (err) {
      toast.error("my:" + err.message, { position: "top-center" });
    }
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit} className="text-slate-500">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-1">
              <label className=" m-1 text-sm ">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className=" border w-full px-3 py-2 rounded  mb-3 hover:ring-2"
                placeholder="First Name"
              />
            </div>
            <div className="grid grid-cols-1">
              <label className=" m-1 text-sm ">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className=" border w-full px-3 py-2 rounded  mb-3 hover:ring-2"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label className="block m-1 text-sm ">Phone Number:</label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="block border w-full px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Not Available"
            />
          </div>
          <div>
            <label className="block m-1 text-sm ">Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              disabled
              className="block border w-full px-3 py-2 rounded  mb-3 bg-slate-50"
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="block m-1 text-sm ">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="block border w-full px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Not Available"
            />
          </div>
          <div className="flex justify-between mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 "
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 "
              onClick={active}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
