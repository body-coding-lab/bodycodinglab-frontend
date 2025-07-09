import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_USER_INFO_API } from "../constants";
import { AxiosError } from "axios";
import { GetUserInfoResponseDto } from "@/dtos/user/response/get-user-info.response.dto";

export const getUserInfoRequest = async (accessToken: string): Promise<ResponseDto<GetUserInfoResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_USER_INFO_API,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}