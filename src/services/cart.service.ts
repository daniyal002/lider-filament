import { axiosWidthAuth } from "@/api/interseptors"
import { ICartRequset, ICartResponse, ICartResponseById } from "@/interface/cart"

export const cartService = {
    async getCart (){
        const response = await axiosWidthAuth.get<ICartResponse>("cart/read_cart")
        return response.data
    },

    async getCartUser (){
        const response = await axiosWidthAuth.get<ICartResponse>("cart/read_cart_user")
        return response.data
    },
    
    async addCart(data:ICartRequset){
        const response = await axiosWidthAuth.post<ICartResponseById>('cart/add_products_to_cart',data)
        return response.data
    },

    async updateCart(data:ICartRequset){
        const response = await axiosWidthAuth.put<ICartResponseById>(`cart/update_products_from_cart`,data)
        return response.data
    },

    async deleteCartById(data:ICartRequset){
        const response = await axiosWidthAuth.delete<string>(`cart/remove_products_from_cart?cart_id=${data.cart_id}`)
        return response.data
    }
}