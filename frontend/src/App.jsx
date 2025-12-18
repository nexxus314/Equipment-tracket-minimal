import { useEffect, useState } from "react";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentTable from "./components/EquipmentTable";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchEquipment = async () => {
    const res = await fetch("http://localhost:8000/api/equipment");
    const data = await res.json();
    setEquipment(data);
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
  <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-6">
    <h1 className="text-2xl font-semibold mb-6">
      Equipment Tracker
    </h1>

      <EquipmentForm
        fetchEquipment={fetchEquipment}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
      />

      <EquipmentTable
        equipment={equipment}
        fetchEquipment={fetchEquipment}
        setEditingItem={setEditingItem}
      />
    </div>
     </div>
  );
}

export default App;
