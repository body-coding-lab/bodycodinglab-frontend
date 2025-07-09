import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_INFO_API } from "../constants";
import { AxiosError } from "axios";
import { GetTrainerInfoResponseDto } from "@/dtos/user/response/get-trainer-info.response.dto";

export const getTrainerInfoRequest = async (accessToken: string): Promise<ResponseDto<GetTrainerInfoResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_TRAINER_INFO_API,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}