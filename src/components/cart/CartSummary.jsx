import { Link } from "react-router";
import { ShieldCheck, Truck, Lock } from "../common/Icons";
import PromoCodeInput from "./PromoCodeInput";

export default function CartSummary({ subtotal, itemCount }) {
    const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 100;
    const total = subtotal + shipping;
    const amountToFreeShipping = 2000 - subtotal;

    return (
        <div className="bg-white rounded-xl border border-ink/10 sticky top-24 overflow-hidden">
            <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-ink mb-4">Order Summary</h3>

                {subtotal > 0 && subtotal < 2000 && (
                    <div className="mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-ink/70 mb-1.5">
                            <Truck size={13} className="text-amber" />
                            Add ৳{amountToFreeShipping.toLocaleString()} more for free shipping
                        </div>
                        <div className="h-1.5 rounded-full bg-ink/10 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-amber transition-all duration-500"
                                style={{ width: `${Math.min((subtotal / 2000) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <PromoCodeInput />
                </div>

                <div className="flex flex-col gap-2.5 text-sm pt-4 border-t border-ink/10">
                    <div className="flex justify-between text-slate">
                        <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
                        <span className="text-ink font-medium">৳{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate">
                        <span>Shipping</span>
                        <span className="text-ink font-medium">{shipping === 0 ? "Free" : `৳${shipping}`}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 mt-4 border-t border-ink/10">
                    <span className="text-sm font-semibold text-ink">Total</span>
                    <span className="font-display text-2xl font-semibold text-ink">৳{total.toLocaleString()}</span>
                </div>

                <Link
                    to="/checkout"
                    className={`flex items-center justify-center gap-2 text-center w-full py-3 rounded-lg border text-sm font-semibold mt-5 transition-all ${itemCount === 0
                            ? "bg-ink/5 border-ink/10 text-ink/30 pointer-events-none"
                            : "bg-amber border-amber text-ink hover:bg-transparent hover:text-ink"
                        }`}
                >
                    <Lock size={14} /> Proceed to Checkout
                </Link>
            </div>

            <div className="bg-ink/[0.03] px-5 py-3 flex items-center justify-center gap-1.5 text-xs text-slate">
                <ShieldCheck size={13} className="text-amber" />
                Secure checkout · SSL encrypted
            </div>
        </div>
    );
};