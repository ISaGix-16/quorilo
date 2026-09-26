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
      className="rounded-lg px-3 py-2 text-sm font-medium text-[#9CA3AF] transition-all duration-200 hover:bg-[#273449] hover:text-[#F9FAFB]">
      Logout
    </button>
  );
}

export default LogoutBtn;
