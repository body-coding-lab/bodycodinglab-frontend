import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_PROFILE_IMAGE_API } from "../constants";
import { AxiosError } from "axios";

export const updateProfileImageRequest = async (formData: FormData, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_PROFILE_IMAGE_API,
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}