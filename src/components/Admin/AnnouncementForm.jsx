import { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";
import Speaker  from "../../assets/Speaker.svg";
const AnnouncementForm = ({ show, closePopup, getAnnouncements }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    time: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const currentDate = new Date();
    setFormData({
      ...formData,
      [name]: value,
      date: currentDate.toLocaleDateString(),
      time: currentDate.toLocaleTimeString(),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData:", formData);
      await addDoc(collection(db, "Announcement"), {
        title: formData.title,
        content: formData.content,
        date: formData.date,
        time: formData.time,
      });
      getAnnouncements();
      toast.success("announcement done!!", { position: "top-center" });
      closePopup();
    } catch (error) {
      console.log(error);
    }
  };

  return show ? (
    <div
      className="fixed inset-0 bg-slate-600 bg-opacity-50 flex justify-center items-center z-10"
      onClick={closePopup}
    >
      <div
        className="bg-white p-10 rounded shadow-lg max-w-lg w-full overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="text-slate-500">
          <div>
            <label className="block m-1 ">Title</label>
            <input
              type="text"
              name="title"
              value={formData.name}
              onChange={handleChange}
              required
              className="block border w-80 px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Title"
            />
          </div>
          <div className="">
            <label className="block m-1 ">Content</label>
            <textarea
              type="text"
              name="content"
              value={formData.name}
              onChange={handleChange}
              required
              className="block border w-80 px-3 py-2 rounded  mb-3 hover:ring-2"
              placeholder="Content..."
            />
          </div>
          <div className="flex justify-between mt-5">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-36"
            >
              <img src={Speaker} alt="not found" className="w-5 inline mr-1"/> Announce
            </button>
            <button
              onClick={closePopup}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-36"
            >
              close
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default AnnouncementForm;
