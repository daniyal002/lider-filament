import { ILoginRequest, IRegistrationRequest } from "@/interface/auth";
import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from 'axios';
import { IErrorResponse } from "@/interface/error";
import { useRouter } from "next/navigation";


export const useRegistration = () => {
	const { replace } = useRouter()
    const {mutate, isSuccess, error} = useMutation({
        mutationKey:['registration'],
        mutationFn:(data:IRegistrationRequest) => authService.registration(data),
        onSuccess(){
            replace("/")
        },
        onError(error:AxiosError<IErrorResponse>){
            // alert(error)
          }  
      })

      return {mutate,isSuccess,error}
};


export const useLogin = () => {
	const { replace } = useRouter()
    const {mutate, isSuccess, error} = useMutation({
        mutationKey:['login'],
        mutationFn:(data:ILoginRequest) => authService.login(data),
        onSuccess(){
            replace("/")
        },
        onError(error:AxiosError<IErrorResponse>){
            // alert(error)
          }  
      })

      return {mutate,isSuccess,error}
};

export const useLogout = () => {
    const { replace } = useRouter()

    const {mutate, isSuccess, error} = useMutation({
        mutationKey:['logout'],
        mutationFn:() => authService.logout(),
        onSuccess(){
            replace("/auth/login")
        },
        onError(error:AxiosError<IErrorResponse>){
            alert(error)
          }  
      })

      return {mutate,isSuccess,error}
};

