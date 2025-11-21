export default function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex justify-center gap-2 mt-8">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded ${page === currentPage
            ? "bg-[#E61E4D] text-white"
            : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
}