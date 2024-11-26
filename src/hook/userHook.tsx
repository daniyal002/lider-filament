import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IErrorResponse } from "@/interface/error";
import axios, { AxiosError } from "axios";
import { userService } from "@/services/user.service";
import { IUserDetail, IUserResponse } from "@/interface/user";
import { useRouter } from "next/navigation";
import { removeAccessTokenFromStorage, removeRefreshTokenFromStorage } from "@/services/auth-token.service";

export const useUserData = (skip:string,limit:string) => {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Users"],
    queryFn: () => userService.getUser(skip,limit),
    staleTime: Infinity,
  });
  return { userData, isLoading, error };
};

export const useUserDataById = (id: string) => {
  const {
    data: userByIdData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['UserById', id], // Include id in the queryKey to refetch data on id change
    queryFn: () => userService.getUserById(id),
    enabled: !!id, // Only run the query if id is truthy
  });

  return { userByIdData, isLoading, error };
};

export const useGetMe = () => {
  const {data:getMe, isLoading,error} = useQuery({
    queryKey: ["GetMe"],
    queryFn: () => userService.getMe(),
    })

    return {getMe,isLoading,error};
}

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (data: IUserDetail) => userService.updateUser(data),
    onSuccess: (_,variables) => {
      queryClient.setQueryData(["Users"], (oldData: IUserResponse | undefined) => {
        if (!oldData?.detail) return oldData;
        return {
          ...oldData,
          detail: oldData.detail.map((user) =>
            user.user_id === variables.user_id ? variables : user
          ),
        };
      });
      queryClient.invalidateQueries({queryKey:['UserById']})
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error(error?.response?.data?.detail);
    },
  });

  return { mutate };
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (data: IUserDetail) => userService.deleteUserById(data),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["Users"], (oldData:IUserResponse | undefined) => {
        if (!oldData || !oldData.detail) {
          return { ...oldData, detail: [] }; // Return a valid structure even if oldData is undefined
        }

        return {
          ...oldData,
          detail: oldData.detail.filter(
            (user) => user.user_id !== variables.user_id
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


export const useResetForgotPassword = () => {
	const { replace } = useRouter()

  const { mutate,error,isSuccess } = useMutation({
    mutationKey: ["resetForgotPassword"],
    mutationFn: (email:string) => userService.resetForgotPassword(email),
    onSuccess: (_, variables) => {
      setTimeout(()=>{
        replace('/auth/login')
      },3000)
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        console.error(error?.response?.data?.detail);
        },
        });
        return { mutate,error,isSuccess };
}

export const useResetForgotPasswordProfile = () => {
	const { replace } = useRouter()

  const { mutate,error,isSuccess } = useMutation({
    mutationKey: ["resetForgotPassword"],
    mutationFn: (email:string) => userService.resetForgotPassword(email),
    onSuccess: (_, variables) => {
      setTimeout(()=>{
        removeAccessTokenFromStorage()
        removeRefreshTokenFromStorage()
        replace('/auth/login')
      },3000)
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        console.error(error?.response?.data?.detail);
        },
        });
        return { mutate,error,isSuccess };
}