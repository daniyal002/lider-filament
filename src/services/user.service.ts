import { axiosWidthAuth } from "@/api/interseptors"
import { IUserDetail, IUserDetailById, IUserResponse } from "@/interface/user"

export const userService = {
    async getUser (skip: string, limit: string){
        const response = await axiosWidthAuth.get<IUserResponse>(`user/read_users?skip=${skip}&limit=${limit}`)
        return response.data
    },

    async getUserById (id:string){
        if(id==="undefined"){
            return null
        }
        const response = await axiosWidthAuth.get<IUserDetailById>(`user/read_user_by_id?user_id=${id}`)
        return response.data
    },


    async updateUser(data:IUserDetail){
        const response = await axiosWidthAuth.put<IUserDetailById>(`user/update_user`,data)
        return response.data
    },

    async deleteUserById(data:IUserDetail){
        const response = await axiosWidthAuth.delete<string>(`user/delete_user?user_id=${data.user_id}`)
        return response.data
    }
}