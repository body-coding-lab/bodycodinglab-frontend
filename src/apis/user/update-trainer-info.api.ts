import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_TRAINER_INFO_API } from "../constants";
import { AxiosError } from "axios";
import { UpdateTrainerInfoRequestDto } from "@/dtos/user/request/update-trainer-info.request.dto";
import { GetTrainerInfoResponseDto } from "@/dtos/user/response/get-trainer-info.response.dto";

export const updateTrainerInfoRequest = async (dto: UpdateTrainerInfoRequestDto, accessToken: string): Promise<ResponseDto<GetTrainerInfoResponseDto>> => {
  try {
    const response = await axiosInstance.put(
      UPDATE_TRAINER_INFO_API,
      dto,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}