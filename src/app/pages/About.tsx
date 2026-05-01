import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Flame } from "lucide-react";
import chefCookingImage from "../../assets/chef-cooking.jpeg";
import austinStreetImage from "../../assets/austin-street.jpeg";
import streetTacosImage from "../../assets/street-tacos.jpeg";

const CHEF_IMG = chefCookingImage;
const AUSTIN_IMG = austinStreetImage;
const STREET_TACOS = streetTacosImage;

export function About() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
          style={{ backgroundImage: `url(${AUSTIN_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
               <Flame size={16} className="text-orange-500" />
               <span className="text-zinc-300 font-bold tracking-widest text-xs uppercase">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
              Born in <span className="text-orange-500">Austin.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
             >
               <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">No Shortcuts. <br/> Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Soul.</span></h2>
               <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                 La Sabroza started as a late-night craving. We couldn't find the exact flavors of the streets of Mexico City here in Manor, so we decided to build it ourselves.
               </p>
               <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                 Every salsa is roasted daily. Every tortilla is pressed by hand. We believe that good food shouldn't be complicated, but it shouldn't be easy either. It takes time, fire, and a whole lot of passion.
               </p>
               <div className="grid grid-cols-2 gap-8 border-t border-zinc-800 pt-8">
                 <div>
                   <span className="block text-4xl font-black text-white mb-2">2021</span>
                   <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Year Founded</span>
                 </div>
                 <div>
                   <span className="block text-4xl font-black text-white mb-2">10k+</span>
                   <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Tacos Served</span>
                 </div>
               </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative aspect-square"
             >
               <div className="absolute inset-0 bg-orange-500 translate-x-4 translate-y-4" />
               <img src={CHEF_IMG} alt="Chef cooking" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 z-10" />
               <div className="absolute -bottom-8 -left-8 bg-zinc-900 p-6 border-l-4 border-orange-500 z-20 shadow-2xl">
                 <h4 className="text-white font-black uppercase text-xl mb-1">Chef Mateo</h4>
                 <p className="text-zinc-400 text-sm">Head Pitmaster</p>
               </div>
             </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative aspect-[4/3] order-2 lg:order-1"
             >
               <div className="absolute inset-0 border-2 border-zinc-800 -translate-x-4 -translate-y-4" />
               <img src={STREET_TACOS} alt="Street Tacos" className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 z-10" />
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="order-1 lg:order-2"
             >
               <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-6">The Manor <span className="text-orange-500">Movement.</span></h2>
               <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                 Austin is known for its tacos, but we noticed Manor was missing that late-night, authentic street food vibe. We parked our truck here to bring the community together over something everyone loves: damn good food.
               </p>
               <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                 We're not just a food truck; we're a hangout spot. Grab a plate, grab a Mexican Coke, and enjoy the vibe.
               </p>
               <Link to="/menu" className="inline-flex items-center gap-2 text-zinc-100 hover:text-orange-500 font-bold uppercase tracking-widest transition-colors group">
                 Check out the menu <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </Link>
             </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}
