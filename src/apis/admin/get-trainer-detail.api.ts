import { GetTrainerDetailResponseDto } from "@/dtos/admin/response/get-trainer-detail.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_DETAIL_API } from "../constants";
import { AxiosError } from "axios";

export const getTrainerDetailRequest = async (trainerId: number, accessToken: string): Promise<ResponseDto<GetTrainerDetailResponseDto>> => {
  try {
    const response = await axiosInstance.get(
      GET_TRAINER_DETAIL_API(trainerId),
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}