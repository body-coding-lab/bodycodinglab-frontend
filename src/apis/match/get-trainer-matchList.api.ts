import { GetTrainerMatchListResponseDto } from "@/dtos/match/response/get-trainer-match-list.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { TRAINER_MATCH_API } from "../constants";
import { AxiosError } from "axios";

export const GetTrainerMatchListRequest = async (accessToken: string): Promise<ResponseDto<GetTrainerMatchListResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(TRAINER_MATCH_API, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}