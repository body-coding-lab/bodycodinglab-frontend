import ResponseDto from "@/dtos/response.dto";
import { GetsubscriptionResponseDto } from "@/dtos/subscription/response/get-subscription.response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { MEMBER_SUBSCRIPTION_API } from "../constants";
import { AxiosError } from "axios";

export const GetSubscriptionRequest = async (accessToken: string):
Promise<ResponseDto<GetsubscriptionResponseDto>> => {
  try{
    const response = await axiosInstance.get(MEMBER_SUBSCRIPTION_API, bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}