import {
  FaHome,
  FaWallet,
  FaMoneyCheckAlt,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logoutUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleLogout() {
    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    }

    logout();
    toast.success("Logged out successfully");

    setSidebarOpen(false);
    navigate("/login");
  }

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Balance",
      path: "/accounts",
      icon: <FaWallet />,
    },
    {
      name: "Add Funds",
      path: "/add-funds",
      icon: <FaWallet />,
    },
    {
      name: "Transfer Money",
      path: "/transfer",
      icon: <FaMoneyCheckAlt />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <FaHistory />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:sticky
          top-16 left-0
          z-40
          h-[calc(100vh-64px)]
          w-56
          flex flex-col
          border-r
          bg-slate-900
          text-white
          transition-transform
          duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `mx-3 mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-800"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-700 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition hover:bg-red-600 hover:text-white"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;