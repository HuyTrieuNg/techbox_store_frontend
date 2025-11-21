import { cache } from 'react';
import CategoryMenuClient from './CategoryClient';

const baseUrl =  (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080') + '/api';

export type CategoryMenuType = "menu" | "grid";
interface CategoryMenuServerProps {
  type?: CategoryMenuType;
}

export default async function CategoryMenuServer({ type = "menu" }: CategoryMenuServerProps) {
  const res = await fetch(`${baseUrl}/categories`, {
    cache: 'no-store'
  });

  const categories = await res.json();

  // Truyền vào client component
  return <CategoryMenuClient categories={categories} type={type} />;
}