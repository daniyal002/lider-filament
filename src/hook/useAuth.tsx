import { ILoginRequest, IRegistrationRequest } from "@/interface/auth";
import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from 'axios';
import { IErrorResponse } from "@/interface/error";
import { useRouter } from "next/navigation";
import useLocalFavorites from "./localStorageHook";
import { useAddProductFeaturedMutation } from "./productHook";


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
    const { replace } = useRouter();
    const { getLocalFavorites, removeLocalFavorite } = useLocalFavorites();
    const { mutate: addProductFeaturedMutation } = useAddProductFeaturedMutation();

    const { mutate, isSuccess, error } = useMutation({
      mutationKey: ['login'],
      mutationFn: (data: ILoginRequest) => authService.login(data),
      onSuccess() {
        const localFavorites = getLocalFavorites(); // Получение массива избранных элементов
        // Используйте Promise.all для обработки всех мутаций и удаления избранного
        localFavorites.forEach(favorite => {
            addProductFeaturedMutation(favorite)
            removeLocalFavorite(favorite)
      })
          replace("/");
      },
      onError(error: AxiosError<IErrorResponse>) {
        // Обработка ошибки
        console.error(error);
      }
    });

    return { mutate, isSuccess, error };
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
