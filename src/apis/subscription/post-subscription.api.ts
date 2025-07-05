import { ConfirmPaymentRequestDto } from "@/dtos/payment/request/confrim-payment.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { PostSubscriptionResponseDto } from "@/dtos/subscription/response/post-subscription.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { MEMBER_SUBSCRIPTION_API } from "../constants";
import { AxiosError } from "axios";

export const PostSubscripitonRequest = async (dto: ConfirmPaymentRequestDto, accessToken: string): Promise<ResponseDto<PostSubscriptionResponseDto>> => {
  try{
    const response = await axiosInstance.post(MEMBER_SUBSCRIPTION_API, dto, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}