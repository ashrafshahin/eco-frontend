import axios from "axios";
import { Minus, Plus, Loader2 } from "../common/Icons";
import { useState } from "react";

export default function QuantitySelector({productId, quantity, stock, onUpdated}) {

    const [proQuaMinus, setProQuaMinus] = useState([]);
    const [proQuaPlus, setProQuaPlus] = useState([]);

    const onDecrement = async (type) => {
        console.log("Quantity :", quantity);
        console.log("productId :", productId);
        
        let user = JSON.parse(localStorage.getItem('userinfo'));
        if (!user?.userId) return;
        
        const data = await axios.post(`http://localhost:5000/update-cart/${user.userId}/${productId}`, { type });

        // window reload deye cart update korchi... just one line delai hobe 
        // window.location.reload();

        // No Reload - onUpdated -  deye cart update korchi... follow codes
        await onUpdated?.();

        setProQuaMinus(data.data)
        console.log('onDecrement: ', data.data);
        
    };

    const onIncrement = async (type) => {
        console.log("Quantity :", quantity);
        console.log("productId :", productId);
        console.log( "stock:", stock);
        
        let user = JSON.parse(localStorage.getItem('userinfo'));
        if (!user?.userId) return;

        if (quantity >= stock) {
            alert(stock <= 0 ? "Out of Stock!" : `Only ${stock} items available...`);
            return;
        };
        
        const data = await axios.post(`http://localhost:5000/update-cart/${user.userId}/${productId}`, { type });

        // cart click korle window reload nibe...
        // window.location.reload();
        await onUpdated?.();

        setProQuaPlus(data.data)
        console.log('onIncrement: ', data.data);
        
    };

    return (
        <div className="flex items-center border border-ink/15 rounded-lg overflow-hidden bg-white">
            <button
                onClick={()=>onDecrement('minus')}
                // disabled={disabled || value <= min}
                className="w-8 h-8 flex items-center justify-center text-ink/60 border-r border-ink/15
          hover:bg-ink hover:text-paper transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink/60"
            >
                <Minus size={13} />
            </button>
            <span className="w-9 flex items-center justify-center text-sm font-semibold text-ink">
                {/* {disabled ? <Loader2 size={13} className="animate-spin text-ink/40" /> : value} */}
                {quantity}

            </span>
            <button
                onClick={()=>onIncrement('plus')}
            
                // disabled={disabled}
                className="w-8 h-8 flex items-center justify-center text-ink/60 border-l border-ink/15
          hover:bg-ink hover:text-paper transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink/60"
            >
                <Plus size={13} />
            </button>
        </div>
    );
};