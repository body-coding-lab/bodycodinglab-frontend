import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PASSWORD_RESET_API } from "../constants";
import { AxiosError } from "axios";
import { ResetPasswordRequestDto } from "@/dtos/auth/request/reset-password.request.dto";

export const resetPasswordRequest = async (token: string, dto: ResetPasswordRequestDto): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      PASSWORD_RESET_API(token),
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}