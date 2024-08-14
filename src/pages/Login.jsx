import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { SignUpPopup } from "../components/SignUpPopup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import BigLogo from "../assets/BigLogo.svg";
import Logo from "../assets/Logo.svg";
import { setDoc, doc } from "firebase/firestore";

export const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const LoginWithPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("User login successfull", { position: "top-center" });
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };

  const googleAuthentication = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const userId = data.user.uid;
      const email = data._tokenResponse.email;
      await setDoc(doc(db, "Users", userId), {
        email: email,
        role: "user",
      });
      toast.success("User login successfull", { position: "top-center" });
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };

  const closePopup = () => {
    setShow(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 p-10 bg-slate-200 w-screen h-full font-roboto text-slate-500">
        {show && <SignUpPopup closePopup={closePopup} />}
        <div className="fixed top-0 left-0 bg-green-200 w-0 md:w-[45%] lg:w-[55%] h-full flex justify-center">
          <img src={BigLogo} alt="not found" className="w-3/5" />
        </div>

        <div className="fixed top-0 left-0 md:left-[45%] lg:left-[55%] bg-green-50 w-full md:w-[55%] lg:w-[45%] h-full px-20 grid grid-cols-1 justify-items-center">
          <div className="w-1/3 flex justify-center">
            <img src={Logo} alt="" className="" />
          </div>
          <div className="">
            <label htmlFor="email" className="mb-2  text-sm">
              Username or Email
            </label>
            <input
              type="text"
              className="block border w-80 px-3 py-2 rounded  mb-3"
              placeholder="Email address"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="mb-2  text-sm">
              Password
            </label>
            <input
              type="password"
              className="block border w-80 px-3 py-2 rounded  mb-2"
              placeholder="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="bg-slate-800 rounded hover:bg-slate-700 text-white text-sm px-4 py-3 w-80 mt-1"
              onClick={() => {
                LoginWithPassword();
              }}
            >
              Sign in
            </button>
            <div className="flex justify-center text-sm text-green-700 mt-1">
              <button onClick={() => setShow(true)}>Create account</button>
            </div>
          </div>

          <div className="">
            <div className="border-t-2 h-2 w-24 inline-block"></div>
            <span className="mx-4">or</span>
            <div className="border-t-2 h-2 w-24 inline-block"></div>
          </div>

          <div className="">
            <button
              className=" text-center px-3 py-1"
              onClick={googleAuthentication}
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-5 inline-block mr-2"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>

              <span className="">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
