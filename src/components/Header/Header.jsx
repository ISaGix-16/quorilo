import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#374151] bg-[#111827]/95 backdrop-blur-sm">
      <Container>
        <nav className="flex min-h-17 flex-wrap items-center justify-between gap-3 py-2 sm:min-h-18 sm:flex-nowrap sm:py-0">
          {/* Brand */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <Logo width="40px" />

            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight tracking-tight text-[#F9FAFB] sm:text-xl">
                Quorilo
              </span>

              <span className="hidden text-[11px] font-medium tracking-wide text-[#9CA3AF] sm:block">
                Your words. Your world.
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex w-full items-center justify-end gap-1 sm:w-auto sm:gap-2">
            <ul className="flex min-w-0 items-center gap-0.5 sm:gap-1">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        className={({ isActive }) =>
                          `whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-200 sm:px-3.5 sm:text-sm ${
                            isActive
                              ? "bg-[#163B38] text-[#38B2A3]"
                              : "text-[#9CA3AF] hover:bg-[#273449] hover:text-[#F9FAFB]"
                          }`
                        }>
                        {item.name}
                      </NavLink>
                    </li>
                  ),
              )}
            </ul>

            {/* Authentication */}
            {!authStatus ? (
              <div className="ml-1 flex shrink-0 items-center gap-1 border-l border-[#374151] pl-2 sm:ml-3 sm:gap-2 sm:pl-3">
                <Link
                  to="/login"
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-[#9CA3AF] transition-colors duration-200 hover:bg-[#273449] hover:text-[#F9FAFB] sm:px-4 sm:text-sm">
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="whitespace-nowrap rounded-lg bg-[#2A9D8F] px-2.5 py-2 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#38B2A3] sm:px-4 sm:text-sm">
                  <span className="sm:hidden">Join</span>
                  <span className="hidden sm:inline">Get Started</span>
                </Link>
              </div>
            ) : (
              <div className="ml-1 shrink-0 border-l border-[#374151] pl-2 sm:ml-3 sm:pl-3">
                <LogoutBtn />
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
