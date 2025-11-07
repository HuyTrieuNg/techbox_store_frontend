export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
          <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">5,678</p>
          <p className="text-green-600 text-sm mt-2">↑ 8% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
          <p className="text-3xl font-bold mt-2">$123,456</p>
          <p className="text-green-600 text-sm mt-2">↑ 15% from last month</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Products</h3>
          <p className="text-3xl font-bold mt-2">890</p>
          <p className="text-gray-600 text-sm mt-2">234 out of stock</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">New order #12345</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">User registered: john@example.com</p>
              <p className="text-sm text-gray-500">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">Product stock low: iPhone 15</p>
              <p className="text-sm text-gray-500">10 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
