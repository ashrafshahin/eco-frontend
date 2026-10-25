import { Link } from "react-router";
import { Trash2, Loader2 } from "../common/Icons";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../../context/CartContext";

export default function CartItem({ items, onUpdated }) {
    // const { incrementQuantity, decrementQuantity, removeFromCart, isPending } = useCart();
    // const pending = isPending(items.productId);
    // const atMaxStock = item.quantity >= item.stock;
    let user = JSON.parse(localStorage.getItem('userinfo'));

    console.log("fdsgsdg", items);
    
    return (
        
        <>
            <h1 className="m-4 p-2 text-xl animate-bounce text-center ">{user.name}'s <span className="text-red-600 font-bold"> FREE Delivery on Taka 2000+ Shopping... </span></h1>
            {items?.cart?.map(item => (
                <div className="flex gap-4 p-4 sm:p-5 group">
            <Link to={`/products/${item.product.productId}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-ink/5 shrink-0 border border-ink/5">
                <img
                    // src={item.image}
                    src={`http://localhost:5000/${item.product.images[0].url}`}
                    alt={item.title}
                    className="w-full h-full object-cover" 
                    />
            </Link>

            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between gap-3">
                        <Link to={`/products/${item.product.productId}`} className="text-sm font-semibold text-ink hover:text-amber transition-colors line-clamp-2">
                                    
                                    {item.product.title}
                                   
                                    <p> Quantity : <span className="text-green-700">{item.quantity}</span> </p>
                           
                        </Link>
                        <button
                            onClick={() => removeFromCart(item.product.productId)}
                            // disabled={pending}
                            className="text-slate/40 hover:text-red-500 transition-colors shrink-0 disabled:opacity-30 opacity-0 group-hover:opacity-100"
                            aria-label="Remove item"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <p className="text-sm text-slate mt-1">৳{item.product.price} each</p>
                </div>

                <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">

                     {/* IMPORTANT: product and user id aste hobe... */}
                                
                                <QuantitySelector
                                    productId={item.product._id}
                                    quantity={item.quantity}
                                    stock={item.product.stock}
                                    onUpdated={onUpdated}
                                />
                                
                    </div>
                    <span className="font-display text-base font-semibold text-ink">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                </div>

                {/* {atMaxStock && (
                    <p className="text-xs text-amber mt-1.5">Maximum available stock reached</p>
                )} */}
            </div>
            
        </div>
            ))}
         <div className="flex items-center justify-between mt-6 px-5 py-4 m-2 bg-white border border-ink/10 rounded-xl shadow-sm">
                <h2 className="text-sm sm:text-base font-semibold text-ink">
                    Total Cart Price
                </h2>
                <span className="text-xl sm:text-2xl font-bold text-amber">
                    ৳{items?.totalCartPrice?.toLocaleString("en-BD")}
                </span>
            </div>   
        </>
        
    );
};