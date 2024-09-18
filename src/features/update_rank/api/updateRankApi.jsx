import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const getRankByIdRequest = (rankId) => {
  const request = async (rankId) => {
    const response = await axiosAdmin.get("RankAdmin/get_rank", { params: { rankId } });
    return response.data;
  };

  return useQuery({
    queryKey: ["rank", rankId],
    queryFn: () => {
      return request(rankId);
    },
  });
};

export const updateRankRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.put("RankAdmin/update_rank", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
