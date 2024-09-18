import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation } from "@tanstack/react-query";

export const createNewVoucherRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.post("VoucherAdmin/create_voucher", payload);
    return responsed.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
