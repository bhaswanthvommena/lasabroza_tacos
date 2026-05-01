import { motion } from "motion/react";
import { MapPin, Phone, Clock, Send } from "lucide-react";
import { BUSINESS_INFO } from "../config/business";
import contactMapBgImage from "../../assets/contact-map-bg.jpeg";

export function Contact() {
  return (
    <div className="bg-zinc-950 min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6"
          >
            Hit Us <span className="text-orange-500">Up.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg font-light"
          >
            Catering inquiries, feedback, or just want to talk tacos? We're here for it.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900/50 p-8 md:p-12 border border-zinc-800"
          >
            <h3 className="text-3xl font-black uppercase text-white mb-8">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder={BUSINESS_INFO.phoneDisplay}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  placeholder="What's on your mind?"
                />
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-zinc-950 font-black tracking-widest uppercase py-4 flex items-center justify-center gap-2 transition-colors">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>

          {/* Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 p-6 border border-zinc-800 flex flex-col items-start">
                <div className="w-12 h-12 bg-zinc-950 flex items-center justify-center mb-4">
                  <MapPin className="text-orange-500" size={24} />
                </div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-2">Location</h4>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  {BUSINESS_INFO.addressLine1}, <br/>{BUSINESS_INFO.cityStateZip}
                </a>
              </div>

              <div className="bg-zinc-900/50 p-6 border border-zinc-800 flex flex-col items-start">
                <div className="w-12 h-12 bg-zinc-950 flex items-center justify-center mb-4">
                  <Phone className="text-orange-500" size={24} />
                </div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-2">Phone</h4>
                <p className="text-zinc-400">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneE164}`}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <br/>
                  Call to order
                </p>
              </div>

              <div className="bg-zinc-900/50 p-6 border border-zinc-800 flex flex-col items-start sm:col-span-2">
                <div className="w-12 h-12 bg-zinc-950 flex items-center justify-center mb-4">
                  <Clock className="text-orange-500" size={24} />
                </div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-2">Hours</h4>
                <div className="w-full grid grid-cols-2 gap-4 text-zinc-400 mt-2">
                  <div>
                    <span className="block text-white font-bold">Mon - Thu</span>
                    <span>7:00AM - 11:00 PM</span>
                  </div>
                  <div>
                    <span className="block text-white font-bold">Friday</span>
                    <span>7:00 PM - 12:00 AM</span>
                  </div>
                  <div>
                    <span className="block text-white font-bold">Saturday</span>
                    <span>9:00 AM - 12:00 AM</span>
                  </div>
                  <div>
                    <span className="block text-white font-bold">Sunday</span>
                    <span>9:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fake Map */}
            <div className="w-full h-64 bg-zinc-900 border border-zinc-800 relative overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 grayscale group-hover:opacity-50 transition-opacity duration-500"
                style={{ backgroundImage: `url(${contactMapBgImage})` }}
              />
              <div className="absolute inset-0 bg-zinc-950/60" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] animate-bounce">
                  <MapPin size={24} className="text-zinc-950" />
                </div>
                <div className="mt-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-white text-xs font-bold uppercase tracking-widest">
                  Manor, TX
                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
