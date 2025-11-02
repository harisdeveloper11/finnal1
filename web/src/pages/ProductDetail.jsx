// import React from "react";
// import { useParams } from "react-router-dom";
// import products from "../data/products";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const product = products.find((p) => p.id === parseInt(id));

//   if (!product) return <p className="text-center mt-20">Product not found!</p>;

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Product Image */}
//         <div className="md:w-1/2">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full rounded-lg shadow-lg"
//           />
//         </div>

//         {/* Product Info */}
//         <div className="md:w-1/2 flex flex-col gap-4">
//           <h1 className="text-3xl font-bold text-blue-600">{product.name}</h1>
//           <p className="text-xl font-semibold text-gray-700">${product.price}</p>
//           <p className="text-gray-600">Stock: {product.stock}</p>
//           <p className="text-gray-600">Color: {product.color}</p>
//           <p className="text-gray-600">Shipping: {product.shipping}</p>
//           <p className="text-gray-600">Delivery Duration: {product.duration}</p>
//           <p className="text-gray-600">
//             Payment Options:{" "}
//             {product.cod && "COD"} {product.online && "Online"} {product.pickup && "Pickup"}
//           </p>

//           {/* Place Order Button */}
//           <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
