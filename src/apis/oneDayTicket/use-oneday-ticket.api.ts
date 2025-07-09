import { TicketUseRequestDto } from "@/dtos/oneDayTicket/request/ticket-use.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { USE_TICKET_API } from "../constants";
import { AxiosError } from "axios";

export const useOneDayTicket = async (ticketId: number, dto: TicketUseRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(USE_TICKET_API(ticketId), dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}