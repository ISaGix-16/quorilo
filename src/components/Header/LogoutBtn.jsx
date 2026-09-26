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
      onClick={logoutHandler}
      className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-[#9CA3AF] transition-all duration-200 hover:bg-[#273449] hover:text-[#F9FAFB] sm:px-3 sm:text-sm">
      Logout
    </button>
  );
}

export default LogoutBtn;
