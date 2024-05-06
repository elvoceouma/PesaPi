
import cards from "../assets/cards.png";

const CardComponent = ({children}: {children : React.ReactNode}) => {
  return (
    <div className="flex flex-col justify-center items-center px-4">
      <img className="max-width-[380px] w-full h-[300px]" src={cards} alt="" />
      <div className="justify-center items-center px-5 mt-5">
        {children}
       
      </div>
    </div>
  );
};

export default CardComponent;
