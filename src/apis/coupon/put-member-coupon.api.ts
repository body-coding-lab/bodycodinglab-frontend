import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PUT_MEMBER_COUPON_API } from "../constants";
import { AxiosError } from "axios";

export const PutMemberCouponRequest = async (couponId: number, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.put(PUT_MEMBER_COUPON_API(couponId), {}, bearerAuthorization(accessToken))

    return responseSuccessHandler(response);
  }catch(error){

    return responseErrorHandler(error as AxiosError<ResponseDto>)
  
  }
}