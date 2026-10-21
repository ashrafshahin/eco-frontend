
import { useEffect, useState } from "react";
import axios from "axios";

// const API_URL = "http://localhost:5000";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [catTitle, setCatTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function fetchCategories() {
        try {
            const response = await axios.get(`http://localhost:5000/get-category`);
            setCategories(response.data.category ?? []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to load categories."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const title = catTitle.trim();

        if (!title) {
            setError("Please enter a category name.");
            return;
        }

        setSaving(true);
        setError("");
        setSuccess("");

        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        try {
            const response = await axios.post(
                `http://localhost:5000/create-category`,
                { catTitle: title, slug }
            );

            setSuccess(
                response.data.message || "Category created successfully."
            );
            setCatTitle("");

            await fetchCategories();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create category."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-2xl font-semibold text-ink">
                    Categories
                </h1>
                <p className="mt-1 text-sm text-slate">
                    Create and manage your product categories.
                </p>
            </div>

            <div className="rounded-xl border border-ink/10 bg-white p-5">
                <h2 className="mb-4 font-display text-lg font-semibold text-ink">
                    Create New Category
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                    <input
                        type="text"
                        value={catTitle}
                        onChange={(e) => setCatTitle(e.target.value)}
                        placeholder="Enter category name"
                        className="min-w-0 flex-1 rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-amber"
                        maxLength={100}
                        required
                    />

                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-amber px-5 py-3 text-sm font-semibold text-ink transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? "Creating..." : "Create Category"}
                    </button>
                </form>

                {error && (
                    <p role="alert" className="mt-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {success && (
                    <p role="status" className="mt-3 text-sm text-green-600">
                        {success}
                    </p>
                )}
            </div>

            <div className="overflow-hidden rounded-xl border border-ink/10 bg-white">
                <div className="border-b border-ink/10 p-5">
                    <h2 className="font-display text-lg font-semibold text-ink">
                        All Categories ({categories.length})
                    </h2>
                </div>

                {loading ? (
                    <p className="p-5 text-sm text-slate">
                        Loading categories...
                    </p>
                ) : categories.length === 0 ? (
                    <p className="p-5 text-sm text-slate">
                        No categories found. Create your first category above.
                    </p>
                ) : (
                    <div className="divide-y divide-ink/5">
                        {categories.map((category) => (
                            <div
                                key={category._id}
                                className="flex items-center justify-between gap-4 px-5 py-4"
                            >
                                <div>
                                    <p className="text-sm font-medium text-ink">
                                        {category.catTitle}
                                    </p>
                                    <p className="mt-1 text-xs text-slate">
                                        Slug: {category.slug || "—"}
                                    </p>
                                </div>

                                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                    Available
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
