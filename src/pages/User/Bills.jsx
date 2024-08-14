import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { toast } from "react-toastify";
import BillCard from "../../components/Admin/BillCard";
import BillReceiptMen from "../../assets/BillReceiptMen.svg";

const Bills = () => {
  const [allBills, setBills] = useState([]);
  const userId = auth.currentUser.uid;
  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    try {
      const q = query(collection(db, "Bills"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBills(data);
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
        <div className="flex justify-center p-5">
          <div className="bg-slate-200 shadow-md h-[600px] rounded-md w-full grid grid-cols-1 gap-4 border-2 border-gray-600 p-5 overflow-y-auto">
            <span className="text-center font-semibold text-gray-700 text-lg">
              BILL INFORMATION
            </span>
            {allBills.map((bill) => {
              return <BillCard bill={bill} key={bill.id} />;
            })}
          </div>
        </div>
        <div className="p-20">
          <img src={BillReceiptMen} alt="" />
        </div>
      </div>
    </>
  );
};

export default Bills;
