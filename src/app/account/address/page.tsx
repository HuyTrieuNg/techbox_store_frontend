"use client";

import { useState } from "react";
import SidebarAccount from "@/components/SidebarAccount";
import { Dialog } from "@headlessui/react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import Link from "next/link";

interface Address {
  name: string;
  phone: string;
  city: string;
  district: string;
  ward: string;
  detail: string;
  type: string;
}

export default function AddressPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Form data
  const [form, setForm] = useState<Address>({
    name: "",
    phone: "",
    city: "",
    district: "",
    ward: "",
    detail: "",
    type: "Nhà riêng",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddresses([...addresses, form]);
    setForm({
      name: "",
      phone: "",
      city: "",
      district: "",
      ward: "",
      detail: "",
      type: "Nhà riêng",
    });
    setIsOpen(false);
  };

  return (
    <>
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
        <main className="col-span-3 border border-gray-300 rounded-xl p-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Sổ địa chỉ</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#E61E4D] text-white px-5 py-2 rounded-md hover:bg-[#c71a44] transition cursor-pointer"
            >
              + Thêm địa chỉ mới
            </button>
          </div>

          {/* Danh sách địa chỉ */}
          <div className="space-y-4">
            {addresses.length === 0 ? (
              <p className="text-gray-500">Chưa có địa chỉ nào.</p>
            ) : (
              addresses.map((addr, i) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-lg p-4 flex justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-800">Họ và tên: {addr.name}</p>
                    <p className="text-gray-600 text-sm">Số điện thoại: {addr.phone}</p>
                    <p className="text-gray-600 text-sm">
                      Địa chỉ: {addr.detail}, {addr.ward}, {addr.district}, {addr.city}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Loại: {addr.type}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal */}
          {/* <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
              <Dialog.Title className="text-lg font-bold mb-4 text-gray-800">
                ĐỊA CHỈ MỚI
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="font-medium text-gray-700 text-sm">
                    Thông tin khách hàng
                  </label>
                <div className="space-y-2">
                  
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nhập Họ Tên"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Nhập Số điện thoại"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <label className="font-medium text-gray-700 text-sm">
                    Địa chỉ
                  </label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option>Chọn Tỉnh/Thành phố</option>
                    <option>Đà Nẵng</option>
                    <option>Hà Nội</option>
                    <option>TP. Hồ Chí Minh</option>
                  </select>
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option>Chọn Quận/Huyện</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={form.ward}
                    onChange={(e) => setForm({ ...form, ward: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option>Chọn Phường/Xã</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Số nhà, địa chỉ"
                    value={form.detail}
                    onChange={(e) => setForm({ ...form, detail: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <p className="font-medium text-gray-700 text-sm mb-2">
                    Loại địa chỉ
                  </p>
                  <div className="flex gap-3">
                    {["Văn phòng", "Nhà riêng"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, type })}
                        className={`px-4 py-2 rounded-md border ${
                          form.type === type
                            ? "border-[#E61E4D] text-[#E61E4D]"
                            : "border-gray-300 text-gray-600"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-[#E61E4D] text-white px-6 py-2 rounded-md hover:bg-[#c71a44]"
                  >
                    HOÀN THÀNH
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog> */}
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
                  Thêm địa chỉ mới
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Thông tin khách hàng */}
                  <div className="space-y-2">
                    <label className="font-medium text-gray-700 text-sm">Họ và tên</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nhập Họ Tên"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-medium text-gray-700 text-sm">Số điện thoại</label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Nhập Số điện thoại"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
                    />
                  </div>

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
                        value={form.detail}
                        onChange={(e) => setForm({ ...form, detail: e.target.value })}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E61E4D]"
                      />
                    </div>
                  </div>

                  {/* Loại địa chỉ */}
                  <div>
                    <p className="font-medium text-gray-700 text-sm mb-2">Loại địa chỉ</p>
                    <div className="flex gap-3">
                      {["Văn phòng", "Nhà riêng"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm({ ...form, type })}
                          className={`px-4 py-2 rounded-md border transition ${form.type === type
                            ? "border-[#E61E4D] text-[#E61E4D]"
                            : "border-gray-300 text-gray-600"
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
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
        </main>
      </div>
    </>
  );
}