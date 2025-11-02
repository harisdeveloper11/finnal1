# TODO: Fix API Routes and Data Fetching Issues

## Issues Identified:
1. **ID Field Mismatch**: Backend returns `id` (Firestore doc.id), but frontend uses `_id`
2. **Environment Variables**: Some files use `process.env.REACT_APP_API_URL` instead of `import.meta.env.VITE_API_BASE_URL`
3. **Product ID in Orders**: Cart items don't include product ID, causing order placement to fail
4. **Collection Endpoints**: Some collection fetches use wrong env vars

## Fixes Needed:

### Frontend ID Fixes:
- [x] Change all `product._id` to `product.id` in:
  - FeaturedProducts.tsx
  - prodectdetails.tsx
  - dashboard/products.jsx
  - pages/Search.jsx
  - collection/Shop.jsx
  - collection/Trending.jsx
  - collection/Latest.jsx
- [x] Change all `order._id` to `order.id` in dashboard/orders.jsx
- [x] Change all `contact._id` to `contact.id` in dashboard/contacts.jsx

### Environment Variable Fixes:
- [x] Change `process.env.REACT_APP_API_URL` to `import.meta.env.VITE_API_BASE_URL` in:
  - pages/Search.jsx
  - collection/Shop.jsx
  - collection/Trending.jsx
  - collection/Latest.jsx

### Cart and Order Fixes:
- [x] Update CartContext to include productId in CartItem
- [x] Update addToCart calls to pass productId
- [x] Update OrderFormModal to use productId from cart items

### Backend Verification:
- [ ] Ensure all routes return correct data structure
- [ ] Verify Firestore queries work correctly

## Testing:
- [ ] Test product search and filters
- [ ] Test product detail pages
- [ ] Test related products
- [ ] Test contact form
- [ ] Test order placement
- [ ] Test dashboard data fetching
