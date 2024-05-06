/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "../styles.css";
import axios from "axios";
import TopNav from "../components/TopNav";
import BottomNav from "../components/BottomNav";
import { Outlet } from "react-router-dom";
import { LoginScreen } from "../components/LoginScreen";
import { AuthResult, PaymentDTO, User, WindowWithEnv } from "../../types";

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;

const axiosClient = axios.create({
  baseURL: `${backendURL}`,
  timeout: 20000,
  withCredentials: true,
});
const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async () => {
    console.log("signing in ...");
    const scopes = ["username", "payments"];
    const authResult: AuthResult = await Pi.authenticate(
      scopes,
      onIncompletePaymentFound
    );
    console.log("auth results ==>", authResult);

    setUser(authResult.user);
    // signInUser(authResult);
  };

  const signOut = () => {
    setUser(null);
    signOutUser();
  };
  /* eslint-disable @typescript-eslint/no-unused-vars */

  const signInUser = (authResult: AuthResult) => {
    axiosClient.post("/user/signin", { authResult });
  };
  const signOutUser = () => {
    return axiosClient.get("/user/signout");
  };
  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post("/payments/incomplete", { payment });
  };

  return (
    <>
      {user ? (
        <div className="bg-metal ">
          <div className="h-[100vh]">
            <TopNav user={user} signIn={signIn} signOut={signOut} />
            <Outlet />
          </div>
          <BottomNav />
        </div>
      ) : (
        <LoginScreen signIn={() => signIn()} />
      )}
    </>
  );
}
