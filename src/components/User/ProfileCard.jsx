import { useEffect, useState } from "react";
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase-config";
import Info from "./Info";
import { InfoEdit } from "./InfoEdit";
import Upload from "../../assets/Upload.svg";

const ProfileCard = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const id = auth.currentUser.uid;
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState({});

  const updateUser = async (name, value) => {
    try {
      await updateDoc(doc(db, "Users", id), { [name]: value });
    } catch (err) {
      toast.error("my:" + err.message, { position: "top-center" });
    }
  };
  const getUser = async () => {
    try {
      const docRef = doc(db, "Users", id);
      const docSnapshot = await getDoc(docRef);
      const data = docSnapshot.data();
      console.log(data);
      setUserData(data);
    } catch (err) {
      console.log("err:", err.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleUpload = async () => {
    if (uploadFile == null) return;
    try {
      const imageRef = ref(storage, `images/${uploadFile.name + v4()}`);
      await uploadBytes(imageRef, uploadFile);
      const url = await getDownloadURL(imageRef);
      updateUser("photoUrl", url);
      getUser();
      toast.success("upload success!!", { position: "top-center" });
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };
  const activeChange = () => {
    setActive(!active);
    getUser();
  };
  return (
    <>
      <div className="bg-slate-50 px-12 py-16 h-full shadow-lg rounded-lg hover:shadow-xl flex justify-evenly">
        <div className="w-1/2 h-full grid grid-rows-3 content-center p-5 ">
          <div className="row-span-2 flex justify-center p-2 border-2 mb-1">
            <img src={userData?.photoUrl} alt="" className=" object-contain" />
          </div>
          <div className="row-span-1 text-blue-600  ">
            <label htmlFor="fileInput" className=" w-full h-10">
              <div className="w-full bg-blue-50 h-20 grid grid-rows-2 justify-center gap-1 cursor-pointer hover:bg-blue-100 rounded">
                <div className="flex justify-center mt-2">
                  <img
                    src={Upload}
                    alt="not found"
                    className="w-10 filter-blue"
                  />
                </div>
                <div className="flex justify-center text-center">
                  {uploadFile ? (
                    <p className="text-[12px] lg:text-sm">{uploadFile.name}</p>
                  ) : (
                    <p className="text-[12px] lg:text-sm">
                      <span className="font-bold">Click to upload </span>or drag
                      and drop
                    </p>
                  )}
                </div>
              </div>
              <input
                type="file"
                name="photoUrl"
                id="fileInput"
                onChange={(e) => {
                  setUploadFile(e.target.files[0]);
                }}
                className="mb-1 hidden"
              />
            </label>
            <div className="flex justify-center">
              <button
                onClick={handleUpload}
                className="w-full py-2 bg-blue-500 text-white rounded mt-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-3 ">
          {!active && <Info userData={userData} active={activeChange} />}
          {active && (
            <InfoEdit userData={userData} active={activeChange} id={id} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
