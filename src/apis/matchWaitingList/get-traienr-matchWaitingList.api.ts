import { GetTrainerMatchWaitingListResponseDto } from "@/dtos/matchWaitingList/response/get-trainer-matchWatingList.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { TRAINER_MATCH_WAITING_LIST_API } from "../constants";
import { AxiosError } from "axios";

export const GetTrainerMatchWaitingListRequest = async (accessToken: string): Promise<ResponseDto<GetTrainerMatchWaitingListResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(TRAINER_MATCH_WAITING_LIST_API, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}