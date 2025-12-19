import { useEffect, useState } from "react";

const initialState = {
  name: "",
  type: "",
  status: "",
  lastCleaned: "",
};

export default function EquipmentForm({ fetchEquipment, editingItem, setEditingItem }) {
  const [form, setForm] = useState(initialState);
useEffect(() => {
  if (!editingItem) return;

  setForm(prev =>
    prev.id === editingItem.id ? prev : editingItem
  );
}, [editingItem]);


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.name || !form.type || !form.status) {
      alert("All fields required");
      return;
    }

    const method = editingItem ? "PUT" : "POST";
    const url = editingItem
      ? `http://localhost:8000/api/equipment/${editingItem.id}`
      : "http://localhost:8000/api/equipment";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(initialState);
    setEditingItem(null);
    fetchEquipment();
  };

  return (
   
  <form
    onSubmit={handleSubmit}
    className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 mb-8"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input
        name="name"
        placeholder="Equipment Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Type</option>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>

      <input
        type="date"
        name="lastCleaned"
        value={form.lastCleaned}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="sm:col-span-2 bg-gray-600 text-white py-2 rounded-md
                   font-medium hover:bg-blue-700 transition"
      >
        {editingItem ? "Update Equipment" : "Add Equipment"}
      </button>
    </div>
  </form>
);

}
