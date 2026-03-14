# Sell.app Integration Setup

This project includes a complete Sell.app integration for selling products through your Next.js application.

## Prerequisites

1. A Sell.app account with products already created in the dashboard
2. API access enabled on your Sell.app account

## Setup Instructions

### 1. Get Your API Key

1. Go to your [Sell.app Developer Settings](https://sell.app/dashboard/settings?settings=developers)
2. Create a new API key with the following permissions:
   - Read Products
   - Create Invoices
   - Read Invoices
3. Copy the generated API key

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project:

```bash
SELLAPP_API_KEY=your_api_key_here
```

**Important:** Never commit your `.env.local` file to version control. It's already in `.gitignore`.

### 3. Install Dependencies

If not already installed, run:

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Access the Store

Navigate to `http://localhost:3000/store` to see your products.

## Features

### Product Listing
- Fetches products from your Sell.app dashboard
- Displays product images, descriptions, prices, and stock levels
- Pagination support for large product catalogs
- Real-time stock status

### Checkout Flow
1. Customer clicks "Buy Now" on a product
2. Modal opens requesting email and quantity
3. System creates an invoice via Sell.app API
4. Customer is redirected to Sell.app's secure checkout page
5. Payment is processed by Sell.app
6. Customer receives product delivery from Sell.app

## API Endpoints

### GET `/api/sellapp/products`
Fetch all products with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)

**Response:**
```json
{
  "data": [...],
  "current_page": 1,
  "last_page": 5,
  "per_page": 15,
  "total": 75
}
```

### GET `/api/sellapp/products/[id]`
Fetch a single product by ID.

### POST `/api/sellapp/checkout`
Create a checkout session for a product.

**Request Body:**
```json
{
  "product_id": 123,
  "customer_email": "customer@example.com",
  "quantity": 1,
  "coupon_code": "DISCOUNT10" // optional
}
```

**Response:**
```json
{
  "invoice": {...},
  "checkout_url": "https://sell.app/checkout/..."
}
```

### GET `/api/sellapp/invoices`
Fetch all invoices with pagination.

## File Structure

```
lib/sellapp/
  ├── types.ts          # TypeScript interfaces for Sell.app API
  └── client.ts         # API client for Sell.app

app/api/sellapp/
  ├── products/
  │   ├── route.ts      # List all products
  │   └── [id]/route.ts # Get single product
  ├── checkout/route.ts # Create checkout session
  └── invoices/route.ts # List invoices

app/components/
  ├── ProductCard.tsx   # Product display component
  └── CheckoutModal.tsx # Checkout modal component

app/store/
  └── page.tsx          # Store page
```

## Customization

### Styling
All components use Tailwind CSS. Modify the classes in the component files to match your brand.

### Currency Formatting
Currency formatting is handled automatically based on the product's currency field from Sell.app.

### Product Fields
To display additional product fields, update the `ProductCard` component and the TypeScript interfaces in `lib/sellapp/types.ts`.

## Troubleshooting

### "SELLAPP_API_KEY environment variable is not set"
Make sure you've created `.env.local` with your API key and restarted the dev server.

### Products not showing
1. Verify your API key has the correct permissions
2. Check that you have products created in your Sell.app dashboard
3. Ensure products are not set to "unlisted" or "private"

### Checkout not working
1. Verify the product has stock available
2. Check browser console for error messages
3. Ensure the API key has invoice creation permissions

## Security Notes

- API key is only used server-side (in API routes)
- Never expose your API key to the client
- All checkout processing happens on Sell.app's secure platform
- Customer payment information never touches your server

## Support

For Sell.app API issues, refer to:
- [Official API Documentation](https://developer.sell.app/)
- [Sell.app Discord](https://sell.app/discord)
