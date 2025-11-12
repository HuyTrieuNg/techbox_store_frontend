// export default function AdminDashboard() {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
//           <p className="text-3xl font-bold mt-2">1,234</p>
//           <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
//           <p className="text-3xl font-bold mt-2">5,678</p>
//           <p className="text-green-600 text-sm mt-2">↑ 8% from last month</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-gray-500 text-sm font-medium">Revenue</h3>
//           <p className="text-3xl font-bold mt-2">$123,456</p>
//           <p className="text-green-600 text-sm mt-2">↑ 15% from last month</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-gray-500 text-sm font-medium">Products</h3>
//           <p className="text-3xl font-bold mt-2">890</p>
//           <p className="text-gray-600 text-sm mt-2">234 out of stock</p>
//         </div>
//       </div>
      
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
//         <div className="space-y-4">
//           <div className="flex items-center gap-4 pb-4 border-b">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <div className="flex-1">
//               <p className="font-medium">New order #12345</p>
//               <p className="text-sm text-gray-500">2 minutes ago</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4 pb-4 border-b">
//             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//             <div className="flex-1">
//               <p className="font-medium">User registered: john@example.com</p>
//               <p className="text-sm text-gray-500">5 minutes ago</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4 pb-4 border-b">
//             <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//             <div className="flex-1">
//               <p className="font-medium">Product stock low: iPhone 15</p>
//               <p className="text-sm text-gray-500">10 minutes ago</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import StatCard from "@/components/admin/StatCard";
import { DollarSign, ShoppingBag, SquareActivity, Users } from "lucide-react";
import React from "react";
import {motion} from "framer-motion";
import SalesChart from "@/components/admin/SalesChart";
import OrderDistributionChart from "@/components/admin/OrderDistributionChart";
const AdminDashboard = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >

        
        {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"> */}
          <StatCard name="Total Clients" icon={Users} value={1234}  />
          <StatCard name="Total Sales" icon={DollarSign} value={5678} />
          <StatCard name="Total Products" icon={ShoppingBag} value={123456} />
          <StatCard name="Stock" icon={SquareActivity} value={890} />

        {/* </div> */}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesChart />
          <OrderDistributionChart />
        </div>

      </main>
     
    </div>
  );
};
export default AdminDashboard;
