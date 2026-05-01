import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, X, ShoppingCart, Send, MessageSquare } from "lucide-react";
import { Link } from "react-router";
import { BREAKFAST_FORMATS, MEAT_OPTIONS, MENU_SECTIONS, type MenuItem } from "../data/menuData";
import { getCartKey, getSelectedOptionsLabel } from "../lib/menuOptions";
import { BUSINESS_INFO } from "../config/business";

type CartItem = {
  cartKey: string;
  itemId: string;
  name: string;
  price: number | null;
  quantity: number;
  selectedMeat?: string;
  selectedFormat?: string;
  img?: string;
};

export function Menu() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedMeatByItem, setSelectedMeatByItem] = useState<Record<string, string>>({});
  const [selectedFormatByItem, setSelectedFormatByItem] = useState<Record<string, string>>({});

  const getItemQuantity = (cartKey: string) =>
    cart.find((c) => c.cartKey === cartKey)?.quantity ?? 0;

  const addToCart = (item: MenuItem, selectedFormat?: string, selectedMeat?: string) => {
    const cartKey = getCartKey(item, selectedFormat, selectedMeat);
    setCart((prev) => {
      const existing = prev.find((c) => c.cartKey === cartKey);
      if (existing) {
        return prev.map((c) =>
          c.cartKey === cartKey ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        {
          cartKey,
          itemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          img: item.img,
          selectedFormat,
          selectedMeat,
        },
      ];
    });
  };

  const updateQuantity = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.cartKey === cartKey) {
            const newQ = c.quantity + delta;
            return newQ > 0 ? { ...c, quantity: newQ } : null;
          }
          return c;
        })
        .filter((c): c is CartItem => c !== null)
    );
  };

  const removeFromCart = (cartKey: string) => {
    setCart((prev) => prev.filter((c) => c.cartKey !== cartKey));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const hasPendingPrices = cart.some((item) => item.price === null);
  const phone = BUSINESS_INFO.whatsappPhoneE164;

  const getOrderText = () => {
    const details = cart
      .map((c) => {
        const selectedOptions = getSelectedOptionsLabel(c.selectedFormat, c.selectedMeat);
        const label = selectedOptions ? `${c.name} (${selectedOptions})` : c.name;
        return `- ${c.quantity}x ${label} ($${((c.price ?? 0) * c.quantity).toFixed(2)})`;
      })
      .join("\n");
    return `Hi La Sabroza! I'd like to order:\n\n${details}\n\nTotal: $${cartTotal.toFixed(2)}\n\nPickup ASAP please!`;
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0 || hasPendingPrices) return;
    const text = getOrderText();
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleSmsCheckout = () => {
    if (cart.length === 0 || hasPendingPrices) return;
    const text = getOrderText();
    window.open(`sms:${BUSINESS_INFO.phoneE164}?body=${encodeURIComponent(text)}`, "_self");
  };

  return (
    <div className="bg-zinc-950 min-h-screen pt-12 pb-24 relative overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-lg"
        >
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Menu.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-light"
        >
          Everything made from scratch. Local ingredients. Serious heat. 
        </motion.p>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-6 max-w-5xl">
        {MENU_SECTIONS.map((section) => (
          <div key={section.category} className="mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-widest">
                {section.category}
              </h2>
              {section.subtitle && (
                <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest ml-4">
                  {section.subtitle}
                </p>
              )}
              <div className="flex-1 h-[2px] bg-zinc-800" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.items.map((item, itemIdx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: itemIdx * 0.1 }}
                  className="group flex flex-col sm:flex-row gap-6 bg-zinc-900/50 p-6 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 relative overflow-hidden"
                >
                   {/* Background Glow */}
                   <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-colors pointer-events-none" />

                   {item.img && (
                     <div className="w-full sm:w-32 h-48 sm:h-32 shrink-0 overflow-hidden bg-zinc-950">
                       <img 
                         src={item.img} 
                         alt={item.name} 
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                       />
                     </div>
                   )}
                   
                   <div className="flex-1 flex flex-col justify-between z-10">
                     <div>
                       <div className="flex justify-between items-start mb-2">
                         <h3 className="text-2xl font-black uppercase text-white tracking-wide">{item.name}</h3>
                         <span className="text-xl font-bold text-orange-500 whitespace-nowrap ml-4">
                           {item.price === null ? "TBD" : `$${item.price.toFixed(2)}`}
                         </span>
                       </div>
                       <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                     </div>
                     
                     {(() => {
                       const selectedFormat = selectedFormatByItem[item.id];
                       const selectedMeat = selectedMeatByItem[item.id];
                       const isSelectionValid =
                         (!item.requiresFormat || Boolean(selectedFormat)) &&
                         (!item.requiresMeat || Boolean(selectedMeat));
                       const selectedCartKey = getCartKey(item, selectedFormat, selectedMeat);
                       const itemQuantity = getItemQuantity(selectedCartKey);

                       return (
                         <div className="flex flex-col gap-3 items-start">
                           {item.requiresFormat && (
                             <select
                               value={selectedFormat ?? ""}
                               onChange={(e) =>
                                 setSelectedFormatByItem((prev) => ({ ...prev, [item.id]: e.target.value }))
                               }
                               className="bg-zinc-950 border border-zinc-800 text-zinc-200 px-3 py-2 text-xs uppercase tracking-widest focus:outline-none focus:border-orange-500"
                             >
                               <option value="">Select Style</option>
                               {BREAKFAST_FORMATS.map((format) => (
                                 <option key={format} value={format}>
                                   {format}
                                 </option>
                               ))}
                             </select>
                           )}
                           {item.requiresMeat && (
                             <select
                               value={selectedMeat ?? ""}
                               onChange={(e) =>
                                 setSelectedMeatByItem((prev) => ({ ...prev, [item.id]: e.target.value }))
                               }
                               className="bg-zinc-950 border border-zinc-800 text-zinc-200 px-3 py-2 text-xs uppercase tracking-widest focus:outline-none focus:border-orange-500"
                             >
                               <option value="">Select Meat</option>
                               {MEAT_OPTIONS.map((meat) => (
                                 <option key={meat} value={meat}>
                                   {meat}
                                 </option>
                               ))}
                             </select>
                           )}
                           <button
                             onClick={() => addToCart(item, selectedFormat, selectedMeat)}
                             disabled={!isSelectionValid}
                             className="self-start inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-orange-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                           >
                             <Plus size={16} /> Add to Order
                           </button>
                           {itemQuantity > 0 && (
                             <div className="self-start flex items-center gap-3 bg-zinc-900 w-fit rounded-full px-2 py-1 border border-zinc-800">
                               <button
                                 onClick={() => updateQuantity(selectedCartKey, -1)}
                                 className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                               >
                                 <Minus size={14} />
                               </button>
                               <span className="text-white font-bold text-sm w-4 text-center">{itemQuantity}</span>
                               <button
                                 onClick={() => updateQuantity(selectedCartKey, 1)}
                                 className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                               >
                                 <Plus size={14} />
                               </button>
                             </div>
                           )}
                         </div>
                       );
                     })()}
                   </div>
                </motion.div>
              ))}

              {section.showMeatOptions && (
                <div className="md:col-span-2 bg-zinc-900/50 p-6 border border-zinc-800">
                  <h3 className="text-2xl font-black uppercase text-white tracking-wide mb-4">
                    Choose Any Of Our Meats
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {MEAT_OPTIONS.map((meat) => (
                      <p key={meat} className="text-zinc-400 text-sm uppercase tracking-wide">
                        {meat}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to Action Footer */}
      <div className="container mx-auto px-6 mt-12 text-center">
         <div className="inline-block p-[2px] bg-gradient-to-r from-orange-400 to-red-600">
           <div className="bg-zinc-950 px-8 py-12 md:px-16 flex flex-col items-center">
             <h3 className="text-3xl font-black uppercase text-white mb-4">Craving Something <span className="text-orange-500">More?</span></h3>
             <p className="text-zinc-400 mb-8 max-w-md">We offer catering for events of all sizes. Bring the true flavor of Austin to your next party.</p>
            <Link to="/contact" className="px-8 py-3 bg-white text-zinc-950 font-black tracking-widest uppercase hover:bg-orange-500 transition-colors">
               Contact Catering
            </Link>
           </div>
         </div>
      </div>

      {/* Floating Cart Button (visible when cart has items but drawer is closed) */}
      <AnimatePresence>
        {cartCount > 0 && !isCartOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-zinc-950 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-105 transition-transform"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-white text-zinc-950 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-orange-500">
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col shadow-2xl"
            >
              {/* Cart Header */}
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
                <h2 className="text-2xl font-black uppercase text-white tracking-widest flex items-center gap-3">
                  <ShoppingCart className="text-orange-500" />
                  Your Order
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                    <ShoppingCart size={48} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium uppercase tracking-widest">Cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartKey} className="flex gap-4">
                      {item.img && (
                        <img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-md grayscale opacity-80"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div>
                            <h4 className="font-bold text-white uppercase tracking-wide">{item.name}</h4>
                            {(item.selectedFormat || item.selectedMeat) && (
                              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
                                {getSelectedOptionsLabel(item.selectedFormat, item.selectedMeat)}
                              </p>
                            )}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.cartKey)}
                            className="text-zinc-500 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-orange-500 font-bold mb-3">
                          {item.price === null ? "TBD" : `$${(item.price * item.quantity).toFixed(2)}`}
                        </p>
                        
                        <div className="flex items-center gap-3 bg-zinc-900 w-fit rounded-full px-2 py-1 border border-zinc-800">
                          <button 
                            onClick={() => updateQuantity(item.cartKey, -1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-white font-bold text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartKey, 1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-zinc-800 bg-zinc-900/50">
                  <div className="flex justify-between text-lg mb-6">
                    <span className="text-zinc-400 uppercase tracking-widest font-bold">Total</span>
                    <span className="text-white font-black">
                      {hasPendingPrices ? "Price pending" : `$${cartTotal.toFixed(2)}`}
                    </span>
                  </div>
                  <button 
                    onClick={handleWhatsAppCheckout}
                    disabled={hasPendingPrices}
                    className="w-full bg-orange-500 text-zinc-950 py-4 flex items-center justify-center gap-2 font-black text-lg tracking-widest uppercase hover:bg-orange-400 transition-colors rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Order via WhatsApp
                    <Send size={20} />
                  </button>
                  <button
                    onClick={handleSmsCheckout}
                    disabled={hasPendingPrices}
                    className="w-full mt-3 border border-zinc-700 text-zinc-200 py-4 flex items-center justify-center gap-2 font-black text-lg tracking-widest uppercase hover:border-orange-500 hover:text-orange-400 transition-colors rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Order via Message
                    <MessageSquare size={20} />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
