import { Link, NavLink } from "react-router";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/products" },
    { label: "My Orders", to: "/my-orders" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive ? "text-amber" : "text-ink/70 hover:text-ink"
        }`;

    return (
        <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-ink/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand */}
                    <Link to="/" className="font-display text-2xl font-semibold text-ink tracking-tight">
                        Learn<span className="text-amber">Cart</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} className={linkClass}>
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="hidden md:flex items-center gap-5">
                        <Link to="/cart" className="relative text-ink/70 hover:text-ink transition-colors">
                            <ShoppingCart size={20} />
                            <span className="absolute -top-2 -right-2 bg-amber text-ink text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                                0
                            </span>
                        </Link>
                        <Link
                            to="/login"
                            className="flex items-center gap-1.5 text-sm font-medium text-ink/70 hover:text-ink transition-colors"
                        >
                            <User size={18} />
                            Account
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-ink"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-ink/10 bg-paper px-4 pb-4">
                    <nav className="flex flex-col gap-3 pt-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={linkClass}
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <div className="flex items-center gap-4 pt-2 border-t border-ink/10 mt-2">
                            <Link to="/cart" className="flex items-center gap-1.5 text-sm text-ink/70">
                                <ShoppingCart size={18} /> Cart
                            </Link>
                            <Link to="/login" className="flex items-center gap-1.5 text-sm text-ink/70">
                                <User size={18} /> Account
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};