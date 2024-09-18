import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation } from "@tanstack/react-query";

export const createNewRankRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.post("RankAdmin/create_rank", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
