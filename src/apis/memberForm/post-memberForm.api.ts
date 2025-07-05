import { PostMemberFormRequestDto } from "@/dtos/memberForm/request/post-memberForm.request.dto";
import { PostMemberFormResponseDto } from "@/dtos/memberForm/response/post-memberForm.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { MEMBER_FORM_API } from "../constants";
import { AxiosError } from "axios";

export const PostMemberFormRequest = async (dto: PostMemberFormRequestDto, accessToken: string): Promise<ResponseDto<PostMemberFormResponseDto>> => {
  try{
    const response = await axiosInstance.post(MEMBER_FORM_API, dto, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){  
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}