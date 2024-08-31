import { axiosWidthAuth } from "@/api/interseptors"
import { IProductRequest, IProductResponse } from "@/interface/product"

export const productService = {
    async getProduct (skip:string,limit:string){
        const response = await axiosWidthAuth.get<IProductResponse[]>(`product/read_products?skip=${skip}&limit=${limit}`)
        return response.data
    },

    async getProductById (id:string){
        const response = await axiosWidthAuth.get<IProductResponse>(`product/read_products?id=${id}`)
        return response.data
    },

    async addProduct(data:IProductRequest){
        const response = await axiosWidthAuth.post<IProductResponse>('product/create_product',data)
        return response.data
    },

    async updateProduct(data:IProductRequest){
        const response = await axiosWidthAuth.put<IProductResponse>(`product/update_product?product_id=${data.product_id}`,data)
        return response.data
    },

    async deleteProductById(data:IProductRequest){
        const response = await axiosWidthAuth.delete<string>(`product/product_id?product_id=${data.product_id}`)
        return response.data
    }
}