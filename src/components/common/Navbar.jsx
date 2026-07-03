import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { ShoppingCart, User, Menu, X, Search, Heart } from "lucide-react";

const categories = ["Electronics", "Fashion", "Home & Living", "Books", "Beauty", "Sports"];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const linkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive ? "text-amber" : "text-ink/70 hover:text-ink"
        }`;

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    };

    return (
        <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-ink/10">
            {/* Top utility bar */}
            <div className="hidden sm:block bg-ink text-paper/70 text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center">
                    <span>Free shipping on orders over ৳2000</span>
                    <div className="flex gap-4">
                        <Link to="/my-orders" className="hover:text-amber transition-colors">Track Order</Link>
                        <Link to="/resend-verification" className="hover:text-amber transition-colors">Help</Link>
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 sm:gap-8 h-16">
                    {/* Brand */}
                    <Link to="/" className="font-display text-2xl font-semibold text-ink tracking-tight shrink-0">
                        Learn<span className="text-amber">Cart</span>
                    </Link>

                    {/* Search — desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
                        <div className="relative w-full">
                            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/50" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-ink/15 bg-white text-sm
                  focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
                            />
                        </div>
                    </form>

                    {/* Right actions */}
                    <div className="hidden md:flex items-center gap-5 ml-auto shrink-0">
                        <Link to="/login" className="flex items-center gap-1.5 text-sm font-medium text-ink/70 hover:text-ink transition-colors">
                            <User size={19} />
                            Account
                        </Link>
                        <Link to="/cart" className="relative text-ink/70 hover:text-ink transition-colors">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-2 -right-2 bg-amber text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button className="md:hidden ml-auto text-ink" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Category strip — desktop */}
            <nav className="hidden md:block border-t border-ink/10 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-7 h-11 overflow-x-auto">
                        <NavLink to="/products" className={linkClass}>
                            All Products
                        </NavLink>
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                to={`/products?category=${encodeURIComponent(cat)}`}
                                className="text-sm text-ink/60 hover:text-amber whitespace-nowrap transition-colors"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-ink/10 bg-paper px-4 pb-4">
                    <form onSubmit={handleSearch} className="pt-3">
                        <div className="relative">
                            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/50" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-ink/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber/30"
                            />
                        </div>
                    </form>

                    <nav className="flex flex-col gap-3 pt-4">
                        <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>
                            All Products
                        </NavLink>
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                to={`/products?category=${encodeURIComponent(cat)}`}
                                onClick={() => setOpen(false)}
                                className="text-sm text-ink/60"
                            >
                                {cat}
                            </Link>
                        ))}
                        <div className="flex items-center gap-4 pt-3 border-t border-ink/10 mt-2">
                            <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-1.5 text-sm text-ink/70">
                                <ShoppingCart size={18} /> Cart
                            </Link>
                            <Link to="/login" onClick={() => setOpen(false)} className="flex items-center gap-1.5 text-sm text-ink/70">
                                <User size={18} /> Account
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};