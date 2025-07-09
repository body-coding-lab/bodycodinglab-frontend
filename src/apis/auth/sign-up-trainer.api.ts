import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { SIGNUP_TRAINER_API } from "../constants";
import { AxiosError } from "axios";
import { SignUpTrainerResponseDto } from "@/dtos/auth/response/sign-up-trainer.response.dto";

export const signUpTrainerRequest = async (formData: FormData): Promise<ResponseDto<SignUpTrainerResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      SIGNUP_TRAINER_API,
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}