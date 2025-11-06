/**
 * Staff Dashboard Page
 * 
 * Trang tổng quan cho nhân viên
 */
export default function StaffPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Nhân viên</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Pending Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Đơn hàng chờ xử lý</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Nhiệm vụ hôm nay</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">8</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Sản phẩm sắp hết</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">5</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Hoạt động gần đây</h2>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Đơn hàng #1234 đã được xử lý</span>
              <span className="text-gray-400 text-sm ml-auto">5 phút trước</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Cập nhật kho hàng sản phẩm iPhone 15</span>
              <span className="text-gray-400 text-sm ml-auto">15 phút trước</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Đơn hàng #1233 đang chờ xác nhận</span>
              <span className="text-gray-400 text-sm ml-auto">1 giờ trước</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
