import axiosAdmin from "@/shared/api/axiosAdmin";
import { useMutation, useQuery } from "@tanstack/react-query";

export const createNewStoryRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.post("StoryAdmin/create_new_story", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};

export const getDesignerStoryRequest = (designer_id, pageNumber, pageSize, date) => {
  const request = async (designer_id, pageNumber, pageSize, date) => {
    const response = await axiosAdmin.get("StoryAdmin/get_designer_story", {
      params: {
        designer_id,
        pageNumber,
        pageSize,
        from: date.startDate
          ? `${date.startDate.getFullYear()}-${
              date.startDate.getMonth() + 1
            }-${date.startDate.getDate()}`
          : null,
        to: date.endDate
          ? `${date.endDate.getFullYear()}-${date.endDate.getMonth() + 1}-${date.endDate.getDate()}`
          : null,
      },
    });

    return response.data;
  };

  return useQuery({
    queryKey: ["designer_story", designer_id, pageNumber, pageSize, date],
    queryFn: () => request(designer_id, pageNumber, pageSize, date),
  });
};

export const updateDesignerStoryRequest = () => {
  const request = async (payload) => {
    const response = await axiosAdmin.patch("StoryAdmin/update_designer_story", payload);
    return response.data;
  };

  return useMutation({
    mutationFn: request,
  });
};
