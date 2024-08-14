import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const SignUpPopup = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fName: "",
    lName: "",
    phoneNo: "",
    photoUrl:
      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const userId = data.user.uid;

      await setDoc(doc(db, "Users", userId), {
        email: formData.email,
        firstName: formData.fName,
        lastName: formData.lName,
        phoneNo: formData.phoneNo,
        role: "user",
      });
      toast.success("User created successfully", { position: "top-center" });
      closePopup();
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };
  return (
    <div
      className="fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center z-10"
      onClick={closePopup}
    >
      <div
        className="bg-white p-10 rounded shadow-lg max-w-lg w-full overflow-y-auto h-[400px] "
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="text-slate-500">
          <div>
            <label className="block m-1 ">First Name</label>
            <input
              type="text"
              name="fName"
              value={formData.name}
              onChange={handleChange}
              required
              className="block border w-80 px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block m-1 ">Last Name</label>
            <input
              type="text"
              name="lName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="block border w-80 px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label className="block m-1 ">Phone Number</label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="block border w-80 px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label className="block m-1 ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block border w-80 px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="block m-1 ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block border w-80 px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between mt-5">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 w-20"
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 w-20"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
