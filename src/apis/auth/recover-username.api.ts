import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { USERNAME_RECOVERY_API } from "../constants";
import { AxiosError } from "axios";
import { RecoverUsernameRequestDto } from "@/dtos/auth/request/recover-username.request.dto";
import { RecoverUsernameResponseDto } from "@/dtos/auth/response/recover-username.response.dto";

export const recoverUsernameRequest = async (dto: RecoverUsernameRequestDto): Promise<ResponseDto<RecoverUsernameResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      USERNAME_RECOVERY_API,
      dto
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}