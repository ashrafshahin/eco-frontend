import { Link } from "react-router";
import { ShoppingCart } from "../common/Icons";
import { useCart } from "../../context/CartContext";
import axios from "axios";

function getMainImage(product) {
    return product.images?.find((img) => img.isMain)?.url || product.images?.[0]?.url;
}

function getDiscountPercent(product) {
    return product.price > product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
}

export default function OfferProductCard({ product }) {
    const { addToCart, isPending } = useCart();
    const image = getMainImage(product);
    const outOfStock = product.stock === 0;
    const discount = getDiscountPercent(product);
    const pending = isPending(product._id);

    const handleCreateCart = async (id) => {
        console.log(product);
        let user = JSON.parse(localStorage.getItem('userinfo'));
        let cart = await axios.post(`http://localhost:5000/create-cart/${user.userId}`, { productId: product._id });
        console.log("view cart",cart);
        
    };

    return (
        <div className="group relative bg-white rounded-xl border border-ink/10 overflow-hidden hover:shadow-lg transition-all duration-200 shrink-0 w-44 sm:w-56">
            <Link to={`/products/${product._id}`}>
                <div className="relative aspect-square overflow-hidden bg-ink/5">
                    <img
                        src={`http://localhost:5000/${product.images[0].url}`}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {discount > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{discount}%
                        </span>
                    )}
                    {outOfStock && (
                        <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
                            <span className="text-paper text-xs font-semibold uppercase px-3 py-1 bg-ink/80 rounded-full">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-3.5">
                <Link to={`/products/${product._id}`}>
                    <h3 className="text-sm font-semibold text-ink line-clamp-2 hover:text-amber transition-colors min-h-10">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 mt-2">
                    <span className="font-display text-base font-semibold text-ink">
                       
                        ৳{product.price?.toLocaleString() ?? "0"}

                    </span>
                    {discount > 0 && (
                        <span className="text-xs text-slate/50 line-through">
                           
                            ৳{product.price?.toLocaleString() ?? "0"}
                        </span>
                    )}
                </div>

                <button
                    disabled={outOfStock || pending}
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     addToCart(product, 1);
                    // }}
                    onClick={()=>handleCreateCart(product._id)}
                    className="w-full mt-3 flex items-center justify-center gap-1.5 bg-ink text-paper text-xs font-semibold py-2 rounded-lg
            hover:bg-amber hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ShoppingCart size={13} />
                    <p className="border-teal-100 bg-amber-200 p-2 hover:bg-gray-400 rounded-xl">View Product</p>
                </button>
            </div>
        </div>
    );
};