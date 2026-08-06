import { Link } from "react-router";
import { Trash2, Loader2 } from "../common/Icons";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
    const { incrementQuantity, decrementQuantity, removeFromCart, isPending } = useCart();
    const pending = isPending(item.productId);
    const atMaxStock = item.quantity >= item.stock;

    return (
        <div className="flex gap-4 p-4 sm:p-5 group">
            <Link to={`/products/${item.productId}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-ink/5 shrink-0 border border-ink/5">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </Link>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between gap-3">
                        <Link to={`/products/${item.productId}`} className="text-sm font-semibold text-ink hover:text-amber transition-colors line-clamp-2">
                            {item.title}
                        </Link>
                        <button
                            onClick={() => removeFromCart(item.productId)}
                            disabled={pending}
                            className="text-slate/40 hover:text-red-500 transition-colors shrink-0 disabled:opacity-30 opacity-0 group-hover:opacity-100"
                            aria-label="Remove item"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <p className="text-sm text-slate mt-1">৳{item.price.toLocaleString()} each</p>
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                        <QuantitySelector
                            value={item.quantity}
                            onIncrement={() => incrementQuantity(item.productId)}
                            onDecrement={() => decrementQuantity(item.productId)}
                            disabled={pending}
                        />
                        {pending && <Loader2 size={14} className="animate-spin text-slate/40" />}
                    </div>
                    <span className="font-display text-base font-semibold text-ink">
                        ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                </div>

                {atMaxStock && (
                    <p className="text-xs text-amber mt-1.5">Maximum available stock reached</p>
                )}
            </div>
        </div>
    );
};