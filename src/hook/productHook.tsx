import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { productService } from "@/services/product.service";
import { IProductRequest, IProductResponse } from "@/interface/product";

export const useProductData = (skip:string,limit:string) => {
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Products"],
    queryFn: () => productService.getProduct(skip,limit),
    staleTime: Infinity,
  });
  return { productData, isLoading, error };
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: (data: IProductRequest) => productService.addProduct(data),
    onSuccess: (newProduct) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Products"], (oldData: IProductResponse[] | undefined) => {
        if (!oldData) return [];
        return [...oldData, newProduct];
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      console.log(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: (data: IProductRequest) => productService.updateProduct(data),
    onSuccess: (updatedProduct, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Products"], (oldData: IProductResponse[] | undefined) => {
        if (!oldData) return [];
        return oldData.map((product) =>
          product.product_id === variables.product_id ? variables : product
        );
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      console.log(error?.response?.data?.detail);
    },
  });
  return { mutate };
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (data: IProductRequest) => productService.deleteProductById(data),
    onSuccess: (updatedProduct, variables) => {
      // Update the specific post in the 'Posts' query cache
      queryClient.setQueryData(["Products"], (oldData: IProductResponse[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((product) => product.product_id !== variables.product_id);
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      console.log(error?.response?.data?.detail);
    },
  });
  return { mutate };
};
