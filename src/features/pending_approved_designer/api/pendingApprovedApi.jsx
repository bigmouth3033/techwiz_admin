import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const getPendingApprovedRequest = (pageNumber, pageSize) => {
  const request = async (pageNumber, pageSize) => {
    const response = await axiosAdmin.get("DesignerAdmin/pending_list", {
      params: { pageNumber, pageSize },
    });

    return response.data;
  };

  return useQuery({
    queryKey: ["pending", pageNumber, pageSize],
    queryFn: () => {
      return request(pageNumber, pageSize);
    },
  });
};

export const approveDesignerRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.post("DesignerAdmin/approve_designer", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};

export const denyDesignerRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.post("DesignerAdmin/deny_designer", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
