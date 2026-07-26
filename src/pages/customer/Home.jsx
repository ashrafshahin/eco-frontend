import { Link } from "react-router";
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, Star } from "../../components/common/Icons";
import ProductCard from "../../components/product/ProductCard";
import OfferSlider from "../../components/product/OfferSlider";
import HeroProductSlider from "../../components/product/HeroProductSlider";
import CategoryGrid from "../../components/product/CategoryGrid";
import { mockProducts } from "../../utils/mockProducts";
import { mockOffers } from "../../utils/mockOffers";
import { categories } from "../../utils/mockCategories";
import HeroSlider from "../../components/product/HeroSlider";

export default function Home() {
    // TODO: replace with data fetched from GET /get-all-products (filter status=active server-side once wired)
    const activeProducts = mockProducts.filter((p) => p.status === "active");
    const activeOffers = mockOffers.filter((p) => p.status === "active");

    const featured = [...activeProducts].sort((a, b) => b.averageRating - a.averageRating).slice(0, 4);
    const bestSellers = [...activeProducts].sort((a, b) => b.numReviews - a.numReviews).slice(0, 4);
    const newArrivals = [...activeProducts].reverse().slice(0, 4);

    // Build hero slides: a promo slide, top deal slides, and a new-arrival slide
    const heroSlides = [
        {
            type: "promo",
            tag: "New Season Arrivals — Live Now",
            title: <>Everything you need, <span className="text-amber">delivered</span> to your door.</>,
            subtitle: "Shop electronics, fashion, home essentials, and more — all in one place, with fast delivery across Bangladesh.",
            ctaLabel: "Shop Now",
            ctaLink: "/products",
            stats: [
                { value: "12K+", label: "Happy Customers" },
                { value: "500+", label: "Products" },
                { value: "4.8", label: "Average Rating" },
            ],
        },
        ...activeOffers.slice(0, 2).map((product) => ({
            type: "product",
            product,
            tag: "Today's Deal",
            title: product.title,
            subtitle: product.shortDescription || "Limited-time offer — while stock lasts.",
            ctaLabel: "Grab This Deal",
        })),
        ...(newArrivals[0]
            ? [{
                type: "product",
                product: newArrivals[0],
                tag: "Just Arrived",
                title: newArrivals[0].title,
                subtitle: newArrivals[0].shortDescription || "Fresh off the shelf — be the first to own it.",
                ctaLabel: "View Product",
            }]
            : []),
    ];

    return (
        <div>
            {/* Hero */}
            {/* <HeroSlider slides={heroSlides} /> */}
            <section className="bg-ink relative overflow-hidden">
                {/* Layered background accents */}
                <div className="absolute inset-0 opacity-[0.07] `bg-[radial-gradient(circle_at_1px_1px,_theme(colors.amber)_1px,_transparent_0)] bg-[length:28px_28px]`" />
                <div className="absolute top-0 right-0 w-125 h-125 bg-amber/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-100 h-100 bg-amber/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: text */}
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 bg-paper/10 border border-paper/15 rounded-full px-4 py-1.5 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                                <span className="text-xs font-medium text-paper/80">New Season Arrivals — Live Now</span>
                            </div>

                            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-paper leading-[1.1]">
                                Everything you need,{" "}
                                <span className="text-amber">delivered</span> to your door.
                            </h1>

                            <p className="text-paper/60 text-base sm:text-lg mt-5 max-w-md leading-relaxed">
                                Shop electronics, fashion, home essentials, and more — all in one place, with fast delivery across Bangladesh.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center justify-center gap-2 bg-amber text-ink font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-amber/90 hover:gap-3 transition-all duration-200"
                                >
                                    Shop Now <ArrowRight size={16} />
                                </Link>
                                <Link
                                    to="/products?category=Electronics"
                                    className="inline-flex items-center justify-center gap-2 bg-paper/5 text-paper border border-paper/15 font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-paper/10 transition-colors"
                                >
                                    Explore Deals
                                </Link>
                            </div>

                            {/* Inline stat row */}
                            <div className="flex items-center gap-6 sm:gap-8 mt-10 pt-8 border-t border-paper/10">
                                {[
                                    { value: "12K+", label: "Happy Customers" },
                                    { value: "500+", label: "Products" },
                                    { value: "4.8", label: "Average Rating" },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <p className="font-display text-2xl font-semibold text-paper">{stat.value}</p>
                                        <p className="text-xs text-paper/50 mt-0.5">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: rotating product showcase */}
                        <div className="hidden lg:block">
                            <HeroProductSlider products={activeOffers} />
                        </div>
                    </div>
                </div>
            </section> 

            {/* Stats strip */}
            <section className="border-b border-ink/10 bg-ink/[0.02]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[
                        { icon: Truck, value: "2-5 Days", label: "Nationwide Delivery" },
                        { icon: ShieldCheck, value: "100%", label: "Secure Checkout" },
                        { icon: RotateCcw, value: "7 Days", label: "Easy Returns" },
                        { icon: Headphones, value: "24/7", label: "Customer Support" },
                    ].map(({ icon: Icon, value, label }) => (
                        <div key={label} className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-white border border-ink/10 flex items-center justify-center shrink-0">
                                <Icon size={19} className="text-amber" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-ink">{value}</p>
                                <p className="text-xs text-slate">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Today's Deals slider */}
            {activeOffers.length > 0 && (
                <OfferSlider
                    products={activeOffers}
                    title="Today's Deals"
                    subtitle="Limited-time offers — grab them before they're gone"
                />
            )}

            {/* Shop by category */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Shop by Category</h2>
                        <p className="text-sm text-slate mt-1">Browse our full range of departments</p>
                    </div>
                    <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-amber hover:underline underline-offset-2">
                        All categories <ArrowRight size={14} />
                    </Link>
                </div>

                <CategoryGrid categories={categories} />
            </section>

            {/* Featured products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Featured Products</h2>
                        <p className="text-sm text-slate mt-1">Our highest-rated picks</p>
                    </div>
                    <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-amber hover:underline underline-offset-2">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {featured.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>

            {/* Best Sellers */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-end justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-amber/10 flex items-center justify-center shrink-0">
                            <Star size={18} className="text-amber" fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">Best Sellers</h2>
                            <p className="text-sm text-slate mt-0.5">Most loved by our customers</p>
                        </div>
                    </div>
                    <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-amber hover:underline underline-offset-2">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {bestSellers.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>

            {/* Promo banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="bg-amber/10 border border-amber/20 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                        <p className="text-amber text-sm font-semibold uppercase tracking-wide mb-2">Limited Time</p>
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink">
                            Free shipping on all orders over ৳2,000
                        </h3>
                        <p className="text-slate text-sm mt-2">No code needed — discount applied automatically at checkout.</p>
                    </div>
                    <Link
                        to="/products"
                        className="shrink-0 bg-ink text-paper font-semibold text-sm px-6 py-3 rounded-lg hover:bg-ink/90 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            </section>

            {/* New arrivals */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink">New Arrivals</h2>
                        <p className="text-sm text-slate mt-1">Just landed in our store</p>
                    </div>
                    <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-amber hover:underline underline-offset-2">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {newArrivals.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
};