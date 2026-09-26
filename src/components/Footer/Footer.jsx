import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer() {
  return (
    <footer className="border-t border-[#374151] bg-[#0B1120] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo width="44px" />

            <div>
              <p className="text-lg font-bold tracking-tight">Quorilo</p>

              <p className="mt-0.5 text-xs text-[#6B7280]">
                Your words. Your world.
              </p>
            </div>
          </Link>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#9CA3AF]">
            <Link
              to="/"
              className="transition-colors duration-200 hover:text-[#38B2A3]">
              Home
            </Link>

            <Link
              to="/all-posts"
              className="transition-colors duration-200 hover:text-[#38B2A3]">
              All Posts
            </Link>

            <Link
              to="/add-post"
              className="transition-colors duration-200 hover:text-[#38B2A3]">
              Write
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-[#374151] pt-6">
          <p className="text-center text-xs text-[#6B7280] sm:text-left">
            © {new Date().getFullYear()} Quorilo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
