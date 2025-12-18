export default function EquipmentTable({ equipment, fetchEquipment, setEditingItem }) {
  const handleDelete = async id => {
    await fetch(`http://localhost:8000/api/equipment/${id}`, {
      method: "DELETE",
    });
    fetchEquipment();
  };

  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Last Cleaned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {equipment.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.status}</td>
            <td>{item.lastCleaned}</td>
            <td>
              <button onClick={() => setEditingItem(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
