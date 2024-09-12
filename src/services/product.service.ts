import { axiosWidthAuth } from "@/api/interseptors";
import {
  IProductByIdResponse,
  IProductRequest,
  IProductResponse,
} from "@/interface/product";

export const productService = {
  async getProduct(skip: string, limit: string) {
    const response = await axiosWidthAuth.get<IProductResponse>(
      `product/read_products?skip=${skip}&limit=${limit}`
    );
    return response.data;
  },

  async getProductById(id: string) {
    if (id === "undefined") {
      return null;
    }
    const response = await axiosWidthAuth.get<IProductByIdResponse>(
      `product/read_product_by_id?product_id=${id}`
    );
    return response.data;
  },

  async addProduct(formData: FormData) {
    const response = await axiosWidthAuth.post<IProductByIdResponse>(
      "product/create_product",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },

  async updateProduct(product_id: string, formData: FormData) {
    const response = await axiosWidthAuth.put<IProductByIdResponse>(
      `product/update_product?product_id=${product_id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  },

  async deleteProductById(data: IProductRequest) {
    const response = await axiosWidthAuth.delete<string>(
      `product/delete_product?product_id=${data.product_id}`
    );
    return response.data;
  },

  async getProductFeatured(){
    const response = await axiosWidthAuth.get<IProductResponse>("product/read_products_on_featured")
    return response.data
  },

  async addProductFeatured(product_id:number){
    const response = await axiosWidthAuth.post<string>("product/add_product_on_featured",{product_id:product_id})
    return response.data
  },

  async deleteProductFeatured(product_id:number){
    const response = await axiosWidthAuth.delete<string>(`product/delete_product_from_featured?product_id=${product_id}`)
    return response.data
  },

  async getProductTop(){
    const response = await axiosWidthAuth.get<IProductResponse>("product/read_top_products")
    return response.data
  },

  async addProductTop(product_id:number){
    const response = await axiosWidthAuth.post<string>("product/add_product_on_top",{product_id:product_id})
    return response.data
  },

  async deleteProductTop(product_id:number){
    const response = await axiosWidthAuth.delete<string>(`product/delete_product_from_top?product_id=${product_id}`)
    return response.data
  },

};
