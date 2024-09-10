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

}

export interface IProductResponse {
  limit: number;
  skip: number;
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
  featured_count?:number
}

export interface IProductByIdResponse {
  detail: IProductResponseDetail;
}

export interface IProductImages {
  image_id: number;
  image_name: string;
  image_patch: string;
}
