import { NavLink } from "react-router-dom";
import { BllsIcon, HomeIcon, ProfileIcon, RecordsIcon, SendIcon } from "../constants/icons";

const navRoutes = [
  { id: 1, icon: HomeIcon, label: "Home", route: "/" },
  { id: 2, icon: SendIcon, label: "Cash", route: "/transact-money" },
  { id: 3, icon: BllsIcon, label: "Pay", route: "/paybills-and-till" },
  { id: 4, icon: RecordsIcon, label: "Past", route: "/transaction-history" },
  { id: 5, icon: ProfileIcon, label: "Account", route: "/transaction-history" },
];

const BottomNav = () => {
  return (
    <>
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-midnight border border-gray-200 rounded-full bottom-4 left-1/2">
        <div className="flex flex-row items-center py-2  justify-between  mx-1 px-4">
          {navRoutes.length ? (
            <>
              {navRoutes.map((navRoutes) => (
                <NavLink
                  to={`${navRoutes.route}`}
                  className={({ isActive, isPending }) =>
                    isActive ? "text-white " : isPending ? "pending" : ""
                  }
                >
                  {navRoutes.label ? <>{navRoutes.icon}
                  <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{navRoutes.label}</span>
                  </> : <i>No Name</i>}
                </NavLink>
              ))}
            </>
          ) : (
            <p>
              <i>...</i>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomNav;
