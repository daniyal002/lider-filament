import { axiosWidthAuth } from "@/api/interseptors"
import { IProductByIdResponse, IProductRequest, IProductResponse, IProductResponseDetail } from "@/interface/product"

export const productService = {
    async getProduct (skip:string,limit:string){
        const response = await axiosWidthAuth.get<IProductResponse>(`product/read_products?skip=${skip}&limit=${limit}`)
        return response.data
    },

    async getProductById (id:string){
        const response = await axiosWidthAuth.get<IProductByIdResponse>(`product/read_product_by_id?product_id=${id}`)
        return response.data
    },

    async addProduct(data:IProductRequest){
        const response = await axiosWidthAuth.post<IProductByIdResponse>('product/create_product',data)
        return response.data
    },

    async updateProduct(data:IProductRequest){
        const response = await axiosWidthAuth.put<IProductByIdResponse>(`product/update_product?product_id=${data.product_id}`,data)
        return response.data
    },

    async deleteProductById(data:IProductRequest){
        const response = await axiosWidthAuth.delete<string>(`product/delete_product?product_id=${data.product_id}`)
        return response.data
    }
}