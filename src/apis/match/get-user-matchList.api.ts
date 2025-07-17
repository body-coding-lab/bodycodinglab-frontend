import { GetUserMatchListResponseDto } from "@/dtos/match/response/get_user-match-list.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { USER_MATCH_API } from "../constants";
import { AxiosError } from "axios";

export const GetUserMatchListRequest = async(accessToken: string): Promise<ResponseDto<GetUserMatchListResponseDto[]>> =>{
  try{
    const response = await axiosInstance.get(USER_MATCH_API, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}