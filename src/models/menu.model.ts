import type { PublicProductItem } from "./product.model";

export interface PublicMenuItem {
  category_id: string;
  category_name: string;
  category_display_order: number;
  products: PublicProductItem[];
}
