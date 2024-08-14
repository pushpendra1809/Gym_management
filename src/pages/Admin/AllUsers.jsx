import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import UserCard from "../../components/UserCard";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const allUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(allUsers);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="w-full h-screen flex justify-end p-5 ">
        <div className="bg-slate-200 border-2 border-gray-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-xl  shadow-md w-full overflow-y-auto p-5">
          {users.map((user) => {
            return <UserCard user={user} key={user.id} getUsers={getUsers} />;
          })}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
