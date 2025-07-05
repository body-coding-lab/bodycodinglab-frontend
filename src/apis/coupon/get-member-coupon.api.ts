import { GetMemberCouponResponseDto } from "@/dtos/coupon/response/get-member-coupon.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";
import { GET_MEMBER_COUPON_API } from "../constants";

type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";

export const GetMemberCouponRequest = async (status: CouponStatus, accessToken: string): Promise<ResponseDto<GetMemberCouponResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_MEMBER_COUPON_API(status), bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  }catch (error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}