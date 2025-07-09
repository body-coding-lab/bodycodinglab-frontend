import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PASSWORD_RESET_EMAIL_API } from "../constants";
import { AxiosError } from "axios";
import { SendResetPasswordEmailRequestDto } from "@/dtos/auth/request/send-reset-password-email.request.dto";

export const requestResetPasswordEmailRequest = async (dto: SendResetPasswordEmailRequestDto): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      PASSWORD_RESET_EMAIL_API,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}