import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_MEMBER_MATCH_API } from "../constants";
import { AxiosError } from "axios";

export const DeleteMemberMatchRequest = async(matchId: number, accessToken: string): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.delete(DELETE_MEMBER_MATCH_API(matchId),bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}