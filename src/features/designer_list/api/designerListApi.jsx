import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getApprovedDesignerRequest = (pageNumber, pageSize) => {
  const request = async (pageNumber, pageSize) => {
    const response = await axiosAdmin.get("DesignerAdmin/approved_list", {
      params: { pageNumber, pageSize },
    });

    return response.data;
  };

  return useQuery({
    queryKey: ["approved-list", pageNumber, pageSize],
    queryFn: () => {
      return request(pageNumber, pageSize);
    },
    retry: 0,
  });
};

export const changeDesignerStatusRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.put("DesignerAdmin/change_status", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
