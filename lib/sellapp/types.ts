export interface SellAppProduct {
  id: number;
  title: string;
  slug: string;
  description: string;
  images: Array<{
    path: string;
    metadata: {
      size: number;
      filename: string;
      extension: string;
      mime_type: string;
    };
  }>;
  order: number;
  visibility: 'PUBLIC' | 'ON_HOLD' | 'HIDDEN' | 'PRIVATE';
  delivery_text: string;
  additional_information: unknown[];
  other_settings: unknown;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  store_id: number;
  category_id: number | null;
  section_id: number | null;
  section_order: number | null;
  is_discoverable: number;
  variants: ProductVariant[];
  url: string;
}

export interface ProductPricing {
  humble: boolean;
  frequency?: {
    value: number;
    interval: 'days' | 'weeks' | 'months';
  };
  type: 'SINGLE_PAYMENT' | 'SUBSCRIPTION';
  price: {
    price: number;
    currency: string;
  };
}

export interface AdditionalInformationField {
  id: string;
  name: string;
  type: 'TEXT' | 'DROPDOWN' | 'CHECKBOX';
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface ProductVariant {
  id: number;
  product_id: number;
  title: string;
  description: string;
  deliverable: {
    data: unknown;
    types: Array<'DOWNLOADABLE' | 'TEXT' | 'DYNAMIC' | 'MANUAL'>;
  };
  pricing: ProductPricing;
  minimum_purchase_quantity: number;
  maximum_purchase_quantity: number | null;
  bulk_discount: Array<{
    minimum_purchase_amount: number;
    discount_percentage: number;
  }>;
  payment_methods: string[];
  additional_information: AdditionalInformationField[];
  other_settings: unknown;
  stock: number | null;
  created_at: string;
  updated_at: string;
}

export interface SellAppInvoice {
  id: number;
  created_at: string;
  updated_at: string;
  status: 'pending' | 'completed' | 'voided';
  customer_email: string;
  product_id: number;
  product_variant_id?: number;
  quantity: number;
  total: number;
  currency: string;
  gateway: string;
  crypto_address?: string;
  crypto_amount?: number;
  crypto_confirmations_needed?: number;
  custom_fields?: Record<string, string>;
}

export interface CreateInvoiceRequest {
  customer_email: string;
  payment_method: string;
  product_variants: {
    [variantId: string]: {
      quantity: number;
      additional_information?: Record<string, string>;
    };
  };
  coupon?: string;
  vat_id?: string;
  country?: string;
  extra?: {
    amount: number;
    currency: string;
  };
}

export interface CheckoutSession {
  payment_url: string;
  invoice_id: number;
}

export interface SellAppResponse<T> {
  status: number;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface GroupProductSummary {
  id: string;
  title: string;
  description: string;
}

export interface SellAppGroup {
  id: number;
  title: string;
  order: number;
  image: string | null;
  unlisted: boolean;
  created_at: string;
  updated_at: string;
  store_id: number;
  section_id: number | null;
  section_order: number | null;
  products_linked: number;
  products: GroupProductSummary[];
}

export interface GroupProductFull {
  id: number;
  title: string;
  slug: string;
  description: string;
  images: Array<{
    path: string;
    metadata: {
      size: number;
      filename: string;
      extension: string;
      mime_type: string;
    };
  }>;
  order: number;
  visibility: 'PUBLIC' | 'ON_HOLD' | 'HIDDEN' | 'PRIVATE';
  delivery_text: string | null;
  additional_information: unknown[];
  warranty: {
    text: string;
    time: number | null;
    preferredUnit: string;
  };
  other_settings: unknown;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  store_id: number;
  category_id: number | null;
  section_id: number | null;
  section_order: number | null;
  is_discoverable: number;
  pivot: {
    group_id: number;
    listing_id: number;
    order: number;
  };
  default_price: {
    price: string;
    currency: string;
  };
}

export interface GroupsResponse {
  data: SellAppGroup[];
  links: Record<string, unknown>;
  meta: Record<string, unknown>;
}

export interface GroupProductsResponse {
  data: GroupProductFull[];
  links: Record<string, unknown>;
  meta: Record<string, unknown>;
}
