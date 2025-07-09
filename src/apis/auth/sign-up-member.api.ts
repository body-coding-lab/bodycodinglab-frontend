import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { SIGNUP_MEMBER_API } from "../constants";
import { AxiosError } from "axios";
import { SignUpMemberResponseDto } from "@/dtos/auth/response/sign-up-member.response.dto";

export const signUpMemberRequest = async (formData: FormData): Promise<ResponseDto<SignUpMemberResponseDto>> => {
  try {
    const response = await axiosInstance.post(
      SIGNUP_MEMBER_API,
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