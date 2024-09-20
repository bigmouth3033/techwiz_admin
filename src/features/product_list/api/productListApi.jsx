import { useQuery } from "@tanstack/react-query";
import axiosAdmin from "@/shared/api/axiosAdmin";

export const getProductListRequest = (pageNumber, pageSize) => {
  const request = async () => {
    const response = await axiosAdmin.get("ProductAdmin/get_products", {
      params: { pageNumber, pageSize },
    });

    return response.data;
  };

  return useQuery({
    queryKey: ["product_list", pageNumber, pageSize],
    queryFn: () => {
      return request(pageNumber, pageSize);
    },
  });
};
