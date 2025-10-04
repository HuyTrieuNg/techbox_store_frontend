export const categories = [
  {
    id: 1,
    name: "Laptop",
    createdAt: "2025-09-28T10:00:00",
    updatedAt: "2025-09-28T10:00:00",
    childCategories: [
      {
        id: 2,
        name: "Gaming Laptop",
        parentCategoryId: 1,
        createdAt: "2025-09-28T10:05:00",
        updatedAt: "2025-09-28T10:05:00",
      },
      {
        id: 3,
        name: "Ultrabook",
        parentCategoryId: 1,
        createdAt: "2025-09-28T10:06:00",
        updatedAt: "2025-09-28T10:06:00",
      },
    ],
  },
  {
    id: 4,
    name: "Phone",
    createdAt: "2025-09-28T11:00:00",
    updatedAt: "2025-09-28T11:00:00",
    childCategories: [
      {
        id: 5,
        name: "Android",
        parentCategoryId: 4,
        createdAt: "2025-09-28T11:05:00",
        updatedAt: "2025-09-28T11:05:00",
      },
      {
        id: 6,
        name: "iOS",
        parentCategoryId: 4,
        createdAt: "2025-09-28T11:06:00",
        updatedAt: "2025-09-28T11:06:00",
      },
    ],
  },
];
