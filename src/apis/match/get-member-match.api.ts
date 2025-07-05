import { GetMemberMatchResponseDto } from "@/dtos/match/response/get-member-match.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { MEMBER_MATCH_API } from "../constants";
import { AxiosError } from "axios";


export const GetMemberMatchRequest = async (accessToken: string): Promise<ResponseDto<GetMemberMatchResponseDto>> => {
  try{
    const response = await axiosInstance.get(MEMBER_MATCH_API, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
    }
}