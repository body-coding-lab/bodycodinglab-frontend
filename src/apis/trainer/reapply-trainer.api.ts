import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { REAPPLY_TRAINER_API } from "../constants";

export const reapplyTrainerRequest = async (formData: FormData, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(
      REAPPLY_TRAINER_API,
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