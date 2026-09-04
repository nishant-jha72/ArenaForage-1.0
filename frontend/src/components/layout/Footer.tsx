import { NavLink } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const phone = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || "7261058139";
  const message = encodeURIComponent(
    "Hello, I would like to get in touch with you.",
  );
  const whatsappUrl = phone ? `https://wa.me/${phone}?text=${message}` : "#";

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-b from-orange-800 via-orange-900 to-[#431407] text-white font-sans">
      {/* Top accent glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />

      {/* Ambient background glows for esports depth */}
      <div
        className="absolute -top-24 left-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-20 transform-gpu"
        style={{
          background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[90px] pointer-events-none opacity-15 transform-gpu"
        style={{
          background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 2xl:px-16 py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/30 backdrop-blur-sm border border-white/10 shadow-lg">
                <img
                  src="/arenaForage_logo.png"
                  alt="ArenaForage Logo"
                  className="h-8 w-8 object-contain"
                />
              </span>
              <span className="text-xl font-black tracking-wider text-white uppercase">
                ARENA<span className="text-amber-300">Forage</span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-orange-100/80">
              Competitive FreeFire and PUBG tournaments — find a match, host
              your own, and climb the regional leaderboard.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-300 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <NavLink
                  to="/"
                  className="text-orange-50/90 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tournaments"
                  className="text-orange-50/90 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Tournaments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/host"
                  className="text-orange-50/90 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Host a Tournament
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-orange-50/90 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-300 mb-5">
              Games
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-center gap-3 text-orange-50/90">
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                Free Fire
              </li>
              <li className="flex items-center gap-3 text-orange-50/90">
                <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]" />
                PUBG Mobile
              </li>
            </ul>
          </div>

          {/* Social + legal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-300 mb-5">
              Stay Updated
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/arenaforage?igsh=ZjhocmV3MHpya285"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/25 border border-white/10 text-orange-100 hover:bg-black/40 hover:text-amber-300 hover:border-amber-400/50 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.youtube.com/@ArenaForage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/25 border border-white/10 text-orange-100 hover:bg-black/40 hover:text-amber-300 hover:border-amber-400/50 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
              >
                <Youtube size={18} />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/25 border border-white/10 text-orange-100 hover:bg-black/40 hover:text-amber-300 hover:border-amber-400/50 hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[18px] h-[18px] fill-current"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-orange-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium tracking-wide">
            © {year} <span className="text-orange-100">ArenaForage</span>. All
            rights reserved.
          </p>
          <p className="font-medium tracking-wide">
            A product of{" "}
            <span className="font-bold text-amber-300">Awadh Technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
