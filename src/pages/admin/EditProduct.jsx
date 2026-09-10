import { useParams, useNavigate, Link } from "react-router";
import ProductForm from "../../components/product/ProductForm";
import { mockProducts } from "../../utils/mockProducts";
import { useEffect, useState } from "react";
import axios from "axios";


export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const data = await axios.put(`http://localhost:5000/update-product/${id}`);
            setProduct(data.data.product);
            console.log(data.data.product, "Edit product page data ase kina : ...");
            
        };
        fetchProduct();
    }, [id]);

    // TODO: replace with data fetched from GET /get-single-product/:id
    // const product = mockProducts.find((p) => p._id === id);

    if (!product) {
        return (
            <div className="text-center py-16">
                <p className="text-slate">Product not found.</p>
                <Link to="/admin/products" className="text-amber font-medium hover:underline mt-2 inline-block">
                    Back to products
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-1">Edit Product</h1>
            <p className="text-sm text-slate mb-6">Update details for "{product.name}".</p>

            <ProductForm
                initialData={product}
                submitLabel="Save Changes"
                onSubmit={() => navigate("/admin/products")}
            />
        </div>
    );
};