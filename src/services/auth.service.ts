import { axiosClassic, axiosWidthAuth } from "@/api/interseptors";
import { removeAccessTokenFromStorage, removeRefreshTokenFromStorage, saveAccessToken, saveRefreshToken } from "./auth-token.service";
import { ILoginRequest, ILoginResponse, IRefreshRequest, IRegistrationRequest } from "@/interface/auth";
 
export const authService = {
    async registration (body:IRegistrationRequest){
        const response = await axiosClassic.post<string>('/auth/registration',body)
        return response
    },

    async login (body:ILoginRequest){
        const response = await axiosClassic.post<ILoginResponse>('/auth/login',body)

        if(response.data.access_token){
            saveAccessToken(response.data.access_token)
        }

        if(response.data.refresh_token){
            saveRefreshToken(response.data.refresh_token)
        }

        return response
    },


    async logout(){
        await axiosWidthAuth.post('/auth/logout')
        removeAccessTokenFromStorage()
        removeRefreshTokenFromStorage()
    },

    async refresh(body:IRefreshRequest){
      const response =  await axiosWidthAuth.post<ILoginResponse>(`/auth/refresh?refresh_token=${body.refresh_token}`)

      if(response.data.access_token){
        saveAccessToken(response.data.access_token)
    }

    if(response.data.refresh_token){
        saveRefreshToken(response.data.refresh_token)
    }

      return response.data
    }

} 