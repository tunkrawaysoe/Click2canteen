import { getUser } from "@/lib/data/user/user";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser(true);

  if (user.role === "CUSTOMER") {
    redirect("/");
  }

  const managedEntity =
    user.role === "ADMIN" && user.restaurantName
      ? user.restaurantName
      : "Click2Canteen";

  return (
    <div
      className="flex items-center gap-8 p-6 max-w-3xl mx-auto mt-16"
      aria-label={`Welcome message for ${user?.name || "user"}`}
    >
      {user?.profileImage && (
        <img
          src={user.profileImage}
          alt={user.name || "Profile Image"}
          loading="lazy"
          className="w-44 h-44 object-cover rounded-full shadow-lg"
        />
      )}

      <div>
        <h2 className="text-4xl font-bold mb-3">
          Welcome Back, {user?.name || "User"}!
        </h2>

        <p className="mb-4 text-lg text-gray-700">
          You have full authorization to manage{" "}
          {user.role === "ADMIN" ? (
            <span className="font-bold text-blue-900">
              {user.restaurantName}
            </span>
          ) : (
            "Click2Canteen"
          )}
          .
        </p>

        <p className="text-lg text-gray-800 font-medium">
          <span className="font-semibold">Email:</span>{" "}
          {user?.email || "Not provided"}
        </p>

        <p className="mt-2 text-gray-600 text-lg">
          <span className="font-semibold">Role:</span> {user?.role || "Unknown"}
        </p>
      </div>
    </div>
  );
}
