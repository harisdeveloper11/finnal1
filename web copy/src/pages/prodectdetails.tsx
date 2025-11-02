import { useParams } from "react-router-dom";
import { useCart } from "../CartContext";
import { useState, useEffect } from "react";
import { useOrderModal } from "../OrderModalContext";
import toast from "react-hot-toast"; // ✅ Toast import
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { open } = useOrderModal();

  const [qty, setQty] = useState<number>(1);
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
        setProduct(productRes.data);

        const relatedRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/related/${id}`);
        setRelated(relatedRes.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading)
    return (
      <h2 className="text-center mt-20 text-blue-600">
        Loading product...
      </h2>
    );

  if (!product)
    return (
      <h2 className="text-center mt-20 text-red-600">
        Product Not Found
      </h2>
    );

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 theme-bg">
      {/* ✅ Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg shadow"
        />

        <div>
          <h1 className="text-3xl font-bold theme-text">{product.name}</h1>
          <p className="mt-4 theme-text">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold theme-primary">
            ${product.price}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">Quantity</span>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value)))
                }
                className="w-20 border rounded px-2 py-1"
              />
            </div>

            {/* ✅ Add to Cart Button with Toast */}
            <button
              onClick={() => {
                addToCart({
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity: qty,
                });
                toast.success(`${product.name} added to cart 🛒`);
              }}
              className="btn-primary px-6 py-3 rounded-lg transition"
            >
              Add to Cart
            </button>

            {/* ✅ Buy Now Button with Toast */}
            <button
              onClick={() => {
                open([
                  {
                    id: Date.now(),
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: qty,
                  } as any,
                ]);
                toast.success(`Order started for ${product.name} 🚀`);
              }}
              className="border border-[rgb(var(--color-primary))] text-[rgb(var(--color-primary))] px-6 py-3 rounded-lg hover:bg-[rgba(var(--color-primary),0.06)] transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Related Products Section */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold theme-text mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <div
                key={item._id}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => (window.location.href = `/product/${item._id}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="mt-3 font-medium theme-text">{item.name}</h3>
                <p className="theme-primary font-semibold">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
