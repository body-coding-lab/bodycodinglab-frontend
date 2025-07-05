import { GetMemberFormResponseDto } from "@/dtos/memberForm/response/get-memberForm.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { MEMBER_FORM_API } from "../constants";
import { AxiosError } from "axios";

export const GetMemberFormRequest = async(accessToken: string): Promise<ResponseDto<GetMemberFormResponseDto>> => {
  try{  
    const response = await axiosInstance.get(MEMBER_FORM_API, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}