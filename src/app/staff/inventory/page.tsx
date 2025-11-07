export default function StaffInventory() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex gap-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            + Add Stock
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Export Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Total Products</p>
          <p className="text-2xl font-bold mt-1">890</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">In Stock</p>
          <p className="text-2xl font-bold mt-1 text-green-600">656</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Low Stock</p>
          <p className="text-2xl font-bold mt-1 text-yellow-600">234</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Out of Stock</p>
          <p className="text-2xl font-bold mt-1 text-red-600">0</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Updated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { sku: 'SKU-001', name: 'iPhone 15 Pro Max', category: 'Smartphones', stock: 5, status: 'Low', updated: '2024-11-07' },
              { sku: 'SKU-002', name: 'Samsung Galaxy S24', category: 'Smartphones', stock: 8, status: 'Low', updated: '2024-11-07' },
              { sku: 'SKU-003', name: 'MacBook Air M3', category: 'Laptops', stock: 3, status: 'Critical', updated: '2024-11-06' },
              { sku: 'SKU-004', name: 'iPad Pro 12.9"', category: 'Tablets', stock: 45, status: 'Good', updated: '2024-11-06' },
              { sku: 'SKU-005', name: 'AirPods Pro 2', category: 'Accessories', stock: 120, status: 'Good', updated: '2024-11-05' },
            ].map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="font-bold">{item.stock}</span> units
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'Critical' ? 'bg-red-100 text-red-800' :
                    item.status === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.updated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Update</button>
                  <button className="text-green-600 hover:text-green-900">Restock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
