import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      type="button"
      onClick={logoutHandler}
      className="
        whitespace-nowrap
        rounded-lg
        px-2.5
        py-2
        text-xs
        font-medium
        text-[#9CA3AF]
        transition-all
        duration-200
        hover:bg-[#273449]
        hover:text-[#F9FAFB]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#2A9D8F]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#111827]
        sm:px-3
        sm:text-sm
      ">
      Logout
    </button>
  );
}

export default LogoutBtn;
