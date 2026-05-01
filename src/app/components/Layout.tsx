import { Link, Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu as MenuIcon, X, MapPin, Instagram, Facebook, Phone } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BUSINESS_INFO } from "../config/business";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50 selection:bg-orange-500 selection:text-white font-sans overflow-x-hidden">
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-md border-zinc-800/50 py-4 shadow-lg"
            : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="relative z-50 flex items-center gap-2 group">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.5)]">
               <span className="text-xl font-black text-zinc-950">L</span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-white">
              LA SABROZA<span className="text-orange-500">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-bold tracking-widest uppercase transition-colors hover:text-orange-400 relative py-2",
                  location.pathname === link.path ? "text-orange-500" : "text-zinc-300"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/menu"
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-zinc-950 font-black tracking-wider uppercase rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
            >
              Order Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 text-zinc-100 hover:text-orange-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter text-zinc-100 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
             <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 px-8 py-4 bg-orange-500 text-zinc-950 text-xl font-black tracking-wider uppercase rounded-full"
            >
              Order Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-[88px]">
        <Outlet />
      </main>

      <footer className="bg-zinc-900 border-t border-zinc-800 pt-16 pb-8 mt-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6 inline-flex">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                 <span className="text-lg font-black text-zinc-950">L</span>
              </div>
              <span className="font-black text-xl tracking-tighter text-white">
                LA SABROZA<span className="text-orange-500">.</span>
              </span>
            </Link>
            <p className="text-zinc-400 max-w-sm mb-6">
              Authentic Mexican street food served fresh from our truck in Manor, TX. Real flavor, real heat.
            </p>
            <div className="flex gap-4">
              <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:text-zinc-950 transition-colors">
                <Instagram size={20} />
              </a>
              <a href={BUSINESS_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-orange-500 hover:text-zinc-950 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-6">Find Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-zinc-400">
                <MapPin className="text-orange-500 shrink-0 mt-1" size={18} />
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  {BUSINESS_INFO.addressLine1}, {BUSINESS_INFO.cityStateZip}<br/>
                </a>
              </div>
              <div className="flex items-center gap-3 text-zinc-400">
                <Phone className="text-orange-500 shrink-0" size={18} />
                <a
                  href={`tel:${BUSINESS_INFO.phoneE164}`}
                  className="hover:text-orange-500 transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase mb-6">Hours</h4>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Mon - Thu</span>
                <span>7am - 11pm</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Friday</span>
                <span>7am - 12am</span>
              </li>
              <li className="flex justify-between border-b border-zinc-800 pb-2">
                <span>Saturday</span>
                <span>9am - 12am</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>9am - 11pm</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 text-center border-t border-zinc-800 pt-8 text-zinc-600 text-sm">
          <p>&copy; {new Date().getFullYear()} La Sabroza Tacos. All rights reserved.</p>
          <p className="mt-2">Designed by Bhaswanth Vommena</p>
        </div>
      </footer>
    </div>
  );
}
