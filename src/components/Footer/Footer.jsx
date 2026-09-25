import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-[#1F2937]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <Logo width="100px" />
            </Link>

            <p className="max-w-xs text-sm leading-6 text-gray-300">
              Your words. Your world.
            </p>

            <p className="mt-6 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Quorilo. All rights reserved.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#2A9D8F]">
              Explore
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-300 transition-colors hover:text-[#2A9D8F]">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/all-posts"
                  className="text-sm text-gray-300 transition-colors hover:text-[#2A9D8F]">
                  All Posts
                </Link>
              </li>

              <li>
                <Link
                  to="/create-post"
                  className="text-sm text-gray-300 transition-colors hover:text-[#2A9D8F]">
                  Write a Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#2A9D8F]">
              Account
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/profile"
                  className="text-sm text-gray-300 transition-colors hover:text-[#2A9D8F]">
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-300 transition-colors hover:text-[#2A9D8F]">
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/signup"
                  className="text-sm text-gray-300 transition-colors hover:text-[#2A9D8F]">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#2A9D8F]">
              Legal
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-300 transition-colors hover:text-[#2A9D8F]">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-300 transition-colors hover:text-[#2A9D8F]">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-300 transition-colors hover:text-[#2A9D8F]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
