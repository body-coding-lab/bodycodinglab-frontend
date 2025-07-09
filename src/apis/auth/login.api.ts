import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { LOGIN_API } from "../constants";
import { AxiosError } from "axios";
import { LoginUserRequestDto } from "@/dtos/auth/request/login.request.dto";
import { LoginUserResponseDto } from "@/dtos/auth/response/login-user.response.dto";

export const loginRequest = async (dto: LoginUserRequestDto): Promise<ResponseDto<LoginUserResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      LOGIN_API,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}