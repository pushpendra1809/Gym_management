import { useEffect, useState } from "react";
import { getDocs, deleteDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { toast } from "react-toastify";
import NotFound from "../../assets/NotFound.svg";
import AnnouncementCard from "../../components/User/AnnouncementCard";
import Speaker from "../../assets/Speaker.svg";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState(null);
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
  useEffect(() => {
    getAnnouncements();
  }, []);
  return (
    <>
      <div className="h-screen w-screen flex justify-center">
        <div className="bg-slate-50 rounded-xl shadow-lg w-3/5 mb-3 overflow-y-auto ">
          <div className="bg-slate-100 rounded-t-xl text-xl py-2 w-full flex justify-center border-b-2 border-slate-200">
            <img src={Speaker} alt="not found" className="w-5 inline mr-2" />{" "}
            Announcements
          </div>
          {announcements && (
            <div className="mb-5">
              {announcements.map((announcement) => {
                return (
                  <AnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                  />
                );
              })}
            </div>
          )}

          {announcements && announcements.length == 0 && (
            <div className="flex flex-col pb-3 items-center justify-center">
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
