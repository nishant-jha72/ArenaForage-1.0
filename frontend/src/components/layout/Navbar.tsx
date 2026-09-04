import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
  User as UserIcon,
  LogOut,
  LogIn,
  Home,
  Trophy,
  PlusCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { label: "Home", to: "/", icon: Home },
  { label: "Tournaments", to: "/tournaments", icon: Trophy },
  { label: "Host", to: "/host", icon: PlusCircle },
  { label: "Contact", to: "/contact", icon: MessageSquare },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 10;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
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
    setIsOpen(false);
    if (isAuthenticated) {
      await logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80"
          : "bg-[#0A0A0C]/75 backdrop-blur-md border-b border-white/5"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="w-full max-w-[1920px] mx-auto flex h-16 items-center justify-between px-4 sm:px-8 lg:px-12 2xl:px-16"
      >
        {/* Brand Logo & Title */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl p-1 transition-transform active:scale-95"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
            <img
              src="/arenaForage_logo.png"
              alt="ArenaForage Logo"
              className="h-full w-full object-contain rounded-lg"
              loading="eager"
              onError={(e) => {
                // Fallback if logo image isn't loaded
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-lg sm:text-xl tracking-wider text-white uppercase leading-none flex items-center gap-1">
              ARENA<span className="text-amber-500">FORAGE</span>
            </span>
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 flex items-center gap-1">
              <Sparkles size={10} className="text-amber-500" />
              Esports Circuit
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/5 border border-white/10 p-1 rounded-2xl backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2 text-xs lg:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 rounded-xl focus:outline-none ${
                    isActive
                      ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Desktop Right Controls (Theme Toggle + User Profile + Auth Button) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle visual theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-300" />
            )}
          </button>

          {/* User Profile Pill */}
          {isAuthenticated && user && (
            <NavLink
              to="/profile"
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-neutral-200 hover:bg-white/10 hover:border-amber-500/40 transition-all"
            >
              <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 font-black border border-amber-500/40">
                <UserIcon size={14} />
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-black" />
              </div>
              <div className="flex flex-col text-left">
                <span className="max-w-[110px] truncate font-extrabold text-white text-xs leading-none">
                  {user.username}
                </span>
                <span className="text-[9px] text-amber-400 uppercase tracking-wider leading-none mt-0.5">
                  {user.role ?? "USER"}
                </span>
              </div>
            </NavLink>
          )}

          {/* Login / Logout CTA */}
          <button
            onClick={handleAuthClick}
            disabled={isLoading}
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2 text-xs font-black uppercase tracking-wider text-black shadow-md shadow-amber-500/20 transition-all hover:bg-amber-400 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 cursor-pointer"
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

        {/* Mobile Hamburger Control */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-neutral-300 active:bg-white/10"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-neutral-300" />
            )}
          </button>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white active:bg-white/10"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A0A0C]/95 backdrop-blur-2xl px-4 py-6 shadow-2xl space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-extrabold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-amber-500 text-black shadow-md"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {isAuthenticated && (
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-extrabold uppercase tracking-wider text-amber-400 hover:bg-amber-500/10 border border-amber-500/20"
              >
                <UserIcon size={18} />
                <span>My Profile ({user?.username})</span>
              </NavLink>
            )}
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={handleAuthClick}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400"
            >
              {isAuthenticated ? <LogOut size={16} /> : <LogIn size={16} />}
              <span>{isAuthenticated ? "Logout" : "Login"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
