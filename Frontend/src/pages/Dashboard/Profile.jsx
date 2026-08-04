import { FaUserCircle, FaEnvelope, FaIdBadge } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  console.log("USER:", user);
  return (
    <div>

      <div className="rounded-2xl bg-white p-6 shadow-lg">

        <div className="flex flex-col items-center">

          <FaUserCircle className="text-4xl text-blue-600" />

          <h1 className="text-2xl font-bold">
            {user?.name || "User"}
          </h1>

          {/* <p className="text-gray-500">
            Banking System User
          </p> */}

        </div>

        <div className="mt-3 grid gap-3">

          <div className="flex items-center gap-3 rounded-lg border p-2">

            <FaIdBadge className="text-xl text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">
                User ID
              </p>

              <p className="font-semibold">
                {user?._id}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3 rounded-lg border p-2">

            <FaUserCircle className="text-xl text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="font-semibold">
                {user?.name}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3 rounded-lg border p-2">

            <FaEnvelope className="text-xl text-blue-600" />

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-semibold">
                {user?.email}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;