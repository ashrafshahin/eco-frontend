import { Link } from "react-router";
import { ShoppingCart, ArrowRight } from "../../components/common/Icons";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import ProductCard from "../../components/product/ProductCard";
import { PageLoader } from "../../components/common/Loader";
import { mockProducts } from "../../utils/mockProducts";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Cart() {
    const { subtotal, totalItems, loading } = useCart();

    const [items, setitems] = useState([]);
    
    useEffect(() => {
        async function fetchCart() {
            let user = JSON.parse(localStorage.getItem('userinfo'));
            if (!user?.userId) return;
            const data = await axios.get(`http://localhost:5000/cart/${user.userId}`);
            setitems(data?.data)
            console.log("Fetch Cart: ", data.data);
            
        }
        fetchCart()
    }, []);

    if (loading) return <PageLoader />;

    // const cartProductIds = items.map((i) => i.productId);
    // const recommended = mockProducts
    //     .filter((p) => p.status === "active" && !cartProductIds.includes(p._id))
    //     .sort((a, b) => b.averageRating - a.averageRating)
    //     .slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-baseline justify-between mb-6">
                <h1 className="font-display text-3xl font-semibold text-ink">Shopping Cart</h1>
                <span className="text-sm text-slate">{totalItems} {totalItems === 1 ? "item.cart" : "items"}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-ink/10 divide-y divide-ink/5">
                   
                        <CartItem  items={items} />
                 
                </div>

                <div>
                    <CartSummary subtotal={subtotal} itemCount={totalItems} />
                </div>
            </div>

            {/* {recommended.length > 0 && (
                <div className="mt-16 pt-10 border-t border-ink/10">
                    <h2 className="font-display text-xl font-semibold text-ink mb-6">You might also like</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                        {recommended.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            )} */}
        </div>
    );
};