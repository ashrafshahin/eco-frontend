import { useState } from "react";
import { Link } from "react-router";
import {
    Mail, Phone, MapPin, Truck, ShieldCheck, RotateCcw, CreditCard, Star,
    FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon, WhatsappIcon,
} from "./Icons";
import { categories } from "../../utils/mockCategories";
import { mockProducts } from "../../utils/mockProducts";

function getMainImage(product) {
    return product.images?.find((img) => img.isMain)?.url || product.images?.[0]?.url;
}

const trustPoints = [
    { icon: Truck, label: "Fast Delivery", desc: "Nationwide, 2-5 days" },
    { icon: ShieldCheck, label: "Secure Payment", desc: "100% protected checkout" },
    { icon: RotateCcw, label: "Easy Returns", desc: "7-day return policy" },
    { icon: CreditCard, label: "Flexible Payment", desc: "Cards & mobile banking" },
];

export default function Footer() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const activeProducts = mockProducts.filter((p) => p.status === "active");
    const bestSellers = [...activeProducts].sort((a, b) => b.numReviews - a.numReviews).slice(0, 4);
    const newArrivals = [...activeProducts].reverse().slice(0, 4);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        // TODO: wire to a newsletter endpoint once backend supports it
        setSubscribed(true);
        setEmail("");
    };

    return (
        <footer className="bg-ink text-paper/80 mt-20">
            {/* Trust strip */}
            <div className="border-b border-paper/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {trustPoints.map(({ icon: Icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-paper/10 flex items-center justify-center shrink-0">
                                <Icon size={17} className="text-amber" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-paper">{label}</p>
                                <p className="text-xs text-paper/50 mt-0.5">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Best Sellers / New Arrivals */}
            <div className="border-b border-paper/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Best Sellers */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-paper uppercase tracking-wide">Best Sellers</h3>
                            <Link to="/products?sort=popular" className="text-xs text-amber hover:underline">View all</Link>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {bestSellers.map((p) => (
                                <Link key={p._id} to={`/products/${p._id}`} className="group">
                                    <div className="aspect-square rounded-lg overflow-hidden bg-paper/5 border border-paper/10 mb-1.5">
                                        <img
                                            src={getMainImage(p)}
                                            alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <p className="text-xs text-paper/70 line-clamp-1 group-hover:text-amber transition-colors">{p.title}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <Star size={9} className="text-amber" fill="currentColor" />
                                        <span className="text-[10px] text-paper/40">{p.averageRating.toFixed(1)}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* New Arrivals */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-paper uppercase tracking-wide">New Arrivals</h3>
                            <Link to="/products?sort=newest" className="text-xs text-amber hover:underline">View all</Link>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {newArrivals.map((p) => (
                                <Link key={p._id} to={`/products/${p._id}`} className="group">
                                    <div className="aspect-square rounded-lg overflow-hidden bg-paper/5 border border-paper/10 mb-1.5">
                                        <img
                                            src={getMainImage(p)}
                                            alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <p className="text-xs text-paper/70 line-clamp-1 group-hover:text-amber transition-colors">{p.title}</p>
                                    <p className="text-[10px] text-amber font-medium mt-0.5">৳{p.salePrice.toLocaleString()}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
                    {/* Brand + newsletter + contact */}
                    <div className="lg:col-span-2">
                        <h3 className="font-display text-xl font-semibold text-paper">
                            Eco<span className="text-amber">Bazaar</span>
                        </h3>
                        <p className="text-sm mt-2 text-paper/60 max-w-xs">
                            A training platform for people who'd rather learn by doing.
                        </p>

                        <form onSubmit={handleSubscribe} className="mt-5 max-w-xs">
                            <p className="text-xs font-medium text-paper/70 mb-2">Get updates on new products & offers</p>
                            {subscribed ? (
                                <p className="text-sm text-amber">Thanks — you're subscribed.</p>
                            ) : (
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-paper/40" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email"
                                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-paper/10 border border-paper/15 text-sm text-paper
                        placeholder:text-paper/40 focus:outline-none focus:ring-2 focus:ring-amber/40 focus:border-amber"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-amber text-ink text-sm font-semibold hover:bg-amber/90 transition-colors shrink-0"
                                    >
                                        Join
                                    </button>
                                </div>
                            )}
                        </form>

                        {/* Contact info */}
                        <div className="flex flex-col gap-2.5 mt-6 pt-5 border-t border-paper/10">
                            <a href="mailto:support@ecobazaar.com" className="flex items-center gap-2.5 text-sm text-paper/60 hover:text-amber transition-colors">
                                <Mail size={14} className="text-amber shrink-0" />
                                support@ecobazaar.com
                            </a>
                            <a href="tel:+8801700000000" className="flex items-center gap-2.5 text-sm text-paper/60 hover:text-amber transition-colors">
                                <Phone size={14} className="text-amber shrink-0" />
                                +880 18166 77503
                            </a>
                            <div className="flex items-start gap-2.5 text-sm text-paper/60">
                                <MapPin size={14} className="text-amber shrink-0 mt-0.5" />
                                House 12, Road 5, Dhanmondi, Dhaka, Bangladesh
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-sm font-semibold text-paper mb-3">Categories</h4>
                        <ul className="space-y-2 text-sm text-paper/60">
                            {categories.slice(0, 6).map((cat) => (
                                <li key={cat.name}>
                                    <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="hover:text-amber transition-colors">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular picks */}
                    <div>
                        <h4 className="text-sm font-semibold text-paper mb-3">Popular Picks</h4>
                        <ul className="space-y-2 text-sm text-paper/60">
                            {categories.slice(0, 6).map((cat) => (
                                <li key={cat.subcategories[0]}>
                                    <Link
                                        to={`/products?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(cat.subcategories[0])}`}
                                        className="hover:text-amber transition-colors"
                                    >
                                        {cat.subcategories[0]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h4 className="text-sm font-semibold text-paper mb-3">Account</h4>
                        <ul className="space-y-2 text-sm text-paper/60">
                            <li><Link to="/login" className="hover:text-amber transition-colors">Login</Link></li>
                            <li><Link to="/register" className="hover:text-amber transition-colors">Register</Link></li>
                            <li><Link to="/profile" className="hover:text-amber transition-colors">Profile</Link></li>
                            <li><Link to="/my-orders" className="hover:text-amber transition-colors">My Orders</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-sm font-semibold text-paper mb-3">Support</h4>
                        <ul className="space-y-2 text-sm text-paper/60">
                            <li><Link to="/products" className="hover:text-amber transition-colors">All Products</Link></li>
                            <li><Link to="/cart" className="hover:text-amber transition-colors">Cart</Link></li>
                            <li><Link to="/resend-verification" className="hover:text-amber transition-colors">Verify Email</Link></li>
                            <li><Link to="/forgot-password" className="hover:text-amber transition-colors">Reset Password</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-paper/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-paper/40">
                        © {new Date().getFullYear()} EcoBazaar. Powered by Ashraf Shahin.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" aria-label="Facebook" className="text-paper/50 hover:text-amber transition-colors">
                            <FacebookIcon />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-paper/50 hover:text-amber transition-colors">
                            <InstagramIcon />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-paper/50 hover:text-amber transition-colors">
                            <TwitterIcon />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="text-paper/50 hover:text-amber transition-colors">
                            <LinkedinIcon />
                        </a>
                        <a href="#" aria-label="WhatsApp" className="text-paper/50 hover:text-amber transition-colors">
                            <WhatsappIcon />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};