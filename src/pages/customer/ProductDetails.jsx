import { useState } from "react";
import { useParams, Link } from "react-router";
import { Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import QuantitySelector from "../../components/cart/QuantitySelector";
import Button from "../../components/common/Button";
import { mockProducts } from "../../utils/mockProducts";
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const { addToCart } = useCart();

    // TODO: replace with data fetched from GET /get-single-product/:id
    const product = mockProducts.find((p) => p._id === id);

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <p className="text-slate">Product not found.</p>
                <Link to="/products" className="text-amber font-medium hover:underline mt-2 inline-block">
                    Back to products
                </Link>
            </div>
        );
    }

    const outOfStock = product.stock === 0;

    const handleAddToCart = () => {
        setAdding(true);
        addToCart(product, quantity);
        setTimeout(() => setAdding(false), 500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumb */}
            <div className="text-sm text-slate mb-6">
                <Link to="/" className="hover:text-ink">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/products" className="hover:text-ink">Products</Link>
                <span className="mx-2">/</span>
                <span className="text-ink">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <ProductImageGallery images={product.images} mainImage={product.mainImage} />

                <div>
                    <p className="text-xs text-amber font-medium uppercase tracking-wide">{product.category}</p>
                    <h1 className="font-display text-3xl font-semibold text-ink mt-2">{product.name}</h1>

                    <div className="flex items-center gap-3 mt-4">
                        <span className="font-display text-3xl font-semibold text-ink">৳{product.price.toLocaleString()}</span>
                        {outOfStock ? (
                            <span className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">Out of Stock</span>
                        ) : (
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                                {product.stock} in stock
                            </span>
                        )}
                    </div>

                    <p className="text-slate text-sm leading-relaxed mt-5">{product.description}</p>

                    {/* Buy box */}
                    <div className="mt-8 p-5 rounded-xl border border-ink/10 bg-white">
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-sm font-medium text-ink">Quantity</span>
                            <QuantitySelector value={quantity} onChange={setQuantity} max={product.stock} />
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="accent"
                                loading={adding}
                                disabled={outOfStock}
                                onClick={handleAddToCart}
                                className="flex-1 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart size={17} /> Add to Cart
                            </Button>
                            <button
                                className="w-11 h-11 shrink-0 rounded-lg border border-ink/15 flex items-center justify-center
                  text-ink/60 hover:text-red-500 hover:border-red-200 transition-colors"
                                aria-label="Add to wishlist"
                            >
                                <Heart size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Trust points */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                        {[
                            { icon: Truck, label: "Fast delivery" },
                            { icon: ShieldCheck, label: "Secure payment" },
                            { icon: RotateCcw, label: "7-day return" },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex flex-col items-center text-center gap-1.5 py-3 rounded-lg bg-ink/[0.03]">
                                <Icon size={18} className="text-amber" />
                                <span className="text-xs text-slate">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};