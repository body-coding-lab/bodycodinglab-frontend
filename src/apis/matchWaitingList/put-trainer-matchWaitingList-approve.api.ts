import { PutApproveMatchWaitingListRequestDto } from "@/dtos/matchWaitingList/request/put-approve-matchWaitingList.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PUT_APPROVE_TRAINER_MATCH_WAITING_LIST_API } from "../constants";
import { AxiosError } from "axios";

export const PutTrainerMatchWaitingListApproveRequest = async(matchWaitingListId: number, dto: PutApproveMatchWaitingListRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.put(PUT_APPROVE_TRAINER_MATCH_WAITING_LIST_API(matchWaitingListId), dto, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}