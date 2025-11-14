import React from "react";

interface ConfirmModalProps {
  showConfirmModal: boolean;
  confirmAction: {
    type: "delete" | "restore";
    userId: number;
    userName: string;
  } | null;
  handleConfirmAction: () => Promise<void>;
  handleCancelAction: () => void;
  loading: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  showConfirmModal,
  confirmAction,
  handleConfirmAction,
  handleCancelAction,
  loading,
}) => {
  if (!showConfirmModal || !confirmAction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {confirmAction.type === "delete" ? "Xác nhận xóa" : "Xác nhận khôi phục"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {confirmAction.type === "delete"
            ? `Bạn có chắc chắn muốn xóa người dùng "${confirmAction.userName}"?`
            : `Bạn có chắc chắn muốn khôi phục người dùng "${confirmAction.userName}"?`
          }
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleConfirmAction}
            disabled={loading}
            className={`flex-1 text-white px-4 py-2 rounded-lg disabled:opacity-50 ${
              confirmAction.type === "delete"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Đang xử lý..."
              : confirmAction.type === "delete"
                ? "Xóa"
                : "Khôi phục"
            }
          </button>
          <button
            onClick={handleCancelAction}
            disabled={loading}
            className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};