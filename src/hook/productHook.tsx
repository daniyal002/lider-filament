import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { productService } from "@/services/product.service";
import { IProductRequest, IProductResponse, IProductResponseDetail } from "@/interface/product";

export const useProductData = (skip:string,limit:string) => {
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Products"],
    queryFn: () => productService.getProduct(skip,limit),
    // staleTime: Infinity,
  });
  return { productData, isLoading, error };
};

export const useProductDataById = (id: string) => {
  const {
    data: productByIdData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ProductById', id], // Include id in the queryKey to refetch data on id change
    queryFn: () => productService.getProductById(id),
    enabled: !!id, // Only run the query if id is truthy
  });
  
  return { productByIdData, isLoading, error };
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: (data: IProductRequest) => productService.addProduct(data),
    onSuccess: (newProduct) => {
      queryClient.setQueryData(["Products"], (oldData: IProductResponse | undefined) => {
        if (!oldData?.detail) return { ...oldData, detail: [newProduct.detail] };
        return {
          ...oldData,
          detail: [...oldData.detail, newProduct.detail],
        };
      });
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: (data: IProductRequest) => productService.updateProduct(data),
    onSuccess: (updatedProduct,variables) => {
      queryClient.setQueryData(["Products"], (oldData: IProductResponse | undefined) => {
        if (!oldData?.detail) return oldData;
        return {
          ...oldData,
          detail: oldData.detail.map((product) =>
            product.product_id === variables.product_id ? variables : product
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

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (data: IProductRequest) => productService.deleteProductById(data),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["Products"], (oldData:IProductResponse | undefined) => {
        if (!oldData || !oldData.detail) {
          return { ...oldData, detail: [] }; // Return a valid structure even if oldData is undefined
        }

        return {
          ...oldData,
          detail: oldData.detail.filter(
            (product) => product.product_id !== variables.product_id
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
