import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth/web-extension";
import { collection, getDocs, query, where } from "firebase/firestore";
export const Dashboard = () => {
  const navigate = useNavigate();
  const [currUser, setUser] = useState(null);
  useEffect(() => {
    const getData = () =>
      onAuthStateChanged(auth, async (user) => {
        console.log(user.email);
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        setUser(querySnapshot.docs[0].data());
      });
    getData();
    console.log(currUser);
  }, []);
  
  useEffect(() => {
    if (currUser?.role == "user") navigate("/user-dashboard");
    if (currUser?.role == "admin") navigate("/admin-dashboard");
  }, [currUser]);

  return (
    <>
      <h1>loading...</h1>
    </>
  );
};
