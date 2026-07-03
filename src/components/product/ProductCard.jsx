import { Link } from "react-router";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
    const image = product.mainImage || product.images?.[0];
    const outOfStock = product.stock === 0;

    return (
        <div className="group relative bg-white rounded-xl border border-ink/10 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            <Link to={`/products/${product._id}`}>
                <div className="relative aspect-square overflow-hidden bg-ink/5">
                    <img
                        src={image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {outOfStock && (
                        <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
                            <span className="text-paper text-xs font-semibold uppercase tracking-wide px-3 py-1 bg-ink/80 rounded-full">
                                Out of Stock
                            </span>
                        </div>
                    )}
                    <button
                        onClick={(e) => e.preventDefault()}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center
              text-ink/60 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        aria-label="Add to wishlist"
                    >
                        <Heart size={15} />
                    </button>
                </div>
            </Link>

            <div className="p-4">
                <p className="text-xs text-amber font-medium uppercase tracking-wide">{product.category}</p>
                <Link to={`/products/${product._id}`}>
                    <h3 className="text-sm font-semibold text-ink mt-1 line-clamp-2 hover:text-amber transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between mt-3">
                    <span className="font-display text-lg font-semibold text-ink">৳{product.price.toLocaleString()}</span>
                    <button
                        disabled={outOfStock}
                        className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center
              hover:bg-amber hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={15} />
                    </button>
                </div>
            </div>
        </div>
    );
};