import { useNavigate } from "react-router";
import ProductForm from "../../components/product/ProductForm";

export default function AddProduct() {
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-1">Add Product</h1>
            <p className="text-sm text-slate mb-6">Fill in the details to list a new product.</p>

            <div className="">
                <h2 className="text-green-800 font-extrabold ">Bulk Product Upload </h2>
                <input type="file" value="" className="mb-2 bg-gray-500 p-2 text-lg text-white hover:bg-gray-300 hover:text-black rounded-sm " />
            </div>
            <ProductForm submitLabel="Create Product" onSubmit={() => navigate("/admin/products")} />
        </div>
    );
};