import { ILoginRequest, IRegistrationRequest } from "@/interface/auth";
import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from 'axios';
import { IErrorResponse } from "@/interface/error";
import { useRouter } from "next/navigation";
import useLocalFavorites from "./localStorageFavoriteHook";
import { useAddProductFeaturedMutation } from "./productHook";
import useLocalCart from "./localStorageCartHook";
import { useCreateCartMutation } from "./cartHook";


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
    const {getLocalCart,removeLocalCart} = useLocalCart()
    const { mutate: addProductFeaturedMutation } = useAddProductFeaturedMutation();
    const {mutate:createCartMutation} = useCreateCartMutation()

    const { mutate, isSuccess, error } = useMutation({
      mutationKey: ['login'],
      mutationFn: (data: ILoginRequest) => authService.login(data),
      onSuccess() {
        const localFavorites = getLocalFavorites(); // Получение массива избранных элементов
        localFavorites.forEach(favorite => {
            addProductFeaturedMutation(favorite)
            removeLocalFavorite(favorite)
      })

      const localCart = getLocalCart()
      localCart.forEach(cart => {
        createCartMutation(cart)
        removeLocalCart(cart.product_id)
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
