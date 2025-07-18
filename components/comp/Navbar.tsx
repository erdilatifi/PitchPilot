"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { signout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/providers/ContextAPI";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { session, setSession } = useAuth(); // ✅ Using context
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const result = await signout();
      if (result?.success) {
        setSession(null); // Clear session in context
        router.push("/login");
      }
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <nav className="w-full bg-[#0f0f0f] fixed top-0 left-0 z-50 text-white shadow-md">
      <div className="flex justify-between items-center py-4 px-6 md:px-20">
        <Link href="/" className="italic font-bold text-2xl">
          PitchPilot
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6">
          <Link href="/" className="hover:text-gray-400 transition">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-gray-400 transition">
            Dashboard
          </Link>
          <Link href="/payments" className="hover:text-gray-400 transition">
            Payments
          </Link>
          {session ? (
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="text-black bg-white hover:bg-gray-200 transition"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="text-black bg-white hover:bg-gray-200 transition"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {showMenu ? <IoCloseSharp size={24} /> : <CiMenuFries size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="sm:hidden flex flex-col gap-4 px-6 pb-4 animate-slide-down bg-[#0f0f0f]">
          <Link href="/dashboard" className="hover:text-gray-400 transition">
            Dashboard
          </Link>
          <Link href="/payments" className="hover:text-gray-400 transition">
            Payments
          </Link>
          {session ? (
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="text-black bg-white w-fit hover:bg-gray-200 transition"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="text-black bg-white w-fit hover:bg-gray-200 transition"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
