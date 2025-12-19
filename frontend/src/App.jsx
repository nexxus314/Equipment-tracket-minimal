import { useEffect, useState } from "react";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentTable from "./components/EquipmentTable";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Fetch equipment from backend
  const fetchEquipment = async () => {
    const res = await fetch("http://localhost:8000/api/equipment");
    const data = await res.json();
    setEquipment(data);
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  // Search + Filter + Sort 
  const processedEquipment = equipment
    .filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item =>
      filterType ? item.type === filterType : true
    )
    .filter(item =>
      filterStatus ? item.status === filterStatus : true
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "date") {
        return new Date(b.lastCleaned) - new Date(a.lastCleaned);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-6">Equipment Tracker</h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <input
            className="border rounded-lg px-3 py-2 w-48"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg px-3 py-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option>Machine</option>
            <option>Vessel</option>
            <option>Tank</option>
            <option>Mixer</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Under Maintenance</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">No Sorting</option>
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Last Cleaned</option>
          </select>

          <button
            className="border rounded-lg px-4 py-2 bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              setSearch("");
              setFilterType("");
              setFilterStatus("");
              setSortBy("");
            }}
          >
            Reset
          </button>
        </div>

        <EquipmentForm
          fetchEquipment={fetchEquipment}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />

        <EquipmentTable
          equipment={processedEquipment}
          fetchEquipment={fetchEquipment}
          setEditingItem={setEditingItem}
        />
      </div>
    </div>
  );
}

export default App;
