"use client";
import Link from "next/link";
import AuthButtons from "./AuthButtons";
import useAuthStore from "@/store/useAuthStore";
import UserDropdown from "./UserDropdown";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

export default function Navbar() {
  const { id } = useAuthStore();
  const isAuthenticated = !!id;
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/products?search=${search}`;
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 text-gray-200 shadow-md">
        <div className="px-4 md:px-10 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="lg:hidden">
              {isAdmin && (
                <label
                  htmlFor="my-drawer"
                  className="btn btn-ghost drawer-button"
                >
                  <HiOutlineMenuAlt1 className="w-6 h-6" />
                </label>
              )}
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 text-xl md:text-2xl font-bold hover:text-amber-400 transition whitespace-nowrap"
            >
              My Task
            </Link>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center gap-4">
              {isAuthenticated ? <UserDropdown /> : <AuthButtons />}
            </div>

            {/* Mobile Icons */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-ghost btn-circle btn-sm"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-emerald-800 border-t border-emerald-700 px-4 py-4">
            <div className="flex flex-col gap-2">
              {isAuthenticated ? <UserDropdown /> : <AuthButtons />}
            </div>
          </div>
        )}
      </nav>

      <div className="h-20 md:h-16" />
    </>
  );
}
