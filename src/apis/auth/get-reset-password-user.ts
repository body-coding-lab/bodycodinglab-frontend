import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PASSWORD_RESET_USER_API } from "../constants";
import { AxiosError } from "axios";
import { GetResetPasswordUserRequestDto } from "@/dtos/auth/request/get-reset-password-user.request.dto";
import { GetResetPasswordUserResponseDto } from "@/dtos/auth/response/get-reset-password-user.response.dto";

export const getResetPasswordUserRequest = async (dto: GetResetPasswordUserRequestDto): Promise<ResponseDto<GetResetPasswordUserResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      PASSWORD_RESET_USER_API,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}