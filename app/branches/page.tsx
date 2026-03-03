"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Branches() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "admin" ? "admin" : "user";
  const router = useRouter();

  const [hotels, setHotels] = useState([
    { id: 1, name: "Pusti Bondhu Branch 1" },
    { id: 2, name: "Pusti Bondhu Branch 2" },
    { id: 3, name: "Pusti Bondhu Branch 3" },
  ]);
  const [newHotelName, setNewHotelName] = useState("");

  const addHotel = () => {
    if (!newHotelName.trim()) return;
    const newId = hotels.length + 1;
    setHotels([...hotels, { id: newId, name: newHotelName }]);
    setNewHotelName("");
  };
  const deleteHotel = (id: number) => setHotels(hotels.filter((h) => h.id !== id));
  const editHotel = (id: number) => {
    const newName = prompt("Enter new hotel name:");
    if (!newName) return;
    setHotels(hotels.map((h) => (h.id === id ? { ...h, name: newName } : h)));
  };

  return (
    <main className="min-h-screen bg-green-50 p-10 relative overflow-hidden">
      {/* Floating leaf/gas background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-400 opacity-20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-300 opacity-15 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-green-500 opacity-10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-green-200 opacity-15 rounded-full blur-3xl animate-float-slower"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">🌿 Pusti Bondhu 🌿</h1>

        <button
          onClick={() => router.push("/")}
          className="mb-6 bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
        >
          ← Back
        </button>

        {/* Admin add hotel */}
        {role === "admin" && (
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              placeholder="New hotel name"
              value={newHotelName}
              onChange={(e) => setNewHotelName(e.target.value)}
              className="px-4 py-2 rounded-lg border border-green-300 mr-2"
            />
            <button
              onClick={addHotel}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add Hotel
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {hotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl border border-green-200 shadow-lg p-6 hover:scale-105 transition transform flex flex-col justify-between"
            >
              <div
                onClick={() => role === "user" && router.push(`/menu?hotel=${hotel.id}`)}
                className="cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  {index + 1} No Hotel
                </h2>
                <p className="text-green-600">{hotel.name}</p>
              </div>

              {role === "admin" && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => editHotel(hotel.id)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHotel(hotel.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => router.push(`/menu?hotel=${hotel.id}&role=admin`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Menu
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}