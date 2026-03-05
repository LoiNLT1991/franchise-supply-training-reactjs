export interface PublicProductItem {
  product_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_have_topping: boolean;
  sizes: PublicSizeItem[];
}

export interface PublicSizeItem {
  product_franchise_id: string;
  size_id: string;
  price: string;
  is_available: boolean;
}

export interface PublicProduct extends PublicProductItem {
  category_id: string;
  category_name: string;
  category_display_order: number;
  product_display_order: number;
  SKU: string;
  content?: string;
  images_url?: string[];
}
