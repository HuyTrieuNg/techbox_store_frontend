"use client";

import { Bell, DollarSign, House, Info, Mail, Menu, Settings, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use, useEffect } from "react";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { 
//   FiHome, 
//   FiPackage, 
//   FiShoppingCart, 
//   FiUsers, 
//   FiBarChart2,
//   FiSettings,
//   FiGrid,
//   FiBox
// } from "react-icons/fi";

// /**
//  * Admin Sidebar - Navigation
//  * 
//  * Menu điều hướng cho admin panel
//  */
// export default function AdminSidebar() {
//   const pathname = usePathname();

//   const menuItems = [
//     { href: "/admin/dashboard", label: "Dashboard", icon: FiHome },
//     { href: "/admin/products", label: "Sản phẩm", icon: FiPackage },
//     { href: "/admin/users", label: "Người dùng", icon: FiUsers },
//     { href: "/admin/settings", label: "Cài đặt", icon: FiSettings },
//   ];

//   return (
//     <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white shadow-lg z-40">
//       {/* Logo */}
//       <div className="flex items-center justify-center h-16 border-b border-gray-800">
//         <h1 className="text-xl font-bold">Admin Panel</h1>
//       </div>

//       {/* Menu */}
//       <nav className="mt-6">
//         <ul className="space-y-1 px-3">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname === item.href;

//             return (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={`
//                     flex items-center gap-3 px-4 py-3 rounded-lg
//                     transition-colors duration-200
//                     ${isActive 
//                       ? 'bg-blue-600 text-white' 
//                       : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//                     }
//                   `}
//                 >
//                   <Icon className="w-5 h-5" />
//                   <span className="font-medium">{item.label}</span>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     </aside>
//   );
// }

const ICONS = {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,

}

const sidebarItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'House' },
  { name: 'Orders', href: '/admin/orders', icon: 'ShoppingCart' },
  { name: 'Products', href: '/admin/products', icon: 'ShoppingBag' },
  { name: 'Users', href: '/admin/users', icon: 'Users' },
  { name: 'Settings', href: '/admin/settings', icon: 'Settings' },
  // Thêm các item khác nếu cần
];

const AdminSidebar = () => {
  // const [sidebarItems, setSidebarItems] = React.useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const pathname = usePathname();

  // useEffect(() => {
  //   fetch('/api/admin/sidebar-items')
  //     .then((res) => res.json())
  //     .then((data) => setSidebarItems(data.sidebarItems))
  //     .catch(error => console.error('Error fetching sidebar items:', error));
  // }, []);

  return (

    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 text-white ${isSidebarOpen ? 'w-64' : 'w-20'
        }`}
    >
      <div className="h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer">
          <Menu size={24} />
        </button>
        <nav className="mt-8 flex-grow">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon as keyof typeof ICONS];

            if (!IconComponent) return null;

            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${pathname === item.href ? 'bg-[#2f2f2f]' : ''
                  }`}>
                  {/* <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-colors mb-2 ${
                  pathname === item.href ? 'bg-[#2f2f2f]' : ''}`}> */}
                  <IconComponent size={20} style={{ minWidth: "20px" }} />
                  {/* <span className="ml-4 whitespace-nowrap">{item.name}</span> */}

                  {isSidebarOpen && <span className="ml-4 whitespace-nowrap">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
export default AdminSidebar;
