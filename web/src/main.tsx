import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { OrderModalProvider } from "./OrderModalContext";
import { AddToCartModalProvider } from "./AddToCartModalContext";
import { CartModalProvider } from "./CartModalContext";
import { Toaster } from "react-hot-toast"; // ✅ import toast component

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <OrderModalProvider>
          <AddToCartModalProvider>
            <CartModalProvider>
              <App />
              {/* ✅ Toast system active */}
              <Toaster position="top-center" reverseOrder={false} />
            </CartModalProvider>
          </AddToCartModalProvider>
        </OrderModalProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
