"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [role, setRole] = useState<"admin" | "user">("user");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if ((role === "admin" && password === "1234") || (role === "user" && password === "1234")) {
      router.push(`/branches?role=${role}`);
    } else {
      alert("Wrong password! Try 1234.");
    }
  };

  return (
    <main className="min-h-screen bg-green-50 relative overflow-hidden flex items-center justify-center p-10">
      {/* Floating leaf/gas background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-400 opacity-20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-300 opacity-15 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-green-500 opacity-10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-green-200 opacity-15 rounded-full blur-3xl animate-float-slower"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 text-center max-w-xl border border-green-200">
        <h1 className="text-5xl font-bold text-green-700 mb-4">🌿 Pusti Bondhu 🌿</h1>
        <p className="text-green-900 text-lg mb-6">Login to Hotel Management</p>

        <div className="mb-4">
          <label className="mr-2 font-semibold text-green-800">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "user")}
            className="px-3 py-2 rounded-lg border border-green-300"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg border border-green-300 w-full focus:outline-none"
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-green-600 hover:bg-green-700 transition duration-300 text-white px-6 py-3 rounded-full shadow-lg"
        >
          Login
        </button>
      </div>
    </main>
  );
}