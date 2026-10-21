# BazaarCraft — Multi-Vendor E-Commerce Marketplace

BazaarCraft is a modern, responsive multi-vendor e-commerce marketplace web application designed for independent Indian artisans, makers, and merchants.

---

## Features

- **Search-First Storefront**: Expansive search bar, category shortcuts, featured highlights, and trending items.
- **Dedicated Category Navigation**: Smooth horizontal category scrolling and instant filtering.
- **Product Catalog & Detail Pages**: Comprehensive product details with INR (`₹`) currency formatting, stock limits, and high-resolution galleries with fallback error recovery.
- **Shopping Cart**: Client-side cart state with local persistence, item quantity controls, and free delivery thresholds.
- **Order Management & Live Tracking**: Simulated 5-stage shipment timeline (*Order Placed* → *Order Confirmed* → *Shipped* → *Out for Delivery* → *Delivered*).
- **Demo User Profile & Authentication**: Safe client-side demo account simulation with guest redirect flow and profile management.
- **Merchant Listing Hub**: Seller portal with live preview card allowing instant mock product publishing.

---

## Tech Stack

- **Frontend**: React 19, Vite 8, React Router DOM 7, Tailwind CSS v4, Lucide React
- **Architecture**: Context API (`CartContext`, `AuthContext`), Route-level `React.lazy()` & `Suspense` code splitting
- **Backend (Upcoming)**: Node.js, Express.js
- **Database (Upcoming)**: MySQL with connection pooling

---

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm

### Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd E-commerce
   ```

2. **Run Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for Production:**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

---

## License

This project is open-source and built for educational pair programming.
