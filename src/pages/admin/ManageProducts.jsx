import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Search, Plus, ChevronDown } from "../../components/common/Icons";
import ProductTable from "../../components/admin/ProductTable";
import Modal from "../../components/common/Modal";
import { mockProducts } from "../../utils/mockProducts";
import axios from "axios";

const statusFilters = ["all", "active", "pending", "inactive", "deleted"];

export default function ManageProducts() {
    // TODO: replace with data fetched from GET /get-all-products
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [showImportExport, setShowImportExport] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importMessage, setImportMessage] = useState("");
    const [pendingAction, setPendingAction] = useState(null);
    const fileInputRef = useRef(null);
    

    const filtered = useMemo(() => {
    return products.filter((p) => {

        const title = String(p?.title ?? "");
        const sku = String(p?.sku ?? "");

        const matchesSearch =
            title.toLowerCase().includes(search.toLowerCase()) ||
            sku.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            statusFilter === "deleted" ||
            p?.status === statusFilter;

        return matchesSearch && matchesStatus;
    });
}, [products, search, statusFilter]);

    const handleDelete = async () => {
        setDeleting(true);
        // TODO: connect to DELETE /delete-product/:id
        const data = await axios.delete(`http://localhost:5000/delete-product/${deleteTarget._id}`);

        console.log("Delete product:", deleteTarget._id);
        setTimeout(() => {
            setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
            setDeleting(false);
            setDeleteTarget(null);
        }, 500);
    };

    // get all products here...
    useEffect(() => {
        async function fetchProducts() {

            if (statusFilter === "deleted") {
                const data = await axios.get("http://localhost:5000/get-deleted-products");
                setProducts(data.data.product);
                console.log(data.data.product, 'deleted e ki ase :...');
                

            } else {
                const data = await axios.get(`http://localhost:5000/get-all-products${statusFilter === "all" ?
                    "" : `?status=${statusFilter}`}`)
                
                setProducts(data.data.product);
                console.log(data.data.product, 'product get e ki ase ....'); 

            }
              
        };
        fetchProducts()
        
    }, [statusFilter]);

    const handleImportProducts = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExtensions = [".csv", ".xlsx"];
    const extension = file.name
        .slice(file.name.lastIndexOf("."))
        .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
        setImportMessage("Only CSV and XLSX files are supported.");
        e.target.value = "";
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        setImporting(true);
        setImportMessage("");

        const response = await axios.post(
            "http://localhost:5000/bulk/create-product",
            formData
        );

        setImportMessage(
            response.data?.message || "Products imported successfully."
        );

        const data = await axios.get("http://localhost:5000/get-all-products");
        setProducts(data.data.product);
        setStatusFilter("all");
    } catch (error) {
        setImportMessage(
            error.response?.data?.message || "Product import failed."
        );
    } finally {
        setImporting(false);
        e.target.value = "";
    }
};

