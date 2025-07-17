import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { STATISTIC_API } from "../constants";
import { AxiosError } from "axios";

export const getStatistic = async (): Promise<ResponseDto> => {
  try {
    const response = await axiosInstance.get(STATISTIC_API);
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}