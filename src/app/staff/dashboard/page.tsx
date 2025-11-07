export default function StaffDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
          <p className="text-3xl font-bold mt-2">42</p>
          <p className="text-yellow-600 text-sm mt-2">⚠ Requires attention</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Processing Orders</h3>
          <p className="text-3xl font-bold mt-2">18</p>
          <p className="text-blue-600 text-sm mt-2">ℹ In progress</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Completed Today</h3>
          <p className="text-3xl font-bold mt-2">67</p>
          <p className="text-green-600 text-sm mt-2">✓ Great job!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Urgent Tasks</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Order #12345 - Payment failed</p>
                <p className="text-sm text-gray-500">Contact customer immediately</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Order #12346 - Address incomplete</p>
                <p className="text-sm text-gray-500">Waiting for customer response</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Order #12347 - Delayed shipment</p>
                <p className="text-sm text-gray-500">Update customer on status</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Low Stock Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">iPhone 15 Pro Max</p>
                <p className="text-sm text-gray-500">Only 5 units left</p>
              </div>
              <span className="text-red-600 font-bold">!</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Samsung Galaxy S24</p>
                <p className="text-sm text-gray-500">Only 8 units left</p>
              </div>
              <span className="text-orange-600 font-bold">!</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">MacBook Air M3</p>
                <p className="text-sm text-gray-500">Only 3 units left</p>
              </div>
              <span className="text-red-600 font-bold">!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
