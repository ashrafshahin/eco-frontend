import { Link } from "react-router";
import {
    Package, Users, ShoppingBag, TrendingUp, ArrowRight, Clock, Star,
} from "../../components/common/Icons";
import { mockProducts } from "../../utils/mockProducts";
import { mockUser } from "../../utils/mockUsers";
import { mockOrders } from "../../utils/mockOrders";
import OrderStatusBadge from "../../components/common/OrderStatusBadge";
import { useEffect, useState } from "react";
import axios from "axios";

function getMainImage(product) {
    return product.images?.find((img) => img.isMain)?.url || product.images?.[0]?.url;
}

export default function Dashboard() {
    const revenue = mockOrders
        .filter((o) => o.status !== "cancelled")
        .reduce((sum, o) => sum + o.total, 0);

    const lowStock = mockProducts.filter((p) => p.stock > 0 && p.stock <= 10);
    const outOfStock = mockProducts.filter((p) => p.stock === 0);
    const recentOrders = [...mockOrders].reverse().slice(0, 5);
    const topRated = [...mockProducts].sort((a, b) => b.averageRating - a.averageRating).slice(0, 4);

    const [users, setUsers] = useState([]);
    useEffect(() => {
            async function getUsers() {
                const data = await axios.get(`http://localhost:5000/getallusers/`);
                console.log(data.data.users, 'get all users work checking...');
                setUsers(data.data.users);
            }
            getUsers();
    }, []);
    
    const stats = [
        { label: "Revenue", value: `৳${revenue.toLocaleString()}`, icon: TrendingUp, tone: "amber" },
        { label: "Products", value: mockProducts.length, icon: Package, tone: "blue" },
        { label: "Users", value: users.length, icon: Users, tone: "green" },
        { label: "Orders", value: mockOrders.length, icon: ShoppingBag, tone: "purple" },
    ];
    

    const toneStyles = {
        amber: "bg-amber/10 text-amber",
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        purple: "bg-purple-50 text-purple-600",
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
                <p className="text-sm text-slate mt-1">Here's what's happening with your store today.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map(({ label, value, icon: Icon, tone }) => (
                    <div key={label} className="bg-white rounded-xl border border-ink/10 p-5">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${toneStyles[tone]}`}>
                            <Icon size={18} />
                        </div>
                        <p className="text-xs text-slate">{label}</p>
                        <p className="font-display text-2xl font-semibold text-ink mt-0.5">{value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-ink/10 p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display text-lg font-semibold text-ink">Recent Orders</h2>
                        <Link to="/admin/orders" className="flex items-center gap-1 text-xs font-semibold text-amber hover:underline">
                            View all <ArrowRight size={12} />
                        </Link>
                    </div>

                    <div className="flex flex-col divide-y divide-ink/5">
                        {recentOrders.map((order) => (
                            <div key={order._id} className="flex items-center justify-between py-3">
                                <div>
                                    <p className="text-sm font-medium text-ink">{order._id}</p>
                                    <p className="text-xs text-slate">{order.customer.name}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-ink">৳{order.total.toLocaleString()}</span>
                                    <OrderStatusBadge status={order.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inventory alerts */}
                <div className="bg-white rounded-xl border border-ink/10 p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock size={16} className="text-amber" />
                        <h2 className="font-display text-lg font-semibold text-ink">Inventory Alerts</h2>
                    </div>

                    {outOfStock.length === 0 && lowStock.length === 0 ? (
                        <p className="text-sm text-slate py-4 text-center">All products well stocked.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {outOfStock.map((p) => (
                                <Link key={p._id} to={`/admin/products/edit/${p._id}`} className="flex items-center gap-3 group">
                                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-ink/5 shrink-0">
                                        <img src={getMainImage(p)} alt={p.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-ink font-medium line-clamp-1 group-hover:text-amber transition-colors">{p.title}</p>
                                        <p className="text-xs text-red-500 font-medium">Out of stock</p>
                                    </div>
                                </Link>
                            ))}
                            {lowStock.map((p) => (
                                <Link key={p._id} to={`/admin/products/edit/${p._id}`} className="flex items-center gap-3 group">
                                    <div className="w-9 h-9 rounded-lg overflow-hidden bg-ink/5 shrink-0">
                                        <img src={getMainImage(p)} alt={p.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-ink font-medium line-clamp-1 group-hover:text-amber transition-colors">{p.title}</p>
                                        <p className="text-xs text-amber font-medium">Only {p.stock} left</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Top rated products */}
            <div className="bg-white rounded-xl border border-ink/10 p-5 mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-lg font-semibold text-ink">Top Rated Products</h2>
                    <Link to="/admin/products" className="flex items-center gap-1 text-xs font-semibold text-amber hover:underline">
                        Manage products <ArrowRight size={12} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {topRated.map((p) => (
                        <Link key={p._id} to={`/admin/products/edit/${p._id}`} className="group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-ink/5 mb-2">
                                <img src={getMainImage(p)} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <p className="text-sm font-medium text-ink line-clamp-1 group-hover:text-amber transition-colors">{p.title}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                                <Star size={11} className="text-amber" fill="currentColor" />
                                <span className="text-xs text-slate">{p.averageRating.toFixed(1)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};