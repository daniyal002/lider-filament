import { ICategoryRequset } from "./category";

export interface ICartRequset {
  cart_id?: number;
  product_id: number;
  product_name?: string;
  product_quantity: number;
  product_price?: number;
  product_image?:string
}

export interface ICartResponseDetail{
  cart_id?: number;
  product_id:number;
  product_name: string;
  product_price: number;
  product_size: string;
  product_weight: number;
  product_color: string;
  product_category: ICategoryRequset;
  product_quantity:number
  product_image?:string
}

export interface ICartResponse{
    detail:ICartResponseDetail[]
}


export interface ICartResponseById{
    detail:ICartResponseDetail
}