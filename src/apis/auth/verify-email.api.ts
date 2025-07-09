import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { EMAIL_VERIFY_API } from "../constants";
import { AxiosError } from "axios";

export const verifyEmailRequest = async (token: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.get(
      EMAIL_VERIFY_API(token)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}