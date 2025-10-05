// "use client";

// import { FaTrash } from "react-icons/fa";
// import { useCart } from "@/contexts/CartContext";

// export default function CartItem({ item }: { item: any }) {
//   const { updateQuantity, removeFromCart } = useCart();

//   return (
//     <div className="flex items-center justify-between border-b py-4">
//       <div className="flex items-center gap-4">
//         <button 
//          onClick={() => removeFromCart(item.id)}
//             className="text-gray-400 hover:text-[#E61E4D] text-lg">
//                   ×
//         </button>
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-20 h-20 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-semibold text-gray-800">{item.name}</h3>
//           <p className="text-[#E61E4D] font-semibold">
//             {item.price.toLocaleString()} ₫
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center gap-3">
//         <input
//           type="number"
//           min={1}
//           value={item.quantity}
//           onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
//           className="w-16 border rounded px-2 py-1 text-center"
//         />
//         <button
//           onClick={() => removeFromCart(item.id)}
//           className="text-red-500 hover:text-red-700"
//         >
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useCart } from "@/contexts/CartContext";

// export default function CartItem({ item }: { item: any }) {
//     const { updateQuantity, removeFromCart } = useCart();

//     const handleDecrease = () => {
//         if (item.quantity > 1) {
//             updateQuantity(item.id, item.quantity - 1);
//         } else {
//             removeFromCart(item.id);
//         }
//     };

//     const handleIncrease = () => {
//         updateQuantity(item.id, item.quantity + 1);
//     };

//     const itemTotal = item.price * item.quantity;

//     return (
//         <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
//             <div className="flex items-center gap-4 flex-1">
//                 <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-gray-400 hover:text-red-500 text-xl font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                     ×
//                 </button>
//                 {/* <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center"> */}
//                 {/* Placeholder for image */}
//                 <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded"
//                 />
//                 {/* <span className="text-gray-400 text-xs">Image</span> */}
//                 {/* </div> */}
//                 <div className="flex-1 min-w-0">
//                     <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
//                     <p className="text-sm text-gray-500">${item.price.toLocaleString()}</p>
//                 </div>
//             </div>
//             <div className="flex items-center gap-2 px-4">
//                 <button
//                     onClick={handleDecrease}
//                     className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-50 transition-colors"
//                 >
//                     -
//                 </button>
//                 <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
//                 <button
//                     onClick={handleIncrease}
//                     className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-sm hover:bg-gray-50 transition-colors"
//                 >
//                     +
//                 </button>
//             </div>
//             <div className="text-right font-medium text-gray-900 min-w-[80px]">
//                 ${itemTotal.toLocaleString()}
//             </div>
//         </div>
//     );
// }



import { useCart } from "@/contexts/CartContext";

export default function CartItem({ item }: { item: any }) {
    const { updateQuantity, removeFromCart } = useCart();

    const handleDecrease = () => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        }
    };

    const handleIncrease = () => {
        updateQuantity(item.id, item.quantity + 1);
    };

    const itemTotal = item.price * item.quantity;

    return (
        <div className="grid grid-cols-4 items-center py-4 px-6 border-b border-gray-300 hover:bg-gray-50 transition">
            <div className="flex items-center space-x-3">
                <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-[#E61E4D] text-lg">
                    ×
                </button>
                {/* <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center"> */}
                {/* Placeholder for image */}
                <div className="w-14 h-14 bg-gray-100 flex items-center justify-center overflow-hidden rounded">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover"
                    />

                </div>
                <span className="text-gray-800 font-medium">{item.name}</span>
            </div>

            {/* Giá */}
            <div className="text-center text-gray-700">
                {item.price.toLocaleString()} ₫
            </div>

            {/* Số lượng */}
            <div className="flex items-center justify-center space-x-2">
                <button
                    onClick={handleDecrease}
                    className="border rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                    −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                    onClick={handleIncrease}
                    className="border rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-200 cursor-pointer">
                    +
                </button>
            </div>

            {/* Tổng */}
              <div className="text-right text-gray-800 font-semibold">
                ${itemTotal.toLocaleString()} ₫
              </div>
        </div>
    );
}