import axiosAdmin from "@/shared/api/axiosAdmin";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

export const getDesignerConsultationRequest = (pageNumber, pageSize, status) => {
  const request = async () => {
    const response = await axiosAdmin.get("ConsultationAdmin/designer_consultation_list", {
      params: {
        pageNumber,
        pageSize,
        status,
      },
    });

    return response.data;
  };

  return useQuery({
    queryKey: ["designer-consultation", pageNumber, pageSize, status],
    queryFn: () => {
      return request(pageNumber, pageSize, status);
    },
  });
};

export const aproveConsultationRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.put(
      "ConsultationAdmin/designer_approve_consultation",
      payload
    );
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};

export const denyConsultationRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.put("ConsultationAdmin/designer_deny_consultation", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
