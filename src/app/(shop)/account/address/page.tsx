// "use client";

// import { use, useState } from "react";
// import SidebarAccount from "@/components/SidebarAccount";
// import { Dialog } from "@headlessui/react";
// import { FaChevronRight, FaHome } from "react-icons/fa";
// import Link from "next/link";
// import { useUser } from "@/hooks/useUser";

// // interface Address {
// //   name: string;
// //   phone: string;
// //   city: string;
// //   district: string;
// //   ward: string;
// //   detail: string;
// //   type: string;
// // }

// export default function AddressPage() {
//   const { addresses, loading } = useUser();
//   if (loading) return <p>Đang tải...</p>;
//   // const [isOpen, setIsOpen] = useState(false);

//   // Form data
//   // const [form, setForm] = useState<Address>({
//   //   name: "",
//   //   phone: "",
//   //   city: "",
//   //   district: "",
//   //   ward: "",
//   //   detail: "",
//   //   type: "Nhà riêng",
//   // });

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setAddresses([...addresses, form]);
//   //   setForm({
//   //     name: "",
//   //     phone: "",
//   //     city: "",
//   //     district: "",
//   //     ward: "",
//   //     detail: "",
//   //     type: "Nhà riêng",
//   //   });
//   //   setIsOpen(false);
//   // };

//   return (
//     <>
//       <div className="flex items-center text-gray-600 text-base mb-6">
//         <FaHome className="mr-2 text-gray-500" />
//         <Link href="/" className="hover:text-[#E61E4D] transition">
//           Trang chủ
//         </Link>
//         <FaChevronRight className="mx-2 text-gray-400" />
//         <span className="font-medium text-gray-800">Sổ địa chỉ</span>
//       </div>
//       <div className="grid grid-cols-4 gap-6 mb-10">
//         {/* Sidebar */}
//         <SidebarAccount />

//         {/* Main content */}
//         <main className="col-span-3 border border-gray-300 rounded-xl p-8 relative">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Sổ địa chỉ</h2>
//             <button
//               // onClick={() => setIsOpen(true)}
//               className="bg-[#E61E4D] text-white px-5 py-2 rounded-md hover:bg-[#c71a44] transition cursor-pointer"
//             >
//               + Thêm địa chỉ mới
//             </button>
//           </div>

//           {/* Danh sách địa chỉ */}
//           <div className="space-y-4">
//             {addresses.length === 0 ? (
//               <p className="text-gray-500">Chưa có địa chỉ nào.</p>
//             ) : (
//               addresses.map((addr, i) => (
//                 <div
//                   key={i}
//                   className="border border-gray-300 rounded-lg p-4 flex justify-between"
//                 >
//                   <div>
//                     <p className="text-gray-600 text-sm">
//                       Địa chỉ: {addr.streetAddress}, {addr.ward}, {addr.district}, {addr.city}
//                     </p>
//                     <p className="text-gray-500 text-sm">
//                       Loại: {addr.addressType}
//                     </p>
//                     <p className="text-gray-500 text-sm">
//                       {addr.isDefault ? "Địa chỉ mặc định" : ""}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>


//         </main>
//       </div>
//     </>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import SidebarAccount from "@/components/SidebarAccount";
// import { FaChevronRight, FaHome, FaTrashAlt, FaEdit, FaBuilding } from "react-icons/fa";
// import Link from "next/link";
// import { useUser } from "@/hooks/useUser";
// import { Address } from "@/features/user";

// export default function AddressPage() {
//   const { user } = useUser();
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Giả lập fetch API địa chỉ
//     if (user?.addresses) {
//       setAddresses(user.addresses);
//       setLoading(false);
//     }
//   }, [user]);

//   const handleDelete = (id: number) => {
//     if (confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
//       setAddresses(addresses.filter((a) => a.id !== id));
//       // TODO: Gọi API DELETE /users/{id}/addresses/{addressId}
//     }
//   };

//   const handleEdit = (address: Address) => {
//     // TODO: Mở form Dialog sửa địa chỉ
//     console.log("Edit:", address);
//   };

//   if (loading) return <p>Đang tải...</p>;

