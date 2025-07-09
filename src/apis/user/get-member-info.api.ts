import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_MEMBER_INFO_API } from "../constants";
import { AxiosError } from "axios";
import { GetMemberInfoResponseDto } from "@/dtos/user/response/get-member-info.response.dto";

export const getMemberInfoRequest = async (accessToken: string): Promise<ResponseDto<GetMemberInfoResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_MEMBER_INFO_API,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}