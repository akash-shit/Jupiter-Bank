import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


function NotFound() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>

      <p className="mt-4 text-2xl font-semibold">
        Page Not Found
      </p>

      <p className="mt-2 text-gray-500">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to={user ? "/dashboard" : "/login"}
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        {user ? "Go to Dashboard" : "Go to Login"}
      </Link>
    </div>
  );
}

export default NotFound;