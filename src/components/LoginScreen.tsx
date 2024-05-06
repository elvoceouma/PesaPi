import { useState } from "react";
import CardComponent from "./CardComponent";
import CustomBtn from "./CustomBtn";


interface SignInScreenProps {
    signIn: () => void;
  } 
  
export const LoginScreen = (props: SignInScreenProps) => {
    const [isLoading, setIsLoading] = useState(false);
  
    const handleOnsignIn = () => {
      try {
        setIsLoading(true);
        props.signIn();
      } catch (error) {
        console.log("error signing in", error);
      } finally {
        setIsLoading(false);
      }
    };
    return (
      <div className=" bg-metal h-[100vh] p-5 items-center justify-center flex flex-col">
        <CardComponent
          children={
            <>
              <p className="text-3xl text-bubble-gum  font-extrabold">
                Pay bills and buy Airtime instantly
              </p>
              <p className=" mt-4 text-center text-xl font-bold">
                A simple and convenient way to use pi in Kenya. You can now send
                to mpesa, or pay for goods and services.
              </p>
            </>
          }
        />
        <CustomBtn
          parentStyles="w-full my-5"
          label="Login"
          isLoading={isLoading}
          handleOnClick={handleOnsignIn}
          fontStyles="text-center text-xl font-bold"
        />
      </div>
    );
  };