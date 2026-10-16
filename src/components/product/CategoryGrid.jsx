import { Link } from "react-router";

export default function CategoryGrid({ categories }) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                    <Link
                        key={cat.name}
                        to={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="group flex flex-col items-center text-center gap-3 bg-white rounded-xl border border-ink/10 p-5 hover:border-amber hover:shadow-md transition-all duration-200"
                    >
                        <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center group-hover:bg-amber transition-colors">
                            <Icon size={22} className="text-amber group-hover:text-ink transition-colors" />
                        </div>
                        <h3 className="text-sm font-semibold text-ink group-hover:text-amber transition-colors">
                            {cat.name}
                        </h3>
                    </Link>
                );
            })}
        </div>
    );
};

