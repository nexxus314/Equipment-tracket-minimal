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
    if (editingItem) setForm(editingItem);
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
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />

      <select name="type" value={form.type} onChange={handleChange}>
        <option value="">Select Type</option>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="">Select Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>

      <input type="date" name="lastCleaned" value={form.lastCleaned} onChange={handleChange} />

      <button type="submit">
        {editingItem ? "Update" : "Add"}
      </button>
    </form>
  );
}
