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
    <div style={{ padding: "20px" }}>
      <h2>Equipment Tracker</h2>

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
  );
}

export default App;