const handleExport = async (format) => {
        try {
            const isExcel = format === "excel";
            const endpoint = isExcel
                ? "/export-products-excel"
                : "/export-products-csv";

            const response = await axios.get(
                `http://localhost:5000${endpoint}`,
                { responseType: "blob" }
            );

            const blob = new Blob([response.data], {
                type: isExcel
                    ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    : "text/csv;charset=utf-8;",
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = isExcel
                ? "ecobazaar-products.xlsx"
                : "ecobazaar-products.csv";

            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            setShowImportExport(false);
        } catch (error) {
            setImportMessage(`Product export failed: ${error.message}`);
        }
};
    
    // Confirm selected action
    const handleConfirmAction = () => {
    if (pendingAction?.type === "import") {
        fileInputRef.current?.click();
        setPendingAction(null);
        return;
    }

    if (pendingAction?.type === "export") {
        const format = pendingAction.format;
        setPendingAction(null);
        handleExport(format);
    }
};
    
    return (
        <div>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                    <h1 className="font-display text-2xl font-semibold text-ink">Products</h1>
                    <p className="text-sm text-slate mt-1">{products.length} total products</p>
                </div>

               <div className="flex items-center gap-3">
                    {/* Import / Export dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() =>
                                setShowImportExport((prev) => !prev)
                            }
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-ink/15 bg-white text-sm font-semibold hover:bg-ink/5 transition-colors"
                        >
                            Import / Export
                            <ChevronDown size={16} />
                        </button>

                        {showImportExport && (
                            <div className="absolute right-0 top-full mt-2 z-20 w-56 rounded-lg border border-ink/10 bg-white p-1 shadow-lg">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowImportExport(false);
                                        setImportMessage("");
                                        setPendingAction({ type: "import" });
                                    }}
                                    disabled={importing}
                                    className="w-full text-left px-3 py-2.5 text-sm hover:bg-ink/5 rounded-md disabled:opacity-50"
                                >
                                    Import Products (.csv, .xlsx)
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowImportExport(false);
                                        setImportMessage("");
                                        setPendingAction({
                                            type: "export",
                                            format: "csv",
                                        });
                                    }}
                                    className="w-full text-left px-3 py-2.5 text-sm hover:bg-ink/5 rounded-md"
                                >
                                    Export CSV
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowImportExport(false);
                                        setImportMessage("");
                                        setPendingAction({
                                            type: "export",
                                            format: "excel",
                                        });
                                    }}
                                    className="w-full text-left px-3 py-2.5 text-sm hover:bg-ink/5 rounded-md"
                                >
                                    Export Excel (.xlsx)
                                </button>
                            </div>
                        )}
                    </div>
                    </div>

                <Link
                    to="/admin/products/create"
                    className="flex items-center gap-2 bg-ink text-paper text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-ink/90 transition-colors"
                >
                    <Plus size={16} /> Add Product
                </Link>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                disabled={importing}
                onChange={handleImportProducts}
            />

             {importMessage && (
                <p className="mb-4 text-sm text-ink" role="status">
                    {importMessage}
                </p>
            )}

            <div className="flex items-center gap-3 flex-wrap mb-5">
                <div className="relative flex-1 max-w-sm">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/50" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title or SKU..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-ink/15 bg-white text-sm
              focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
                    />
                </div>
                
               
                <div className="flex gap-2">
                    {statusFilters.map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-colors ${statusFilter === s ? "bg-ink text-paper" : "bg-white border border-ink/15 text-ink/60 hover:bg-ink/5"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <ProductTable products={filtered} onDeleteClick={setDeleteTarget} />
            
            {/* delete product confirmation modal */}
            <Modal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                title="Delete product?"
                footer={
                    <>
                        <button
                            onClick={() => setDeleteTarget(null)}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-ink/70 hover:bg-ink/5 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-60"
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </>
                }
            >
                <p className="text-sm text-slate">
                    Are you sure you want to delete <strong className="text-ink">{deleteTarget?.title}</strong>? This can't be undone.
                </p>
            </Modal>

            {/* Import / export confirmation modal */}
            <Modal
                open={!!pendingAction}
                onClose={() => setPendingAction(null)}
                title={
                    pendingAction?.type === "import"
                        ? "Import products?"
                        : `Export products as ${
                              pendingAction?.format === "excel"
                                  ? "Excel"
                                  : "CSV"
                          }?`
                }
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => setPendingAction(null)}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-red-800 hover:bg-ink/5 transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleConfirmAction}
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-700 text-paper hover:bg-ink/90 transition-colors"
                        >
                            Confirm
                        </button>
                    </>
                }
            >
                <p className="text-sm text-slate">
                    {pendingAction?.type === "import"
                        ? "Continue to choose a CSV or XLSX file. Products will be uploaded after you select the file."
                        : `This will download the product data as a ${
                              pendingAction?.format === "excel"
                                  ? "formatted Excel (.xlsx)"
                                  : "CSV"
                          } file.`}
                </p>
            </Modal>
        </div>
    );
};

   