import { GetTrainerCouponResponseDto } from "@/dtos/coupon/response/get-trainer-coupon.response.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_TRAINER_COUPON_API } from "../constants";
import { AxiosError } from "axios";

type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";

export const GetTrainerCouponRequest = async (status: CouponStatus, accessToken: string): Promise<ResponseDto<GetTrainerCouponResponseDto[]>> => {
  try{
    const response = await axiosInstance.get(GET_TRAINER_COUPON_API(status), bearerAuthorization(accessToken));

    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)
  }
}