import { GetTrainerMatchResponseDto } from "@/dtos/match/response/get-trainer-match.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { TRAINER_FIND_MEMBER_MATCH_API } from "../constants";

export const GetTraienrMatchRequest = async (matchId: number, accessToken: string): Promise<ResponseDto<GetTrainerMatchResponseDto>> => {
  try{
    const response = await axiosInstance.get(TRAINER_FIND_MEMBER_MATCH_API(matchId), bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}