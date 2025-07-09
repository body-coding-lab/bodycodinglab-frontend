import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_PROFILE_IMAGE_API } from "../constants";
import { AxiosError } from "axios";

export const deleteProfileImageRequest = async (accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.delete(
      DELETE_PROFILE_IMAGE_API,
      bearerAuthorization(accessToken),
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}