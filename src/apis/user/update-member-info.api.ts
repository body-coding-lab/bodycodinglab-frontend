import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_MEMBER_INFO_API } from "../constants";
import { AxiosError } from "axios";
import { GetMemberInfoResponseDto } from "@/dtos/user/response/get-member-info.response.dto";
import { UpdateMemberInfoRequestDto } from "@/dtos/user/request/update-member-info.request.dto";

export const updateMemberInfoRequest = async (dto: UpdateMemberInfoRequestDto, accessToken: string): Promise<ResponseDto<GetMemberInfoResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_MEMBER_INFO_API,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}