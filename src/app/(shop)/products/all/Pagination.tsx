export default function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  // Hàm tạo danh sách các trang cần hiển thị
  const getPageNumbers = () => {
    const delta = 2; // Số trang hiển thị mỗi bên trang hiện tại
    const pages: (number | string)[] = [];
    
    // Luôn hiển thị trang đầu
    pages.push(0);
    
    // Tính toán khoảng trang cần hiển thị
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages - 2, currentPage + delta);
    
    // Điều chỉnh nếu gần đầu hoặc cuối
    if (currentPage <= delta + 1) {
      end = Math.min(totalPages - 2, delta * 2 + 1);
    }
    if (currentPage >= totalPages - delta - 2) {
      start = Math.max(1, totalPages - delta * 2 - 2);
    }
    
    // Thêm dấu ... nếu cần (sau trang đầu)
    if (start > 1) {
      pages.push('...');
    }
    
    // Thêm các trang ở giữa
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Thêm dấu ... nếu cần (trước trang cuối)
    if (end < totalPages - 2) {
      pages.push('...');
    }
    
    // Luôn hiển thị trang cuối (nếu có hơn 1 trang)
    if (totalPages > 1) {
      pages.push(totalPages - 1);
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-1 mt-8 flex-wrap">
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-3 py-2 rounded text-sm ${
          currentPage === 0
            ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
        }`}
      >
        ‹ Trước
      </button>

      {/* Các số trang */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500 dark:text-gray-400">
              ...
            </span>
          );
        }
        
        const pageNum = page as number;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-3 py-2 rounded text-sm min-w-[40px] ${
              pageNum === currentPage
                ? "bg-[#E61E4D] text-white font-semibold"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
            }`}
          >
            {pageNum + 1}
          </button>
        );
      })}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`px-3 py-2 rounded text-sm ${
          currentPage === totalPages - 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
            : "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
        }`}
      >
        Sau ›
      </button>
    </div>
  );
}