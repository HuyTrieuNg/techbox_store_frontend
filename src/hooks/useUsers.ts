import { UserResponse } from "@/features/user";
import { UserService } from "@/services/admin/usersService";
import useSWR from "swr";

export const useUsers = (page = 0, size = 10) => {
  const { data, error, isLoading, mutate } = useSWR<UserResponse>(
    ["/users", page, size], // key thay đổi theo trang => SWR tự refetch
    () => UserService.getUsers(page, size),
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    users: data?.content ?? [],
    pagination: data, // chứa totalPages, totalElements, v.v. nếu backend trả về
    isLoading,
    isError: error,
    refreshUsers: mutate,
  };
};
