import { PostPaymentRequestDto } from "@/dtos/payment/request/post-payment.request.dto";
import { PostPaymentResponseDto } from "@/dtos/payment/response/post-payment.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PAYMENT_API } from "../constants";
import { AxiosError } from "axios";

export const PostPaymentRequest = async (dto: PostPaymentRequestDto, accessToken: string): Promise<ResponseDto<PostPaymentResponseDto>> => {
  try{  
    const response = await axiosInstance.post(PAYMENT_API, dto, bearerAuthorization(accessToken))

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}