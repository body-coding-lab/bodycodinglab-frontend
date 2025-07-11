import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { UPDATE_TRAINER_STATUS_API } from "../constants";
import { AxiosError } from "axios";
import { UpdateTrainerStatusRequestDto } from "@/dtos/admin/request/update-trainer-status.request.dto";

export const updateTrainerStatusRequest = async (
  trainerId: number,
  requestBody: UpdateTrainerStatusRequestDto,
  accessToken: string
): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(
      UPDATE_TRAINER_STATUS_API(trainerId),
      requestBody,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}