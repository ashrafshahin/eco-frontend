import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight } from "../common/Icons";
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getMainImage(product) {
    return product.images?.find((img) => img.isMain)?.url || product.images?.[0]?.url;
}

function getDiscountPercent(product) {
    if (product.discountType === "percentage") {
        return product.discount || 0;
    }

    if (product.discountType === "flat" && product.price > 0) {
        return Math.round((product.discount / product.price) * 100);
    }

    return 0;
}
function getDiscountedPrice(product) {
    if (product.discountType === "percentage") {
        return product.price * (1 - (product.discount || 0) / 100);
    }

    if (product.discountType === "flat") {
        return Math.max(0, product.price - (product.discount || 0));
    }

    return product.price;
}


export default function HeroProductSlider({ products = [] }) {
    const [active, setActive] = useState(0);

    console.log("Products count:", products.length);
console.log("Active index:", active);
    useEffect(() => {
        if (products.length < 2) {
            setActive(0);
            return;
        }

        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % products.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [products.length]);

    if (!products.length) return null;
    const product = products[active];
    const image = getMainImage(product);
    const discount = getDiscountPercent(product);
    const discountedPrice = getDiscountedPrice(product);

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="absolute -inset-6 bg-amber/20 rounded-full blur-3xl" />

            <div className="relative bg-paper/5 border border-paper/10 rounded-2xl p-6 backdrop-blur-sm">
                <Link to={`/products/${product._id}`} className="block">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5">
                        <img
                            key={product._id}
                            src={`http://localhost:5000/${product.images[0].url}`}
                            // src={image?.startsWith("http") ?
                            //     image : `${API_URL}/${image?.replace(/^\/+/, "")}`}
                            alt={product.title}
                            className="w-full h-full object-cover animate-in fade-in duration-500"
                        />
                        {discount > 0 && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                -{discount}%
                            </span>
                        )}
                    </div>
                </Link>

                <div className="flex items-center justify-between mt-4 gap-3">
                    <div className="min-w-0">
                        <p className="text-paper text-sm font-semibold line-clamp-1">{product.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="font-display text-lg font-semibold text-amber">
                            
                                ৳{discountedPrice?.toLocaleString() ?? "0"}
                            </span>
                            {discount > 0 && (
                                <span className="text-xs text-paper/40 line-through">
                                   
                                    ৳{product.price?.toLocaleString() ?? "0"}
                                </span>
                            )}
                        </div>
                    </div>
                    <Link
                        to={`/products/${product._id}`}
                        className="shrink-0 w-10 h-10 rounded-full bg-amber text-ink flex items-center justify-center hover:bg-amber/90 transition-colors"
                        aria-label="View product"
                    >
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-5">
                    {products.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-amber" : "w-1.5 bg-paper/20 hover:bg-paper/40"
                                }`}
                            aria-label={`Show product ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};