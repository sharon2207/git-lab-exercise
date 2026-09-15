import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");
    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="bg-slate-900 text-white shadow">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* LOGO */}
                <Link
                    to="/"
                    className="text-2xl font-bold hover:text-blue-400 transition"
                >
                    📚 BookStore
                </Link>

                {/* NAVIGATION */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className={`hover:text-blue-300 transition ${location.pathname === '/' ? 'text-blue-400 font-semibold' : ''}`}
                    >
                        Home
                    </Link>

                    {token ? (
                        <>
                            <Link
                                to="/books"
                                className={`hover:text-blue-300 transition ${location.pathname === '/books' ? 'text-blue-400 font-semibold' : ''}`}
                            >
                                Books
                            </Link>

                            <span className="text-gray-300 text-sm">
                                Hi, <strong className="text-white">{user?.name || "User"}</strong>
                            </span>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer text-sm font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className={`hover:text-blue-300 transition ${location.pathname === '/login' ? 'text-blue-400 font-semibold' : ''}`}
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;