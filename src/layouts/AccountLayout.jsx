import { Outlet, NavLink, useNavigate } from "react-router";
import { User, Package, LogOut } from "../components/common/Icons";

const links = [
    { to: "/profile", label: "Profile", icon: User },
    { to: "/my-orders", label: "My Orders", icon: Package },
];

export default function AccountLayout() {
    const navigate = useNavigate();

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5"
        }`;

    const handleLogout = () => {
        // TODO: once AuthContext exists, call logout() from there instead
        // (this should also clear any user info stored in context/state, not just the token)
        localStorage.removeItem("token"); // adjust key name to whatever you'll store the JWT under
        navigate("/login");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1">
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                        {links.map(({ to, label, icon: Icon }) => (
                            <NavLink key={to} to={to} className={linkClass}>
                                <Icon size={17} />
                                {label}
                            </NavLink>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <LogOut size={17} />
                            Logout
                        </button>
                    </nav>
                </aside>

                <div className="lg:col-span-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};