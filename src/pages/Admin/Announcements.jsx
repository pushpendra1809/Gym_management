import { useEffect, useState } from "react";
import { getDocs, deleteDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import AnnouncementForm from "../../components/Admin/AnnouncementForm";
import { toast } from "react-toastify";
import AnnouncementCard from "../../components/Admin/AnnouncementCard";
import NotFound from "../../assets/NotFound.svg";
import Speaker from "../../assets/Speaker.svg";
const Announcements = () => {
  const [show, setShow] = useState(false);
  const [announcements, setAnnouncements] = useState(null);
  const closePopup = () => setShow(false);
  const getAnnouncements = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Announcement"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnnouncements(data);
      console.log("data", data);
    } catch (error) {
      toast.error(err.message, { position: "top-center" });
    }
  };
  const deleteAnnouncement = async (id) => {
    try {
      await deleteDoc(doc(db, "Announcement", id));
      getAnnouncements();
      toast.error("Announcement deleted !!", { position: "top-center" });
    } catch (error) {
      toast.error(err.message, { position: "top-center" });
    }
  };
  useEffect(() => {
    getAnnouncements();
  }, []);
  return (
    <>
      <AnnouncementForm
        show={show}
        closePopup={closePopup}
        getAnnouncements={getAnnouncements}
      />
      <div className="h-screen w-screen flex justify-center">
        <div className="bg-slate-50 rounded-xl shadow-lg w-3/5 mb-3 overflow-y-auto ">
          <div className="bg-slate-100 rounded-t-xl  w-full flex justify-center border-b-2 border-slate-200">
            <button
              className="bg-blue-200 my-2 rounded px-4 py-2 text-lg hover:bg-blue-300 text-gray-600 hover:text-black "
              onClick={() => setShow(true)}
            >
              <img src={Speaker} alt="not found" className="w-5 inline mr-1"/> Announcements
            </button>
          </div>

          {announcements && (
            <div className="mb-5">
              {announcements.map((announcement) => {
                return (
                  <AnnouncementCard
                    announcement={announcement}
                    deleteAnnouncement={deleteAnnouncement}
                  />
                );
              })}
            </div>
          )}

          {announcements && announcements.length == 0 && (
            <div className="flex flex-col pb-5 items-center justify-center">
              <img src={NotFound} className="w-3/5 " />
              <p className="text-gray-600 text-lg">
                No New Announcements At This Time
              </p>
              <p className="text-gray-600 text-sm">
                check back later for update
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Announcements;
