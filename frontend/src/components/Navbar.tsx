import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
  User as UserIcon,
  LogOut,
  LogIn,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Tournaments", to: "/tournaments" },
  { label: "Host", to: "/host" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  async function handleAuthClick() {
    if (isAuthenticated) {
      await logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out border-b ${
        isScrolled
          ? "bg-[#0B0B0C]/90 backdrop-blur-xl border-white/10 shadow-2xl py-0"
          : "bg-[#0B0B0C]/75 backdrop-blur-md border-white/5 py-1"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className={`mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}
      >
        <NavLink
          to="/"
          className="group flex items-center justify-start gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="/arenaForage_logo.png"
            alt="ArenaForage Logo"
            className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            loading="eager"
          />

          {/* Text Branding (Right aligned next to the logo) */}
          <span className="font-black text-lg sm:text-2xl tracking-wider text-white uppercase flex items-center leading-none">
            ARENA<span className="text-amber-500 ml-1">FORAGE</span>
          </span>
        </NavLink>

        {/* ==========================================
            DESKTOP NAVIGATION LINKS
           ========================================== */}
        <div className="hidden items-center gap-1 lg:gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 text-xs lg:text-sm font-extrabold uppercase tracking-widest transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md ${
                  isActive
                    ? "text-amber-500"
                    : "text-neutral-300 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{link.label}</span>
                  {/* Active indicator underline */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-6 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(217,119,6,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* ==========================================
            DESKTOP ACTIONS & CTA
           ========================================== */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle visual theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-neutral-300 transition-all hover:bg-white/10 hover:text-white hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-300" />
            )}
          </button>

          {/* User Profile Badge (If Authenticated) */}
          {isAuthenticated && (
            <NavLink
              to="/profile"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-neutral-200 transition-all hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              aria-label="User Profile"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30">
                <UserIcon size={12} />
              </span>
              <span className="max-w-[120px] truncate">{user?.username}</span>
            </NavLink>
          )}

          {/* Login / Logout Primary CTA */}
          <button
            onClick={handleAuthClick}
            disabled={isLoading}
            type="button"
            className="relative inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2 text-xs lg:text-sm font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(217,119,6,0.25)] transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(217,119,6,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {isAuthenticated ? (
              <>
                <LogOut size={14} className="stroke-[2.5]" />
                <span>Logout</span>
              </>
            ) : (
              <>
                <LogIn size={14} className="stroke-[2.5]" />
                <span>Login</span>
              </>
            )}
          </button>
        </div>

        {/* ==========================================
            MOBILE CONTROLS
           ========================================== */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-neutral-300 active:bg-white/10"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400" />
            ) : (
              <Moon className="h-5 w-5 text-neutral-300" />
            )}
          </button>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white active:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* ==========================================
          MOBILE NAVIGATION DRAWER
         ========================================== */}
      {isOpen && (
        <div className="absolute right-4 top-full mt-2 w-56 rounded-xl border border-white/10 bg-[#0B0B0C] shadow-2xl">
          <div className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 hover:bg-white/5"
              >
                {link.label}
              </NavLink>
            ))}

            <button
              onClick={handleAuthClick}
              className="mx-2 mt-2 rounded-lg bg-amber-500 py-2"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
