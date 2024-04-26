import { User } from "../App";

interface topNavProps {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
}

const TopNav = (props: topNavProps) => {
  return (
    <div className="w-full h-12 top-0 bg-metal">
      {props.user ? (
        <>
          <p>{props.user.username}</p>
          <button onClick={props.signOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={props.signIn}>Sign In</button>
      )}
    </div>
  );
};

export default TopNav;
