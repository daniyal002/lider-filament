import { axiosWidthAuth } from "@/api/interseptors"
import { ICategoryByIdResponse, ICategoryRequset, ICategoryResponse } from "@/interface/category"

export const categoryService = {
    async getCategory (){
        const response = await axiosWidthAuth.get<ICategoryResponse>("category/read_categories")
        return response.data
    },

    async getCategoryById (id:string){
        if(id==="undefined"){
            return null
        }
        const response = await axiosWidthAuth.get<ICategoryByIdResponse>(`category/read_category_by_id?category_id=${id}`)
        return response.data
    },

    async addCategory(data:ICategoryRequset){
        const response = await axiosWidthAuth.post<ICategoryByIdResponse>('category/create_category',data)
        return response.data
    },

    async updateCategory(data:ICategoryRequset){
        const response = await axiosWidthAuth.put<ICategoryByIdResponse>(`category/update_category`,data)
        return response.data
    },

    async deleteCategoryById(data:ICategoryRequset){
        const response = await axiosWidthAuth.delete<string>(`category/delete_category?category_id=${data.category_id}`)
        return response.data
    }
}