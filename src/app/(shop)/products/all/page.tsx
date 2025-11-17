import { FaChevronRight, FaHome } from "react-icons/fa";

import Link from "next/link";
import ProductsClient from "./ProductClient";

const baseUrl = "http://localhost:8080/api";

export default async function AllProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v) query.append(k, Array.isArray(v) ? v[0] : v);
  });
  if (!query.has("page")) query.set("page", "0");
  if (!query.has("size")) query.set("size", "20");

  // Fetch song song: sản phẩm + brands + categories
  const [productsRes, brandsRes, categoriesRes] = await Promise.all([
    fetch(`${baseUrl}/products?${query.toString()}`, { next: { revalidate: 60 } }),
    fetch(`${baseUrl}/brands`, { next: { revalidate: 3600 } }),
    fetch(`${baseUrl}/categories`, { next: { revalidate: 3600 } }),
  ]);

  const initialData = productsRes.ok ? await productsRes.json() : { content: [], page: { totalElements: 0, totalPages: 1 } };
  const brands = brandsRes.ok ? await brandsRes.json() : [];
  const categoriesRaw = categoriesRes.ok ? await categoriesRes.json() : [];

  console.log(categoriesRaw);


  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-600 text-base mb-6">
        <FaHome className="mr-2 text-gray-500" />
        <Link href="/" className="hover:text-[#E61E4D] transition">Trang chủ</Link>
        <FaChevronRight className="mx-2 text-gray-400" />
        <span className="font-medium text-gray-800">Tất cả sản phẩm</span>
      </div>

      <ProductsClient
        initialData={initialData}
        baseUrl={baseUrl}
        brands={brands}
        categories={categoriesRaw}
      />
    </>
  );
}