//   return (
//     <>
//       {/* Breadcrumb */}
//       <div className="flex items-center text-gray-600 text-base mb-6">
//         <FaHome className="mr-2 text-gray-500" />
//         <Link href="/" className="hover:text-[#E61E4D] transition">
//           Trang chủ
//         </Link>
//         <FaChevronRight className="mx-2 text-gray-400" />
//         <span className="font-medium text-gray-800">Sổ địa chỉ</span>
//       </div>

//       <div className="grid grid-cols-4 gap-6 mb-10">
//         {/* Sidebar */}
//         <SidebarAccount />

//         {/* Main content */}
//         <main className="col-span-3 border border-gray-300 rounded-xl p-8 bg-white shadow-sm">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-bold text-gray-800">Sổ địa chỉ</h2>
//             <button
//               className="bg-[#E61E4D] text-white px-5 py-2 rounded-md hover:bg-[#c71a44] transition cursor-pointer"
//             >
//               + Thêm địa chỉ mới
//             </button>
//           </div>

//           {/* Danh sách địa chỉ */}
//           <div className="space-y-5">
//             {addresses.length === 0 ? (
//               <p className="text-gray-500 text-center py-8 border border-dashed rounded-lg">
//                 Chưa có địa chỉ nào. Hãy thêm mới nhé!
//               </p>
//             ) : (
//               addresses.map((addr) => (
//                 <div
//                   key={addr.id}
//                   className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition relative group"
//                 >
//                   <div className="flex justify-between items-start">
//                     {/* Bên trái: thông tin địa chỉ */}
//                     <div className="flex items-start gap-3">
//                       <div className="text-[#E61E4D] mt-1">
//                         {addr.addressType === "HOME" ? <FaHome /> : <FaBuilding />}
//                       </div>
//                       <div>
//                         <p className="text-gray-800 font-semibold text-lg">
//                           {addr.addressType === "HOME" ? "Nhà riêng" : "Cơ quan"}
//                           {addr.isDefault && (
//                             <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
//                               Mặc định
//                             </span>
//                           )}
//                         </p>
//                         <p className="text-gray-700 mt-1 leading-snug">
//                           Địa chỉ: {addr.streetAddress}, {addr.ward}, {addr.district}, {addr.city}
//                         </p>
//                         {addr.postalCode && (
//                           <p className="text-gray-500 text-sm mt-1">
//                             Mã bưu điện: {addr.postalCode}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Bên phải: nút thao tác */}
//                     <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
//                       <button
//                         onClick={() => handleEdit(addr)}
//                         className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 cursor-pointer"
//                       >
//                         <FaEdit /> Sửa
//                       </button>
//                       <button
//                         onClick={() => handleDelete(addr.id!)}
//                         className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1 cursor-pointer"
//                       >
//                         <FaTrashAlt /> Xóa
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import SidebarAccount from "@/components/SidebarAccount";
import { FaChevronRight, FaHome, FaTrashAlt, FaEdit, FaBuilding } from "react-icons/fa";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { Address } from "@/features/user";
import { Dialog } from "@headlessui/react";
import { toast } from "react-hot-toast";

