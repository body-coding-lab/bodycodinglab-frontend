import { GetAllTrainersResponseDto } from "@/dtos/admin/response/get-all-trainers.response.dto";
import PageDto from "@/dtos/page.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { GET_ALL_TRAINERS_API } from "../constants";
import { AxiosError } from "axios";

export const getAllTrainersRequest = async (page: number, size: number = 10, selectedStatus: string, accessToken: string): Promise<ResponseDto<PageDto<GetAllTrainersResponseDto>>> => {
  try {
    const response = await axiosInstance.get(
      `${GET_ALL_TRAINERS_API}?page=${page}&size=${size}&status=${selectedStatus}`,
      bearerAuthorization(accessToken)
    );
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}