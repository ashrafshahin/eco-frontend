import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { ShoppingCart, User, Menu, X, Search, ChevronDown } from "./Icons";
import { useCart } from "../../context/CartContext";
import { categories } from "../../utils/mockCategories";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [openMobileCat, setOpenMobileCat] = useState(null);
    const [hoveredCat, setHoveredCat] = useState(null);
    const navigate = useNavigate();
    const { totalItems } = useCart();

    const linkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive ? "text-amber" : "text-ink/70 hover:text-ink"
        }`;

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    };

    const toggleMobileCat = (name) => {
        setOpenMobileCat((prev) => (prev === name ? null : name));
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
                        Eco<span className="text-amber">Bazaar</span>
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
                                {totalItems}
                            </span>
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button className="md:hidden ml-auto text-ink" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Category strip with mega-menu — desktop */}
            <nav className="hidden md:block border-t border-ink/10 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-6 h-11 overflow-x-auto">
                        <NavLink to="/products" className={linkClass}>
                            All Products
                        </NavLink>

                        {categories.map((cat) => (
                            <div
                                key={cat.name}
                                className="relative h-full flex items-center"
                                onMouseEnter={() => setHoveredCat(cat.name)}
                                onMouseLeave={() => setHoveredCat(null)}
                            >
                                <Link
                                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                                    className="flex items-center gap-1 text-sm text-ink/60 hover:text-amber whitespace-nowrap transition-colors"
                                >
                                    {cat.name}
                                    <ChevronDown size={13} className={`transition-transform ${hoveredCat === cat.name ? "rotate-180" : ""}`} />
                                </Link>

                                {hoveredCat === cat.name && (
                                    <div className="absolute top-full left-0 bg-slate-50 border border-ink/10 rounded-lg shadow-lg min-w-[200px] z-20 overflow-hidden">
                                        {/* Category header */}
                                        <div className="px-4 py-2.5 border-b border-ink/10 bg-white">
                                            <Link
                                                to={`/products?category=${encodeURIComponent(cat.name)}`}
                                                className="text-sm font-semibold text-ink hover:text-amber transition-colors"
                                            >
                                                {cat.name}
                                            </Link>
                                        </div>

                                        {/* Subcategories */}
                                        <div className="py-2">
                                            {cat.subcategories.map((sub) => (
                                                <Link
                                                    key={sub}
                                                    to={`/products?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub)}`}
                                                    className="block px-4 py-2 text-sm text-ink/70 hover:text-amber hover:bg-white transition-colors"
                                                >
                                                    {sub}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* View all footer */}
                                        <Link
                                            to={`/products?category=${encodeURIComponent(cat.name)}`}
                                            className="block px-4 py-2.5 text-xs font-semibold text-amber border-t border-ink/10 bg-white hover:bg-ink/[0.02] transition-colors"
                                        >
                                            View all {cat.name} →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-ink/10 bg-paper px-4 pb-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
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

                    <nav className="flex flex-col pt-4">
                        <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>
                            <span className="block py-2">All Products</span>
                        </NavLink>

                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isOpen = openMobileCat === cat.name;
                            return (
                                <div key={cat.name} className="border-b border-ink/5 last:border-0">
                                    <button
                                        onClick={() => toggleMobileCat(cat.name)}
                                        className="w-full flex items-center justify-between py-2.5 text-sm text-ink/70"
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <Icon size={16} className="text-amber" />
                                            {cat.name}
                                        </span>
                                        <ChevronDown size={15} className={`text-ink/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {isOpen && (
                                        <div className="pl-7 pb-2 flex flex-col gap-1.5">
                                            <Link
                                                to={`/products?category=${encodeURIComponent(cat.name)}`}
                                                onClick={() => setOpen(false)}
                                                className="text-xs font-medium text-amber py-1"
                                            >
                                                View all {cat.name}
                                            </Link>
                                            {cat.subcategories.map((sub) => (
                                                <Link
                                                    key={sub}
                                                    to={`/products?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub)}`}
                                                    onClick={() => setOpen(false)}
                                                    className="text-xs text-slate py-1"
                                                >
                                                    {sub}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <div className="flex items-center gap-4 pt-4 mt-2 border-t border-ink/10">
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