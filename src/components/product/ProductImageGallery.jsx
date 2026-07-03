import { useState } from "react";

export default function ProductImageGallery({ images = [], mainImage }) {
    const allImages = images.length ? images : [mainImage];
    const [active, setActive] = useState(mainImage || allImages[0]);

    return (
        <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3">
                {allImages.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(img)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${active === img ? "border-amber" : "border-transparent hover:border-ink/20"
                            }`}
                    >
                        <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* Main image */}
            <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-ink/5">
                <img src={active} alt="Product" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};