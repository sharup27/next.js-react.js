"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MenuPage() {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get("hotel");
  const role = searchParams.get("role") === "admin" ? "admin" : "user";
  const router = useRouter();

  const initialMenus: Record<string, { name: string; price: number }[]> = {
    "1": [
      { name: "Dim Kichuri", price: 40 },
      { name: "Chicken Kichuri", price: 60 },
      { name: "Rice and Fish", price: 70 },
    ],
    "2": [
      { name: "Vegetable Kichuri", price: 35 },
      { name: "Beef Kichuri", price: 65 },
    ],
    "3": [
      { name: "Plain Kichuri", price: 30 },
      { name: "Egg Curry", price: 50 },
    ],
  };

  const [menus, setMenus] = useState<{ name: string; price: number }[]>([]);

  useEffect(() => {
    if (hotelId && initialMenus[hotelId]) setMenus(initialMenus[hotelId]);
  }, [hotelId]);

  const addMenu = () => {
    const name = prompt("Enter menu item name:");
    const priceStr = prompt("Enter price:");
    const price = priceStr ? parseInt(priceStr) : 0;
    if (!name || !price) return;
    setMenus([...menus, { name, price }]);
  };

  const editMenu = (index: number) => {
    const name = prompt("Enter new menu name:", menus[index].name);
    const priceStr = prompt("Enter new price:", menus[index].price.toString());
    const price = priceStr ? parseInt(priceStr) : menus[index].price;
    if (!name) return;
    const newMenus = [...menus];
    newMenus[index] = { name, price };
    setMenus(newMenus);
  };

  const deleteMenu = (index: number) => setMenus(menus.filter((_, i) => i !== index));

  return (
    <main className="min-h-screen bg-green-50 p-10 relative overflow-hidden">
      {/* Floating leaf/gas background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-400 opacity-20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-green-300 opacity-15 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-green-500 opacity-10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-10 w-64 h-64 bg-green-200 opacity-15 rounded-full blur-3xl animate-float-slower"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <button
          onClick={() => router.back()}
          className="mb-6 bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">🌿 Hotel Menu 🌿</h1>

        {role === "admin" && (
          <button
            onClick={addMenu}
            className="mb-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Add Menu Item
          </button>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {menus.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-green-200 shadow-lg p-5 hover:scale-105 transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  {index + 1}. {item.name}
                </h2>
                <p className="text-green-600 font-medium">{item.price} Tk</p>
              </div>

              {role === "admin" && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => editMenu(index)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMenu(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
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