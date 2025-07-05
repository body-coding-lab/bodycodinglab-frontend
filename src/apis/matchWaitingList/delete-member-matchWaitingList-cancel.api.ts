import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { DELETE_CANCEL_MEMBER_MATCH_WAITING_LIST_API } from "../constants";
import { AxiosError } from "axios";

export const DeleteMemberMatchWaitingListCancelRequest = async (matchWaitingListId: number ,accessToken: string): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.delete(DELETE_CANCEL_MEMBER_MATCH_WAITING_LIST_API(matchWaitingListId), bearerAuthorization(accessToken));
    
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}