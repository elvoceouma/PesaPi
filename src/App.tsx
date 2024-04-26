/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import { Outlet } from "react-router-dom";

type AuthResult = {
  accessToken: string;
  user: {
    uid: string;
    username: string;
  };
};

export type User = AuthResult["user"];

interface PaymentDTO {
  amount: number;
  user_uid: string;
  created_at: string;
  identifier: string;
  metadata: NonNullable<unknown>;
  memo: string;
  status: {
    developer_approved: boolean;
    transaction_verified: boolean;
    developer_completed: boolean;
    cancelled: boolean;
    user_cancelled: boolean;
  };
  to_address: string;
  transaction: null | {
    txid: string;
    verified: boolean;
    _link: string;
  };
}

// Make TS accept the existence of our window.__ENV object - defined in index.html:
interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string; // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false"; // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
  };
}

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

interface SignInScreenProps {
  signIn: () => void;
}

export const LoginScreen = (props: SignInScreenProps) => {
  return (
    <div>
      <button onClick={props.signIn}>sign in </button>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const signIn = async () => {
    console.log("signing in ...");
    const scopes = ["username", "payments"];
    const authResult: AuthResult = await Pi.authenticate(
      scopes,
      onIncompletePaymentFound
    );
    console.log("auth results ==>",authResult);
    
    setUser(authResult.user);
    // signInUser(authResult);
  };
 
  const signOut = () => {
    setUser(null);
    signOutUser();
  };

  const signInUser = (authResult: AuthResult) => {
    axiosClient.post("/user/signin", { authResult });
    return setShowModal(false);
  };

  const signOutUser = () => {
    return axiosClient.get("/user/signout");
  };

  const onModalClose = () => {
    setShowModal(false);
  };

  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    console.log("onIncompletePaymentFound", payment);
    return axiosClient.post("/payments/incomplete", { payment });
  };

  return (
    <div className="bg-metal">
      <TopNav user={user} signIn={signIn} signOut={signOut} />
      <div >{user ? <Outlet /> : <LoginScreen signIn={() => signIn()} />}</div>
      {/* <>
          <p>Hello {user.username}</p>
          <button onClick={signOut}>sign out</button>
        </> */}
      <BottomNav />
    </div>
  );
}