export default function AddressPage() {
  const { addresses, addAddress, deleteAddress, updateAddress } = useUser();
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    streetAddress: "",
    ward: "a",
    district: "b",
    city: "c",
    postalCode: "",
    isDefault: false,
    addressType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAddress) {
        // đang sửa
        await updateAddress(editingAddress.id, form);
        toast.success("Cập nhật địa chỉ thành công!");
        setEditingAddress(null); // reset trạng thái edit
      } else {
        // đang thêm mới
        await addAddress(form);
        toast.success("Thêm địa chỉ thành công!");
      }
      // await addAddress(form);
      // toast.success("Thêm địa chỉ thành công!");
    } catch (error) {
      if (editingAddress) {
        toast.error("Cập nhật thất bại. Vui lòng thử lại.");
      } else {
        toast.error("Thêm địa chỉ thất bại. Mỗi người chỉ tối đa 3 địa chỉ");
      }
      // toast.error("Thêm địa chỉ thất bại. Mỗi người chỉ tối đa 3 địa chỉ");
    }
    // await addAddress(form);
    console.log("Sending address:", form);
    setIsOpen(false);
    setForm({
      streetAddress: "",
      ward: "",
      district: "",
      city: "",
      postalCode: "",
      isDefault: false,
      addressType: "",

    });
  };



  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
      try {
        await deleteAddress(id);
        toast.success("Xóa địa chỉ thành công!");
      } catch (err) {
        toast.error("Xóa địa chỉ thất bại!");
        console.error(err);
      }
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setForm({
      streetAddress: address.streetAddress,
      ward: address.ward,
      district: address.district,
      city: address.city,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
      addressType: address.addressType,
    });
    setIsOpen(true); // mở Dialog
  };

  // if (loading) return <p>Đang tải...</p>;

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">
          Trang chủ
        </Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800">Sổ địa chỉ</span>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">
        {/* Sidebar */}
        <SidebarAccount />

        {/* Main content */}
        <main className="col-span-3 border border-gray-300 rounded-xl p-8 bg-white shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Sổ địa chỉ</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#E61E4D] text-white px-5 py-2 rounded-md hover:bg-[#c71a44] transition cursor-pointer"
            >
              + Thêm địa chỉ mới
            </button>
          </div>

          {/* Danh sách địa chỉ */}
          <div className="space-y-5">
            {addresses.length === 0 ? (
              <p className="text-gray-500 text-center py-8 border border-dashed rounded-lg">
                Chưa có địa chỉ nào. Hãy thêm mới nhé!
              </p>
            ) : (
              addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition relative group"
                >
                  <div className="flex justify-between items-start">
                    {/* Bên trái: thông tin địa chỉ */}
                    <div className="flex items-start gap-3">
                      <div className="text-[#E61E4D] mt-1">
                        {addr.addressType === "HOME" ? <FaHome /> : <FaBuilding />}
                      </div>
                      <div>
                        <p className="text-gray-800 font-semibold text-lg">
                          {addr.addressType === "HOME" ? "Nhà riêng" : "Cơ quan"}
                          {addr.isDefault && (
                            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Mặc định
                            </span>
                          )}
                        </p>
                        <p className="text-gray-700 mt-1 leading-snug">
                          Địa chỉ: {addr.streetAddress}, {addr.ward}, {addr.district}, {addr.city}
                        </p>
                        {addr.postalCode && (
                          <p className="text-gray-500 text-sm mt-1">
                            Mã bưu điện: {addr.postalCode}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bên phải: nút thao tác */}
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleEdit(addr)}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 cursor-pointer"
                      >
                        <FaEdit /> Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(addr.id)}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1 cursor-pointer"
                      >
                        <FaTrashAlt /> Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl relative">
            {/* Nút Đóng góc trên */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-600 transition cursor-pointer"
            >
              ✕
            </button>

            <Dialog.Title className="text-xl font-bold mb-6 text-gray-800">
              {editingAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Địa chỉ */}
              <div className="space-y-2">
                <label className="font-medium text-gray-700 text-sm">Địa chỉ</label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
                  >
                    <option>Chọn Tỉnh/Thành phố</option>
                  </select>
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
                  >
                    <option>Chọn Quận/Huyện</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={form.ward}
                    onChange={(e) => setForm({ ...form, ward: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
                  >
                    <option>Chọn Phường/Xã</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Số nhà, địa chỉ"
                    value={form.streetAddress}
                    onChange={(e) => setForm({ ...form, streetAddress: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-medium text-gray-700 text-sm">Mã bưu điện</label>
                <input
                  type="text"
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  placeholder="Nhập mã bưu điện"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
                />
              </div>

              {/* Loại địa chỉ */}
              <div>
                <p className="font-medium text-gray-700 text-sm mb-2">Loại địa chỉ</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, addressType: "WORK" })}
                    className={`px-4 py-2 rounded-md border transition ${form.addressType === "WORK"
                      ? "border-[#E61E4D] text-[#E61E4D]"
                      : "border-gray-300 text-gray-600"
                      }`}
                  >
                    Cơ quan
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, addressType: "HOME" })}
                    className={`px-4 py-2 rounded-md border transition ${form.addressType === "HOME"
                      ? "border-[#E61E4D] text-[#E61E4D]"
                      : "border-gray-300 text-gray-600"
                      }`}
                  >
                    Nhà riêng
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  />
                  Đặt làm mặc định
                </label>
              </div>

              {/* Nút Hoàn thành + Đóng */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="submit"
                  className="bg-[#E61E4D] text-white px-6 py-2 rounded-md hover:bg-[#c71a44] transition"
                >
                  Hoàn thành
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}