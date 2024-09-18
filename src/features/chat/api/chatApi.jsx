import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const getChatRoomRequest = () => {
  const request = async () => {
    const response = await axiosAdmin.get("ChatAdmin/chatrooms");
    return response.data;
  };

  return useQuery({
    queryKey: ["rooms"],
    queryFn: request,
  });
};

export const getCustomerMessagesRequest = (customerId, pageSize) => {
  const request = async (customerId, pageNumber, pageSize) => {
    const response = await axiosAdmin.get("ChatAdmin/get_messages", {
      params: { customerId, pageSize, pageNumber },
    });

    return response.data;
  };

  return useInfiniteQuery({
    queryKey: ["chat", customerId, pageSize],
    queryFn: ({ pageParam = 1 }) => {
      return request(customerId, pageParam, pageSize);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext == true) {
        return lastPage.currentPage + 1;
      } else {
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });
};

export const saveMessageRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.post("ChatAdmin/save_message", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
