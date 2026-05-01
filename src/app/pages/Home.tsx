import { motion } from "motion/react";
import { ArrowRight, Star, Flame, MapPin } from "lucide-react";
import { Link } from "react-router";
import { BUSINESS_INFO } from "../config/business";
import heroVideo from "../../assets/hero_video.mp4";
import foodTruckImage from "../../assets/food-truck.jpeg";
import splashMeatImage from "../../assets/splash-meat.jpeg";
import streetTacosImage from "../../assets/street-tacos.jpeg";

const FOOD_TRUCK_IMG = foodTruckImage;
const SPLASH_MEAT = splashMeatImage;
const STREET_TACOS = streetTacosImage;

export function Home() {
  const particles = Array.from({ length: 12 }, (_, i) => {
    const offsetX = ((i * 37) % 100) - 50;
    const offsetY = ((i * 53) % 100) - 50;
    const scale = 1 + ((i * 17) % 20) / 10;
    const duration = 2 + ((i * 13) % 20) / 10;
    const delay = ((i * 11) % 20) / 10;

    return {
      x: `${50 + offsetX}%`,
      y: `${50 + offsetY}%`,
      scale,
      duration,
      delay,
    };
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 3D Animated Hero Section */}
      <section className="relative min-h-[76vh] md:min-h-[82vh] w-full overflow-hidden flex items-center justify-center -mt-[88px] pt-18 md:pt-20 pb-12 md:pb-14">
        {/* Background Video */}
        <motion.video
          className="absolute inset-0 z-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Dark Overlay gradient for contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/80 via-zinc-950/35 to-transparent" />
        <div className="absolute inset-0 z-10 bg-black/15 backdrop-blur-[1px]" />

        {/* Floating Particles (Simulating 3D Cracking/Splashing) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
           {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-orange-500 rounded-full blur-[2px] opacity-60"
              initial={{ 
                x: "50%", 
                y: "50%", 
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                x: particle.x,
                y: particle.y,
                opacity: [0, 0.8, 0],
                scale: [0, particle.scale, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-30 container mx-auto px-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between mt-2 md:mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, delay: 0.5 }}
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-orange-500/30 backdrop-blur-md mb-3 text-orange-400 font-bold tracking-widest text-sm uppercase shadow-[0_0_15px_rgba(249,115,22,0.2)]"
            >
              <Flame size={16} className="text-orange-500 animate-pulse" />
              <span>Manor's Hottest Food Truck</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter uppercase mb-4 drop-shadow-2xl">
              Taste The <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                Fire.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-300 mb-6 max-w-xl font-medium leading-relaxed drop-shadow-md">
              Authentic, bold, and unapologetically loud flavors cracking open on every plate. 
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link 
                to="/menu"
                className="group relative px-8 py-4 bg-transparent border-2 border-orange-500 text-orange-400 hover:bg-orange-500/15 hover:text-orange-300 font-black text-lg tracking-widest uppercase overflow-hidden w-full sm:w-auto text-center transition-all duration-300 backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Order Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link 
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-zinc-100 text-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 font-black text-lg tracking-widest uppercase transition-all duration-300 w-full sm:w-auto text-center backdrop-blur-sm"
              >
                Find Us
              </Link>
            </div>
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.8, type: "spring" }}
            className="hidden lg:flex relative w-48 h-48 mt-10 md:mt-0 lg:self-end lg:mb-10 items-center justify-center"
          >
             <div className="absolute inset-0 border-2 border-orange-500 border-dashed rounded-full animate-[spin_10s_linear_infinite]" />
             <div className="w-36 h-36 bg-zinc-900 rounded-full flex flex-col items-center justify-center border-4 border-zinc-950 shadow-2xl z-10">
               <span className="text-3xl font-black text-white">4.9</span>
               <div className="flex text-orange-500 mb-1">
                 {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
               </div>
               <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Reviews</span>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
                Signature <span className="text-orange-500">Hits</span>
              </h2>
              <p className="text-zinc-400 max-w-md text-lg">
                The tacos that put us on the map. Hand-pressed tortillas, slow-cooked meats, and salsas made from scratch daily.
              </p>
            </div>
            <Link to="/menu" className="mt-6 md:mt-0 text-orange-500 font-bold tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2 group">
              View Full Menu <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative h-[400px] overflow-hidden bg-zinc-900 rounded-none cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                style={{ backgroundImage: `url(${SPLASH_MEAT})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black uppercase text-white mb-2">Al Pastor <br/> Volcán</h3>
                    <p className="text-zinc-300 mb-4 line-clamp-2">Marinated pork, pineapple, melted Oaxaca cheese on a crispy tostada.</p>
                  </div>
                  <span className="text-2xl font-black text-orange-500">$5</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative h-[400px] overflow-hidden bg-zinc-900 rounded-none cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                style={{ backgroundImage: `url(${STREET_TACOS})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black uppercase text-white mb-2">Carne Asada <br/> Street</h3>
                    <p className="text-zinc-300 mb-4 line-clamp-2">Grilled steak, cilantro, onion, and our signature fiery red salsa.</p>
                  </div>
                  <span className="text-2xl font-black text-orange-500">$4</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location / Vibe Section */}
      <section className="py-24 bg-zinc-900 border-y border-zinc-800 relative overflow-hidden">
         {/* Decorative typography background */}
         <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.03] text-9xl font-black uppercase pointer-events-none w-full overflow-hidden flex">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              <span className="mx-8">AUSTIN TEXAS MANOR FOOD TRUCK LA SABROZA</span>
              <span className="mx-8">AUSTIN TEXAS MANOR FOOD TRUCK LA SABROZA</span>
              <span className="mx-8">AUSTIN TEXAS MANOR FOOD TRUCK LA SABROZA</span>
            </motion.div>
         </div>

         <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] w-full max-w-md mx-auto"
              >
                <div className="absolute inset-0 bg-orange-500 translate-x-4 translate-y-4" />
                <img 
                  src={FOOD_TRUCK_IMG} 
                  alt="La Sabroza Food Truck" 
                  className="absolute inset-0 w-full h-full object-cover z-10 grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            </div>
            
            <div className="w-full lg:w-1/2">
               <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
                 Where We <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Roll.</span>
               </h2>
               <p className="text-xl text-zinc-400 mb-8 leading-relaxed font-light">
                 Born in the streets of Austin, parked permanently in Manor. We built this truck with one goal: to serve the most mind-blowing, authentic Mexican street food you've ever had. No frills, just fire.
               </p>
               
               <div className="bg-zinc-950 p-8 border-l-4 border-orange-500 shadow-2xl">
                 <div className="flex items-start gap-4 mb-4">
                   <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center shrink-0">
                     <MapPin className="text-orange-500" size={24} />
                   </div>
                   <div>
                     <h4 className="text-white font-bold text-xl uppercase tracking-widest mb-1">Current Location</h4>
                    <p className="text-zinc-400">{BUSINESS_INFO.addressLine1}<br/>{BUSINESS_INFO.cityStateZip}</p>
                   </div>
                 </div>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest hover:text-white transition-colors mt-4 text-sm"
                >
                   Get Directions <ArrowRight size={16} />
                </a>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
