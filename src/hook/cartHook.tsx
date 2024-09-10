import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { cartService } from "@/services/cart.service";
import { ICartRequset, ICartResponse } from "@/interface/cart";

export const useCartData = () => {
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Carts"],
    queryFn: () => cartService.getCart(),
    staleTime: Infinity,
  });
  return { cartData, isLoading, error };
};

export const useCartUserData = () => {
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["CartUsers"],
    queryFn: () => cartService.getCartUser(),
    staleTime: Infinity,
  });
  return { cartData, isLoading, error };
};


export const useCreateCartMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createCart"],
    mutationFn: (data: ICartRequset) => cartService.addCart(data),
    onSuccess: (newCart) => {
      queryClient.setQueryData(["CartUsers"], (oldData: ICartResponse | undefined) => {
        if (!oldData?.detail) return { ...oldData, detail: [newCart.detail] };
        return {
          ...oldData,
          detail: [...oldData.detail, newCart.detail],
        };
      });
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateCart"],
    mutationFn: (data: ICartRequset) => cartService.updateCart(data),
    onSuccess: (_,variables) => {
      queryClient.setQueryData(["CartUsers"], (oldData: ICartResponse | undefined) => {
        if (!oldData?.detail) return oldData;
        return {
          ...oldData,
          detail: oldData.detail.map((cart) =>
            cart.cart_id === variables.cart_id ? variables : cart
          ),
        };
      });
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };  
};

export const useDeleteCartMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteCart"],
    mutationFn: (data: ICartRequset) => cartService.deleteCartById(data),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["CartUsers"], (oldData:ICartResponse | undefined) => {
        if (!oldData || !oldData.detail) {
          return { ...oldData, detail: [] }; // Return a valid structure even if oldData is undefined
        }

        return {
          ...oldData,
          detail: oldData.detail.filter(
            (cart) => cart.cart_id !== variables.cart_id
          ),
        };
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      console.log(error?.response?.data?.detail);
    },
  });

  return { mutate };
};
