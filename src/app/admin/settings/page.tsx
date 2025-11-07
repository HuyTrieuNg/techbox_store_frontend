export default function AdminSettings() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                defaultValue="TechBox Store"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
              <textarea 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                defaultValue="Best electronics store in town"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                defaultValue="support@techbox.com"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Payment Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Cash on Delivery</p>
                <p className="text-sm text-gray-500">Allow customers to pay on delivery</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Credit Card</p>
                <p className="text-sm text-gray-500">Accept credit card payments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable PayPal</p>
                <p className="text-sm text-gray-500">Accept PayPal payments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Shipping Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Standard Shipping Fee</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                defaultValue="5.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Express Shipping Fee</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                defaultValue="15.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Free Shipping Threshold</label>
              <input 
                type="number" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                defaultValue="100.00"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive email for new orders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive SMS for urgent updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}
