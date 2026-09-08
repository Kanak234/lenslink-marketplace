/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Camera, 
  User, 
  Calendar, 
  Package, 
  Shirt, 
  Home, 
  ChevronRight, 
  Filter,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { CATEGORIES, PHOTOGRAPHERS } from './constants';
import { Photographer } from './types';

const IconMap: Record<string, React.ElementType> = {
  Camera,
  User,
  Calendar,
  Package,
  Shirt,
  Home,
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('New York');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingPhotographer, setBookingPhotographer] = useState<Photographer | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPhotographers = PHOTOGRAPHERS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.specialty.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || p.specialty.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      )}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <Camera className="text-white w-6 h-6" />
          </div>
          <span className={cn(
            "text-2xl font-bold tracking-tight",
            isScrolled ? "text-gray-900" : "text-white"
          )}>
            LensLink
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#" className={cn("font-medium hover:text-red-500 transition-colors", isScrolled ? "text-gray-600" : "text-white/90")}>Explore</a>
          <a href="#" className={cn("font-medium hover:text-red-500 transition-colors", isScrolled ? "text-gray-600" : "text-white/90")}>Portfolios</a>
          <a href="#" className={cn("font-medium hover:text-red-500 transition-colors", isScrolled ? "text-gray-600" : "text-white/90")}>Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <button className={cn(
            "px-4 py-2 font-medium transition-colors",
            isScrolled ? "text-gray-600" : "text-white"
          )}>
            Login
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-display"
          >
            Find the perfect lens for your moments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Connect with top-rated photographers and videographers in your city.
          </motion.p>

          {/* Zomato Style Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-2 px-4 py-3 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100">
              <MapPin className="text-red-400 w-5 h-5 flex-shrink-0" />
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 w-full md:w-2/3">
              <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for photographers, videographers or styles..."
                className="w-full outline-none text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-display">Popular Categories</h2>
          <button className="text-red-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = IconMap[cat.icon];
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-2xl transition-all border-2",
                  selectedCategory === cat.name 
                    ? "bg-red-50 border-red-500 text-red-600" 
                    : "bg-white border-gray-100 hover:border-red-200 hover:shadow-lg text-gray-600"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                  selectedCategory === cat.name ? "bg-red-500 text-white" : "bg-gray-50 text-gray-400"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-semibold">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Photographers */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold font-display mb-2">Top Rated Professionals</h2>
              <p className="text-gray-500 text-lg">Vetted visual storytellers ready to capture your moments.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg font-medium text-gray-600 hover:border-red-500 transition-all">
                <Filter className="w-4 h-4" /> Filters
              </button>
              <div className="h-8 w-[1px] bg-gray-200 mx-2 hidden md:block" />
              <p className="text-sm text-gray-400 font-medium">{filteredPhotographers.length} results found</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPhotographers.map((p) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={p.id}
                  className="bg-white rounded-3xl overflow-hidden zomato-shadow group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={p.imageUrl} 
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {p.isPromoted && (
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Promoted
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-sm">{p.rating}</span>
                      <span className="text-gray-400 text-xs">({p.reviewCount})</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                      <p className="text-red-500 font-bold">${p.pricePerHour}<span className="text-gray-400 font-normal text-sm">/hr</span></p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.specialty.map(s => (
                        <span key={s} className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-6">
                      <MapPin className="w-4 h-4" />
                      {p.location}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {p.portfolio.map((img, idx) => (
                        <div key={idx} className="h-20 rounded-lg overflow-hidden">
                          <img src={img} alt="Portfolio" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setBookingPhotographer(p)}
                      className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-red-500 transition-all flex items-center justify-center gap-2 group"
                    >
                      Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl" alt="Trust 1" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=400" className="rounded-3xl shadow-xl mt-8" alt="Trust 2" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold font-display mb-8 leading-tight">Why choose LensLink for your memories?</h2>
            <div className="space-y-6">
              {[
                { title: "Vetted Professionals", desc: "Every creative on our platform goes through a rigorous quality check.", icon: CheckCircle2 },
                { title: "Secure Payments", desc: "Your money is safe with us until the project is delivered and approved.", icon: Package },
                { title: "Real-time Booking", desc: "Check availability and book instantly without back-and-forth emails.", icon: Clock },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-red-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <Camera className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">LensLink</span>
              </div>
              <p className="text-gray-400 mb-6">Connecting the world's best visual storytellers with clients who value quality and creativity.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-500 transition-all cursor-pointer">
                  <Star className="w-5 h-5" />
                </div>
                {/* More social icons here */}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">For Clients</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find a photographer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety & Trust</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">For Creatives</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Join as a creative</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Creative resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community forum</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Newsletter</h4>
              <p className="text-gray-400 mb-4">Get inspiration and tips delivered to your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 w-full outline-none focus:border-red-500 transition-all"
                />
                <button className="bg-red-500 px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-all">Go</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© 2026 LensLink Marketplace. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingPhotographer && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingPhotographer(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img src={bookingPhotographer.imageUrl} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                    <div>
                      <h3 className="text-2xl font-bold">Book {bookingPhotographer.name}</h3>
                      <p className="text-gray-500">{bookingPhotographer.specialty.join(', ')}</p>
                    </div>
                  </div>
                  <button onClick={() => setBookingPhotographer(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Select Date</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[12, 13, 14, 15, 16, 17, 18, 19].map(day => (
                        <button key={day} className="py-3 border border-gray-200 rounded-xl font-bold hover:border-red-500 hover:text-red-500 transition-all">
                          Mar {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Session Type</label>
                    <div className="flex gap-3">
                      {['1 Hour', '2 Hours', 'Full Day'].map(type => (
                        <button key={type} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold hover:border-red-500 hover:text-red-500 transition-all">
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Service Fee</span>
                      <span className="font-bold">$25.00</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-500">Photographer Fee</span>
                      <span className="font-bold">${bookingPhotographer.pricePerHour}.00</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold text-red-500">${bookingPhotographer.pricePerHour + 25}.00</span>
                    </div>
                  </div>

                  <button className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-600 transition-all shadow-xl shadow-red-500/20">
                    Confirm Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
