import { IProductResponseDetail } from "./product";

export interface IOrderRequest {
order_id?:number
  order_status_id: number;
  order_sum: number;
  products: IProductOrderRequest[];
}

export interface IProductOrderRequest {
  product_id: number;
  product_quantity: number;
  product_price: string;
  product_sum: string;
}

export interface IOrderResponse{
    detail:IOrderResponseDeatail[]
    total:number
}

export interface IOrderResponseDeatail{
  created_at:string,
  updated_at:string,
  order_number:string,
  order_sum:string,
  order_id: number;
  order_status: {order_status_name:string, order_status_id:number};
  products:IProductOrderResponse[]
}

export interface IProductOrderResponse {
    product:IProductResponseDetail;
    product_quantity: number;
    product_price: string;
    product_sum: string;
}
