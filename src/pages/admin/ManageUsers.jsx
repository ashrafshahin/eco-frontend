import { useState, useMemo, useEffect } from "react";
import { Search } from "../../components/common/Icons";
import UserTable from "../../components/admin/UserTable";
import Modal from "../../components/common/Modal";
import { mockUser } from "../../utils/mockUsers";
import axios from "axios";

const roleFilters = ["all", "customer", "admin", "DeletedUsers"];

export default function ManageUsers() {
    // TODO: replace with data fetched from GET /getallusers
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const [activeTarget, setActiveTarget] = useState(null);
    const [activating, setActivating] = useState(false);

    // TODO: replace with data fetched from GET /getallusers
    useEffect(() => {
        async function getUsers() {
            const data = await axios.get(`http://localhost:5000/getallusers/`);
            console.log(data.data.users, 'get all users work checking...');
            setUsers(data.data.users);
        }
        getUsers();
    }, []);

    // upore state  niye delete korar por state update korte hobe, jate UI update hoye jai. delete korar por setUsers diye state update kora hocche, jate UI theke oita remove hoye jai. ...///

    const handleDelete = () => {
        setDeleting(true);
        // TODO: connect to DELETE /deleteuser/:id
        const data = axios.delete(`http://localhost:5000/deleteuser/${deleteTarget._id}`);
        console.log("Delete user:", data);
        setTimeout(() => {
         setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
         setDeleting(false);
         setDeleteTarget(null);
         }, 500);
    };

    const handleActive = async () => {
        setActivating(true);
        // TODO: connect to POST /update/:id
        const data = await axios.post(`http://localhost:5000/updateuser/${activeTarget._id}`,
            { isDelete: false });
        console.log("Activate user:", data);
        setTimeout(() => {
         setUsers((prev) => prev.filter((u) => u._id !== activeTarget._id));
         setActivating(false);
         setActiveTarget(null);
         }, 500);
    };


    const handleAllUsersButton = async () => {
        const data = await axios.get(`http://localhost:5000/getallusers/`);
            console.log(data.data.users, 'get all users work checking...');
            setUsers(data.data.users);
    };

    const handleActiveUsers = async () => {
        const data = await axios.get(`http://localhost:5000/allactiveusers/`);
            console.log(data.data.users, 'get all active users work checking...');
            setUsers(data.data.users);
    };

    const handleDeleteUsers = async () => {
        const data = await axios.get(`http://localhost:5000/alldeletedusers/`);
            console.log(data.data.users, 'get all deleted users work checking...');
            setUsers(data.data.users);
    };

    // const onActiveClick = async (id) => {
        
    //     await axios.post(`http://localhost:5000/updateuser/${id}`, { isDelete: false });
        
    //     const data = await axios.get(`http://localhost:5000/getallusers/`);
    //     console.log(data.data.users, 'Activate user work checking...');
    //     setUsers(data.data.users);
    // };

    return (
        <div>
            <div className="mb-6">
                <h1 className="font-display text-2xl font-semibold text-ink">Users</h1>
                <p className="text-sm text-slate mt-1">{users.length} registered users</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap mb-5">
                <div className="relative flex-1 max-w-sm">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate/50" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-ink/15 bg-white text-sm
              focus:outline-none focus:ring-4 focus:ring-amber/15 focus:border-amber transition-all"
                    />
                </div>

                <div className="flex gap-2">
                    
                    <button onClick={handleAllUsersButton} className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-colors `}>
                        All Users
                    </button>

                    <button onClick={handleActiveUsers} className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-colors `}>
                        Active Users
                    </button>

                    <button onClick={handleDeleteUsers} className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-colors `}>
                        Deleted Users
                    </button>
                
                </div>
            </div>

            <UserTable users={users} onDeleteClick={setDeleteTarget} onActiveClick={setActiveTarget} />

            <Modal
                open={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                title="Delete user?"
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
                    Are you sure you want to delete <strong className="text-ink">{deleteTarget?.name}</strong>? This can't be undone.
                </p>
            </Modal>

            <Modal
                open={!!activeTarget}
                onClose={() => setActiveTarget(null)}
                title="Activate user?"
                footer={
                    <>
                        <button
                            onClick={() => setActiveTarget(null)}
                            className="px-4 py-2 rounded-lg text-sm font-medium text-ink/70 hover:bg-ink/5 transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleActive}
                            disabled={activating}
                            className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-60"
                        >
                            {activating ? "Activating..." : "Activate"}
                        </button>
                    </>
                     }
                 >
                <p className="text-sm text-slate">
                    Are you sure you want to activate{" "}
                    <strong className="text-ink">
                        {activeTarget?.name}
                    </strong>
                    ?
                </p>
            </Modal>
        </div>
    );
};