import React, { useState } from "react";

export default function MealOrderApp() {
  const [dish, setDish] = useState("");
  const [currentDish, setCurrentDish] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [hostKey, setHostKey] = useState("");

  const handleSetDish = () => {
    if (dish.trim()) {
      setCurrentDish(dish);
      setOrders([]); // Reset orders for new day
      setDish("");
    }
  };

  const handleOrder = () => {
    if (name.trim() && quantity > 0) {
      setOrders([...orders, { name, quantity }]);
      setName("");
      setQuantity(1);
    }
  };

  const handleHostLogin = () => {
    if (hostKey === "geheim") {
      setIsHost(true);
      setHostKey("");
    } else {
      alert("Falsches Passwort");
    }
  };

  const total = orders.reduce((sum, o) => sum + o.quantity, 0);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6 font-sans">
      <h1 className="text-2xl font-bold">🍽️ Essensbestellung</h1>

      {/* Host Login */}
      {!isHost && (
        <div className="p-4 bg-yellow-100 rounded-xl shadow">
          <h2 className="font-semibold">Host-Zugang</h2>
          <input
            type="password"
            className="w-full mt-2 p-2 border rounded"
            placeholder="Passwort eingeben"
            value={hostKey}
            onChange={(e) => setHostKey(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={handleHostLogin}
          >
            Anmelden
          </button>
        </div>
      )}

      {/* Gericht einstellen */}
      {isHost && (
        <div className="p-4 bg-gray-100 rounded-xl shadow">
          <h2 className="font-semibold">Gericht des Tages festlegen</h2>
          <input
            type="text"
            className="w-full mt-2 p-2 border rounded"
            placeholder="z.B. Spaghetti Bolognese"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSetDish}
          >
            Gericht einstellen
          </button>
        </div>
      )}

      {/* Gericht anzeigen + Bestellen */}
      {currentDish && (
        <div className="p-4 bg-white border rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">Gericht des Tages: {currentDish}</h2>

          <div className="space-y-2">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Dein Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              min={1}
              className="w-full p-2 border rounded"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleOrder}
            >
              Bestellung abschicken
            </button>
          </div>

          {/* Bestellungen anzeigen */}
          <div className="pt-4">
            <h3 className="font-semibold">Bestellungen:</h3>
            <ul className="list-disc list-inside">
              {orders.map((order, index) => (
                <li key={index}>
                  {order.name} bestellt {order.quantity} Portion(en)
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Gesamt: {total} Portion(en)</p>
          </div>
        </div>
      )}
    </div>
  );
}
