import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "../../components/product/ProductGrid";
import Pagination from "../../components/common/Pagination";
import { mockProducts } from "../../utils/mockProducts";

const categories = ["Electronics", "Fashion", "Home & Living", "Books", "Beauty", "Sports"];
const PER_PAGE = 8;

export default function ProductListing() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const categoryParam = searchParams.get("category") || "";

    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // TODO: replace mockProducts with data fetched from GET /get-all-products
    const products = mockProducts;

    const filtered = useMemo(() => {
        let result = [...products];

        if (search) {
            result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (categoryParam) {
            result = result.filter((p) => p.category === categoryParam);
        }
        if (sort === "price-low") result.sort((a, b) => a.price - b.price);
        if (sort === "price-high") result.sort((a, b) => b.price - a.price);
        if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));

        return result;
    }, [products, search, categoryParam, sort]);

    useEffect(() => setPage(1), [search, categoryParam, sort]);

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const setCategory = (cat) => {
        const next = new URLSearchParams(searchParams);
        if (cat) next.set("category", cat);
        else next.delete("category");
        setSearchParams(next);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header */}
            <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
                <div>
                    <h1 className="font-display text-3xl font-semibold text-ink">
                        {categoryParam || (search ? `Results for "${search}"` : "All Products")}
                    </h1>
                    <p className="text-sm text-slate mt-1">{filtered.length} products found</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="lg:hidden flex items-center gap-1.5 text-sm font-medium border border-ink/15 rounded-lg px-3 py-2"
                    >
                        <SlidersHorizontal size={15} /> Filters
                    </button>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="text-sm border border-ink/15 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-amber/20"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A–Z</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar filters — desktop */}
                <aside className="hidden lg:block w-56 shrink-0">
                    <h3 className="text-sm font-semibold text-ink mb-3">Category</h3>
                    <div className="flex flex-col gap-1">
                        <button
                            onClick={() => setCategory("")}
                            className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${!categoryParam ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5"
                                }`}
                        >
                            All Categories
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${categoryParam === cat ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Grid */}
                <div className="flex-1">
                    <ProductGrid products={paginated} />
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </div>
            </div>

            {/* Mobile filters drawer */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileFiltersOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-72 bg-paper p-5 overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-semibold text-ink">Filters</h3>
                            <button onClick={() => setMobileFiltersOpen(false)}>
                                <X size={20} className="text-ink/60" />
                            </button>
                        </div>
                        <h4 className="text-sm font-semibold text-ink mb-3">Category</h4>
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => { setCategory(""); setMobileFiltersOpen(false); }}
                                className={`text-left text-sm px-3 py-2 rounded-lg ${!categoryParam ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5"}`}
                            >
                                All Categories
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setCategory(cat); setMobileFiltersOpen(false); }}
                                    className={`text-left text-sm px-3 py-2 rounded-lg ${categoryParam === cat ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};