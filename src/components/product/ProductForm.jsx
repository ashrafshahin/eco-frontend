import { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import ImageUploader from "./ImageUploader";

const categories = ["Electronics", "Fashion", "Home & Living", "Books", "Beauty", "Sports"];

export default function ProductForm({ initialData, onSubmit, submitLabel = "Save Product" }) {
    const [form, setForm] = useState({
        name: initialData?.name || "",
        price: initialData?.price || "",
        stock: initialData?.stock || "",
        category: initialData?.category || categories[0],
        description: initialData?.description || "",
    });
    const [images, setImages] = useState(
        initialData?.images?.map((url) => ({ url })) || []
    );
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Product name is required";
        if (!form.price || Number(form.price) <= 0) errs.price = "Enter a valid price";
        if (form.stock === "" || Number(form.stock) < 0) errs.stock = "Enter a valid stock quantity";
        if (!form.description.trim()) errs.description = "Description is required";
        if (images.length === 0) errs.images = "At least one image is required";
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        setSaving(true);
        // TODO: build FormData and connect to POST /create-product or PUT /update-product/:id
        // const formData = new FormData();
        // formData.append("name", form.name); ... etc
        // images.forEach((img) => img.file && formData.append("images", img.file));
        console.log("Product submit:", { ...form, images, mainImageIndex });

        setTimeout(() => {
            setSaving(false);
            onSubmit?.();
        }, 800);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="bg-white rounded-xl border border-ink/10 p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-ink mb-5">Product Images</h2>
                <ImageUploader
                    images={images}
                    onChange={setImages}
                    mainImageIndex={mainImageIndex}
                    onSetMain={setMainImageIndex}
                />
                {errors.images && <p className="text-xs text-red-500 mt-2">{errors.images}</p>}
            </div>

            <div className="bg-white rounded-xl border border-ink/10 p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold text-ink mb-5">Basic Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <InputField label="Product name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="e.g. Wireless Headphones" />
                    </div>

                    <InputField label="Price (৳)" name="price" type="number" value={form.price} onChange={handleChange} error={errors.price} placeholder="0.00" />
                    <InputField label="Stock quantity" name="stock" type="number" value={form.stock} onChange={handleChange} error={errors.stock} placeholder="0" />

                    <div>
                        <label className="text-sm font-medium text-ink block mb-1.5">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full px-3.5 py-2.5 rounded-lg border border-ink/15 bg-white text-sm
                focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-sm font-medium text-ink block mb-1.5">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe the product..."
                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-white text-sm placeholder:text-slate/40 resize-none
              focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all
              ${errors.description ? "border-red-400" : "border-ink/15"}`}
                    />
                    {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                </div>
            </div>

            <div className="flex gap-3">
                <Button type="submit" loading={saving} className="w-auto px-6">
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
};