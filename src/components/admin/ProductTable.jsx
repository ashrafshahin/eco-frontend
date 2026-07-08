import { Link } from "react-router";
import { Edit, Trash2 } from "../common/Icons";

export default function ProductTable({ products, onDeleteClick }) {
    if (products.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-ink/10">
                <p className="text-slate text-sm">No products found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-ink/10 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-ink/10 text-left text-xs text-slate uppercase tracking-wide">
                            <th className="px-5 py-3 font-medium">Product</th>
                            <th className="px-5 py-3 font-medium">Category</th>
                            <th className="px-5 py-3 font-medium">Price</th>
                            <th className="px-5 py-3 font-medium">Stock</th>
                            <th className="px-5 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="border-b border-ink/5 last:border-0 hover:bg-ink/[0.02]">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-ink/5 shrink-0">
                                            <img src={product.mainImage || product.images?.[0]} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-medium text-ink line-clamp-1">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3 text-slate">{product.category}</td>
                                <td className="px-5 py-3 text-ink font-medium">৳{product.price.toLocaleString()}</td>
                                <td className="px-5 py-3">
                                    {product.stock === 0 ? (
                                        <span className="text-xs font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-full">Out of stock</span>
                                    ) : (
                                        <span className="text-ink">{product.stock}</span>
                                    )}
                                </td>
                                <td className="px-5 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            to={`/admin/products/edit/${product._id}`}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/50 hover:bg-ink/5 hover:text-ink transition-colors"
                                        >
                                            <Edit size={15} />
                                        </Link>
                                        <button
                                            onClick={() => onDeleteClick(product)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-ink/50 hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};