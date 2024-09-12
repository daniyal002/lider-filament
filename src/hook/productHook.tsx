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
    mutationFn: (formData: FormData) => productService.addProduct(formData),
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
    mutationFn: ({formData,product_id}:{formData:FormData,product_id:string}) => productService.updateProduct(product_id,formData),
    onSuccess: (updatedProduct,variables) => {
      console.log(updatedProduct)
      queryClient.setQueryData(["Products"], (oldData: IProductResponse | undefined) => {
        if (!oldData?.detail) return oldData;
        return {
          ...oldData,
          detail: oldData.detail.map((product) =>
            product.product_id === updatedProduct.detail.product_id ? updatedProduct.detail : product
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


export const useProductFeaturedData = () => {
  const {
    data: productFeaturedData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ProductFeatured"],
    queryFn: () => productService.getProductFeatured(),
  });
  return { productFeaturedData, isLoading, error };
};

export const useAddProductFeaturedMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["addProductFeatured"],
    mutationFn: (product_id:number) => productService.addProductFeatured(product_id),
    onSuccess: () => {
      // Invalidating the query to refetch the data
      queryClient.invalidateQueries({queryKey:['ProductFeatured']});
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};

export const useDeleteProductFeaturedMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteProductFeatured"],
    mutationFn: (product_id:number) => productService.deleteProductFeatured(product_id),
    onSuccess: () => {
      // Invalidating the query to refetch the data
      queryClient.invalidateQueries({queryKey:['ProductFeatured']});
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};

/// top

export const useProductTopData = () => {
  const {
    data: productTopData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ProductTop"],
    queryFn: () => productService.getProductTop(),
  });
  return { productTopData, isLoading, error };
};

export const useAddProductTopMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["addProductTop"],
    mutationFn: (product_id:number) => productService.addProductTop(product_id),
    onSuccess: () => {
      // Invalidating the query to refetch the data
      queryClient.invalidateQueries({queryKey:['ProductTop']});
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};

export const useDeleteProductTopMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteProductTop"],
    mutationFn: (product_id:number) => productService.deleteProductTop(product_id),
    onSuccess: () => {
      // Invalidating the query to refetch the data
      queryClient.invalidateQueries({queryKey:['ProductTop']});
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};