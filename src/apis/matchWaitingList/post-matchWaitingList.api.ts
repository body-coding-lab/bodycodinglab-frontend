import { PostMatchWaitingListResponseDto } from "@/dtos/matchWaitingList/response/post-matchWaitingList.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { MATCH_WAITING_LIST_API } from "../constants";
import ResponseDto from "@/dtos/response.dto";
import { AxiosError } from "axios";

export const PostMatchWaitingListRequest = async (trainerId: number, accessToken: string): Promise<ResponseDto<PostMatchWaitingListResponseDto>> => {
  try{
    const response = await axiosInstance.post(MATCH_WAITING_LIST_API(trainerId), bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}
