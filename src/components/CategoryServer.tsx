import { cache } from 'react';
import CategoryMenuClient from './CategoryClient';

export type CategoryMenuType = "menu" | "grid";
interface CategoryMenuServerProps {
  type?: CategoryMenuType;
}

export default async function CategoryMenuServer({ type = "menu" }: CategoryMenuServerProps) {
  const res = await fetch("http://localhost:8080/api/categories", {
    next: { revalidate: 60 }
  });

  const categories = await res.json();

  // Truyền vào client component
  return <CategoryMenuClient categories={categories} type={type} />;
}