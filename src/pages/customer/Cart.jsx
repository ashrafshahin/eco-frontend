import { Link } from "react-router";
import { ShoppingCart, ArrowRight } from "../../components/common/Icons";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import ProductCard from "../../components/product/ProductCard";
import { PageLoader } from "../../components/common/Loader";
import { mockProducts } from "../../utils/mockProducts";

export default function Cart() {
    const { items, subtotal, totalItems, loading } = useCart();

    if (loading) return <PageLoader />;

    const cartProductIds = items.map((i) => i.productId);
    const recommended = mockProducts
        .filter((p) => p.status === "active" && !cartProductIds.includes(p._id))
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 4);

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-ink/5 flex items-center justify-center mx-auto mb-5">
                        <ShoppingCart size={28} className="text-ink/30" />
                    </div>
                    <h1 className="font-display text-2xl font-semibold text-ink">Your cart is empty</h1>
                    <p className="text-slate text-sm mt-2">Looks like you haven't added anything yet.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-lg bg-ink text-paper text-sm font-semibold hover:bg-ink/90 transition-colors"
                    >
                        Start Shopping <ArrowRight size={15} />
                    </Link>
                </div>

                {recommended.length > 0 && (
                    <div className="mt-20">
                        <h2 className="font-display text-xl font-semibold text-ink text-center mb-6">You might like</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                            {recommended.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-baseline justify-between mb-6">
                <h1 className="font-display text-3xl font-semibold text-ink">Shopping Cart</h1>
                <span className="text-sm text-slate">{totalItems} {totalItems === 1 ? "item" : "items"}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-ink/10 divide-y divide-ink/5">
                    {items.map((item) => (
                        <CartItem key={item.productId} item={item} />
                    ))}
                </div>

                <div>
                    <CartSummary subtotal={subtotal} itemCount={totalItems} />
                </div>
            </div>

            {recommended.length > 0 && (
                <div className="mt-16 pt-10 border-t border-ink/10">
                    <h2 className="font-display text-xl font-semibold text-ink mb-6">You might also like</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                        {recommended.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};