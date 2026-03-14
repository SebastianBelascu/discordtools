import {
  SellAppProduct,
  SellAppInvoice,
  CreateInvoiceRequest,
  CheckoutSession,
  PaginatedResponse,
} from './types';

const SELLAPP_API_BASE = 'https://sell.app/api/v2';

export class SellAppClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${SELLAPP_API_BASE}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        `SellApp API Error: ${response.status} - ${error.message || response.statusText}`
      );
    }

    return response.json();
  }

  async listProducts(page: number = 1): Promise<PaginatedResponse<SellAppProduct>> {
    return this.request<PaginatedResponse<SellAppProduct>>(
      `/products?page=${page}`
    );
  }

  async getProduct(productId: number): Promise<SellAppProduct> {
    return this.request<SellAppProduct>(`/products/${productId}`);
  }

  async createInvoice(data: CreateInvoiceRequest): Promise<SellAppInvoice> {
    return this.request<SellAppInvoice>('/invoices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getInvoice(invoiceId: number): Promise<SellAppInvoice> {
    return this.request<SellAppInvoice>(`/invoices/${invoiceId}`);
  }

  async createCheckoutSession(invoiceId: number): Promise<CheckoutSession> {
    return this.request<CheckoutSession>(
      `/invoices/${invoiceId}/checkout-session`,
      {
        method: 'POST',
      }
    );
  }

  async listInvoices(page: number = 1): Promise<PaginatedResponse<SellAppInvoice>> {
    return this.request<PaginatedResponse<SellAppInvoice>>(
      `/invoices?page=${page}`
    );
  }
}

export function getSellAppClient(): SellAppClient {
  const apiKey = process.env.SELLAPP_API_KEY;
  
  if (!apiKey) {
    throw new Error('SELLAPP_API_KEY environment variable is not set');
  }

  return new SellAppClient(apiKey);
}
