// export default function AdminUsers() {
//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Users Management</h1>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//           + Add User
//         </button>
//       </div>
      
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {[
//               { name: 'John Doe', email: 'john@example.com', role: 'ADMIN', status: 'Active' },
//               { name: 'Jane Smith', email: 'jane@example.com', role: 'USER', status: 'Active' },
//               { name: 'Bob Wilson', email: 'bob@example.com', role: 'STAFF', status: 'Active' },
//               { name: 'Alice Brown', email: 'alice@example.com', role: 'USER', status: 'Inactive' },
//               { name: 'Charlie Davis', email: 'charlie@example.com', role: 'USER', status: 'Active' },
//             ].map((user, i) => (
//               <tr key={i} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#00{i + 1}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
//                       {user.name.charAt(0)}
//                     </div>
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
//                     user.role === 'STAFF' ? 'bg-blue-100 text-blue-800' :
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                   }`}>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-{10 + i}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
//                   <button className="text-red-600 hover:text-red-900">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import UsersTable from "@/components/admin/UsersTable";

const UsersPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl lg:px-2">
        <UsersTable />

      </main>
     
    </div>

  );
};
export default UsersPage;