import { ICategoryRequset } from "./category";

export interface IProductRequest {
  product_id?: number;
  product_name: string;
  product_price: number;
  product_size: string;
  product_weight: number;
  product_color: string;
  note: string;
  category_id: number;
  images?: FileList;
  product_images?: IProductImages[]
  featured_count?:number
  product_additional_prices?:product_additional_prices[]
}

export interface IProductResponse {
  total: number;
  detail: IProductResponseDetail[];
}

export interface IProductResponseDetail {
  product_id?: number;
  product_name: string;
  product_price: number;
  product_size: string;
  product_weight: number;
  product_color: string;
  note: string;
  product_category: ICategoryRequset;
  images?: FileList;
  product_images?: IProductImages[]
  featured_count?:number,
  product_quantity?:number,
  product_sum?:number
  product_additional_prices?:product_additional_prices[]
}

export interface IProductByIdResponse {
  detail: IProductResponseDetail;
}

export interface IProductImages {
  image_id: number;
  image_name: string;
  image_patch: string;
}

export interface product_additional_prices{
  additional_price_id?:number
  product_from:string
  product_additional_price:number
}