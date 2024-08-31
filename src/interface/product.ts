import { ICategory } from "./category";

export interface IProductRequest {
  product_id?:number
  product_name: string;
  product_price: number;
  product_size: string;
  product_weight: number;
  product_color: string;
  note: string;
  category_id: number;
}

export interface IProductResponse {
    product_id?:number
    product_name: string;
    product_price: number;
    product_size: string;
    product_weight: number;
    product_color: string;
    note: string;
    category: ICategory;
  }