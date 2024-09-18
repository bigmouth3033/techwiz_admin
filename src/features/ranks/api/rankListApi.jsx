import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const getAllRankRequest = () => {
  const request = async () => {
    const response = await axiosAdmin.get("RankAdmin/get_ranks");
    return response.data;
  };

  return useQuery({
    queryKey: ["ranks"],
    queryFn: request,
  });
};

export const changeRankActiveRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.put("RankAdmin/update_rank_active", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
