import { TicketCancelRequestDto } from "@/dtos/oneDayTicket/request/ticket-cancel.request.dto";
import ResponseDto from "@/dtos/response.dto";
import { CANCEL_TICKET_API } from "../constants";
import { axiosInstance, bearerAuthorization, responseErrorHandler, responseSuccessHandler } from "../axiosConfig";
import { AxiosError } from "axios";

export const cancelOneDayTicket = async (ticketId: number, dto: TicketCancelRequestDto, accessToken: string): Promise<ResponseDto<void>> => {
  try {
    const response = await axiosInstance.post(CANCEL_TICKET_API(ticketId), dto, bearerAuthorization(accessToken));
    return responseSuccessHandler(response);
  } catch (error) {
    return responseErrorHandler(error as AxiosError<ResponseDto>);
  }
}