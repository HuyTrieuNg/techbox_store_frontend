export const users = [
    {
        id: 1,
        username: "john_doe",
        email: "abc@gmail.com",
        addresses: [
            { id: 1, user_id: 1, street: "123 Main St", city: "Hanoi", country: "Vietnam", postal_code: "100000", is_default: true },
            { id: 2, user_id: 1, street: "456 Second St", city: "HCM", country: "Vietnam", postal_code: "700000", is_default: false }
        ],
    },
    {
        id: 2,
        username: "jane_smith",
        email: "jane@gmail.com",
        addresses: [
            { id: 3, user_id: 2, street: "789 Third St", city: "Da Nang", country: "Vietnam", postal_code: "500000", is_default: true }
        ],
    },
];