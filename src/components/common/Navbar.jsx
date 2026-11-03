import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation, useSearchParams } from "react-router";
import { ShoppingCart, User, Menu, X, Search, ChevronDown, Mail, Phone, Truck } from "./Icons";
import { useCart } from "../../context/CartContext";
// import { categories } from "../../utils/mockCategories";
import axios from "axios";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    // const [openMobileCat, setOpenMobileCat] = useState(null);
    const [hoveredCat, setHoveredCat] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { totalItems } = useCart();
    
    const [categories, setCategories] = useState([]);
    const activeCategoryParam = searchParams.get("category");
    const activeCategory = categories.find((c) => c.catTitle === activeCategoryParam);

    const linkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive ? "text-amber" : "text-ink/70 hover:text-ink"
        }`;

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    };

    // const toggleMobileCat = (name) => {
    //     setOpenMobileCat((prev) => (prev === name ? null : name));
    // };

    // const handleSubClick = (sub) => {
    //     const next = new URLSearchParams(searchParams);
    //     if (activeSubParam === sub) {
    //         next.delete("sub");
    //     } else {
    //         next.set("sub", sub);
    //     }
    //     setSearchParams(next);
    // };

    const [userInfo, setUserInfo] = useState({});
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userinfo'))
        setUserInfo(data)
    
        async function fetchCategory() {
            const cate = await axios.get('https://eco-backend-w57i.onrender.com/get-category');
            setCategories(cate.data.category)
            // console.log('category: ', cate.data.category);
            
        }
        fetchCategory()
        console.log(data, 'check data...');
        
    },[]);

    return (
        <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-ink/10 shadow-sm">
            {/* Top utility bar */}
            <div className="hidden sm:block bg-ink text-paper/70 text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <span className="flex items-center gap-1.5">
                            <Truck size={12} className="text-amber shrink-0" />
                            Free shipping on orders over ৳2000
                        </span>
                        <a href="mailto:support@ecobazaar.com" className="hidden lg:flex items-center gap-1.5 hover:text-amber transition-colors">
                            <Mail size={12} className="text-amber shrink-0" />
                            support@ecobazaar.com
                        </a>
                        <a href="tel:+8801816677503" className="hidden lg:flex items-center gap-1.5 hover:text-amber transition-colors">
                            <Phone size={12} className="text-amber shrink-0" />
                            +880 18166 77503
                        </a>
                    </div>
                    <div className="flex gap-5">
                        <Link to="/my-orders" className="hover:text-amber transition-colors">Track Order</Link>
                        <Link to="/resend-verification" className="hover:text-amber transition-colors"> Email Verify</Link>
                        <Link to="/customer-service" className="hover:text-amber transition-colors">Help</Link>
                    </div>
                </div>
            </div>

            {/* Main navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4 sm:gap-8 h-16">
                    {/* Brand */}
                    <Link to="/" className="font-display text-2xl font-semibold text-ink tracking-tight shrink-0">
                        {/* Eco<span className="text-amber">Bazaar</span> */}
                        <img
                            src="/ecologo.png"
                            alt="ecoBazaar"
                            className="h-30 w-auto object-contain"
                            />
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
                    <div className="hidden md:flex items-center gap-1 ml-auto shrink-0">

                        {userInfo?.email ?
                        
                            <Link to="/profile"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors">
                            <div className="w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center">
                                <User size={15} />
                                </div>     
                                {userInfo?.name}

                            </Link>
                            :
                            <Link to="/login"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors">
                                <div className="w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center">
                                    <User size={15} />
                                </div>
                                Account

                            </Link>
                        }
                       
                        <Link
                            to="/cart"
                            className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors ml-1"
                        >
                            <div className="relative w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center">
                                <ShoppingCart size={15} />
                                <span className="absolute -top-1.5 -right-1.5 bg-amber text-ink text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            </div>
                            Cart
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button className="md:hidden ml-auto text-ink" onClick={() => setOpen(!open)} aria-label="Toggle menu">
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Category strip with mega-menu — desktop */}
            <nav className="hidden md:block border-t border-ink/10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center flex-wrap gap-x-6 gap-y-0 min-h-11">
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `text-sm font-medium py-2.5 border-b-2 transition-colors ${isActive ? "text-amber border-amber" : "text-ink/70 border-transparent hover:text-ink"
                                }`
                            }
                        >
                            All Products
                        </NavLink>
                         
                        {categories.map((cat) => {
                            const isActiveTab = activeCategoryParam === cat.catTitle;
                            return (
                                <div
                                    key={cat.catTitle}
                                    className="relative"
                                    onMouseEnter={() => setHoveredCat(cat.catTitle)}
                                    onMouseLeave={() => setHoveredCat(null)}
                                >
                                    <Link
                                        to={`/products?category=${encodeURIComponent(cat.catTitle)}`}
                                        className={`block text-sm py-2.5 whitespace-nowrap border-b-2 transition-colors ${isActiveTab || hoveredCat === cat.catTitle
                                                ? "text-amber border-amber font-medium"
                                                : "text-ink/70 border-transparent hover:text-ink"
                                            }`}
                                    >
                                        {cat.catTitle}
                                    </Link>

                                </div>
                            );
                        })}

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

                        
                            {categories.map((cat) => (
                                <Link
                                    key={cat._id}
                                    to={`/products?category=${encodeURIComponent(cat.catTitle)}`}
                                    onClick={() => setOpen(false)}
                                    className="block py-2.5 text-sm text-ink/70 border-b border-ink/5 hover:text-amber"
                                >
                                    {cat.catTitle}
                                </Link>
                            ))}


                        {/* Contact info — mobile */}
                        <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-ink/10">
                            <a href="mailto:support@ecobazaar.com" className="flex items-center gap-2 text-sm text-ink/60">
                                <Mail size={15} className="text-amber" /> support@ecobazaar.com
                            </a>
                            <a href="tel:+8801816677503" className="flex items-center gap-2 text-sm text-ink/60">
                                <Phone size={15} className="text-amber" /> +880 1816677503
                            </a>
                        </div>

                        <div className="flex items-center gap-4 pt-4 mt-2 border-t border-ink/10">
                            <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-1.5 text-sm text-ink/70">
                                <ShoppingCart size={18} /> Cart
                            </Link>
                            
                            {userInfo?.email ?
                        
                            <Link to="/profile"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors">
                            <div className="w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center">
                                <User size={15} />
                                </div>
                                
                                {userInfo?.name}

                            </Link>
                            :
                            <Link to="/login"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors">
                                <div className="w-7 h-7 rounded-full bg-ink/5 flex items-center justify-center">
                                    <User size={15} />
                                </div>
                                Account

                            </Link>
                        }
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};