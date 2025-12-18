export default function EquipmentTable({ equipment, fetchEquipment, setEditingItem }) {
  const handleDelete = async id => {
    await fetch(`http://localhost:8000/api/equipment/${id}`, {
      method: "DELETE",
    });
    fetchEquipment();
  };

 return (
  <div className="overflow-x-auto border border-gray-200 rounded-lg">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left font-medium">Name</th>
          <th className="p-3 text-left font-medium">Type</th>
          <th className="p-3 text-left font-medium">Status</th>
          <th className="p-3 text-left font-medium">Last Cleaned</th>
          <th className="p-3 text-left font-medium">Actions</th>
        </tr>
      </thead>

      <tbody>
        {equipment.map(item => (
          <tr
            key={item.id}
            className="border-t hover:bg-gray-50 transition"
          >
            <td className="p-3 whitespace-nowrap">{item.name}</td>

            <td className="p-3">{item.type}</td>

            <td className="p-3">
              <span
                className={`font-medium ${
                  item.status === "Active"
                    ? "text-green-600"
                    : item.status === "Inactive"
                    ? "text-gray-500"
                    : "text-yellow-600"
                }`}
              >
                {item.status}
              </span>
            </td>

            <td className="p-3 whitespace-nowrap">
              {item.lastCleaned || "-"}
            </td>

            <td className="p-3 whitespace-nowrap space-x-3">
              <button
                onClick={() => setEditingItem(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}
