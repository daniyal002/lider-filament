import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import { AxiosError } from "axios";
import { orderService } from "@/services/order.service";
import { IOrderRequest, IOrderResponse, IOrderResponseDeatail } from "@/interface/order";

export const useAllOrdersData = () => {
  const {
    data: allOrdersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["AllOrders"],
    queryFn: () => orderService.getAllOrders(),
  });
  return { allOrdersData, isLoading, error };
};

export const useUserOrdersData = () => {
  const {
    data: userOrdersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["User Orders"],
    queryFn: () => orderService.getUserOrders(),
  });
  return { userOrdersData, isLoading, error };
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: (orderData: IOrderRequest) => orderService.createOrder(orderData),
    onSuccess: (newOrder) => {
      queryClient.setQueryData(["User Orders"], (oldData: IOrderResponse[] | undefined) => {
        return oldData ? [...oldData, newOrder] : [newOrder];
      });

      queryClient.invalidateQueries({queryKey:['CartUsers']})
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateOrder"],
    mutationFn: ({ id, orderData }: { id: number; orderData: IOrderRequest }) => orderService.updateOrder(id, orderData),
    onSuccess: (updatedOrder, variables) => {
      queryClient.setQueryData(["UserOrders"], (oldData: IOrderResponse | undefined) => {
        if (!oldData) return oldData;
        return oldData.detail.map((order) => (order.order_id === variables.id ? updatedOrder : order));
      });
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteOrder"],
    mutationFn: (id: number) => orderService.deleteOrder(id),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["UserOrders"], (oldData: IOrderResponse | undefined) => {
        if (!oldData) return oldData;
        return oldData.detail.filter((order) => order.order_id !== variables);
      });
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};