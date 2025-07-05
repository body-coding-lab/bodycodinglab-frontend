import { PutRejectMatchWaitingListRequestDto } from "@/dtos/matchWaitingList/request/put-reject-matchWaitingList.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PUT_REJECT_TRAINER_MATCH_WAITING_LIST_API } from "../constants";
import { AxiosError } from "axios";

export const PutMemberMatchWaitingListRejectRequest = async (matchWaitingListId: number, dto: PutRejectMatchWaitingListRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.put(PUT_REJECT_TRAINER_MATCH_WAITING_LIST_API(matchWaitingListId), dto, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}