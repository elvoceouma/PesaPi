interface CustomBtnProps {
  parentStyles: string;
  isLoading: boolean;
  handleOnClick: () => void;
  fontStyles: string;
  label: string;
}

const CustomBtn = ({ ...props }: CustomBtnProps) => {
  return (
    <button
      className={`${props.parentStyles} bg-bubble-gum  rounded-lg min-h-[40px] justify-center items-center ${props.isLoading? "opacity-50" : ""}`}
      onClick={props.handleOnClick}
      disabled={props.isLoading}
    >
      <p className={`text-metal font-serif ${props.fontStyles}`}>
        {props.label}
      </p>
    </button>
  );
};

export default CustomBtn;
