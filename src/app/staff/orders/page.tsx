export default function StaffOrders() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <div className="flex gap-3">
          <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <input 
            type="text" 
            placeholder="Search order..." 
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { id: '#12345', customer: 'John Doe', products: 3, total: 1299.99, status: 'Pending', date: '2024-11-07' },
              { id: '#12346', customer: 'Jane Smith', products: 1, total: 899.99, status: 'Processing', date: '2024-11-07' },
              { id: '#12347', customer: 'Bob Wilson', products: 2, total: 1599.99, status: 'Shipped', date: '2024-11-06' },
              { id: '#12348', customer: 'Alice Brown', products: 5, total: 2499.99, status: 'Delivered', date: '2024-11-06' },
              { id: '#12349', customer: 'Charlie Davis', products: 1, total: 599.99, status: 'Cancelled', date: '2024-11-05' },
            ].map((order, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.products} items</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                  <button className="text-green-600 hover:text-green-900">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
