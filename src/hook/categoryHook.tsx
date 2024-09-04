import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { categoryService } from "@/services/category.service";
import { ICategoryRequset, ICategoryResponse } from "@/interface/category";

export const useCategoryData = () => {
  const {
    data: categoryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryService.getCategory(),
    staleTime: Infinity,
  });
  return { categoryData, isLoading, error };
};

export const useCategoryDataById = (id: string) => {
  const {
    data: categoryByIdData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['CategoryById', id], // Include id in the queryKey to refetch data on id change
    queryFn: () => categoryService.getCategoryById(id),
    enabled: !!id, // Only run the query if id is truthy
  });
  
  return { categoryByIdData, isLoading, error };
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: ICategoryRequset) => categoryService.addCategory(data),
    onSuccess: (newCategory) => {
      queryClient.setQueryData(["Categories"], (oldData: ICategoryResponse | undefined) => {
        if (!oldData?.detail) return { ...oldData, detail: [newCategory.detail] };
        return {
          ...oldData,
          detail: [...oldData.detail, newCategory.detail],
        };
      });
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: (data: ICategoryRequset) => categoryService.updateCategory(data),
    onSuccess: (_,variables) => {
      queryClient.setQueryData(["Categories"], (oldData: ICategoryResponse | undefined) => {
        if (!oldData?.detail) return oldData;
        return {
          ...oldData,
          detail: oldData.detail.map((category) =>
            category.category_id === variables.category_id ? variables : category
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

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (data: ICategoryRequset) => categoryService.deleteCategoryById(data),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["Categories"], (oldData:ICategoryResponse | undefined) => {
        if (!oldData || !oldData.detail) {
          return { ...oldData, detail: [] }; // Return a valid structure even if oldData is undefined
        }

        return {
          ...oldData,
          detail: oldData.detail.filter(
            (category) => category.category_id !== variables.category_id
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
