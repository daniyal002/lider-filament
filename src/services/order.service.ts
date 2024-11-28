import { axiosWidthAuth } from "@/api/interseptors";
import { IOrderRequest, IOrderResponse } from "@/interface/order";

export const orderService = {
    async getAllOrders() {
        const response = await axiosWidthAuth.get<IOrderResponse>('order/read_all_users_orders');
        return response.data.detail
    },

    async getUserOrders(){
        const response = await axiosWidthAuth.get<IOrderResponse>('order/read_user_orders');
        return response.data.detail
    },

    async createOrder(data: IOrderRequest) {
        const response = await axiosWidthAuth.post<IOrderResponse>('order/create_order', data);
        return response.data
    },

    async updateOrder(id: number, data: IOrderRequest) {
        const response = await axiosWidthAuth.put<IOrderResponse>("order/update_order",data);
        return response.data
    },

    async deleteOrder(id: number) {
        const response = await axiosWidthAuth.delete<IOrderResponse>("order/delete_order",{data:{order_id:id}})
        return response.data
    },
}