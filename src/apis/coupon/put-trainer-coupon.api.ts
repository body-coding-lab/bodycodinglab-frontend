import { PutCouponRequestDto } from "@/dtos/coupon/request/put-coupon.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { PUT_TRAINER_COUPON_API } from "../constants";
import { AxiosError } from "axios";

export const PutTrainerCouponRequest = async (dto: PutCouponRequestDto, couponId: number, accessToken: string): Promise<ResponseDto<void>> => {
  try{
    const response = await axiosInstance.put(PUT_TRAINER_COUPON_API(couponId), dto, bearerAuthorization(accessToken))
    return responseSuccessHandler(response);
  }catch(error){
    return responseErrorHandler(error as AxiosError<ResponseDto>)

  }
}