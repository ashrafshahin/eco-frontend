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



// import { Link } from "react-router";
// import { ArrowRight } from "../common/Icons";

// export default function CategoryGrid({ categories, productCounts = {} }) {
//     return (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//             {categories.map((cat) => {
//                 const Icon = cat.icon;
//                 const count = productCounts[cat.name] ?? 0;
//                 return (
//                     <Link
//                         key={cat.name}
//                         to={`/products?category=${encodeURIComponent(cat.name)}`}
//                         className="group bg-white rounded-xl border border-ink/10 p-5 hover:border-amber hover:shadow-md transition-all duration-200"
//                     >
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center group-hover:bg-amber transition-colors">
//                                 <Icon size={22} className="text-amber group-hover:text-ink transition-colors" />
//                             </div>
//                             <span className="text-xs font-medium text-slate/50">{count} items</span>
//                         </div>

//                         <h3 className="text-sm font-semibold text-ink group-hover:text-amber transition-colors mb-2">
//                             {cat.name}
//                         </h3>

//                         <div className="flex flex-wrap gap-1.5">
//                             {cat.subcategories.slice(0, 3).map((sub) => (
//                                 <span key={sub} className="text-[11px] text-slate/60 bg-ink/[0.03] px-2 py-0.5 rounded-full">
//                                     {sub}
//                                 </span>
//                             ))}
//                             {cat.subcategories.length > 2 && (
//                                 <span className="text-[11px] text-amber font-medium flex items-center gap-0.5">
//                                     +{cat.subcategories.length - 2} <ArrowRight size={9} />
//                                 </span>
//                             )}
//                         </div>
//                     </Link>
//                 );
//             })}
//         </div>
//     );
// };