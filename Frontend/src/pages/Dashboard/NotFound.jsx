import { Link } from "react-router-dom";

function NotFound() {
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
        to="/dashboard"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Go Back
      </Link>
    </div>
  );
}

export default NotFound;