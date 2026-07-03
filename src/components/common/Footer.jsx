import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="bg-ink text-paper/80 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-display text-xl font-semibold text-paper">
                            Learn<span className="text-amber">Cart</span>
                        </h3>
                        <p className="text-sm mt-2 text-paper/60 max-w-xs">
                            A training platform for people who'd rather learn by doing.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-paper mb-3">Shop</h4>
                        <ul className="space-y-2 text-sm text-paper/60">
                            <li><Link to="/products" className="hover:text-amber transition-colors">All Products</Link></li>
                            <li><Link to="/cart" className="hover:text-amber transition-colors">Cart</Link></li>
                            <li><Link to="/my-orders" className="hover:text-amber transition-colors">My Orders</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-paper mb-3">Account</h4>
                        <ul className="space-y-2 text-sm text-paper/60">
                            <li><Link to="/login" className="hover:text-amber transition-colors">Login</Link></li>
                            <li><Link to="/register" className="hover:text-amber transition-colors">Register</Link></li>
                            <li><Link to="/profile" className="hover:text-amber transition-colors">Profile</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-paper/10 mt-10 pt-6 text-xs text-paper/40">
                    © {new Date().getFullYear()} LearnCart. Built as a learning project.
                </div>
            </div>
        </footer>
    );
};