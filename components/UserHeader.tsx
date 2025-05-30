import { Link, useLoaderData, useNavigate ,useLocation } from "react-router";
import { logoutUser } from "~/appwrite/auth";

const UserHeader = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const user = useLoaderData();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await logoutUser();
    navigate("/sign-in");
  };
  return (
    <div className={`flex justify-between align-middle items-center px-24 w-full  ${
      isHomePage
        ? " absolute top-0 z-50  "
        : "static"
    }`} >
      <div>
        <Link to="/" className="link-logo p-4 gap-3 border-0">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            className="size-[30px]"
          />
          <h1>TourVisto</h1>
        </Link>
      </div>
      <div className="flex gap-5 items-center">
        <button
         className={`cursor-pointer  ${
          isHomePage
            ? " text-white  "
            : "bg-transparent text-black"
        }`}
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Admin Panel
        </button>
        <img
          className="size-8  rounded-2xl"
          src={user?.imageUrl || "/assets/images/david.webp"}
          alt={user?.name || "david"}
        />
        <button onClick={handleLogOut} className={`cursor-pointer ${
          isHomePage
            ? "bg-stone-300 rounded-2xl p-1"
            : "bg-transparent text-black"
        }`}>
          <img src="/assets/icons/logout.svg" alt="logout"  className= 'size-6'
         
          />
        </button>
      </div>
    </div>
  );
};

export default UserHeader;
