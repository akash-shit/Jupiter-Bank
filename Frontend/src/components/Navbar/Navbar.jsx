import { FaBars, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth();

  const navigate = useNavigate();
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-5 shadow">

      <div className="flex items-center gap-4">

        <button
          className="text-2xl md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        <h1 className="text-2xl font-bold text-blue-600">
          Jupitar Bank
        </h1>

      </div>

      <button onClick={() => navigate("/profile")}
      className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-100">
        <FaUserCircle className="text-3xl text-gray-700" />
        <span className="font-medium">{user?.name}</span>
      </button>

    </header>
  );
}

export default Navbar;