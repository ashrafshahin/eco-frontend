import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, max = 99 }) {
    return (
        <div className="flex items-center border border-ink/15 rounded-lg w-fit">
            <button
                onClick={() => onChange(Math.max(1, value - 1))}
                className="w-9 h-9 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
            >
                <Minus size={14} />
            </button>
            <span className="w-10 text-center text-sm font-medium">{value}</span>
            <button
                onClick={() => onChange(Math.min(max, value + 1))}
                className="w-9 h-9 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
            >
                <Plus size={14} />
            </button>
        </div>
    );
};