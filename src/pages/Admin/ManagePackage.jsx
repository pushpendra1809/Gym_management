import { useEffect, useState } from "react";
import { getDocs, deleteDoc, collection, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import PackageCard from "../../components/PackageCard";
import PackageForm from "../../components/PackageForm";
import { toast } from "react-toastify";

const ManagePackage = () => {
  const [allPackage, setPackages] = useState([]);
  const [show, setShow] = useState(false);
  const getPackages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Packages"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPackages(data);
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };
  const deletePackage = async (id) => {
    try {
      await deleteDoc(doc(db, "Packages", id));
      getPackages();
      toast.error("package deleted !!", { position: "top-center"});
    } catch (error) {
      toast.error(err.message, { position: "top-center" });
    }
  };
  useEffect(() => {
    getPackages();
  }, []);

  const closePopup = () => setShow(false);

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => setShow(true)}
          className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded mt-3"
        >
          Add New Package
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 mt-10 mx-5 gap-5 lg:gap-10">
        {allPackage.map((Package) => {
          return (
            <PackageCard
              Package={Package}
              deletePackage={deletePackage}
              key={Package.id}
            />
          );
        })}
      </div>
      {show && (
        <PackageForm closePopup={closePopup} getPackages={getPackages} />
      )}
    </>
  );
};

export default ManagePackage;
